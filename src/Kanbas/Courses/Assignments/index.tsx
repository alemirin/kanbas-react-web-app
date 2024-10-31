import AssignmentControls from "./AssignmentControls";
import AssignmentControlButtons from "./AssignmentControlButtons";
import SpecificAssignmentButtons from "./SpecificAssignmentControlButtons";
import DeleteWindow from "./DeleteWindow";

import {
  MdOutlineAssignment,
  MdExpandMore,
  MdExpandLess,
} from "react-icons/md";
import { BsGripVertical } from "react-icons/bs";
import { useParams, useLocation } from "react-router";
import { useState } from "react";
import { RootState } from "../../store";

import { useSelector, useDispatch } from "react-redux";
import { deleteAssignment } from "./reducer";

export default function Assignments() {
  interface Assignment {
    _id: string;
    title: string;
    course: string;
    description: string;
    availFrom: string;
    availUntil: string;
    due: string;
    points: number;
    group: string;
  }

  const dispatch = useDispatch();

  const { cid } = useParams();
  const assignments = useSelector(
    (state: RootState) => state.assignments.assignments
  );

  const [isExpanded, setIsExpanded] = useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedAssignment, setSelectedAssignment] =
    useState<Assignment | null>(null);

  const handleDeleteClick = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (selectedAssignment) {
      dispatch(deleteAssignment(selectedAssignment._id));
    }
    setShowDeleteDialog(false);
    setSelectedAssignment(null);
  };

  return (
    <div id="wd-assignments" className="list-group rounded-0">
      <AssignmentControls />
      <br />
      <br />
      <br />

      <ul id="wd-assignment-list">
        <li className="wd-module list-group-item p-0 mb-5 fs-5 rounded-4">
          <div className="wd-title p-3 ps-2 bg-secondary rounded-top-4">
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
            <ul className="wd-lessons list-group rounded-bottom-4">
              {assignments
                .filter((assignment: any) => assignment.course === cid)
                .map((assignment: any) => (
                  <li className="wd-lesson list-group-item p-3 ps-1 d-flex gap-4">
                    <a
                      className="wd-assignment-link d-flex align-items-start"
                      href={`#/Kanbas/Courses/${cid}/Assignments/${assignment._id}/edit`}
                    >
                      <BsGripVertical className="me-2 fs-3 align-self-center" />
                      <MdOutlineAssignment className="fs-1 text text-success align-self-center" />
                    </a>
                    <div>
                      <a
                        className="align-self-start h4 fw-bold mt-3"
                        href={`#/Kanbas/Courses/${cid}/Assignments/${assignment._id}/edit`}
                      >
                        {assignment.title}
                      </a>
                      <p className="mt-3">
                        <span className="text-danger"> Multiple Modules </span>|{" "}
                        <b> Not available until</b> {assignment.availUntil} at
                        12:00 am |<b> Due</b> {assignment.due} at 11:59 pm |{" "}
                        {assignment.points} pts
                      </p>
                    </div>
                    <SpecificAssignmentButtons
                      assignmentId={assignment._id}
                      deleteAssignment={() => handleDeleteClick(assignment)}
                    />
                  </li>
                ))}
            </ul>
          )}
        </li>
      </ul>
      {showDeleteDialog && (
        <DeleteWindow
          assignmentName={selectedAssignment?.title || ""}
          onCancel={() => setShowDeleteDialog(false)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}
