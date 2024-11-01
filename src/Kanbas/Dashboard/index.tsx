import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import FacultyRoute from "../Account/FacultyRoute";
import StudentRoute from "../Account/StudentRoute";
import { RootState } from "../store";
import { enroll, unenroll, toggleView } from "../Enrollments/reducer";

export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
}: {
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (courseId: string) => void;
  updateCourse: () => void;
}) {
  const navigate = useNavigate();
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const { enrollments, showAllCourses } = useSelector(
    (state: RootState) => state.enrollmentsReducer
  );
  const dispatch = useDispatch();

  const handleEnrollToggle = (
    e: React.MouseEvent,
    courseId: string,
    isEnrolled: boolean
  ) => {
    if (!currentUser) {
      console.error("No user is currently logged in.");
      return;
    }

    if (isEnrolled) {
      dispatch(unenroll(courseId));
    } else {
      dispatch(enroll(courseId));
    }
  };

  const displayedCourses = showAllCourses
    ? courses
    : courses.filter((course) => enrollments[course._id]);

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">
        Dashboard
        <StudentRoute>
          <button
            className="btn btn-primary float-end me-2"
            id="wd-enrollments-click"
            onClick={() => dispatch(toggleView())}
          >
            {showAllCourses ? "Show Enrolled Only" : "Show All Courses"}
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
            onClick={addNewCourse}
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

      <h2 id="wd-dashboard-published">
        Published Courses ({displayedCourses.length})
      </h2>
      <hr />

      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {displayedCourses.map((course) => {
            const isEnrolled = !!enrollments[course._id];
            return (
              <div
                key={course._id}
                className="wd-dashboard-course col"
                style={{ width: "300px" }}
              >
                <div className="card rounded-3 overflow-hidden">
                  <Link
                    to={`/Kanbas/Courses/${course._id}/Home`}
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                  >
                    <img src={course.image} width="100%" height={160} />
                  </Link>
                  <div className="card-body">
                    <h5 className="wd-dashboard-course-title card-title">
                      {course.name}
                    </h5>
                    <p
                      className="wd-dashboard-course-title card-text overflow-y-hidden"
                      style={{ maxHeight: 100 }}
                    >
                      {course.description}
                    </p>
                    <button
                      onClick={(e) => {
                        navigate(`/Kanbas/Courses/${course._id}/Home`);
                      }}
                      className="btn btn-primary"
                    >
                      Go
                    </button>
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
                    <StudentRoute>
                      <button
                        onClick={(e) =>
                          handleEnrollToggle(e, course._id, isEnrolled)
                        }
                        className={`btn float-end me-2 ${
                          isEnrolled ? "btn-danger" : "btn-success"
                        }`}
                      >
                        {isEnrolled ? "Unenroll" : "Enroll"}
                      </button>
                    </StudentRoute>
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
