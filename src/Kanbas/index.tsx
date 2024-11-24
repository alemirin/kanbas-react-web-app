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
  const [enrollments, setEnrollments] = useState<any[]>([]);

  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const fetchCourses = async () => {
    try {
      const courses = await userClient.findAllCourses();
      setCourses(courses);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchEnrollments = async () => {
    try {
      const enrollments = await enrollmentsClient.findAllEnrollments();
      setEnrollments(enrollments);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchEnrollments();
  }, [currentUser]);

  const [course, setCourse] = useState<any>({
    _id: "RS500",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  const addNewCourse = async (uId: string, cId: string) => {
    // Generate a new unique ID based on the last course's ID
    const lastCourse = courses[courses.length - 1];
    const newId = lastCourse
      ? `RS${parseInt(lastCourse._id.slice(2)) + 1}`
      : "RS501"; // Start with RS101 if no courses exist

    // Create a new course with the generated ID
    const newCourse = {
      ...course,
      _id: newId,
    };
    await userClient.createCourse(newCourse);
    const newEnrollment = enrollmentsClient.enrollUserInCourse(uId, cId);
    setCourses([...courses, newCourse]);
    setEnrollments([...enrollments, newEnrollment]);
    await fetchCourses();
  };
  const deleteCourse = async (courseId: string) => {
    const status = await courseClient.deleteCourse(courseId);
    setCourses(courses.filter((course) => course._id !== courseId));
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
