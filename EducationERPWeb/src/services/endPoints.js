//auth urls
export const loginApi = () => 'auth/login';
export const changePasswordApi = () => `/auth/change-password`;

export const getSchoolListApi = () => `school/list`;
export const addSchoolApi = () => `school/create`;
export const updateSchoolApi = () => `school/update`;

export const addCampusApi = () => `campus/create`;
export const updateCampusApi = () => `campus/update`;
export const getCampusesByIdApi = id => `campus/by-school/${id}`;

export const addShiftApi = () => `shift/create`;
export const deleteShiftApi = id => `shift/${id}`;
export const getAllShiftsApi = () => `shift/list`;
export const getShiftsByIdApi = id => `shift/byCampus/${id}`;
export const getStatusApi = data => `shift/status/${data.id}`;

//class endpoints
export const addClassApi = () => `class/create`;
export const updateClassApi = () => `class/update`;
export const deleteClassApi = () => `class/delete`;
export const getClassListApi = () => `class/list`;
export const getClassListByIdApi = id => `class/by-shift/${id}`;
export const getClassListForGroupApi = id => `group/unassigned/${id}`;

export const addGroupApi = () => `group/create`;
export const getGroupListByIdApi = id => `group/by-shift/${id}`;
export const updateGroupApi = () => `group/edit`;

export const addSubjectApi = () => `subject/create`;
export const updateSubjectApi = () => `subject/update`;
export const deleteSubjectApi = id => `subject/delete?id=${id}`;
export const getUnclaimedSubjectsDataApi = id =>
  `subject/get-unclaimed-subjects?shiftId=${id}`;
export const getMultipleTeacherSubjectDataApi = id =>
  `/subject/multiple-teachers/${id}`;
export const getSectionsWithoutClassTeacher = id =>
    `/teacher/without-class-teacher`;
export const getStudentListByIdApi = id => `student/by-shift/${id}`;
export const addStudentApi = () => `student/create`;
export const deleteStudentApi = id => `student/delete?id=${id}`;
export const editStudentApi = () => `student/update`;

export const getStaffListByIdApi = id => `teacher/by-shift/${id}`;
export const deleteStaffApi = id => `teacher/delete?id=${id}`;
export const addStaffApi = () => `teacher/create`;
export const updateStaffApi = () => `teacher/edit`;
export const importStaffApi=(id)=>`teacher/import?campus_id=${id}`
// export const deleteStaffApi = () => `teacher/delete?id=${id}`;

export const getStatsApi = id => `common/stats/${id}`;
//dashboard endpoints
export const addAttendanceApi = () => `/attendance/add-attendance`;
export const getAttendanceByPeriodApi = data =>
  `/attendance/get-attendance/${data.period}/${data.id}`;

//timetable endpoints
export const getSubjectByClassSectionApi = `subject/by-class-and-sections`;
export const addPeriodApi = `period/create`;
export const getStatusPeriodApi = id => `period/status/${id}`;
export const getPeriodApi = 'period/getAll';

export const createTimeTableApi = () => `timetable/create`;
export const getTimeTableApi = () => `timetable/get`;
export const EditTimeTableApi = id => `timetable/${id}`;
export const getPeriodStatusApi = id => `/period/status/${id}`;
export const getStaffWiseTimeTableApi = id => `/timetable/byTeacher/${id}`;
export const editTimetableApi = data => `timetable/${data}`;
export const addTimetableApi = data => `timetable/add/timetablePeriod`;
