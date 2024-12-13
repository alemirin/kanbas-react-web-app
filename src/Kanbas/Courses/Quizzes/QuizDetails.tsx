import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import FacultyRoute from "../../Account/FacultyRoute";
import StudentRoute from "../../Account/StudentRoute";
import { FaPencil } from "react-icons/fa6";
import * as client from "./client";

export default function QuizDetails() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<any>(null);

  const fetchQuiz = async () => {
    try {
      const quizzes = await client.fetchQuizzesForCourse(cid as string);
      const foundQuiz = quizzes.find((q: any) => q._id === qid);
      setQuiz(foundQuiz);
    } catch (error) {
      console.error("Error fetching quiz:", error);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, [qid]);

  if (!quiz) return null;

  const handleEdit = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/edit`);
  };

  const handlePreview = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/preview`);
  };

  const handleStart = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/preview`);
  };

  return (
    <div className="container mt-4">
      <FacultyRoute>
        <div className="d-flex justify-content-center gap-3">
          <button onClick={handlePreview} className="btn btn-secondary">
            Preview
          </button>
          <button onClick={handleEdit} className="btn btn-primary">
            <FaPencil className="me-2" />
            Edit
          </button>
        </div>
      </FacultyRoute>
      <hr />
      <h2 className="fw-bold text-start mt-3">{quiz.title}</h2>

      <FacultyRoute>
        <div className="row mt-4">
          <div className="col-md-8">
            <dl className="row">
              <dt className="col-sm-4 text-end">Quiz Type:</dt>
              <dd className="col-sm-8">
                {quiz.quiztype.charAt(0).toUpperCase() +
                  quiz.quiztype.slice(1).toLowerCase()}
              </dd>

              <dt className="col-sm-4 text-end">Points:</dt>
              <dd className="col-sm-8">{quiz.points}</dd>

              <dt className="col-sm-4 text-end">Assignment Group:</dt>
              <dd className="col-sm-8">
                {quiz.group.charAt(0).toUpperCase() +
                  quiz.group.slice(1).toLowerCase()}
              </dd>

              <dt className="col-sm-4 text-end">Shuffle Answers:</dt>
              <dd className="col-sm-8">{quiz.shuffle ? "Yes" : "No"}</dd>

              <dt className="col-sm-4 text-end">Time Limit:</dt>
              <dd className="col-sm-8">
                {quiz.isTimed ? `${quiz.time} Minutes` : "No time limit"}
              </dd>

              <dt className="col-sm-4 text-end">Multiple Attempts:</dt>
              <dd className="col-sm-8">
                {quiz.hasMultipleAttempts ? "Yes" : "No"}
              </dd>

              {quiz.hasMultipleAttempts && (
                <>
                  <dt className="col-sm-4 text-end">Number of Attempts:</dt>
                  <dd className="col-sm-8">{quiz.attempts || 1}</dd>
                </>
              )}

              <dt className="col-sm-4 text-end">Show Correct Answers:</dt>
              <dd className="col-sm-8">{quiz.showCorrect ? "Yes" : "No"}</dd>

              {quiz.needsCode && (
                <>
                  <dt className="col-sm-4 text-end">Access Code Required:</dt>
                  <dd className="col-sm-8">{quiz.accessCode}</dd>
                </>
              )}

              <dt className="col-sm-4 text-end">One Question at a Time:</dt>
              <dd className="col-sm-8">{quiz.oneAtATime ? "Yes" : "No"}</dd>

              <dt className="col-sm-4 text-end">Webcam Required:</dt>
              <dd className="col-sm-8">{quiz.webcamRequired ? "Yes" : "No"}</dd>

              <dt className="col-sm-4 text-end">Lock Questions:</dt>
              <dd className="col-sm-8">{quiz.lockQuestions ? "Yes" : "No"}</dd>
            </dl>
          </div>
        </div>
      </FacultyRoute>

      <StudentRoute>
        <div className="d-flex justify-content-center mt-4">
          <button onClick={handleStart} className="btn btn-primary">
            Start Quiz
          </button>
        </div>
      </StudentRoute>

      <div className="table-responsive mt-4">
        <table className="table">
          <thead>
            <tr>
              <th>Due</th>
              <th>Available From</th>
              <th>Available Until</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{quiz.due || "No due date"}</td>
              <td>{quiz.availFrom || "No date set"}</td>
              <td>{quiz.availUntil || "No date set"}</td>
              <td>{quiz.points}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}