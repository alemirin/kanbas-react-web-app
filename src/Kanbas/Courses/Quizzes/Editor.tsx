import { useParams, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { RootState } from "../../store";
import * as quizClient from "./client";
import { addQuiz, updateQuiz, setQuizzes } from "./reducer";
import EditorNavigation from "./EditorNavigation";

export default function QuizEditor() {
  const { cid, qid } = useParams();
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
  const [quizType, setQuizType] = useState("GRADED");
  const [group, setGroup] = useState("QUIZZES");
  const [shuffle, setShuffle] = useState(true);
  const [isTimed, setIsTimed] = useState(true);
  const [time, setTime] = useState(20);
  const [hasMultipleAttempts, setHasMultipleAttempts] = useState(false);
  const [showCorrect, setShowCorrect] = useState(true);
  const [needsCode, setNeedsCode] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [oneAtATime, setOneAtATime] = useState(true);
  const [webcamRequired, setWebcamRequired] = useState(false);
  const [lockQuestions, setLockQuestions] = useState(false);
  const [due, setDue] = useState("");
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
      setPoints(existingQuiz.points);
      setQuizType(existingQuiz.quiztype);
      setGroup(existingQuiz.group);
      setShuffle(existingQuiz.shuffle);
      setIsTimed(existingQuiz.isTimed);
      setTime(existingQuiz.time);
      setHasMultipleAttempts(existingQuiz.hasMultipleAttempts);
      setShowCorrect(existingQuiz.showCorrect);
      setNeedsCode(existingQuiz.needsCode);
      setAccessCode(existingQuiz.accessCode);
      setOneAtATime(existingQuiz.oneAtATime);
      setWebcamRequired(existingQuiz.webcamRequired);
      setLockQuestions(existingQuiz.lockQuestions);
      setDue(existingQuiz.due);
      setAvailFrom(existingQuiz.availFrom);
      setAvailUntil(existingQuiz.availUntil);
    }
  }, [existingQuiz, isNew]);

  const handleSave = (publish: boolean = false) => {
    const quiz = {
      _id: isNew ? new Date().getTime().toString() : qid,
      course: cid,
      title,
      description,
      points,
      quiztype: quizType,
      group,
      shuffle,
      isTimed,
      time,
      hasMultipleAttempts,
      showCorrect,
      needsCode,
      accessCode,
      oneAtATime,
      webcamRequired,
      lockQuestions,
      due,
      availFrom,
      availUntil,
      quizStatus: publish ? "AVAILABLE" : "NOT AVAILABLE",
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
    <div id="wd-quizzes-editor" className="container mt-4">
      <EditorNavigation />
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

      <div className="mb-3">
        <label htmlFor="wd-description" className="form-label">
          Description
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

      <div className="row mb-3">
        <div className="col-auto">
          <label htmlFor="quiz-type" className="form-label">
            Quiz Type
          </label>
        </div>
        <div className="col">
          <select
            id="quiz-type"
            className="form-select"
            value={quizType}
            onChange={(e) => setQuizType(e.target.value)}
          >
            <option value="GRADED">Graded Quiz</option>
            <option value="PRACTICE">Practice Quiz</option>
            <option value="GRADED SURVEY">Graded Survey</option>
            <option value="UNGRADED SURVEY">Ungraded Survey</option>
          </select>
        </div>
      </div>

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
            Assignment Group
          </label>
        </div>
        <div className="col">
          <select
            id="wd-select-assignment-group"
            className="form-select"
            value={group}
            onChange={(e) => setGroup(e.target.value)}
          >
            <option value="QUIZZES">Quizzes</option>
            <option value="EXAMS">Exams</option>
            <option value="ASSIGNMENTS">Assignments</option>
            <option value="PROJECTS">Projects</option>
          </select>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-auto">
          <label className="form-label">Options</label>
        </div>
        <div className="col">
          <div className="border p-3 rounded">
            <div className="form-check mb-2">
              <input
                type="checkbox"
                className="form-check-input"
                id="shuffle-answers"
                checked={shuffle}
                onChange={(e) => setShuffle(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="shuffle-answers">
                Shuffle Answers
              </label>
            </div>

            <div className="form-check mb-2">
              <input
                type="checkbox"
                className="form-check-input"
                id="time-limit"
                checked={isTimed}
                onChange={(e) => setIsTimed(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="time-limit">
                Time Limit
              </label>
              {isTimed && (
                <input
                  type="number"
                  className="form-control mt-2"
                  value={time}
                  onChange={(e) => setTime(parseInt(e.target.value))}
                  placeholder="Minutes"
                />
              )}
            </div>

            <div className="form-check mb-2">
              <input
                type="checkbox"
                className="form-check-input"
                id="multiple-attempts"
                checked={hasMultipleAttempts}
                onChange={(e) => setHasMultipleAttempts(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="multiple-attempts">
                Allow Multiple Attempts
              </label>
            </div>

            <div className="form-check mb-2">
              <input
                type="checkbox"
                className="form-check-input"
                id="show-correct"
                checked={showCorrect}
                onChange={(e) => setShowCorrect(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="show-correct">
                Show Correct Answers
              </label>
            </div>

            <div className="form-check mb-2">
              <input
                type="checkbox"
                className="form-check-input"
                id="needs-code"
                checked={needsCode}
                onChange={(e) => setNeedsCode(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="needs-code">
                Require Access Code
              </label>
              {needsCode && (
                <input
                  type="text"
                  className="form-control mt-2"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  placeholder="Access Code"
                />
              )}
            </div>

            <div className="form-check mb-2">
              <input
                type="checkbox"
                className="form-check-input"
                id="one-at-time"
                checked={oneAtATime}
                onChange={(e) => setOneAtATime(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="one-at-time">
                One Question at a Time
              </label>
            </div>

            <div className="form-check mb-2">
              <input
                type="checkbox"
                className="form-check-input"
                id="webcam"
                checked={webcamRequired}
                onChange={(e) => setWebcamRequired(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="webcam">
                Require Webcam
              </label>
            </div>

            <div className="form-check mb-2">
              <input
                type="checkbox"
                className="form-check-input"
                id="lock-questions"
                checked={lockQuestions}
                onChange={(e) => setLockQuestions(e.target.checked)}
              />
              <label className="form-check-label" htmlFor="lock-questions">
                Lock Questions After Answering
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-auto">
          <label className="form-label">Assign</label>
        </div>
        <div className="col">
          <div className="border p-3 rounded">
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
          onClick={() => handleSave(false)}
          id="wd-save-edit-assignment"
          className="btn btn-danger me-2"
        >
          Save
        </button>
        <button
          onClick={() => handleSave(true)}
          id="wd-save-and-publish"
          className="btn btn-primary"
        >
          Save & Publish
        </button>
      </div>
    </div>
  );
}
