import axios from "axios";
const REMOTE_SERVER =
  process.env.REACT_APP_REMOTE_SERVER || "http://localhost:4000";
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;

export const findAllEnrollments = async () => {
  const response = await axios.get(`${ENROLLMENTS_API}`);
  return response.data;
};

export const enrollUserInCourse = async (userId: string, courseId: string) => {
  const response = await axios.post(`${ENROLLMENTS_API}/${userId}/${courseId}`);
  return response.data;
};

export const unenrollUserFromCourse = async (
  userId: string,
  courseId: string
) => {
  const response = await axios.delete(
    `${ENROLLMENTS_API}/${userId}/${courseId}`
  );
  return response.data;
};
