import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER =
  process.env.REACT_APP_REMOTE_SERVER || "http://localhost:4000";
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;

export const findAllEnrollments = async () => {
  const response = await axiosWithCredentials.get(`${ENROLLMENTS_API}`);
  return response.data;
};

export const findEnrollmentsForUser = async (uId: string) => {
  const response = await axiosWithCredentials.get(
    `${REMOTE_SERVER}/api/${uId}/enrollments`
  );
  return response.data;
};
