import { useNavigate, useParams, useLocation } from "react-router";
export default function EditorNavigation() {
  const { cid, qid } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const isQuestionsTab = location.pathname.includes("Questions");

  return (
    <div id="wd-editor-navigation" className="mb-3">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button
            className={`nav-link ${!isQuestionsTab ? "active" : ""}`}
            onClick={() =>
              navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/edit`)
            }
          >
            Details
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${isQuestionsTab ? "active" : ""}`}
            onClick={() =>
              navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}/Questions`)
            }
          >
            Questions
          </button>
        </li>
      </ul>
    </div>
  );
}
