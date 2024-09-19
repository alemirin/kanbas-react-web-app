import { Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link
            className="wd-dashboard-course-link"
            to="/Kanbas/Courses/1234/Home"
          >
            <img src="reactjs.jpg" alt="React JS" width={200} />
            <div>
              <h5>CS1234 React JS</h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link
            className="wd-dashboard-course-link"
            to="/Kanbas/Courses/1235/Home"
          >
            <img src="database.jpg" alt="Database" width={200} />
            <div>
              <h5>CS1235 Databases</h5>
              <p className="wd-dashboard-course-title">Database Management</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link
            className="wd-dashboard-course-link"
            to="/Kanbas/Courses/1289/Home"
          >
            <img src="backend.jpg" alt="Back End Development" width={200} />
            <div>
              <h5>CS1289 Back End Development</h5>
              <p className="wd-dashboard-course-title">Back End Development</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link
            className="wd-dashboard-course-link"
            to="/Kanbas/Courses/4242/Home"
          >
            <img src="iOS.jpg" alt="iOS" width={200} />
            <div>
              <h5>CS4242 iOS App Development</h5>
              <p className="wd-dashboard-course-title">iOS App Development</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link
            className="wd-dashboard-course-link"
            to="/Kanbas/Courses/6122/Home"
          >
            <img src="AIethics.jpeg" alt="Ethics of AI" width={200} />
            <div>
              <h5>CS6122 Ethics of AI </h5>
              <p className="wd-dashboard-course-title">Ethics of AI</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link
            className="wd-dashboard-course-link"
            to="/Kanbas/Courses/2222/Home"
          >
            <img src="webapp.jpg" alt="Web App Development" width={200} />
            <div>
              <h5>CS2222 Web App Development</h5>
              <p className="wd-dashboard-course-title">Web App Development</p>
              <button> Go </button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link
            className="wd-dashboard-course-link"
            to="/Kanbas/Courses/4466/Home"
          >
            <img src="gamedev.jpg" alt="Game Development" width={200} />
            <div>
              <h5>CS4466 Game Development</h5>
              <p className="wd-dashboard-course-title">Game Development</p>
              <button> Go </button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
