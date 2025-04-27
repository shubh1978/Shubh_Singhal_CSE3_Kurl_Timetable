import React from 'react';
import {Routes, Route, Outlet} from 'react-router-dom';
import LoginForm from './pages/LoginForm';
import SchoolList from './pages/SchoolList';
import CampusList from './pages/CampusList';
import CreateShift from './pages/CreateShift';
import CreateClass from './pages/CreateClass';
import CreateGroup from './pages/CreateGroup';
import CreateSubject from './pages/CreateSubject';
import CreateStaff from './pages/CreateStaff';
import CreateStudent from './pages/CreateStudent';
import LeftNavBar from './pages/LeftNavBar';
import Sidebar from './components/Sidebar';
import NavBar from './components/NavBar';
import NotFound from './pages/NotFound';
import Dashboard from './pages/Dashboard/Dashboard';
import Campus from './pages/Campus';
import Periods from './pages/Periods';
import Subjects from './pages/Subjects';
import Students from './pages/Students';
import Teachers from './pages/Teachers';
import TimeTables from './pages/TimeTables';
import TeacherWise from './pages/TeacherWise';
import Group from './pages/Group';
import Settings from './pages/Settings';
import Classes from './pages/Classes';
import {useSelector} from 'react-redux';
import PrivateRouteSuper from './components/PrivateRouteSuper';
import Time from './pages/TimeTable';
import TimeTable from './pages/TimeTable';
import SubstitutionSheet from './pages/SubstitutionSheet';
import Promotion from './pages/Promotion';
import Rollno from './pages/Rollno';
import StudentPreferences from './pages/StudentPreferences';
import './App.css';
import ManageLeave from './pages/Dashboard/ManageLeave';
import ClassWiseTimeTable from './pages/Dashboard/ClassWiseTimeTable';
import StaffWiseTimeTable from './pages/Dashboard/StaffWiseTimeTable';

const App = () => {
  //  const {userData, isLogin} = useSelector(state => state.userInfo);
  //  const role = userData?.authentication?.principal?.role;

  return (
    <Routes>
      {/* //public route */}
      {/* //superadmin can access of all below routes */}
      <Route path="/login" element={<LoginForm />} />
      <Route
        path="/"
        element={
          <PrivateRouteSuper
            element={
              <>
                <NavBar />
                <Outlet />
              </>
            }
          />
        }>
        <Route path="school" element={<SchoolList />} />
        <Route path="campus" element={<CampusList />} />
        <Route path="shift" element={<CreateShift />} />
        <Route path="class" element={<CreateClass />} />
        <Route path="group" element={<CreateGroup />} />
        <Route path="subject" element={<CreateSubject />} />
        <Route path="staff" element={<CreateStaff />} />
        <Route path="student" element={<CreateStudent />} />
        <Route path="timetable" element={<TimeTable />} />
      </Route>
      {/* //campusadmin can access of all below routes */}
      <Route path="/main" element={<LeftNavBar />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="campuses" element={<CampusList />} />
        <Route path="shift" element={<CreateShift />} />
        <Route path="classes" element={<CreateClass />} />
        <Route path="promotion" element={<Promotion />} />
        <Route path="rollno" element={<Rollno />} />
        <Route path="periods" element={<Periods />} />
        <Route path="subjects" element={<CreateSubject />} />
        <Route path="students" element={<CreateStudent />} />
        <Route path="studentpreferences" element={<StudentPreferences />} />
        <Route path="teachers" element={<CreateStaff />} />
        <Route path="timetables" element={<TimeTable />} />
        <Route path="teacherwise" element={<TeacherWise />} />
        <Route path="group" element={<CreateGroup />} />
        <Route path="settings" element={<Settings />} />
        <Route path="Substitutionsheet" element={<SubstitutionSheet />} />
        <Route path="ManageLeave" element={<ManageLeave />} />
        <Route path="classTimetables" element={<ClassWiseTimeTable />} />
        <Route path="teacherTimetables" element={<StaffWiseTimeTable />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
export default App;
