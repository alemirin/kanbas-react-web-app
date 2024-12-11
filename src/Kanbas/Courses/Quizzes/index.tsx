import QuizControls from "./QuizControls";
import QuizControlButtons from "./QuizControlButtons";
import SpecificQuizControlButtons from "./SpecificQuestionControlButtons";
import DeleteWindow from "./DeleteWindow";

import * as quizClient from "./client";

import {
  MdOutlineAssignment,
  MdExpandMore,
  MdExpandLess,
} from "react-icons/md";

import { BsGripVertical } from "react-icons/bs";
import { useParams, useLocation } from "react-router";
import { useState, useEffect } from "react";
import { RootState } from "../../store";

import { useSelector, useDispatch } from "react-redux";
import { setQuizzes, deleteQuiz, editQuiz } from "./reducer";
import FacultyRoute from "../../Account/FacultyRoute";
import StudentRoute from "../../Account/StudentRoute";

export default function Quizzes() {
  const dispatch = useDispatch();
  const { cid } = useParams();

  const { quizzes } = useSelector((state: any) => state.quizReducer);

  const [title, setTitle] = useState("");

  const filterQuizzesByTitle = async (title: string) => {
    setTitle(title);
    if (title) {
      const quizzes = await quizClient.findQuizzesByTitle(title, cid as string);
      dispatch(setQuizzes(quizzes));
    } else {
      fetchQuizzes();
    }
  };

  const fetchQuizzes = async () => {
    const quizzes = await quizClient.fetchQuizzesForCourse(cid as string);
    dispatch(setQuizzes(quizzes));
  };
  useEffect(() => {
    fetchQuizzes();
  }, []);

  const [isExpanded, setIsExpanded] = useState(true);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState<any | null>(null);

  const handleDeleteClick = (quiz: any) => {
    setSelectedQuiz(quiz);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (selectedQuiz) {
      await quizClient.deleteQuiz(selectedQuiz._id);
      dispatch(deleteQuiz(selectedQuiz._id));
    }
    setShowDeleteDialog(false);
    setSelectedQuiz(null);
  };

  return (
    <div id="wd-assignments" className="list-group rounded-0">
      <QuizControls filterQuizzes={filterQuizzesByTitle} />
      <br />
      <br />
      <br />

      <ul id="wd-assignment-list">
        <li className="wd-module list-group-item p-0 mb-5 fs-5 rounded-4">
          <div className="wd-title p-3 ps-2 bg-secondary rounded-top-4">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="btn btn-link"
            >
              {isExpanded ? (
                <MdExpandLess className="fs-4" />
              ) : (
                <MdExpandMore className="fs-4" />
              )}
            </button>
            <BsGripVertical className="me-2 fs-3" />
            <b>Assignment Quizzes</b>
            <QuizControlButtons />
          </div>

          {isExpanded && (
            <ul className="wd-lessons list-group rounded-bottom-4">
              {quizzes.map((quiz: any) => (
                <li className="wd-lesson list-group-item p-3 ps-1 d-flex gap-4">
                  <FacultyRoute>
                    <a
                      className="wd-assignment-link d-flex align-items-start"
                      href={`#/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/edit`}
                    >
                      <BsGripVertical className="me-2 fs-3 align-self-center" />
                      <MdOutlineAssignment className="fs-1 text text-success align-self-center" />
                    </a>
                  </FacultyRoute>
                  <StudentRoute>
                    <div className="wd-student-assignment-title d-flex align-items-start">
                      <BsGripVertical className="me-2 fs-3 align-self-center" />
                      <MdOutlineAssignment className="fs-1 text text-success align-self-center" />
                    </div>
                  </StudentRoute>
                  <div>
                    <FacultyRoute>
                      <a
                        className="align-self-start h4 fw-bold mt-3"
                        href={`#/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/edit`}
                      >
                        {quiz.title}
                      </a>
                    </FacultyRoute>
                    <StudentRoute>
                      <p className="align-self-start h4 fw-bold mt-3">
                        {quiz.title}
                      </p>
                    </StudentRoute>
                    <p className="mt-3">
                      <span className="text-danger"> {quiz.quizStatus} </span>{" "}
                      {quiz.quizStatus === "NOT AVAILABLE" && (
                        <>
                          | <b>until</b> {quiz.availUntil} at 12:00 am
                        </>
                      )}
                      |<b> Due</b> {quiz.due} at 11:59 pm | {quiz.points} pts |{" "}
                      {quiz.numOfQuestions} Questions
                    </p>
                  </div>
                  <FacultyRoute>
                    <SpecificQuizControlButtons
                      quizId={quiz._id}
                      deleteQuiz={() => handleDeleteClick(quiz)}
                    />
                  </FacultyRoute>
                </li>
              ))}
            </ul>
          )}
        </li>
      </ul>
      {showDeleteDialog && (
        <DeleteWindow
          quizName={selectedQuiz?.title || ""}
          onCancel={() => setShowDeleteDialog(false)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}
