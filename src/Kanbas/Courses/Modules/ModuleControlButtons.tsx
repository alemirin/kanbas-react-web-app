import { FaTrash } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaPencil } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";
import { BsPlus } from "react-icons/bs";

export default function ModuleControlButtons({
  moduleId,
  deleteModule,
  editModule,
}: {
  moduleId: string;
  deleteModule: (moduleId: string) => void;
  editModule: (moduleId: string) => void;
}) {
  return (
    <div className="ms-auto">
      <FaPencil
        onClick={() => editModule(moduleId)}
        className="text-primary me-3 hoverable-icon"
      />
      <FaTrash
        className="text-danger me-3 mb-1 hoverable-icon"
        onClick={() => deleteModule(moduleId)}
      />
      <GreenCheckmark />
      <BsPlus className="fs-1 hoverable-icon" />
      <IoEllipsisVertical className="fs-4 hoverable-icon" />
    </div>
  );
}
