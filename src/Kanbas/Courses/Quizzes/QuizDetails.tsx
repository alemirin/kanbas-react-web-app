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
    // Placeholder for preview
    console.log("Preview clicked");
  };

  const handleStart = () => {
    // Placeholder for start quiz
    console.log("Start quiz clicked");
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-center gap-3">
        <button onClick={handlePreview} className="btn btn-secondary">
          Preview
        </button>
        <button onClick={handleEdit} className="btn btn-primary">
          <FaPencil className="me-2" />
          Edit
        </button>
      </div>
      <hr />
      <h2 className="fw-bold text-start mt-3">{quiz.title}</h2>
  
      <FacultyRoute>
        <div className="mt-4">
          <div className="mb-3">
            <strong>Quiz Type:</strong> {quiz.quiztype}
          </div>
          <div className="mb-3">
            <strong>Points:</strong> {quiz.points}
          </div>
          <div className="mb-3">
            <strong>Assignment Group:</strong> {quiz.group}
          </div>
          <div className="mb-3">
            <strong>Shuffle Answers:</strong> {quiz.shuffle ? "Yes" : "No"}
          </div>
          <div className="mb-3">
            <strong>Time Limit:</strong> {quiz.isTimed ? `${quiz.time} Minutes` : "No time limit"}
          </div>
          <div className="mb-3">
            <strong>Multiple Attempts:</strong> {quiz.hasMultipleAttempts ? "Yes" : "No"}
          </div>
          {quiz.hasMultipleAttempts && (
            <div className="mb-3">
              <strong>Number of Attempts:</strong> {quiz.attempts || 1}
            </div>
          )}
          <div className="mb-3">
            <strong>Show Correct Answers:</strong> {quiz.showCorrect ? "Yes" : "No"}
          </div>
          {quiz.needsCode && (
            <div className="mb-3">
              <strong>Access Code Required:</strong> {quiz.accessCode}
            </div>
          )}
          <div className="mb-3">
            <strong>One Question at a Time:</strong> {quiz.oneAtATime ? "Yes" : "No"}
          </div>
          <div className="mb-3">
            <strong>Webcam Required:</strong> {quiz.webcamRequired ? "Yes" : "No"}
          </div>
          <div className="mb-3">
            <strong>Lock Questions:</strong> {quiz.lockQuestions ? "Yes" : "No"}
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
              <th>For</th>
              <th>Available From</th>
              <th>Available Until</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{quiz.due || "No due date"}</td>
              <td>Everyone</td>
              <td>{quiz.availFrom || "No date set"}</td>
              <td>{quiz.availUntil || "No date set"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}  