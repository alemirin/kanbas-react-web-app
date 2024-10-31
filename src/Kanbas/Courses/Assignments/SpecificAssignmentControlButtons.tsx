import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { FaTrash } from "react-icons/fa";

export default function SpecificAssignmentButtons({
  assignmentId,
  deleteAssignment,
}: {
  assignmentId: string;
  deleteAssignment: () => void;
}) {
  return (
    <div className="d-flex float-end align-self-center gap-3">
      <FaTrash
        className="text-danger me-3 mb-1 hoverable-icon"
        onClick={deleteAssignment}
      />
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4 hoverable-icon" />
    </div>
  );
}
