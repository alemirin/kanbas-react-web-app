import CoursesNavigation from "./Navigation";
import FacultyRoute from "../Account/FacultyRoute";
import Modules from "./Modules";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import Quizzes from "./Quizzes";
import QuizEditor from "./Quizzes/Editor";
import PeopleTable from "./People/Table";
import { Navigate, Route, Routes, useParams, useLocation } from "react-router";
import { FaAlignJustify } from "react-icons/fa6";
import QuizDetails from "./Quizzes/QuizDetails";
import QuestionEditor from "./Quizzes/Questions/QuestionEditor";

export default function Courses({ courses }: { courses: any[] }) {
  const { cid } = useParams();
  const course = courses.find((course) => course._id === cid);
  const { pathname } = useLocation();
  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course && course.name} &gt; {pathname.split("/")[4]}
      </h2>
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CoursesNavigation />
        </div>
        <div className="flex-fill">
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Assignments" element={<Assignments />} />
            <Route
              path="Assignments/:aid/edit"
              element={
                <FacultyRoute>
                  <AssignmentEditor />
                </FacultyRoute>
              }
            />
            <Route
              path="Assignments/new"
              element={
                <FacultyRoute>
                  <AssignmentEditor />
                </FacultyRoute>
              }
            />
            <Route path="Quizzes" element={<Quizzes />} />
            <Route
              path="Quizzes/:qid/edit"
              element={
                <FacultyRoute>
                  <QuizEditor />
                </FacultyRoute>
              }
            />
            <Route
              path="Quizzes/new"
              element={
                <FacultyRoute>
                  <QuizEditor />
                </FacultyRoute>
              }
            />
            <Route path="Quizzes/:qid" element={<QuizDetails />} />
            <Route
              path="Quizzes/:qid/Questions"
              element={
                <FacultyRoute>
                  <QuestionEditor />
                </FacultyRoute>
              }
            />
            <Route path="People" element={<PeopleTable />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
