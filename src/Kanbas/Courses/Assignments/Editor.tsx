import { useParams } from "react-router";
import { Link } from "react-router-dom"; // Import useParams and Link
import * as db from "../../Database";

export default function AssignmentEditor() {
  const { cid, aid } = useParams(); // Get course ID (cid) and assignment ID (aid) from URL
  const assignments = db.assignments;

  // Find the assignment based on course ID and assignment ID
  const assignment = assignments.find(
    (assignment) => assignment.course === cid && assignment._id === aid
  );

  // Handle case if assignment is not found
  if (!assignment) {
    return <div>Assignment not found</div>;
  }
  return (
    <div id="wd-assignments-editor" className="container mt-4">
      <div className="mb-3">
        <label htmlFor="wd-name" className="form-label">
          <h4>Assignment Name</h4>
        </label>
        <input
          id="wd-name"
          value={assignment.title}
          className="form-control"
          type="text"
        />
      </div>
      <br />
      <br />
      <div className="mb-3">
        <label htmlFor="wd-description" className="form-label">
          {" "}
          Description{" "}
        </label>
        <textarea
          cols={30}
          rows={10}
          id="wd-description"
          className="form-control"
          defaultValue={assignment.description}
        />
      </div>
      <br />
      <br />
      <div className="row mb-3">
        <div className="col-auto">
          <label htmlFor="wd-points" className="form-label">
            Points
          </label>
        </div>
        <div className="col">
          <input
            id="wd-points"
            value={assignment.points}
            className="form-control"
            type="number"
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-auto">
          <label htmlFor="wd-assignment-group" className="form-label">
            Assignment Group
          </label>
        </div>
        <div className="col">
          <select
            id="wd-select-assignment-group"
            className="form-select col"
            defaultValue={assignment.group}
          >
            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
            <option value="QUIZZES">QUIZZES</option>
            <option value="EXAMS">EXAMS</option>
          </select>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-auto">
          <label htmlFor="wd-display-grade" className="form-label">
            Display Grade as
          </label>
        </div>
        <div className="col">
          <select id="wd-select-display-grade" className="form-select">
            <option value="Percentage">Percentage</option>
            <option value="Fraction">Fraction</option>
          </select>
        </div>

        <br />
        <br />

        <div className="row mb-3">
          <div className="col-auto">
            <label htmlFor="wd-submission-type" className="form-label">
              Submission Type
            </label>
          </div>
          <div className="col">
            <select id="wd-select-submission-type" className="form-select">
              <option value="Online">Online</option>
              <option value="In person">In-person</option>
              <option value="Carrier pigeon">Carrier Pigeon</option>
            </select>
          </div>
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-auto">
          <label htmlFor="wd-online-entry-options" className="form-label">
            Online Entry Options
          </label>
        </div>
        <div className="col">
          <div className="form-check">
            <input
              type="checkbox"
              name="text-entry"
              id="wd-text-entry"
              className="form-check-input"
            />
            <label htmlFor="wd-text-entry" className="form-check-label">
              Text Entry
            </label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              name="website-url"
              id="wd-web-url"
              className="form-check-input"
            />
            <label htmlFor="wd-web-url-entry" className="form-check-label">
              Website URL
            </label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              name="media-recordings"
              id="wd-media-recordings"
              className="form-check-input"
            />

            <label htmlFor="wd-media-recordings" className="form-check-label">
              Media Recordings
            </label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              name="student-annotation"
              id="wd-student-annotation"
              className="form-check-input"
            />
            <label htmlFor="wd-student-annotation" className="form-check-label">
              Student Annotation
            </label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              name="file-uploads"
              id="wd-file-uploads"
              className="form-check-input"
            />
            <label htmlFor="wd-file-uploads" className="form-check-label">
              File Uploads
            </label>
          </div>
        </div>
      </div>

      <div className="row mb-3">
        {/* Wrapper for the whole section */}
        <div className="col-auto">
          <label className="form-label">Assign</label>
        </div>
        <div className="col">
          <div className="border p-3 rounded">
            {" "}
            {/* Add a border around the whole form group */}
            {/* First Row - Assign to and Due */}
            <div className="row mb-3">
              <div className="col-md-12">
                <label htmlFor="wd-assign-to" className="form-label">
                  <strong>Assign to</strong>
                </label>
                <input
                  type="text"
                  id="wd-assign-to"
                  className="form-control"
                  placeholder="Everyone"
                />
              </div>
            </div>
            {/* Second Row - Due */}
            <div className="row mb-3">
              <div className="col-md-12">
                <label htmlFor="wd-due" className="form-label">
                  <strong>Due</strong>
                </label>
                <input
                  type="datetime-local"
                  name="select-due-date"
                  id="wd-select-due-date"
                  className="form-control"
                  defaultValue="2024-05-13T23:59"
                />
              </div>
            </div>
            {/* Third Row - Available from and Until */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="wd-available-from" className="form-label">
                  <strong>Available from</strong>
                </label>
                <input
                  type="datetime-local"
                  name="available-from-date"
                  id="wd-select-available-from-date"
                  className="form-control"
                  defaultValue="2024-05-06T00:00"
                />
              </div>
              <div className="col-md-6">
                <label
                  htmlFor="wd-available-until"
                  className="form-label strong"
                >
                  <strong>Until</strong>
                </label>
                <input
                  type="datetime-local"
                  name="available-until-date"
                  id="wd-select-available-until-date"
                  className="form-control"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr />

      <div
        id="wd-edit-assignment-buttons"
        className="d-flex justify-content-end"
      >
        <Link
          to={`/Kanbas/Courses/${cid}/Assignments`}
          id="wd-cancel-edit-assignment"
          className="btn btn-secondary me-2"
        >
          Cancel
        </Link>
        <Link
          to={`/Kanbas/Courses/${cid}/Assignments`}
          id="wd-save-edit-assignment"
          className="btn btn-primary"
        >
          Save
        </Link>
      </div>
    </div>
  );
}
