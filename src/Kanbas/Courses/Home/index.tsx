import Modules from "../Modules";
import CourseStatus from "./Status";
export default function Home() {
  return (
    <div className="d-flex" id="wd-home">
      <div className="d-flex flex-column flex-grow-1 ms-2">
        <Modules />
      </div>
      <div className="d-none d-md-block ms-2 me-2 d-md-none d-lg-block">
        <CourseStatus />
      </div>
    </div>
  );
}
