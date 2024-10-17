import AssignmentControls from "./AssignmentControls";
import AssignmentControlButtons from "./AssignmentControlButtons";
import LessonControlButtons from "../Modules/LessonControlButtons";
import {
  MdOutlineAssignment,
  MdExpandMore,
  MdExpandLess,
} from "react-icons/md";
import { BsGripVertical } from "react-icons/bs";
import { useParams, useLocation } from "react-router";
import { useState } from "react";
import * as db from "../../Database";

export default function Assignments() {
  const { cid } = useParams();
  const assignments = db.assignments;

  const [isExpanded, setIsExpanded] = useState(true);
  const { pathname } = useLocation();
  return (
    <div id="wd-assignments" className="list-group rounded-0">
      <AssignmentControls />
      <br />
      <br />
      <br />

      <ul id="wd-assignment-list">
        <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="btn btn-link"
            >
              {isExpanded ? (
                <MdExpandLess className="fs-4" />
              ) : (
                <MdExpandMore className="fs-4" />
              )}
            </button>
            <BsGripVertical className="me-2 fs-3" />
            <b>ASSIGNMENTS</b>
            <AssignmentControlButtons />
          </div>

          {isExpanded && (
            <ul className="wd-lessons list-group rounded-0">
              {assignments
                .filter((assignment: any) => assignment.course === cid)
                .map((assignment: any) => (
                  <li className="wd-lesson list-group-item p-3 ps-1 d-flex gap-4">
                    <a
                      className="wd-assignment-link d-flex align-items-start"
                      href={`#/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}
                    >
                      <BsGripVertical className="me-2 fs-3 align-self-center" />
                      <MdOutlineAssignment className="fs-1 text text-success align-self-center" />
                    </a>
                    <div>
                      <a
                        className="align-self-start h4 fw-bold mt-3"
                        href={`#/Kanbas/Courses/${cid}/Assignments/${assignment._id}`}
                      >
                        {assignment.title}
                      </a>
                      <p className="mt-3">
                        <span className="text-danger"> Multiple Modules </span>|{" "}
                        <b> Not available until</b> {assignment.avail} at 12:00
                        am |<b> Due</b> {assignment.due} at 11:59 pm |{" "}
                        {assignment.points} pts
                      </p>
                    </div>
                    <LessonControlButtons />
                  </li>
                ))}
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
}
