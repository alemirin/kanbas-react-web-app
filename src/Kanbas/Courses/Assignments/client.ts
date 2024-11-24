import axios from "axios";
const REMOTE_SERVER =
  process.env.REACT_APP_REMOTE_SERVER || "http://localhost:4000";
const ASSIGNMENTS_API = `${REMOTE_SERVER}/api/assignments`;
export const fetchAllAssignments = async () => {
  const { data } = await axios.get(ASSIGNMENTS_API);
  return data;
};

export const fetchAssignmentsForCourse = async (cId: string) => {
  const { data } = await axios.get(`${ASSIGNMENTS_API}/${cId}`);
  return data;
};

export const deleteAssignment = async (cId: string, aId: string) => {
  const { data } = await axios.delete(`${ASSIGNMENTS_API}/${cId}/${aId}`);
  return data;
};

export const updateAssignment = async (assignment: any) => {
  const response = await axios.put(
    `${ASSIGNMENTS_API}/${assignment.course}/${assignment._id}`,
    assignment
  );
  return response.data;
};

export const createAssignmentForCourse = async (assignment: any) => {
  const response = await axios.post(
    `${ASSIGNMENTS_API}/${assignment.course}/${assignment._id}`,
    assignment
  );
  return response.data;
};
