import React, {useEffect, useState} from 'react';
import '../assets/css/SchoolModal.css';
import '../assets/css/StaffModal.css';
import {FaArrowLeft, FaArrowRight} from 'react-icons/fa';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import InputTag from './InputTag';
import ColumnGroup from 'antd/es/table/ColumnGroup';
import {useSelector} from 'react-redux';
import {getClassListByIdOperation} from '../services/operations/onBoardOperation';
import {getSubjectsById} from '../services/operations/subjectOperations';
import {
  addStaffOperation,
  getUnclaimedSubjectsDataOpr,
  getGroupTeacherSubjectDataOpr,
  updateStaffOperation,
    getWithoutClassTeacher,
} from '../services/operations/staffOperations';
import {toast} from 'react-toastify';
import {
  StaffdataValidation,
  StaffdataSecondValidation,
} from '../utils/validation';

import {CloudCog} from 'lucide-react';
// import { Modal } from "react-bootstrap";
import SelectTag from './SelectTag';
import {gender, mistress} from '../utils/constants';
import { getMultipleTeacherSubjectDataApi } from '../services/endPoints';

const StaffModal = ({
  payload,
  isEdit,
  cb,
  getStaffList,
  setShow,
  TimestampToDate,
}) => {
  const [classesId, setClassesID] = useState([]);
  const [sectionId, setSectionID] = useState([]);
  const [subjectsId, setSubjectsID] = useState([]);
  const [subjectData, setSubjectData] = useState([]);
  const [withoutClassTeacher, setWithoutClassTeacher] = useState([]);
  const [multipleTeacherData, setMultipleData] = useState([]);
  const [subjectFilteredData, setSubjectFilteredData] = useState([]);
  const [multipleTeacherFilteredData, setMultipleTeacherFilteredData] = useState([]);

  const [activePart, setActivePart] = useState('GeneralInfo');
  const [completedPart, setCompletedPart] = useState(['GeneralInfo']);
  const [filterValue, setFilterValue] = useState('');
  const {selectedShift, selectedCampus, selectedSchool} = useSelector(
    state => state.userInfo,
  );

  const [dob, setdob] = useState('');
  const [joiningd, setjoiningd] = useState('');
  const [formData, setFormData] = useState(
    ((Object.keys(payload).length !== 0) && isEdit)
      ? {
          teacher_id: payload?.id,
          firstName: payload?.firstName,
          lastName: payload?.lastName,
          email: payload?.email,
          mobile: payload?.mobile,
          shortName: payload?.shortName,
          dateOfBirthTimeStamp: TimestampToDate(payload?.dateOfBirthTimeStamp),
          dateOfJoiningTimeStamp: payload?.dateOfJoiningTimeStamp,
          pinCode: payload?.pinCode,
          teachingStaff: payload?.teachingStaff,
          houseMaster: payload?.houseMaster,
          designation: payload?.designation,
          house: payload?.house,
          gender: payload?.gender,
        }
      : {
          campus_id: selectedCampus?.id,
          classId: null,
          sectionId: null,
          subjectId: null,
          classes: classesId,
          dateOfBirthTimeStamp: null,
          dateOfJoiningTimeStamp: null,
          email: '',
          firstName: '',
          lastName: '',
          mobile: '',
          pinCode: '',
          designation: '',
          sections: sectionId,
          shortName: '',
          subjects: subjectsId,
          teachingStaff: true,
          gender: '',
          house: '',
          houseMaster: true,
          shift_id: selectedShift?.id,
        },
  );
  const [joiningdob, setjoiningdob] = useState(isEdit?
    TimestampToDate(formData.dateOfBirthTimeStamp) : '',
  );
  // useEffect(() => {
  //   if (formData.dateOfBirthTimeStamp) {
  //     setjoiningdob(TimestampToDate(formData.dateOfBirthTimeStamp));
  //   }
  // }, [formData.dateOfBirthTimeStamp]);
  const handleInputChange = e => {
    const {name, value} = e.target;
    // if(name=='designation'){
    //   const newValue = e.target.value;
    //   const allowedChars = /^[a-zA-Z]+$/; // Allow only letters (uppercase and lowercase)
    //   if (!allowedChars.test(newValue)) {
    //     e.target.value = newValue.slice(0, -1); // Remove the invalid character
    //   }
    // }
    if (name === 'dateOfBirthTimeStamp' || name == 'dateOfJoiningTimeStamp') {
      let timestamp = value ? new Date(value).getTime() / 1000 : '';

      setFormData({
        ...formData,
        [name]: timestamp,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  useEffect(() => {
    // getSubjectList();
    getLists();
  }, []);
  const handleSubmit = e => {
    // form submission logic here
    if (StaffdataValidation(formData)) {
      cb(formData);
    }
  };

  // function getSubjectList() {
  //   getSubjectsById(selectedShift.id, setSubjectData);
  // }

  function getLists() {
    getUnclaimedSubjectsDataOpr(selectedShift.id, setSubjectData);
    getGroupTeacherSubjectDataOpr(selectedShift.id, setMultipleData);
    getWithoutClassTeacher(setWithoutClassTeacher);
  }
  useEffect(() => {
    setSubjectFilteredData(subjectData);
  }, [subjectData]);

  useEffect(() => {
    setMultipleTeacherFilteredData(multipleTeacherData);
  }, [multipleTeacherData]);

  const handleClick = part => {
    if (completedPart.includes(part)) {
      let newCompletedPart = [...completedPart];
      newCompletedPart.pop();
      setCompletedPart(newCompletedPart);
      setActivePart(newCompletedPart[newCompletedPart.length - 1]);
    } else {
      if (StaffdataValidation(formData) && activePart === 'GeneralInfo') {
        let newarr = [...completedPart, part];
        setCompletedPart(newarr);
        setActivePart(part);
      }
      else{
        let newarr = [...completedPart, part];
        setCompletedPart(newarr);
        setActivePart(part);
      }
    }
  };
  console.log('multipleTeacherFilteredData',multipleTeacherFilteredData)
  console.log('subjectFilteredData',subjectFilteredData)
  return (
    <div>
      <div>
        <div className="headerLine">
          <p
            className="headerLinePart"
            style={{
              marginLeft: '0px',
            }}>
            General Info
          </p>

          <p
            className={
              completedPart.includes('StaffClassAndSubject')
                ? 'headerLinePart'
                : 'headerLinePart2'
            }>
            Staff Class And Subject
          </p>
          <p
            className={
              completedPart.includes('AssignClassTeacher')
                ? 'headerLinePart'
                : 'headerLinePart2'
            }>
            Assign Class Teacher
          </p>
        </div>

        {activePart === 'GeneralInfo' && (
          <div
            className="scrollable-container"
            style={{height: '300px', overflow: 'scroll', padding: '0px'}}>
            {
              <form className="ModalForm" onSubmit={handleSubmit}>
                <div
                  className="d-flex"
                  style={{
                    width: '100%',
                    justifyContent: 'space-between',
                    gap: '15px',
                  }}>
                  <InputTag
                    // style={{ margin: "13px 0px" }}
                    // style={{}}
                    className="w-100"
                    placeholder="First Name*"
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                  <InputTag
                    // style={{ margin: "13px 0px 13px 20px" }}
                    className="w-100"
                    placeholder="Last Name*"
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <InputTag
                    // style={{ width: "100%", margin: "13px 0px" }}
                    placeholder="Short Name*"
                    type="text"
                    name="shortName"
                    value={formData?.shortName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                {/* <p style={{ marginBottom: "-5px" }}></p> */}
                <div
                  className="d-flex"
                  style={{
                    width: '100%',
                    justifyContent: 'space-between',
                    gap: '15px',
                  }}>
                  <InputTag
                    // style={{ margin: "13px 0px" }}
                    style={{}}
                    className="w-100"
                    placeholder="Date of Joining"
                    type="date"
                    name="dateOfJoiningTimeStamp"
                    value={joiningd}
                    onChange={e => {
                      //   const selectedDate = new Date(e.target.value);
                      //   const today = new Date();
                      //   if (selectedDate <= today) {
                      //     setjoiningd(e.target.value);
                      //     handleInputChange(e);
                      //   }
                      // }}

                      const selectedDate = e.target.value
                        ? new Date(e.target.value)
                        : '';
                      const today = new Date();
                      if (selectedDate === '' || selectedDate <= today) {
                        setjoiningd(e.target.value);
                        handleInputChange(e);
                      } else {
                        setjoiningd(''); // Clear the input if the date is invalid
                      }
                    }}
                    max={new Date().toISOString().split('T')[0]}
                    disabled={isEdit ? 'disabled' : ''}
                    // required
                  />
                  <InputTag
                    // style={{ margin: "13px 0px 13px 20px" }}
                    className="w-100"
                    placeholder="Mobile No"
                    type="tel"
                    name="mobile"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    value={formData?.mobile}
                    onChange={handleInputChange}

                    // required
                  />
                </div>

                {/* <p style={{ marginBottom: "-5px" }}></p> */}
                <div
                  className="d-flex"
                  style={{
                    width: '100%',
                    justifyContent: 'space-between',
                    gap: '15px',
                  }}>
                  <InputTag
                    // style={{ margin: "13px 0px" }}
                    style={{}}
                    className="w-100"
                    placeholder="Date of Birth"
                    type="date"
                    name="dateOfBirthTimeStamp"
                    value={joiningdob}
                    onChange={e => {
                      const selectedDateDob = new Date(e.target.value);
                      const today = new Date();
                      if (selectedDateDob <= today) {
                        setjoiningdob(e.target.value);
                        handleInputChange(e);
                      }
                    }}
                    max={new Date().toISOString().split('T')[0]}
                    // required
                  />
                  <InputTag
                    // style={{ margin: "13px 0px 13px 20px" }}
                    className="w-100"
                    placeholder="Email Id"
                    type="email"
                    name="email"
                    value={formData?.email}
                    onChange={handleInputChange}
                    // required
                  />
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    gap: '50px',
                  }}>
                  <div style={{display: 'flex', gap: '10px'}}>
                    <input
                      style={{
                        // margin: "13px 10px 0px 0px",
                        width: 'fit-content',
                        accentColor: 'rgba(218, 37, 28, 1)',
                      }}
                      type="radio"
                      id="staff"
                      name="color"
                      value={formData.teachingStaff}
                      checked={formData.teachingStaff === true}
                      onChange={e =>
                        setFormData({...formData, teachingStaff: true})
                      }
                    />
                    <pre
                      style={{
                        // width: "300px",
                        // marginLeft: "-100px",
                        marginTop: '14px',
                        color: '#676767',
                      }}>
                      Teaching Staff
                    </pre>
                  </div>

                  <div style={{display: 'flex', gap: '10px'}}>
                    <input
                      type="radio"
                      id="staff"
                      name="color"
                      value={!formData.teachingStaff}
                      checked={formData.teachingStaff === false}
                      style={{
                        width: 'fit-content',
                        accentColor: 'rgba(218, 37, 28, 1)',
                      }}
                      onChange={e =>
                        setFormData({...formData, teachingStaff: false})
                      }
                    />
                    <pre
                      style={{
                        marginTop: '14px',
                        color: '#676767',
                      }}>
                      Non-Teaching Staff
                    </pre>
                  </div>
                </div>

                <div
                  className="d-flex"
                  style={{
                    width: '100%',
                    justifyContent: 'space-between',
                    gap: '15px',
                  }}>
                  <InputTag
                    placeholder="Enter House Name"
                    type="text"
                    name="house"
                    value={formData?.house}
                    onChange={handleInputChange}
                    // required
                  />
                  <InputTag
                    placeholder="Pincode"
                    type="number"
                    // number={true}
                    name="pinCode"
                    value={formData?.pinCode}
                    onChange={handleInputChange}
                    // required
                  />
                </div>
                <div
                  className="d-flex"
                  style={{
                    width: '100%',
                    justifyContent: 'space-between',
                    gap: '15px',
                  }}>
                  <SelectTag placeholder={'Select Gender*'}>
                    {gender.map((gen, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                        }}>
                        <input
                          style={{width: '15%'}}
                          type="checkbox"
                          checked={formData?.gender === gen.gname}
                          onChange={e => {
                            setFormData({...formData, gender: gen.gname});
                          }}
                        />
                        {gen.gname}
                      </div>
                    ))}
                  </SelectTag>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    gap: '50px',
                  }}>
                  <div style={{display: 'flex', gap: '10px'}}>
                    <input
                      style={{
                        // margin: "13px 10px 0px 0px",
                        width: 'fit-content',
                        accentColor: 'rgba(218, 37, 28, 1)',
                      }}
                      type="radio"
                      id="houseMaster"
                      name="master"
                      value={formData?.houseMaster}
                      checked={formData.houseMaster === true}
                      onChange={e =>
                        setFormData({...formData, houseMaster: true})
                      }
                    />
                    <pre
                      style={{
                        // width: "300px",
                        // marginLeft: "-100px",
                        marginTop: '14px',
                        color: '#676767',
                      }}>
                      House Master
                    </pre>
                  </div>

                  <div style={{display: 'flex', gap: '10px'}}>
                    <input
                      type="radio"
                      id="houseMaster"
                      name="master"
                      value={!formData?.houseMaster}
                      checked={formData.houseMaster === false}
                      style={{
                        width: 'fit-content',
                        accentColor: 'rgba(218, 37, 28, 1)',
                      }}
                      onChange={e =>
                        setFormData({...formData, houseMaster: false})
                      }
                    />
                    <pre
                      style={{
                        marginTop: '14px',
                        color: '#676767',
                      }}>
                      House Mistress
                    </pre>
                  </div>
                </div>

                <div>
                  <InputTag
                    textareaOn={true}
                    style={{width: '100%', margin: '13px 0px'}}
                    placeholder="Address"
                    type="text"
                    name="Address"
                    value={formData?.Address}
                    onChange={handleInputChange}
                    // required
                  />
                </div>
              </form>
            }
          </div>
        )}

        {activePart === 'StaffClassAndSubject' && (
          <div>
            {
              <form className="ModalForm">
                <InputTag
                  placeholder="Designation"
                  // className="SubjectInput"
                  type="text"
                  name="designation"
                  value={formData?.designation}
                  onChange={handleInputChange}
                  // required
                />
                <div
                  style={{height: '215px', overflow: 'scroll'}}
                  className="primarydiv checkboxdiv scrollable-container">
                  <InputTag
                    // style={{width: '99%'}}
                    placeholder="Search for eg 1 A, Science"
                    type="text"
                    onChange={e => {
                      setFilterValue(e.target.value);
                      const filteredData = subjectData.filter(sub =>
                        sub.subjectName
                          .toLowerCase()
                          .startsWith(e.target.value.toLowerCase()),
                      );
                      setSubjectFilteredData(filteredData);
                      if (e.target.value == null) {
                        setSubjectFilteredData(subjectData);
                      }
                    }}
                  />

                  {subjectFilteredData.map((subject, subjectIndex) => (
                    <div style={{margin: '0px 7px'}} key={subjectIndex}>
                      <div className="d-flex flex-row justify-content-between">
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                          }}>
                          <input
                            style={{
                              height: '12px',
                              width: '12px',
                              accentColor: 'red',
                            }}
                            type="checkbox"
                            // checked={
                            //   formData?.subjects?.name === subject.name &&
                            //   formData?.classes?.id === subject.classId &&
                            //   formData?.sections?.id === subject.sectionId
                            // }
                            onChange={() => {
                              const newSections = new Set([
                                ...sectionId,
                                subject.sectionId,
                              ]);
                              setSectionID(Array.from(newSections));

                              const newClasses = new Set([
                                ...classesId,
                                subject.classId,
                              ]);
                              setClassesID(Array.from(newClasses));

                              const newSubjects = new Set([
                                ...subjectsId,
                                subject.subjectId,
                              ]);
                              setSubjectsID(Array.from(newSubjects));

                              setFormData({
                                ...formData,
                                classes: Array.from(newClasses),
                                subjects: Array.from(newSubjects),
                                sections: Array.from(newSections),
                              });
                            }}
                          />
                          {subject.className + ' ' + subject.sectionName}
                        </div>
                        <hr />
                        <div style={{width: 'fit-content'}}>
                          {subject.subjectName}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  style={{height: '215px', overflow: 'scroll'}}
                  className="primarydiv checkboxdiv scrollable-container">
                  Group Teachers
                  <InputTag
                    // style={{width: '99%'}}
                    placeholder="Search for eg 1 A, Science"
                    type="text"
                    onChange={e => {
                      setFilterValue(e.target.value);
                      const filteredData = multipleTeacherData.filter(sub =>
                        sub.subjectName
                          .toLowerCase()
                          .startsWith(e.target.value.toLowerCase()),
                      );
                      setMultipleTeacherFilteredData(filteredData);
                      if (e.target.value == null) {
                        setMultipleTeacherFilteredData(multipleTeacherData);
                      }
                    }}
                  />

                  {multipleTeacherFilteredData.map((subject, subjectIndex) => (
                    <div style={{margin: '0px 7px'}} key={subjectIndex}>
                      <div className="d-flex flex-row justify-content-between">
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                          }}>
                          <input
                            style={{
                              height: '12px',
                              width: '12px',
                              accentColor: 'red',
                            }}
                            type="checkbox"
                            // checked={
                            //   formData?.subjects?.name === subject.name &&
                            //   formData?.classes?.id === subject.classId &&
                            //   formData?.sections?.id === subject.sectionId
                            // }
                            onChange={() => {
                              const newSections = new Set([
                                ...sectionId,
                                subject.sectionId,
                              ]);
                              setSectionID(Array.from(newSections));

                              const newClasses = new Set([
                                ...classesId,
                                subject.classId,
                              ]);
                              setClassesID(Array.from(newClasses));

                              const newSubjects = new Set([
                                ...subjectsId,
                                subject.subjectId,
                              ]);
                              setSubjectsID(Array.from(newSubjects));

                              setFormData({
                                ...formData,
                                classes: Array.from(newClasses),
                                subjects: Array.from(newSubjects),
                                sections: Array.from(newSections),
                              });
                            }}
                          />
                          {subject.className + ' ' + subject.sectionName}
                        </div>
                        <hr />
                        <div style={{width: 'fit-content'}}>
                          {subject.subjectName}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </form>
            }
          </div>
        )}

        {activePart === 'AssignClassTeacher' && (
          <div>
            {
              <form className="ModalForm" onSubmit={handleSubmit}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '20px',
                  }}>
                  <label style={{fontWeight: '700', color: 'rgba(0, 0, 0, 1)'}}>
                    Assign Class Teacher
                  </label>
                  <p
                    style={{
                      fontWeight: '400',
                      fontSize: '14px',
                      textDecoration: 'underline',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      handleSubmit();
                    }}>
                    skip
                  </p>
                </div>
                <div
                  style={{height: '235px', overflow: 'scroll'}}
                  className="primarydiv checkboxdiv scrollable-container">
                  <InputTag
                    placeholder="Search for eg 1 A, Science"
                    type="text"
                    onChange={e => {
                      setFilterValue(e.target.value);
                      const filteredData = subjectData.filter(sub =>
                        sub.subjectName
                          .toLowerCase()
                          .startsWith(e.target.value.toLowerCase()),
                      );
                      setSubjectFilteredData(filteredData);
                      if (e.target.value == null) {
                        setSubjectFilteredData(subjectData);
                      }
                    }}
                    // className="SubjectInput"
                  />

                  {subjectFilteredData.map((subject, subjectIndex) => (
                    <div style={{margin: '0px 7px'}} key={subjectIndex}>
                      <div className="d-flex flex-row justify-content-between">
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                          }}>
                          <input
                            style={{
                              height: '12px',
                              width: '12px',
                              accentColor: 'red',
                            }}
                            type="checkbox"
                            checked={
                              formData.classId === subject.classId &&
                              formData.sectionId === subject.sectionId &&
                              formData.subjectId === subject.subjectId
                            }
                            onChange={e => {
                              setFormData({
                                ...formData,
                                classId: subject.classId,
                                sectionId: subject.sectionId,
                                subjectId: subject.subjectId,
                              });
                            }}
                          />
                          {subject.className + ' ' + subject.sectionName}
                        </div>
                        <hr />
                        <div style={{width: 'fit-content'}}>
                          {subject.subjectName}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </form>
            }
          </div>
        )}
      </div>
      <div className="btngrp">
        <button
          style={{
            visibility: `${activePart === 'GeneralInfo' ? 'hidden' : ''}`,
          }}
          className="backbtn btnModal"
          onClick={() => handleClick(activePart)}>
          <h6 style={{color: 'black', fontWeight: '600'}}>
            <FaArrowLeft /> Back
          </h6>
        </button>

        <button
          className="addModalButton btnModal"
          style={activePart === 'GeneralInfo' ? {} : {}}
          onClick={() => {
            if (activePart === 'AssignClassTeacher') {
              handleSubmit();
            } else {
              handleClick(
                activePart === 'GeneralInfo'
                  ? 'StaffClassAndSubject'
                  : activePart === 'StaffClassAndSubject'
                  ? 'AssignClassTeacher'
                  : null,
              );
            }
          }}>
          {activePart === 'AssignClassTeacher' ? (
            <h6>{isEdit ? 'Update +' : 'Add +'}</h6>
          ) : (
            <h6>
              Continue <FaArrowRight />
            </h6>
          )}
        </button>
      </div>
    </div>
  );
};

export default StaffModal;
