import AssignmentControls from "./AssignmentControls";
import AssignmentControlButtons from "./AssignmentControlButtons";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { MdOutlineAssignment } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { BsGripVertical } from "react-icons/bs";

export default function Assignments() {
  return (
    <div id="wd-assignments" className="list-group rounded-0">
      <AssignmentControls />
      <br />
      <br />
      <br />

      <ul id="wd-assignment-list">
        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            ASSIGNMENTS
            <AssignmentControlButtons />
          </div>
          <ul className="wd-lessons list-group rounded-0">
            <li className="wd-lesson list-group-item p-3 ps-1">
              <a
                className="wd-assignment-link"
                href="#/Kanbas/Courses/1234/Assignments/123"
              >
                <BsGripVertical className="me-2 fs-3" />
                <MdOutlineAssignment className="fs-1 text text-success" />
                <b>A1</b>
                <LessonControlButtons />
              </a>
              <p>
                <span className="text-danger"> Multiple Modules </span>|{" "}
                <b> Not available until</b> May 6 at 12:00 am |<b> Due</b> May
                13 at 11:59 pm | 100 pts
              </p>
            </li>
            <li className="wd-lesson list-group-item p-3 ps-1">
              <a
                className="wd-assignment-link"
                href="#/Kanbas/Courses/1234/Assignments/124"
              >
                <BsGripVertical className="me-2 fs-3" />
                <MdOutlineAssignment className="fs-1 text text-success" />
                <b>A2</b>
                <LessonControlButtons />
              </a>
              <p>
                <span className="text-danger"> Multiple Modules </span> |{" "}
                <b> Not available until</b> May 13 at 12:00 am |<b> Due</b> May
                20 at 11:59 pm | 100 pts
              </p>
            </li>
            <li className="wd-lesson list-group-item p-3 ps-1">
              <a
                className="wd-assignment-link"
                href="#/Kanbas/Courses/1234/Assignments/125"
              >
                <BsGripVertical className="me-2 fs-3" />
                <MdOutlineAssignment className="fs-1 text text-success" />
                <b>A3</b>
                <LessonControlButtons />
              </a>
              <p>
                <span className="text-danger"> Multiple Modules </span> |{" "}
                <b> Not available until</b> May 20 at 12:00 am |<b> Due</b> May
                27 at 11:59 pm | 100 pts
              </p>
            </li>
            <li className="wd-lesson list-group-item p-3 ps-1">
              <a
                className="wd-assignment-link"
                href="#/Kanbas/Courses/1234/Assignments/125"
              >
                <BsGripVertical className="me-2 fs-3" />
                <MdOutlineAssignment className="fs-1 text text-success" />
                <b>A4</b>
                <LessonControlButtons />
              </a>
              <p>
                <span className="text-danger"> Multiple Modules </span> |{" "}
                <b> Not available until</b> May 27 at 12:00 am |<b> Due</b> June
                3 at 11:59 pm | 100 pts
              </p>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
