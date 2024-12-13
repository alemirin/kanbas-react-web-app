import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import FacultyRoute from "../../Account/FacultyRoute";
import StudentRoute from "../../Account/StudentRoute";
import { FaPencil } from "react-icons/fa6";
import { FaCheck, FaTimes } from "react-icons/fa";
import * as client from "./client";
import * as answersClient from "./Answers/client";

export default function QuizDetails() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState<any>(null);
  const [previousAttempt, setPreviousAttempt] = useState<any>(null);
  const [attemptCount, setAttemptCount] = useState(0);
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const fetchQuiz = async () => {
    try {
      const quizzes = await client.fetchQuizzesForCourse(cid as string);
      const foundQuiz = quizzes.find((q: any) => q._id === qid);
      setQuiz(foundQuiz);
    } catch (error) {
      console.error("Error fetching quiz:", error);
    }
  };

  const fetchAttempts = async () => {
    try {
      if (currentUser && qid) {
        const attempt = await answersClient.fetchAnswersByUser(qid, currentUser._id);
        const count = await answersClient.countAnswersByUser(qid, currentUser._id);
        setPreviousAttempt(attempt);
        setAttemptCount(count);
      }
    } catch (error) {
      console.error("Error fetching attempts:", error);
    }
  };

  useEffect(() => {
    fetchQuiz();
    fetchAttempts();
  }, [qid, currentUser]);

  const canAttemptQuiz = () => {
    if (!quiz) return false;
    if (!quiz.hasMultipleAttempts && attemptCount > 0) return false;
    if (quiz.hasMultipleAttempts && attemptCount >= quiz.attempts) return false;
    return true;
  };

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
        {canAttemptQuiz() && (
          <div className="d-flex justify-content-center mt-4">
            <button onClick={handleStart} className="btn btn-primary">
              Start Quiz
            </button>
          </div>
        )}
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

      <StudentRoute>
        {previousAttempt && (
          <div className="mt-4">
            <h3>Previous Attempt Results</h3>
            <div className="card">
              <div className="card-body">
                <h4>Score: {previousAttempt.score.toFixed(1)}%</h4>
                <p>Submitted: {new Date(previousAttempt.submittedAt).toLocaleString()}</p>
                <p>Attempt {previousAttempt.attemptNumber} of {quiz.hasMultipleAttempts ? quiz.attempts : 1}</p>
                
                <div className="mt-4">
                  <h5>Your Answers:</h5>
                  {previousAttempt.answers.map((answer: any, index: number) => (
                    <div key={index} 
                         className={`p-3 mb-3 rounded ${
                           answer.isCorrect ? 'bg-success-subtle' : 'bg-danger-subtle'
                         }`}>
                      <div className="d-flex align-items-center mb-2">
                        {answer.isCorrect ? (
                          <FaCheck className="text-success me-2" />
                        ) : (
                          <FaTimes className="text-danger me-2" />
                        )}
                        <strong>Question {index + 1}:</strong>
                      </div>
                      <p className="mb-1">{answer.question}</p>
                      <p className="mb-0">
                        <strong>Your answer:</strong> {answer.providedAnswer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </StudentRoute>
    </div>
  );
}