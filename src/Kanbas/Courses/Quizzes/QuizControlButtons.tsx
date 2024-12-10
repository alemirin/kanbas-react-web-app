import { FaPlus } from "react-icons/fa6";
import FacultyRoute from "../../Account/FacultyRoute";
import { BsGripVertical } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";

export default function QuizControlButtons() {
  return (
    <div className="d-inline-flex float-end gap-3">
      <FacultyRoute>
        <FaPlus className="fs-4 align-self-center hoverable-icon" />
      </FacultyRoute>
      <IoEllipsisVertical className="fs-4 align-self-center hoverable-icon" />
    </div>
  );
}
