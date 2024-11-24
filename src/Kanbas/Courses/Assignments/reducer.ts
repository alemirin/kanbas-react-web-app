import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  assignments: [],
};
const assignmentSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignments: (state, action) => {
      state.assignments = action.payload;
    },
    addAssignment: (state, { payload: assignment }) => {
      const newAssignment: any = {
        _id: new Date().getTime().toString(),
        title: assignment.title,
        course: assignment.course,
        description: assignment.description,
        availFrom: assignment.availFrom,
        availUntil: assignment.availUntil,
        due: assignment.due,
        points: assignment.points,
        group: assignment.group,
      };
      state.assignments = [...state.assignments, newAssignment] as any;
    },
    deleteAssignment: (state, { payload: assId }) => {
      state.assignments = state.assignments.filter((a: any) => a._id !== assId);
    },
    updateAssignment: (state, { payload: assignment }) => {
      state.assignments = state.assignments.map((a: any) =>
        a._id === assignment._id
          ? { ...assignment, availUntil: assignment.availUntil }
          : a
      ) as any;
    },
    editAssignment: (state, { payload: assId }) => {
      state.assignments = state.assignments.map((a: any) =>
        a._id === assId ? { ...a, editing: true } : a
      ) as any;
    },
  },
});
export const {
  setAssignments,
  addAssignment,
  deleteAssignment,
  updateAssignment,
  editAssignment,
} = assignmentSlice.actions;
export default assignmentSlice.reducer;
