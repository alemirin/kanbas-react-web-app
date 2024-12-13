import axios from "axios";

const REMOTE_SERVER =
  process.env.REACT_APP_REMOTE_SERVER || "http://localhost:4000";

export const createQuizAnswer = async (quizId: string, quizAnswer: any) => {
  const response = await axios.post(
    `${REMOTE_SERVER}/api/quizzes/${quizId}/answers`,
    quizAnswer
  );
  return response.data;
};

export const fetchAnswersByQuiz = async (quizId: string) => {
  const { data } = await axios.get(
    `${REMOTE_SERVER}/api/quizzes/${quizId}/answers`
  );
  return data;
};

export const fetchAnswersByUser = async (quizId: string, userId: string) => {
  const { data } = await axios.get(
    `${REMOTE_SERVER}/api/quizzes/${quizId}/answers/${userId}`
  );
  return data;
};

export const countAnswersByUser = async (quizId: string, userId: string) => {
  const { data } = await axios.get(
    `${REMOTE_SERVER}/api/quizzes/${quizId}/answers/${userId}/count`
  );
  return data.count;
};

export const deleteQuizAnswer = async (answerId: string) => {
  const { data } = await axios.delete(
    `${REMOTE_SERVER}/api/answers/${answerId}`
  );
  return data;
};
