import { FaPlus } from "react-icons/fa6";
import "./styles.css";
import { BsGripVertical } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";

export default function AssignmentControlButtons() {
  return (
    <div className="float-end">
      <div className="assignments-oval float-start">40% of Total</div>
      <FaPlus className="fs-4" />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
