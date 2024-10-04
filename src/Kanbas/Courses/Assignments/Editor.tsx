export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor" className="container mt-4">
      <div className="mb-3"></div>
      <label htmlFor="wd-name" className="form-label">
        <h4>Assignment Name</h4>
      </label>
      <input
        id="wd-name"
        value="A1 - ENV + HTML"
        className="form-control"
        type="text"
      />
      <div />
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
        >
          The assignment is available online Submit a link to the landing page
          of your Web application running on Netlify. The landing page should
          include the following: Your full name and section Links to each of the
          lab assignments, Link to the Kanbas application, Link to all relevant
          source code repositories. The Kanbas application should include a link
          to navigate back to the landing page.
        </textarea>
        <div />
        <br />
        <br />
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="wd-points" className="form-label">
              Points
            </label>
            <input
              id="wd-points"
              value={100}
              className="form-control"
              type="number"
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="wd-assignment-group" className="form-label">
              Assignment Group
            </label>
            <select id="wd-select-assignment-group" className="form-select">
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
              <option value="QUIZZES">QUIZZES</option>
              <option value="EXAMS">EXAMS</option>
            </select>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="wd-display-grade" className="form-label">
              Display Grade as
            </label>
            <select id="wd-select-display-grade" className="form-select">
              <option value="Percentage">Percentage</option>
              <option value="Fraction">Fraction</option>
            </select>
          </div>
          <div className="col-md-6">
            <label htmlFor="wd-submission-type" className="form-label">
              Submission Type
            </label>
            <select id="wd-select-submission-type" className="form-select">
              <option value="Online">Online</option>
              <option value="In person">In-person</option>
              <option value="Carrier pigeon">Carrier Pigeon</option>
            </select>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="wd-online-entry-options" className="form-label">
            Online Entry Options
          </label>
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

        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="wd-assign-to" className="form-label">
              Assign to
            </label>
            <select id="wd-select-assign-to" className="form-select">
              <option value="everyone">Everyone</option>
              <option value="select-student">Select Student</option>
            </select>
          </div>
          <div className="col-md-6">
            <label htmlFor="wd-due" className="form-label">
              Due
            </label>
            <input
              type="date"
              name="select-due-date"
              id="wd-select-due-date"
              className="form-control"
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="wd-available-from" className="form-label">
              Available from
            </label>
            <input
              type="date"
              name="available-from-date"
              id="wd-select-available-from-date"
              className="form-control"
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="wd-available-until" className="form-label">
              Until
            </label>
            <input
              type="date"
              name="available-until-date"
              id="wd-select-available-until-date"
              className="form-control"
            />
          </div>
        </div>

        <hr />

        <div
          id="wd-edit-assignment-buttons"
          className="d-flex justify-content-end"
        >
          <button
            id="wd-cancel-edit-assignment"
            className="btn btn-secondary me-2"
          >
            Cancel
          </button>
          <button id="wd-save-edit-assignment" className="btn btn-primary">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
