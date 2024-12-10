import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  quizzes: [],
};
const quizSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },
    addQuiz: (state, { payload: quiz }) => {
      const newQuiz: any = {
        _id: new Date().getTime().toString(),
        title: quiz.title,
        course: quiz.course,
        description: quiz.description,
        availFrom: quiz.availFrom,
        availUntil: quiz.availUntil,
        due: quiz.due,
        points: quiz.points,
        group: quiz.group,
      };
      state.quizzes = [...state.quizzes, newQuiz] as any;
    },
    deleteQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.filter((a: any) => a._id !== quizId);
    },
    updateQuiz: (state, { payload: quiz }) => {
      state.quizzes = state.quizzes.map((a: any) =>
        a._id === quiz._id ? { ...quiz, availUntil: quiz.availUntil } : a
      ) as any;
    },
    editQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.map((a: any) =>
        a._id === quizId ? { ...a, editing: true } : a
      ) as any;
    },
  },
});
export const { setQuizzes, addQuiz, deleteQuiz, updateQuiz, editQuiz } =
  quizSlice.actions;
export default quizSlice.reducer;
