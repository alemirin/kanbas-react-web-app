import { FaPlus } from "react-icons/fa6";
import FacultyRoute from "../../Account/FacultyRoute";
import { useNavigate, useParams } from "react-router";
import { IoEllipsisVertical } from "react-icons/io5";

export default function QuizControls({
  filterQuizzes,
}: {
  filterQuizzes: (title: string) => void;
}) {
  const { cid } = useParams();
  const navigate = useNavigate();
  return (
    <div
      id="wd-assignment-controls"
      className="d-flex align-items-center flex-row-reverse justify-content-between"
    >
      <div className="text-nowrap d-flex flex-row-reverse">
        <FacultyRoute>
          <button
            id="wd-quiz-controls-btn"
            className="btn btn-lg me-1 float-end"
            style={{
              border: "1px solid black",
              backgroundColor: "#ccc",
            }}
          >
            <IoEllipsisVertical className="fs-4 hoverable-icon" />
          </button>
          <button
            id="wd-add-assignment-btn"
            className="btn btn-lg btn-danger me-1 float-end"
            onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/new`)}
          >
            <FaPlus
              className="position-relative me-2"
              style={{ bottom: "1px" }}
            />
            Quiz
          </button>
        </FacultyRoute>
      </div>
      <input
        id="wd-search-assignment"
        className="search-input form-control w-25 rounded ms-5 mt-2"
        type="search"
        placeholder="&#128270; Search..."
        onChange={(e) => filterQuizzes(e.target.value)}
      />
    </div>
  );
}
