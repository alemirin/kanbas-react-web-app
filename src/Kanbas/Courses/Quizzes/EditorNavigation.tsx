import { Link } from "react-router-dom";
import {
  useNavigate,
  Route,
  Routes,
  useParams,
  useLocation,
} from "react-router";
export default function EditorNavigation({
  cid,
  qid,
}: {
  cid: string;
  qid: string;
}) {
  const links = ["Details", "Questions"];
  const { pathname } = useLocation();
  const navigate = useNavigate();
  return (
    <div id="wd-editor-navigation" className="mb-3">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button
            className="nav-link active"
            onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}`)}
          >
            Details
          </button>
        </li>
        <li className="nav-item">
          <button
            className="nav-link"
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
