import { FaPlus } from "react-icons/fa6";
import FacultyRoute from "../../Account/FacultyRoute";
import { useNavigate, useParams } from "react-router";

export default function AssignmentControls() {
  const { cid } = useParams();
  const navigate = useNavigate();
  return (
    <div
      id="wd-assignment-controls"
      className="text-nowrap d-flex flex-row-reverse gap-2"
    >
      <FacultyRoute>
        <button
          id="wd-add-assignment-btn"
          className="btn btn-lg btn-danger me-1 float-end"
          onClick={() => navigate(`/Kanbas/Courses/${cid}/Assignments/new`)}
        >
          <FaPlus
            className="position-relative me-2"
            style={{ bottom: "1px" }}
          />
          Assignment
        </button>
      </FacultyRoute>
      <button
        id="wd-group-assignment-btn"
        className="btn btn-lg btn-secondary me-1 float-end"
      >
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Group
      </button>
      <input
        id="wd-search-assignment"
        className="search-input rounded"
        type="search"
        placeholder="&#128270; Search..."
      />
    </div>
  );
}
