export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">
        <h4>Assignment Name</h4>
      </label>
      <input id="wd-name" value="A1 - ENV + HTML" />
      <br />
      <br />
      <textarea id="wd-description">
        The assignment is available online Submit a link to the landing page of
        your Web application running on Netlify. The landing page should include
        the following: Your full name and section Links to each of the lab
        assignments, Link to the Kanbas application, Link to all relevant source
        code repositories. The Kanbas application should include a link to
        navigate back to the landing page.
      </textarea>
      <br />
      <br />
      <table>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" value={100} />
          </td>
        </tr>
        <br />
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-assignment-group">Assignment Group</label>
          </td>
          <td>
            <select id="wd-select-assignment-group">
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
              <option value="QUIZZES">QUIZZES</option>
              <option value="EXAMS">EXAMS</option>
            </select>
          </td>
        </tr>
        <br />
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-display-grade">Display Grade as</label>
          </td>
          <td>
            <select id="wd-select-display-grade">
              <option value="Percentage">Percentage</option>
              <option value="Fraction">Fraction</option>
            </select>
          </td>
        </tr>
        <br />
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-submission-type">Submission Type</label>
          </td>
          <td>
            <select id="wd-select-submission-type">
              <option value="Online">Online</option>
              <option value="In person">In-person</option>
              <option value="Carrier pigeon">Carrier Pigeon</option>
            </select>
            <br />
            <br />
            <label htmlFor="wd-online-entry-options">
              Online Entry Options
            </label>
            <br />
            <input type="checkbox" name="text-entry" id="wd-text-entry"></input>
            <label htmlFor="wd-text-entry">Text Entry</label>
            <br />
            <input
              type="checkbox"
              name="website-url"
              id="wd-website-url"
            ></input>
            <label htmlFor="wd-website-url">Website URL</label>
            <br />
            <input
              type="checkbox"
              name="media-recordings"
              id="wd-media-recordings"
            ></input>
            <label htmlFor="wd-media-recordings">Media Recordings</label>
            <br />
            <input
              type="checkbox"
              name="student-annotation"
              id="wd-student-annotation"
            ></input>
            <label htmlFor="wd-student-annotation">Student Annotation</label>
            <br />
            <input
              type="checkbox"
              name="file-uploads"
              id="wd-file-uploads"
            ></input>
            <label htmlFor="wd-file-uploads">File Uploads</label>
          </td>
        </tr>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-assign">Assign</label>
          </td>
          <td>
            <td align="right" valign="top">
              <label htmlFor="wd-assign-to">Assign to</label>
            </td>
            <select id="wd-select-assign-to">
              <option value="everyone">Everyone</option>
              <option value="select-student">Select Student</option>
            </select>
            <br />
            <br />
            <label htmlFor="wd-due">Due</label>
            <br />
            <input
              type="date"
              name="select-due-date"
              id="wd-select-due-date"
            ></input>
            <br />
            <br />
            <td align="left" valign="top">
              <label htmlFor="wd-available-from">Available from</label>
              <br />
              <input
                type="date"
                name="available-from-date"
                id="wd-select-available-from-date"
              ></input>
            </td>
            <td>
              <label htmlFor="wd-available-until">Until</label>
              <br />
              <input
                type="date"
                name="available-until-date"
                id="wd-select-available-until-date"
              ></input>
            </td>
          </td>
        </tr>
      </table>
      <hr></hr>
      <div id="wd-edit-assignment-buttons">
        <button id="wd-cancel-edit-assignment">Cancel</button>
        <button id="wd-save-edit-assignment">Save</button>
      </div>
    </div>
  );
}
