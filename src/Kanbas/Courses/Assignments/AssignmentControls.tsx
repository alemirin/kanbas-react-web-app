import { FaPlus } from "react-icons/fa6";
export default function AssignmentControls() {
  return (
    <div
      id="wd-assignment-controls"
      className="text-nowrap d-flex flex-row-reverse gap-2"
    >
      <button
        id="wd-add-assignment-btn"
        className="btn btn-lg btn-danger me-1 float-end"
      >
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Assignment
      </button>
      <button
        id="wd-add-assignment-btn"
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
