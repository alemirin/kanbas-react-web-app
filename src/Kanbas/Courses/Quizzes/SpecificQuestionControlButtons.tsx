import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { IoBanOutline } from "react-icons/io5";

export default function SpecificQuizControlButtons({
  quiz,
  quizId,
  deleteQuiz,
  handlePublishClick,
}: {
  quiz: any;
  quizId: string;
  deleteQuiz: () => void;
  handlePublishClick: () => void;
}) {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const { cid } = useParams();
  return (
    <div className="d-flex float-end align-self-center position-relative ms-4">
      {quiz.isPublished ? <GreenCheckmark /> : <IoBanOutline />}
      {/* Ellipsis Button */}
      <IoEllipsisVertical
        className="fs-4 hoverable-icon"
        onClick={() => setShowMenu((prev) => !prev)}
        style={{ cursor: "pointer" }}
      />

      {/* Context Menu */}
      {showMenu && (
        <div
          className="position-absolute bg-white border shadow p-2 rounded"
          style={{ top: "30px", right: "0px", zIndex: 10 }}
        >
          <button
            className="dropdown-item text-start"
            onClick={() => {
              navigate(`/Kanbas/Courses/${cid}/Quizzes/${quizId}/edit`);
              setShowMenu(false);
            }}
          >
            Edit
          </button>
          <button
            className="dropdown-item text-start text-danger"
            onClick={() => {
              deleteQuiz();
              setShowMenu(false);
            }}
          >
            Delete
          </button>
          <button
            className="dropdown-item text-start text-danger"
            onClick={() => {
              handlePublishClick();
              setShowMenu(false);
            }}
          >
            {quiz.isPublished ? "Unpublish" : "Publish"}
          </button>
        </div>
      )}
    </div>
  );
}
