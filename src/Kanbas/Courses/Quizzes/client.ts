import axios from "axios";
const REMOTE_SERVER =
  process.env.REACT_APP_REMOTE_SERVER || "http://localhost:4000";
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;
export const fetchAllQuizzes = async () => {
  const { data } = await axios.get(QUIZZES_API);
  return data;
};

export const fetchQuizzesForCourse = async (cId: string) => {
  const { data } = await axios.get(`${QUIZZES_API}/${cId}`);
  return data;
};

export const createQuizForCourse = async (quiz: any) => {
  const response = await axios.post(`${QUIZZES_API}`, quiz);
  return response.data;
};

export const deleteQuiz = async (qId: string) => {
  const { data } = await axios.delete(`${QUIZZES_API}/${qId}`);
  return data;
};

export const updateQuiz = async (quiz: any) => {
  const response = await axios.put(`${QUIZZES_API}/${quiz._id}`, quiz);
  return response.data;
};

export const findQuizzesByTitle = async (title: string, cId: string) => {
  const response = await axios.get(`${QUIZZES_API}/${cId}?title=${title}`);
  return response.data;
};
