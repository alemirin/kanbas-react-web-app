import { FaPlus } from "react-icons/fa6";
import "./styles.css";
import FacultyRoute from "../../Account/FacultyRoute";
import { BsGripVertical } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";

export default function AssignmentControlButtons() {
  return (
    <div className="d-inline-flex float-end gap-3">
      <div id="pill" className="align-self-center">
        40% of Total
      </div>
      <FacultyRoute>
        <FaPlus className="fs-4 align-self-center hoverable-icon" />
      </FacultyRoute>
      <IoEllipsisVertical className="fs-4 align-self-center hoverable-icon" />
    </div>
  );
}
