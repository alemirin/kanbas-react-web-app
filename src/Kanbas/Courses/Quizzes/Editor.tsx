import { useParams, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { RootState } from "../../store";
import * as quizClient from "./client";
import { addQuiz, updateQuiz, setQuizzes } from "./reducer";

export default function QuizEditor() {
  const { cid, qid } = useParams(); // Get course ID (cid) and assignment ID (aid) from URL
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isNew = !qid;

  const fetchQuizzes = async () => {
    const quizzes = await quizClient.fetchQuizzesForCourse(cid as string);
    dispatch(setQuizzes(quizzes));
  };
  useEffect(() => {
    fetchQuizzes();
  }, []);

  const { quizzes } = useSelector((state: any) => state.quizReducer);
  const existingQuiz = quizzes.find((a: any) => a._id === qid);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState(0);
  const [due, setDue] = useState("");
  const [group, setGroup] = useState("");
  const [availFrom, setAvailFrom] = useState("");
  const [availUntil, setAvailUntil] = useState("");

  const createQuizForCourse = async (quiz: any) => {
    const newQuiz = await quizClient.createQuizForCourse(quiz);
    dispatch(addQuiz(newQuiz));
  };

  const updateQuizFC = async (quiz: any) => {
    await quizClient.updateQuiz(quiz);
    dispatch(updateQuiz(quiz));
  };

  useEffect(() => {
    if (existingQuiz && !isNew) {
      setTitle(existingQuiz.title);
      setDescription(existingQuiz.description);
      setPoints(parseInt(existingQuiz.points));
      setDue(existingQuiz.due);
      setAvailFrom(existingQuiz.availFrom);
      setGroup(existingQuiz.group);
      setAvailUntil(existingQuiz.availUntil);
    }
  }, [existingQuiz, isNew]);

  const handleSave = () => {
    const quiz = {
      _id: isNew ? new Date().getTime().toString() : qid,
      course: cid,
      title,
      description,
      points,
      group,
      due,
      avail: availFrom,
      availUntil,
    };
    if (isNew) {
      createQuizForCourse(quiz);
    } else {
      updateQuizFC(quiz);
    }
    navigate(`/Kanbas/Courses/${cid}/Quizzes`);
  };

  const handleCancel = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes`);
  };

  return (
    <div id="wd-assignments-editor" className="container mt-4">
      <div className="mb-3">
        <label htmlFor="wd-name" className="form-label">
          <h4>Quiz Name</h4>
        </label>
        <input
          id="wd-name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Quiz Title"
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
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
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
            value={points}
            className="form-control"
            type="number"
            onChange={(e) => setPoints(Number(e.target.value))}
            placeholder="Points"
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-auto">
          <label htmlFor="wd-assignment-group" className="form-label">
            Quiz Group
          </label>
        </div>
        <div className="col">
          <select
            id="wd-select-assignment-group"
            className="form-select col"
            value={group}
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
                  value={due}
                  onChange={(e) => setDue(e.target.value)}
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
                  value={availFrom}
                  onChange={(e) => setAvailFrom(e.target.value)}
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
                  value={availUntil}
                  onChange={(e) => setAvailUntil(e.target.value)}
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
        <button
          onClick={handleCancel}
          id="wd-cancel-edit-assignment"
          className="btn btn-secondary me-2"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          id="wd-save-edit-assignment"
          className="btn btn-primary"
        >
          Save
        </button>
      </div>
    </div>
  );
}
