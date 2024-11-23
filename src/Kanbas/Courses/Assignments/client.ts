import axios from "axios";
const REMOTE_SERVER =
  process.env.REACT_APP_REMOTE_SERVER || "http://localhost:4000";
const ASSIGNMENTS_API = `${REMOTE_SERVER}/api/assignments`;
export const fetchAssignments = async (cId: string) => {
  const { data } = await axios.get(ASSIGNMENTS_API);
  return data;
};

export const deleteAssignment = async (id: string) => {
  const { data } = await axios.delete(`${ASSIGNMENTS_API}/${id}`);
  return data;
};

export const updateAssignment = async (id: string, assignment: any) => {
  const response = await axios.put(`${ASSIGNMENTS_API}/${id}`, assignment);
  return response.data;
};

export const createAssignmentForCourse = async (
  aId: string,
  cId: string,
  assignment: any
) => {
  const response = await axios.post(
    `${ASSIGNMENTS_API}/${cId}/${aId}`,
    assignment
  );
  return response.data;
};
