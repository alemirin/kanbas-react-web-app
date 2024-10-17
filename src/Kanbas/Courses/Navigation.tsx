import { Link } from "react-router-dom";
import { Navigate, Route, Routes, useParams, useLocation } from "react-router";
import { courses } from "../Database";
export default function CoursesNavigation() {
  const links = [
    "Home",
    "Modules",
    "Piazza",
    "Zoom",
    "Assignments",
    "Quizzes",
    "Grades",
    "People",
  ];
  const { cid } = useParams();
  const course = courses.find((course) => course._id === cid);
  const { pathname } = useLocation();
  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => (
        <Link
          key={link}
          to={link}
          className={`list-group-item border-0 rounded-sm
              ${
                pathname.includes(link)
                  ? "text-black active border"
                  : "text-danger"
              }`}
        >
          <br />
          {link}
        </Link>
      ))}
    </div>
  );
}
