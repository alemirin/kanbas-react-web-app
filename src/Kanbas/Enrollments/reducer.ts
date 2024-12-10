import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  enrollments: [], // Stores course enrollment status
  showAllCourses: false, // Determines whether to display all courses or only enrolled courses
};

const enrollmentSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, action) => {
      state.enrollments = action.payload;
    },
    enroll: (
      state,
      { payload }: PayloadAction<{ userId: string; courseId: string }>
    ) => {
      const { userId, courseId } = payload;
      const newEnrollment: any = {
        _id: new Date().getTime().toString(),
        user: userId,
        course: courseId,
      };
      state.enrollments = [...state.enrollments, newEnrollment] as any;
    },
    unenroll: (
      state,
      { payload }: PayloadAction<{ userId: string; courseId: string }>
    ) => {
      const { userId, courseId } = payload;
      state.enrollments = state.enrollments.filter(
        (e: any) => e.course !== courseId || e.user !== userId
      );
    },
    toggleView: (state) => {
      // Toggle between viewing all courses and only enrolled courses
      state.showAllCourses = !state.showAllCourses;
    },
  },
});

export const { setEnrollments, enroll, unenroll, toggleView } =
  enrollmentSlice.actions;
export default enrollmentSlice.reducer;
