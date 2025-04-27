import { createSlice } from "@reduxjs/toolkit";

let userData = localStorage.getItem('userData') 
if(userData) userData = JSON.parse(userData)
let selectedCampus = userData?.campus
if(localStorage.getItem('selectCampus')) selectedCampus = JSON.parse(localStorage.getItem('selectCampus'))
let selectedSchool = selectedCampus?.selectSchool
if(localStorage.getItem('selectedSchool')) selectedSchool = JSON.parse(localStorage.getItem('selectedSchool'))
let selectedShift = {}
if(localStorage.getItem('selectedShift')) selectedShift = JSON.parse(localStorage.getItem('selectedShift'))

const initialState = {
  userData: userData || {},
  selectedSchool: selectedSchool || {},
  selectedCampus: selectedCampus || {},
  selectedShift: selectedShift,
  timeTable: {},
  isLogin: false,
  subjectData: []
};

export const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.userData = action.payload;
      state.isLogin = true;
    },
    logout: (state, action) => {
      state.userData = {};
      state.selectedCampus = {};
      state.selectedSchool = {};
      state.selectedShift = {};
      state.isLogin = false;
      localStorage.removeItem('selectedSchool')
      localStorage.removeItem('selectCampus')
      localStorage.removeItem('selectedShift')
    },
    selectSchool: (state, action) => {
      localStorage.setItem('selectedSchool',JSON.stringify(action.payload))
      state.selectedSchool = action.payload;
    },
    selectCampus: (state, action) => {
      localStorage.setItem('selectCampus',JSON.stringify(action.payload))
      state.selectedCampus = action.payload;
    },
    selectShift: (state, action) => {
      localStorage.setItem('selectedShift',JSON.stringify(action.payload))
      state.selectedShift = action.payload;
    },
    timeTable:(state,action)=>{
      state.selectedTt = action.payload;
    },
    addSubjectData:(state,action)=>{
      state.subjectData = [...action.payload];
    },
    clearSubjectData: (state, action) => {
      state.subjectData = []
    }

  },
});

// Action creators are generated for each case reducer function
export const {addUser, logout, selectSchool, selectCampus, selectShift, timeTable,addSubjectData, clearSubjectData} =
  userSlice.actions;

export default userSlice.reducer;
