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

export const deleteQuiz = async (cId: string, aId: string) => {
  const { data } = await axios.delete(`${QUIZZES_API}/${cId}/${aId}`);
  return data;
};

export const updateQuiz = async (quiz: any) => {
  const response = await axios.put(
    `${QUIZZES_API}/${quiz.course}/${quiz._id}`,
    quiz
  );
  return response.data;
};

export const createQuizForCourse = async (quiz: any) => {
  const response = await axios.post(
    `${QUIZZES_API}/${quiz.course}/${quiz._id}`,
    quiz
  );
  return response.data;
};
