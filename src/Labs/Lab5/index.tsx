import PathParameters from "./PathParameters";
import QueryParameters from "./QueryParameters";
import WorkingWithObjects from "./WorkingWithObjects";

const REMOTE_SERVER =
  process.env.REACT_APP_REMOTE_SERVER || "http://localhost:4000";
export default function Lab5() {
  return (
    <div>
      <br />
      <h1 className="text-center">Lab 5</h1>
      <a href={`${REMOTE_SERVER}/lab5`}>
        <button className="btn btn-outline-primary w-100">Go to Lab 5</button>
      </a>
      <hr />
      Enrionment Variable: {REMOTE_SERVER}
      <hr />
      <PathParameters />
      <QueryParameters />
      <WorkingWithObjects />
    </div>
  );
}
