import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import FacultyRoute from "../Account/FacultyRoute";
import StudentRoute from "../Account/StudentRoute";
import * as enrollmentsClient from "../Enrollments/client";
import {
  setEnrollments,
  enroll,
  unenroll,
  toggleView,
} from "../Enrollments/reducer";

export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
  updateEnrollment,
  enrolling,
  setEnrolling,
}: {
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: (uId: string, cId: string) => void;
  deleteCourse: (courseId: string) => void;
  updateCourse: () => void;
  updateEnrollment: (courseId: string, enrolled: boolean) => void;
  enrolling: boolean;
  setEnrolling: (enrolling: boolean) => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const dispatch = useDispatch();

  const fetchEnrollments = async () => {
    if (!currentUser) {
      console.error("No user is currently logged in.");
      return;
    }
    const enrollments = await enrollmentsClient.findEnrollmentsForUser(
      currentUser._id as string
    );

    dispatch(setEnrollments(enrollments));
  };

  useEffect(() => {
    fetchEnrollments();
  }, []);

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">
        Dashboard
        <StudentRoute>
          <button
            className="btn btn-primary float-end me-2"
            id="wd-enrollments-click"
            onClick={() => {
              setEnrolling(!enrolling);
            }}
          >
            {enrolling ? "Enrolled Only" : "All Courses"}
          </button>
        </StudentRoute>
      </h1>
      <hr />

      <FacultyRoute>
        <h5>
          New Course
          <button
            className="btn btn-primary float-end me-2"
            id="wd-add-new-course-click"
            onClick={async (event) => {
              if (currentUser) {
                await addNewCourse(currentUser._id, course._id);
                dispatch(enroll(course._id));
              }
              await fetchEnrollments();
            }}
          >
            Add
          </button>
          <button
            className="btn btn-warning float-end me-2"
            onClick={updateCourse}
            id="wd-update-course-click"
          >
            Update
          </button>
        </h5>
        <br />
        <input
          value={course.name}
          className="form-control mb-2"
          onChange={(e) => setCourse({ ...course, name: e.target.value })}
        />
        <textarea
          value={course.description}
          className="form-control"
          onChange={(e) =>
            setCourse({ ...course, description: e.target.value })
          }
        />{" "}
      </FacultyRoute>
      <hr />

      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />

      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {courses.length > 0 &&
            courses.map((course) => {
              return (
                <div
                  key={course._id}
                  className="wd-dashboard-course col"
                  style={{ width: "300px" }}
                >
                  <div className="card rounded-3 overflow-hidden">
                    <Link
                      to={`#/Kanbas/Courses/${course._id}/Home`}
                      className="wd-dashboard-course-link text-decoration-none text-dark"
                    >
                      <img src={course.image} width="100%" height={160} />
                    </Link>
                    <div className="card-body">
                      <h5 className="wd-dashboard-course-title card-title">
                        <StudentRoute>
                          {enrolling && (
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                updateEnrollment(course._id, !course.enrolled);
                                fetchEnrollments();
                              }}
                              className={`btn ${
                                course.enrolled ? "btn-danger" : "btn-success"
                              } float-end`}
                            >
                              {course.enrolled ? "Unenroll" : "Enroll"}
                            </button>
                          )}
                        </StudentRoute>
                        {course.name}
                      </h5>
                      <p
                        className="wd-dashboard-course-title card-text overflow-y-hidden"
                        style={{ maxHeight: 100 }}
                      >
                        {course.description}
                      </p>
                      <a
                        href={`#/Kanbas/Courses/${course._id}/Home`}
                        className="btn btn-primary"
                      >
                        Go
                      </a>
                      <FacultyRoute>
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            deleteCourse(course._id);
                          }}
                          className="btn btn-danger float-end"
                          id="wd-delete-course-click"
                        >
                          Delete
                        </button>
                      </FacultyRoute>
                      <FacultyRoute>
                        <button
                          id="wd-edit-course-click"
                          onClick={(event) => {
                            event.preventDefault();
                            setCourse(course);
                          }}
                          className="btn btn-warning float-end me-2"
                        >
                          Edit
                        </button>
                      </FacultyRoute>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
