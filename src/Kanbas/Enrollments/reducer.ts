import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Enrollment {
  _id: string;
  user: string;
  course: string;
}

interface EnrollmentState {
  enrollments: Enrollment[];
  showAllCourses: boolean;
}

const initialState = {
  enrollments: JSON.parse(localStorage.getItem("enrollments") || "{}"), // Stores course enrollment status
  showAllCourses: false, // Determines whether to display all courses or only enrolled courses
};

const enrollmentSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    enroll: (state, { payload: courseId }: PayloadAction<string>) => {
      // Add course to enrollments and persist to localStorage
      state.enrollments[courseId] = true;
      localStorage.setItem("enrollments", JSON.stringify(state.enrollments));
    },
    unenroll: (state, { payload: courseId }: PayloadAction<string>) => {
      // Remove course from enrollments and persist to localStorage
      delete state.enrollments[courseId];
      localStorage.setItem("enrollments", JSON.stringify(state.enrollments));
    },
    toggleView: (state) => {
      // Toggle between viewing all courses and only enrolled courses
      state.showAllCourses = !state.showAllCourses;
    },
  },
});

export const { enroll, unenroll, toggleView } = enrollmentSlice.actions;
export default enrollmentSlice.reducer;
