
import React, { useState, useEffect } from 'react';
import EditorNavigation from "../EditorNavigation";
import { useParams, useNavigate } from "react-router";

import { useLocation } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import * as questionClient from "./client";
import * as quizClient from "../client";


import MultipleChoiceEditor from "./MultipleChoiceEditor";
import TrueFalseEditor from "./TrueFalseEditor";
import FillInTheBlankEditor from "./FillInTheBlankEditor";

export default function QuestionEditor() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [quizId, setQuizId] = useState(qid);
  const [showPopup, setShowPopup] = useState(false);

  const [questions, setQuestions] = useState<any[]>([]);
  const [draftQuestions, setDraftQuestions] = useState<any[]>([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [selectedQuestionType, setSelectedQuestionType] = useState<string>("MULTIPLECHOICE");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await questionClient.fetchQuestionsForQuiz(qid!);

export default function QuestionEditor() {
  const { cid, qid } = useParams();
  const [questions, setQuestions] = useState<any>([]);
  const [draftQuestions, setDraftQuestions] = useState<any>([]);
  const [totalPoints, setTotalPoints] = useState(0);
  const navigate = useNavigate();
  const [quizId, setQuizId] = useState(qid);
  const [showPopup, setShowPopup] = useState(false);
  const location = useLocation();

  // Fetch questions for the quiz on component mount
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await questionClient.fetchQuestionsForQuiz(qid! as string);
        setQuestions(data);
        setDraftQuestions(data);
        calculateTotalPoints(data);
      } catch (error) {
        console.error(error);
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
    if (qid === "undefined") {
      setShowPopup(true);
    }
  }, [qid, location]);


  const calculateTotalPoints = (qs: any[]) => {
    const points = qs.reduce((sum, q) => sum + (q.points || 0), 0);
    setTotalPoints(points);
  };

  const addNewQuestion = () => {
    const newQuestion = {
      title: "",
      questiontype: "MULTIPLECHOICE",
      question: "",
      points: 0,
      choices: [],
      possibleAnswers: []
    };
    const updatedDraftQuestions = [...draftQuestions, newQuestion];
    setDraftQuestions(updatedDraftQuestions);
    calculateTotalPoints(updatedDraftQuestions);
    setEditingIndex(updatedDraftQuestions.length - 1);
    setSelectedQuestionType("MULTIPLECHOICE");
  };
          
  const handleQuestionChange = async (index: number, updatedQuestion: any) => {
    const updatedDraftQuestions = [...draftQuestions];
    updatedDraftQuestions[index] = updatedQuestion;
    setDraftQuestions(updatedDraftQuestions);
    calculateTotalPoints(updatedDraftQuestions);
  };


  const handleQuestionDelete = (index: number) => {
    const updatedDraftQuestions = draftQuestions.filter((_, i) => i !== index);
    setDraftQuestions(updatedDraftQuestions);
    calculateTotalPoints(updatedDraftQuestions);
    if (editingIndex === index) {
      setEditingIndex(null);
    }
  };

  const handleEditorSave = (updatedQuestion: any) => {
    if (editingIndex !== null) {
      handleQuestionChange(editingIndex, updatedQuestion);
      setEditingIndex(null);
    }
  };

  const handleEditorCancel = () => {
    setEditingIndex(null);
  };

  const handleCancel = () => {
    setDraftQuestions(questions);
    setEditingIndex(null);

  };

  const handleSave = async () => {
    try {
      for (const question of draftQuestions) {
        if (question._id) {
          await questionClient.updateQuestion(qid!, question);
        } else {
          await questionClient.createQuestionForQuiz(qid!, question);
        }
      }
      const deletedQuestions = questions.filter(
        (q: any) => !draftQuestions.find((dq: any) => dq._id === q._id)
      );
      for (const question of deletedQuestions) {
        await questionClient.deleteQuestion(qid!, question._id);
      }
      setQuestions(draftQuestions);
      setEditingIndex(null);
      navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}`);
    } catch (error) {
      console.error(error);

    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div id="wd-questions-editor" className="container mt-4">
      {showPopup && (
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-center">
              <p>
                Please navigate to the details screen and create the quiz before
                creating questions!
              </p>
            </div>
            <div className="d-flex justify-content-center">
              <button className="btn btn-secondary" onClick={handleClosePopup}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="d-flex justify-content-end">
        <h4>Total Points: {totalPoints}</h4>
      </div>
      <EditorNavigation />
      <div className="d-flex justify-content-center">

        <div className="list-group list-group-flush w-100">
          {draftQuestions.map((question: any, index: number) => (
            <div key={question._id || index} className="list-group-item">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5>{question.title || `Question ${index + 1}`}</h5>
                  <p>
                    Type:
                    {question.questiontype.charAt(0).toUpperCase() +
                      question.questiontype.slice(1).toLowerCase()}
                  </p>
                  <p>Points: {question.points}</p>
                </div>
                <div>
                  <button
                    className="btn btn-sm btn-secondary me-2 ms-5"
                    onClick={() => {
                      setEditingIndex(index);
                      setSelectedQuestionType(question.questiontype || "MULTIPLECHOICE");
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleQuestionDelete(index)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {editingIndex !== null && (
        <div className="my-4">
          <div className="mb-3">
            <label className="form-label">Question Type</label>
            <select
              className="form-select w-50"
              value={draftQuestions[editingIndex].questiontype}
              onChange={(e) => {
                const updatedQuestion = { ...draftQuestions[editingIndex], questiontype: e.target.value };
                handleQuestionChange(editingIndex, updatedQuestion);
                setSelectedQuestionType(e.target.value);
              }}
            >
              <option value="MULTIPLECHOICE">Multiple Choice</option>
              <option value="TRUEORFALSE">True/False</option>
              <option value="FILLINTHEBLANK">Fill in the Blank</option>
            </select>
          </div>

          {selectedQuestionType === "MULTIPLECHOICE" && (
            <MultipleChoiceEditor
              initialQuestion={draftQuestions[editingIndex]}
              onSave={handleEditorSave}
              onCancel={handleEditorCancel}
            />
          )}
          {selectedQuestionType === "TRUEORFALSE" && (
            <TrueFalseEditor
              initialQuestion={draftQuestions[editingIndex]}
              onSave={handleEditorSave}
              onCancel={handleEditorCancel}
            />
          )}
          {selectedQuestionType === "FILLINTHEBLANK" && (
            <FillInTheBlankEditor
              initialQuestion={draftQuestions[editingIndex]}
              onSave={handleEditorSave}
              onCancel={handleEditorCancel}
            />
          )}
        </div>
      )}

      <div className="d-flex justify-content-center mt-3">
        <button className="btn btn-md btn-secondary" onClick={addNewQuestion}>
          + New Question
        </button>
      </div>
      <hr />
      <div className="d-flex justify-content-center mt-4">
        <button className="btn btn-secondary me-2" onClick={handleCancel}>
          Cancel
        </button>
        <button
          className="btn btn-danger"
          onClick={() => {
            handleSave();
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}
