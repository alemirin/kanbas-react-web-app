import axios from "axios";
const REMOTE_SERVER =
  process.env.REACT_APP_REMOTE_SERVER || "http://localhost:4000";
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;

export const fetchQuestionsForQuiz = async (quizId: string) => {
  const { data } = await axios.get(`${QUIZZES_API}/${quizId}/questions`);
  return data;
};

export const createQuestionForQuiz = async (quizId: string, question: any) => {
  const response = await axios.post(
    `${QUIZZES_API}/${quizId}/questions`,
    question
  );
  return response.data;
};

export const deleteQuestion = async (qId: string, questionId: string) => {
  const { data } = await axios.delete(
    `${QUIZZES_API}/${qId}/questions/${questionId}`
  );
  return data;
};

export const updateQuestion = async (quizId: string, question: any) => {
  const response = await axios.put(
    `${QUIZZES_API}/${quizId}/questions/${question._id}`,
    question
  );
  return response.data;
};
