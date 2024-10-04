import { Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (7)</h2> <hr />
      <div id="wd-dashboard-courses" className="row">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          <div className="wd-dashboard-courses col" style={{ width: "300px" }}>
            <div className="card rounded-3 overflow-hidden">
              <Link
                className="wd-dashboard-course-link text-decoration-none text-dark"
                to="/Kanbas/Courses/1234/Home"
              >
                <img
                  src="reactjs.jpg"
                  alt="React JS"
                  width="100%"
                  height={160}
                />
                <div className="card-body">
                  <h5 className="wd-dasboard-course title card-title">
                    CS1234 React JS
                  </h5>
                  <p className="wd-dashboard-course-title card-text">
                    Full Stack software developer
                  </p>
                  <button className="btn btn-primary"> Go </button>
                </div>
              </Link>
            </div>
          </div>
          <div className="wd-dashboard-courses col" style={{ width: "300px" }}>
            <div className="card rounded-3 overflow-hidden" />
            <Link
              className="wd-dashboard-course-link text-decoration-none text-dark"
              to="/Kanbas/Courses/1235/Home"
            >
              <img
                src="database.jpg"
                alt="Database"
                width="100%"
                height={160}
              />
              <div className="card-body">
                <h5 className="wd-dasboard-course title card-title">
                  CS1235 Databases
                </h5>
                <p className="wd-dashboard-course-title card-text">
                  Database Management
                </p>
                <button className="btn btn-primary"> Go </button>
              </div>
            </Link>
          </div>
          <div className="wd-dashboard-courses col" style={{ width: "300px" }}>
            <div className="card rounded-3 overflow-hidden" />
            <Link
              className="wd-dashboard-course-link text-decoration-none text-dark"
              to="/Kanbas/Courses/1289/Home"
            >
              <img
                src="backend.jpg"
                alt="Back End Development"
                width="100%"
                height={160}
              />
              <div className="card-body">
                <h5 className="wd-dasboard-course title card-title">
                  CS1289 Back End Development
                </h5>
                <p className="wd-dashboard-course-title card-text">
                  Back End Development
                </p>
                <button className="btn btn-primary"> Go </button>
              </div>
            </Link>
          </div>
          <div className="wd-dashboard-courses col" style={{ width: "300px" }}>
            <div className="card rounded-3 overflow-hidden" />
            <Link
              className="wd-dashboard-course-link text-decoration-none text-dark"
              to="/Kanbas/Courses/4242/Home"
            >
              <img src="iOS.jpg" alt="iOS" width="100%" height={160} />
              <div className="card-body">
                <h5 className="wd-dasboard-course title card-title">
                  CS4242 iOS App Development
                </h5>
                <p className="wd-dashboard-course-title card-text">
                  iOS App Development
                </p>
                <button className="btn btn-primary"> Go </button>
              </div>
            </Link>
          </div>
          <div className="wd-dashboard-courses col" style={{ width: "300px" }}>
            <div className="card rounded-3 overflow-hidden" />
            <Link
              className="wd-dashboard-course-link text-decoration-none text-dark"
              to="/Kanbas/Courses/6122/Home"
            >
              <img
                src="AIethics.jpeg"
                alt="Ethics of AI"
                width="100%"
                height={160}
              />
              <div className="card-body">
                <h5 className="wd-dasboard-course title card-title">
                  CS6122 Ethics of AI{" "}
                </h5>
                <p className="wd-dashboard-course-title card-text">
                  Ethics of AI
                </p>
                <button className="btn btn-primary"> Go </button>
              </div>
            </Link>
          </div>
          <div className="wd-dashboard-courses col" style={{ width: "300px" }}>
            <div className="card rounded-3 overflow-hidden" />
            <Link
              className="wd-dashboard-course-link text-decoration-none text-dark"
              to="/Kanbas/Courses/2222/Home"
            >
              <img
                src="webapp.jpg"
                alt="Web App Development"
                width="100%"
                height={160}
              />
              <div className="card-body">
                <h5 className="wd-dasboard-course title card-title">
                  CS2222 Web App Development
                </h5>
                <p className="wd-dashboard-course-title card-text">
                  Web App Development
                </p>
                <button className="btn btn-primary"> Go </button>
              </div>
            </Link>
          </div>

          <div className="wd-dashboard-courses col" style={{ width: "300px" }}>
            <div className="card rounded-3 overflow-hidden" />
            <Link
              className="wd-dashboard-course-link text-decoration-none text-dark"
              to="/Kanbas/Courses/4466/Home"
            >
              <img
                src="gamedev.jpg"
                alt="Game Development"
                width="100%"
                height={160}
              />
              <div className="card-body">
                <h5 className="wd-dasboard-course title card-title">
                  CS4466 Game Development
                </h5>
                <p className="wd-dashboard-course-title card-text">
                  Game Development
                </p>
                <button className="btn btn-primary"> Go </button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
