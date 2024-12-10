import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/reducer";
import accountReducer from "./Account/reducer";
import assignmentReducer from "./Courses/Assignments/reducer";
import enrollmentsReducer from "./Enrollments/reducer";
import quizReducer from "./Courses/Quizzes/reducer";
const store = configureStore({
  reducer: {
    modulesReducer,
    accountReducer,
    assignmentReducer,
    enrollmentsReducer,
    quizReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
