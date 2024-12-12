import EditorNavigation from "../EditorNavigation";
import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import * as questionClient from "./client";
import * as quizClient from "../client";

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
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
    if (qid === "undefined") {
      setShowPopup(true);
    }
  }, [qid, location]);

  const addNewQuestion = async () => {
    const newQuestion = {
      title: "",
      questiontype: "MULTIPLECHOICE",
      question: "",
      points: 0,
      choices: [],
    };
    const updatedDraftQuestions = [...draftQuestions, newQuestion];
    setDraftQuestions(updatedDraftQuestions);
    calculateTotalPoints(updatedDraftQuestions);
  };

  const handleQuestionChange = async (index: number, updatedQuestion: any) => {
    const updatedDraftQuestions = [...draftQuestions];
    updatedDraftQuestions[index] = updatedQuestion;
    setDraftQuestions(updatedDraftQuestions);
    calculateTotalPoints(updatedDraftQuestions);
  };

  const handleQuestionDelete = async (index: Number) => {
    const updatedDraftQuestions = draftQuestions.filter(
      (_: any, i: number) => i !== index
    );
    setDraftQuestions(updatedDraftQuestions);
    calculateTotalPoints(updatedDraftQuestions);
  };

  const calculateTotalPoints = (questions: any[]) => {
    const points = questions.reduce((sum, q) => sum + q.points, 0);
    setTotalPoints(points);
  };

  const handleCancel = () => {
    setDraftQuestions(questions);
    navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}`);
  };

  const handleSave = async () => {
    try {
      // Save all draftQuestions to the backend
      for (const question of draftQuestions) {
        if (question._id) {
          // Update existing questions
          await questionClient.updateQuestion(qid!, question);
        } else {
          // Create new questions
          await questionClient.createQuestionForQuiz(qid!, question);
        }
      }

      // Remove deleted questions from the backend
      const deletedQuestions = questions.filter(
        (q: any) => !draftQuestions.find((dq: any) => dq._id === q._id)
      );
      for (const question of deletedQuestions) {
        await questionClient.deleteQuestion(qid!, question._id);
      }

      // Update local state to reflect saved changes
      setQuestions(draftQuestions);
      console.log("Questions successfully saved:", draftQuestions);

      // Navigate back to the quiz details page
      navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}`);
    } catch (error) {
      console.error("Error saving questions:", error);
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
        <div className="list-group list-group-flush">
          {draftQuestions.map((question: any, index: number) => (
            <div key={question._id} className="list-group-item">
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
                    onClick={() =>
                      handleQuestionChange(index, {
                        ...question,
                        title: "Updated Title",
                      })
                    }
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
      <div className="d-flex justify-content-center mt-3">
        <button className="btn btn-md btn-secondary" onClick={addNewQuestion}>
          + New Question
        </button>
      </div>
      <hr />
      {/* Action Buttons */}
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
