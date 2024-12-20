import "./styles.css";

import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Session from "./Account/Session";
import Dashboard from "./Dashboard";
import KanbasNavigation from "./Navigation";
import Courses from "./Courses";
import * as userClient from "./Account/client";
import * as courseClient from "./Courses/client";
import * as enrollmentsClient from "./Enrollments/client";
import { useEffect, useState } from "react";
import ProtectedRoute from "./Account/ProtectedRoute";
import { useSelector } from "react-redux";

export default function Kanbas() {
  const [courses, setCourses] = useState<any[]>([]);
  const [enrolling, setEnrolling] = useState<boolean>(false);

  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const fetchCourses = async () => {
    try {
      if (currentUser.role != "ADMIN") {
        const allCourses = await courseClient.fetchAllCourses();
        const enrolledCourses = await enrollmentsClient.findEnrollmentsForUser(
          currentUser._id
        );
        const filteredCourses = enrolledCourses.filter((c: any) => c !== null);
        const enrolledCourseIds = new Set(
          filteredCourses.map((course: any) => course._id.toString())
        );

        // Merge enrollment state into all courses
        const courses = allCourses.map((course: any) => ({
          ...course,
          enrolled: enrolledCourseIds.has(course._id.toString()),
        }));
        setCourses(courses);
      } else {
        const allCourses = await courseClient.fetchAllCourses();
        setCourses(allCourses);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const findCoursesForUser = async () => {
    try {
      if (currentUser.role === "ADMIN") {
        const allCourses = await courseClient.fetchAllCourses();
        setCourses(allCourses);
      } else {
        const courses = await enrollmentsClient.findEnrollmentsForUser(
          currentUser._id
        );
        const filteredCourses = courses.filter((c: any) => c !== null);
        setCourses(filteredCourses);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateEnrollment = async (courseId: string, enrolled: boolean) => {
    if (enrolled) {
      await userClient.enrollIntoCourse(currentUser._id, courseId);
    } else {
      await userClient.unenrollFromCourse(currentUser._id, courseId);
    }
    // Update the local state for the specific course
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course._id === courseId ? { ...course, enrolled } : course
      )
    );
  };

  useEffect(() => {
    if (enrolling) {
      fetchCourses();
    } else {
      findCoursesForUser();
    }
  }, [currentUser, enrolling]);

  const [course, setCourse] = useState<any>({
    _id: Date.now().toString(),
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  const addNewCourse = async (uId: string, cId: string) => {
    const newCourse = {
      ...course,
    };
    const newCourseObj = await courseClient.createCourse(newCourse);
    await userClient.enrollIntoCourse(uId, cId);
    setCourses([...courses, newCourseObj]);
    // Update the local state for the specific course
    setCourses((prevCourses) =>
      prevCourses.map((course) =>
        course._id === cId ? { ...course, enrolled: true } : course
      )
    );
    await fetchCourses();
  };
  const deleteCourse = async (courseId: string) => {
    try {
      const status = await courseClient.deleteCourse(courseId);

      if (status) {
        setCourses((prevCourses) =>
          prevCourses.filter((course) => course._id !== courseId)
        );
      } else {
        console.error("Failed to delete course from the backend.");
      }
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const updateCourse = async () => {
    await courseClient.updateCourse(course);
    setCourses(
      courses.map((c) => {
        if (c._id === course._id) {
          return course;
        } else {
          return c;
        }
      })
    );
  };
  return (
    <Session>
      <div id="wd-kanbas">
        <KanbasNavigation />
        <div className="wd-main-content-offset p-3">
          <Routes>
            <Route path="/" element={<Navigate to="Account" />} />
            <Route path="/Account/*" element={<Account />} />
            <Route
              path="/Dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard
                    courses={courses}
                    course={course}
                    setCourse={setCourse}
                    addNewCourse={addNewCourse}
                    deleteCourse={deleteCourse}
                    updateCourse={updateCourse}
                    enrolling={enrolling}
                    setEnrolling={setEnrolling}
                    updateEnrollment={updateEnrollment}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Courses/:cid/*"
              element={
                <ProtectedRoute>
                  <Courses courses={courses} />
                </ProtectedRoute>
              }
            />
            <Route path="/Calendar" element={<h1>Calendar</h1>} />
            <Route path="/Inbox" element={<h1>Inbox</h1>} />
          </Routes>
        </div>
      </div>
    </Session>
  );
}
