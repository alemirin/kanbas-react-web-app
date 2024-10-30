import React, { useState } from "react";
import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import { useParams } from "react-router";
import * as db from "../../Database";

export default function Modules() {
  const { cid } = useParams();
  const [modules, setModules] = useState<any[]>(db.modules);
  const [moduleName, setModuleName] = useState("");
  const addModule = () => {
    setModules([
      ...modules,
      {
        _id: new Date().getTime().toString(),
        name: moduleName,
        course: cid,
        lessons: [],
      },
    ]);
    setModuleName("");
  };

  return (
    <div className="rounded-3">
      <ul id="wd-modules" className="list-group-item">
        {modules
          .filter((module: any) => module.course === cid)
          .map((module: any) => (
            <li className="wd-module list-group p-0 mb-5 fs-5 rounded-3">
              <div className="wd-title p-3 ps-2 bg-secondary d-flex rounded-3">
                <BsGripVertical className="me-2 fs-3 mr-auto" />
                <div className="flex-grow-1">{module.name}</div>
                <ModulesControls
                  setModuleName={setModuleName}
                  moduleName={moduleName}
                  addModule={addModule}
                />
              </div>
              {module.lessons && (
                <ul className="wd-lessons list-group">
                  {module.lessons.map((lesson: any) => (
                    <li className="wd-lesson list-group-item p-3 ps-1">
                      <BsGripVertical className="me-2 fs-3" />
                      {lesson.name} <LessonControlButtons />
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
      </ul>
    </div>
  );
}
