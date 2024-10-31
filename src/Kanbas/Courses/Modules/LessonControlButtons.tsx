import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
export default function LessonControlButtons() {
  return (
    <div className="d-flex float-end align-self-center gap-3">
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4 hoverable-icon" />
    </div>
  );
}
