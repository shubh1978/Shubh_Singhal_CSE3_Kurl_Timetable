import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  classWiseTt: false,
  staffWiseTt: false,
  takeTeacherAttendance: false,
  showDashboard: true,
};

export const dashboardSlice = createSlice({
  name: 'dashboardInfo',
  initialState,
  reducers: {
    setTakeTeacherAttendance: (state, action) => {
      state.classWiseTt = false;
      state.staffWiseTt = false;
      state.takeTeacherAttendance = action.payload;
      state.showDashboard = false;
    },
    setClassWiseTt: (state, action) => {
      state.classWiseTt = action.payload;
      state.staffWiseTt = false;
      state.takeTeacherAttendance = false;
      state.showDashboard = false;
    },
    setStaffWiseTt: (state, action) => {
      state.classWiseTt = false;
      state.staffWiseTt = action.payload;
      state.takeTeacherAttendance = false;
      state.showDashboard = false;
    },
    gotoDashboard: (state, action) => {
      state.classWiseTt = false;
      state.staffWiseTt = false;
      state.takeTeacherAttendance = false;
      state.showDashboard = action.payload;
    },
  },
});

export const {
  setStaffWiseTt,
  setClassWiseTt,
  setTakeTeacherAttendance,
  gotoDashboard,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
