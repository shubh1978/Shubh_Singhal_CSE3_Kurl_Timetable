import React, {useEffect, useState} from 'react';
import '../assets/css/SchoolModal.css';
import '../assets/css/StaffModal.css';
import {FaArrowLeft, FaArrowRight} from 'react-icons/fa';
import {FaChevronDown, FaChevronUp, FaChevronRight} from 'react-icons/fa';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import InputTag from './InputTag';
import {Modal} from 'react-bootstrap';
import {useSelector} from 'react-redux';
import {getClassListByIdOperation} from '../services/operations/classOperation';
import {toast} from 'react-toastify';
import {StudentDataValidation} from '../utils/validation';
// import {house} from '../utils/constants';
import SelectTag from './SelectTag';
import {gender, house, nature} from '../utils/constants';

const StudentModal = ({payload, isEdit, showModal, setShowModal, cb}) => {
  const [classQueue, setclassQueue] = useState([]);
  // const [sectionQueue, setSectionQueue] = useState([]);
  // const [classArray, setClassArray] = useState([]);
  const {selectedShift, selectedCampus} = useSelector(state => state.userInfo);
  const [joiningd, setjoiningd] = useState('');
  const [joiningod, setjoiningod] = useState('');

  const [formData, setFormData] = useState({
    admissionDate: '',
    admissionNo: '',
    campusId: selectedCampus?.id,
    classId: '',
    sectionId: '',
    dob: null,
    email: '',
    fatherMobileNumber: '',
    fatherName: '',
    fatherOccupation: '',
    firstName: '',
    lastName: '',
    gender: '',
    nature: '',
    house: '',
    localAddress: '',
    localAddressSameAsAbove: false,
    localPinCode: null,
    localState: '',
    motherMobileNumber: '',
    motherName: '',
    motherOccupation: '',
    permanentAddress: '',
    permanentPinCode: null,
    permanentState: '',
    shiftId: selectedShift?.id,
    shortName: 'short',
    joiningClassId: '',
    joiningSectionId: '',
  });

  const formatDate = date => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    if (isEdit && payload) {
      setFormData({
        admissionDate: payload?.admissionDate || '',
        admissionNo: payload?.admissionNo || '',
        campusId: selectedCampus?.id,
        dob: formatDate(payload?.dateOfBirthTimeStamp || ''),
        email: payload?.email || '',
        fatherMobileNumber: payload?.fatherMobileNumber || '',
        fatherName: payload?.fatherName || '',
        fatherOccupation: payload?.fatherOccupation || '',
        firstName: payload?.firstName || '',
        gender: payload?.gender || '',
        house: payload?.house || '',
        id: payload?.id || '',
        lastName: payload?.lastName || '',
        localAddress: payload?.localAddress || '',
        localPinCode: payload?.localPinCode || '',
        localState: payload?.localState || '',
        motherMobileNumber: payload?.motherMobileNumber || '',
        motherName: payload?.motherName || '',
        motherOccupation: payload?.motherOccupation || '',
        nature: payload?.nature || '',
        permanentAddress: payload?.permanentAddress || '',
        permanentPinCode: payload?.permanentPinCode || '',
        permanentState: payload?.permanentState || '',
        sectionId: payload?.sectionId || '',
        shiftId: selectedShift?.id || '',
        shortName: payload?.shortName || '',
        joiningClassId: payload?.joiningClassId || '',
        joiningSectionId: payload?.joiningSectionId || '',
      });
      setjoiningd(formatDate(payload?.dob || ''));
      setjoiningod(formatDate(payload?.admissionDate || ''));
    }
  }, [isEdit, payload]);

  const resetForm = () => {
    setFormData({
      admissionNo: '',
      campusId: selectedCampus?.id,
      classId: '',
      sectionId: '',
      dob: null,
      email: '',
      fatherMobileNumber: '',
      fatherName: '',
      fatherOccupation: '',
      firstName: '',
      lastName: '',
      gender: '',
      nature: '',
      house: '',
      localAddress: '',
      localAddressSameAsAbove: false,
      localPinCode: null,
      localState: '',
      motherMobileNumber: '',
      motherName: '',
      motherOccupation: '',
      permanentAddress: '',
      permanentPinCode: null,
      permanentState: '',
      shiftId: selectedShift?.id,
      joiningClassId: '',
      joiningSectionId: '',
      shortName: 'short',
    });
    setSelected(false);
  };
  const [dateValue, setDateValue] = useState('');
  const [nameValue, setNameValue] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const handleInputChange = e => {
    const {name, value} = e.target;
    if (name == 'dob') {
      setDateValue(value);
      const nd = new Date(value);
      setFormData({
        ...formData,
        dob: nd.getTime(),
      });
    } else if (name == 'admissionDate') {
      // setDateValue(value);
      const nd = new Date(value);
      setFormData({
        ...formData,
        admissionDate: nd.getTime(),
      });
    } else if (name == 'sameAddress') {
      setFormData({
        ...formData,
        localAddressSameAsAbove: e.target.checked,
        permanentAddress: formData.localAddress,
        permanentPinCode: formData.localPinCode,
        permanentState: formData.localState,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  var getToken = localStorage.getItem('accesstoken');

  useEffect(() => {
    getClassListByIdOperation(selectedShift.id, setclassQueue);
  }, []);

  const [selected, setSelected] = useState(false);
  const toggle = i => {
    if (selected === i) {
      return setSelected(false);
    }
    setSelected(i);
  };

  const [selected1, setSelected1] = useState(false);
  const toggle1 = i => {
    if (selected1 === i) {
      return setSelected1(false);
    }
    setSelected1(i);
  };
  // useEffect(()=>{
  //   resetForm()
  // },[])

  const handleSubmit = e => {
    e.preventDefault();
    if (StudentDataValidation(formData)) {
      if (activePart === 'PersonalDetails') {
        setActivePart('Officialinfo');
      }
      // if (!activePart === 'Officialinfo') {
      //   cb(formData);
      // }
    }
    // resetForm()
    // setActivePart('PersonalDetails');

  };

  const [activePart, setActivePart] = useState('PersonalDetails');


  const handleCheckboxChange = e => {
    const {name, checked} = e.target;

    setFormData(prevFormData => ({
      ...prevFormData,
      gender: {
        ...Object.fromEntries(
          Object.entries(prevFormData.gender).map(([key]) => [key, false]),
        ),
        [name]: checked,
      },
    }));
  };

  const handleSelectChange = e => {
    setSelectedColor(e.target.value);
  };

  return (
    <Modal
      show={showModal}
      onHide={() => {
        setShowModal(false);
        resetForm();
      }}
      >
      <Modal.Header closeButton>
        <Modal.Title>{isEdit ? 'Edit student' : 'Create Student'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          className="scrollable-container"
          style={{height: '400px', overflow: 'scroll'}}>
          <div className="headerLine">
            <p className="headerLinePart">Personal Details</p>

            <p
              className={
                activePart === 'Officialinfo'
                  ? 'headerLinePart'
                  : 'headerLinePart2'
              }>
              Official info
            </p>
          </div>

          {activePart === 'PersonalDetails' && (
            <div>
              <form className="ModalForm" onSubmit={handleSubmit}>
                <div className="d-flex">
                  <InputTag
                    className="w-100"
                    placeholder="First Name*"
                    type="text"
                    name="firstName"
                    value={formData?.firstName}
                    onChange={handleInputChange}
                    // required
                  />

                  <InputTag
                    className="w-100"
                    placeholder="Last Name*"
                    type="text"
                    name="lastName"
                    value={formData?.lastName}
                    onChange={handleInputChange}
                    // required
                  />
                </div>

                <div className="d-flex">
                  <InputTag
                    className="w-100"
                    placeholder="DOB"
                    type="date"
                    name="dob"
                    value={joiningd}
                    onChange={e => {
                      const selectedDate = new Date(e.target.value);
                      const today = new Date();
                      if (selectedDate <= today) {
                        setjoiningd(e.target.value);
                        handleInputChange(e);
                      }
                    }}
                    max={new Date().toISOString().split('T')[0]}
                    // required
                  />

                  <InputTag
                    className="w-100"
                    placeholder="email"
                    type="email"
                    name="email"
                    value={formData?.email}
                    onChange={handleInputChange}
                    // required
                  />
                </div>

                <div className="d-flex">
                  <InputTag
                    className="w-100"
                    placeholder="Father's Name*"
                    type="text"
                    name="fatherName"
                    value={formData?.fatherName}
                    onChange={handleInputChange}
                    // onlyText={true}
                    // required
                  />
                  <InputTag
                    className="w-100"
                    placeholder="Mother's Name"
                    type="text"
                    name="motherName"
                    value={formData?.motherName}
                    onChange={handleInputChange}
                    // required
                  />
                </div>

                <div className="d-flex">
                  <InputTag
                    className="w-100"
                    placeholder="Father’s Mobile Number*"
                    type="text"
                    name="fatherMobileNumber"
                    value={formData?.fatherMobileNumber}
                    onChange={handleInputChange}
                    // number={true}
                    // required
                  />
                  <InputTag
                    className="w-100"
                    placeholder="Mother’s Mobile Number"
                    type="text"
                    name="motherMobileNumber"
                    value={formData?.motherMobileNumber}
                    onChange={handleInputChange}
                    // required
                  />
                </div>

                <div className="d-flex">
                  <InputTag
                    className="w-100"
                    placeholder="Father Occupation"
                    type="text"
                    name="fatherOccupation"
                    value={formData?.fatherOccupation}
                    onChange={handleInputChange}
                    // required
                  />
                  <InputTag
                    className="w-100"
                    placeholder="Mother Occupation"
                    type="text"
                    name="motherOccupation"
                    value={formData?.motherOccupation}
                    onChange={handleInputChange}
                    // required
                  />
                </div>
                <div className="d-flex">
                  <InputTag
                    className="w-100"
                    placeholder="Pincode"
                    type="number"
                    name="localPinCode"
                    value={formData?.localPinCode}
                    onChange={handleInputChange}
                    // required
                  />
                  <InputTag
                    className="w-100"
                    placeholder="State"
                    type="text"
                    name="localState"
                    value={formData?.localState}
                    onChange={handleInputChange}
                    // required
                  />
                </div>

                <div>
                  <InputTag
                    textareaOn={true}
                    // style={{width: '100%'}}
                    placeholder="Local Address"
                    type="text"
                    name="localAddress"
                    value={formData?.localAddress}
                    onChange={handleInputChange}
                    // required
                  />
                </div>
                <div style={{display: 'flex', margin: '0'}}>
                  <input
                    style={{
                      display: 'flex',
                      width: '10px',
                      marginLeft: '2px',
                    }}
                    name="sameAddress"
                    type="checkbox"
                    onChange={handleInputChange}
                  />
                  <p
                    style={{
                      // marginTop: "15px",
                      fontWeight: '600',
                      marginLeft: '10px',
                      marginTop: '8px',
                    }}>
                    Same as Above
                  </p>
                </div>
                <div className="d-flex">
                  <InputTag
                    className="w-100"
                    placeholder="Pincode"
                    type="number"
                    name="permanentPinCode"
                    value={formData?.permanentPinCode}
                    disabled={formData.localAddressSameAsAbove ? true : false}
                    onChange={handleInputChange}
                    // required
                  />
                  <InputTag
                    className="w-100"
                    placeholder="State"
                    type="text"
                    name="permanentState"
                    value={formData?.permanentState}
                    disabled={formData.localAddressSameAsAbove ? true : false}
                    onChange={handleInputChange}
                    // required
                  />
                </div>
                <div>
                  <InputTag
                    textareaOn={true}
                    // style={{width: '100%'}}
                    placeholder="Permanent Address"
                    type="text"
                    name="permanentAddress"
                    value={formData?.permanentAddress}
                    disabled={formData.localAddressSameAsAbove ? true : false}
                    onChange={handleInputChange}
                    // required
                  />
                </div>
                <div className="btngrp">
                  <button className="backbtn btnModal">
                    <h6>Save</h6>
                  </button>
                  <button type="submit" className="addModalButton btnModal">
                    <h6>
                      Continue <FaArrowRight />
                    </h6>
                  </button>
                </div>
              </form>
            </div>
          )}

          {activePart === 'Officialinfo' && (
            <div>
              <form className="ModalForm">
                <div className="d-flex">
                  <InputTag
                    className="w-100"
                    placeholder="Admission No"
                    type="text"
                    name="admissionNo"
                    value={formData?.admissionNo}
                    onChange={handleInputChange}
                    // required
                  />
                  <InputTag
                    className="w-100"
                    placeholder="Admission Date"
                    type="date"
                    name="admissionDate"
                    value={joiningod}
                    onChange={e => {
                      const selectedDate = new Date(e.target.value);
                      const today = new Date();
                      if (selectedDate <= today) {
                        setjoiningod(e.target.value);
                        handleInputChange(e);
                      }
                    }}
                    max={new Date().toISOString().split('T')[0]}
                    // required
                  />
                </div>

                <div className="d-flex ">
                  {/* <div>{nature[0]}</div> */}
                  <SelectTag placeholder={'Select Nature'}>
                    {nature.map((nat, idx) => (
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
                          // checked={}
                          checked={
                            payload?.nature === nat.name ||
                            formData?.nature === nat.name
                          }
                          onChange={e => {
                            setFormData({...formData, nature: nat.name});
                          }}
                        />
                        {nat.name}
                      </div>
                    ))}
                  </SelectTag>
                  <SelectTag placeholder={'Select Gender'}>
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

                <InputTag
                  className="w-100"
                  placeholder="Enter your house"
                  type="text"
                  name="house"
                  value={formData?.house}
                  onChange={handleInputChange}
                  // value={formData?.admissionNo}

                  // required
                />

                {/* <SelectTag placeholder={'Select House'}>
                  {house.map((hou, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                      }}>
                      <input
                        style={{width: '10%'}}
                        type="checkbox"
                        checked={formData?.house === hou.color}
                        onChange={e => {
                          setFormData({...formData, house: hou.color});
                        }}
                      />
                      {hou.color}
                    </div>
                  ))}
                </SelectTag> */}
                {/* ________________________________________________________________ */}
                <div
                  style={{height: '210px', overflow: 'scroll'}}
                  className="primarydiv checkboxdiv scrollable-container">
                  <p
                    style={{
                      fontWeight: '700',
                      fontSize: '16px',
                      color: 'rgba(103, 103, 103, 1)',
                    }}>
                    Joining Class & Sec{' '}
                    <q
                      style={{
                        color: 'red',
                        fontSize: '12px',
                        fontWeight: '500',
                      }}>
                      *Kindly Select the sections
                    </q>
                  </p>
                  {classQueue
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((Section, i) => (
                      <div>
                        <lable>
                          <div
                            key={i}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                            }}>
                            <input
                              type="checkbox"
                              checked={formData.joiningClassId == Section.id}
                              onChange={e => {
                                setFormData({
                                  ...formData,
                                  joiningClassId: Section.id,
                                  joiningSectionId: Section?.sectionList[0]?.id,
                                });
                              }}
                            />
                            {Section.name}
                            <button
                              className="select"
                              type="button"
                              onClick={() => toggle1(i)}>
                              <span>
                                {selected1 === i ? (
                                  <FaChevronDown />
                                ) : (
                                  <FaChevronRight />
                                )}
                              </span>
                            </button>
                          </div>

                          <div
                            className={
                              selected1 === i ? 'sub-menu-down' : 'sub-menu'
                            }>
                            {Section.sectionList
                              .sort((a, b) => a.name.localeCompare(b.name))
                              .map((item, idx) => (
                                <div
                                  key={idx}
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    width: 'fit-content',
                                    gap: '10px',
                                  }}>
                                  <input
                                    type="checkbox"
                                    checked={
                                      formData.joiningSectionId == item.id
                                    }
                                    onChange={e => {
                                      setFormData({
                                        ...formData,
                                        joiningSectionId: item.id,
                                      });
                                    }}
                                  />

                                  {item.name?.toUpperCase()}
                                </div>
                              ))}
                          </div>
                        </lable>
                        <hr />
                      </div>
                    ))}
                </div>
                {/* ------------------------------------------------------ */}
                <div
                  style={{height: '210px', overflow: 'scroll'}}
                  className="primarydiv checkboxdiv scrollable-container">
                  <p
                    style={{
                      fontWeight: '700',
                      fontSize: '16px',
                      color: 'rgba(103, 103, 103, 1)',
                    }}>
                    Current Class & Sec{' '}
                    <q
                      style={{
                        color: 'red',
                        fontSize: '12px',
                        fontWeight: '500',
                      }}>
                      *Kindly Select the sections
                    </q>
                  </p>
                  {classQueue
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((Section, i) => (
                      <div>
                        <lable>
                          <div
                            key={i}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                            }}>
                            <input
                              type="checkbox"
                              checked={formData.classId == Section.id}
                              onChange={e => {
                                setFormData({
                                  ...formData,
                                  classId: Section.id,
                                  sectionId: Section?.sectionList[0]?.id,
                                });
                              }}
                            />
                            {Section.name}
                            <button
                              className="select"
                              type="button"
                              onClick={() => toggle(i)}>
                              <span>
                                {selected === i ? (
                                  <FaChevronDown />
                                ) : (
                                  <FaChevronRight />
                                )}
                              </span>
                            </button>
                          </div>

                          <div
                            className={
                              selected === i ? 'sub-menu-down' : 'sub-menu'
                            }>
                            {Section.sectionList
                              .sort((a, b) => a.name.localeCompare(b.name))
                              .map((item, idx) => (
                                <div
                                  key={idx}
                                  style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    width: 'fit-content',
                                    gap: '10px',
                                  }}>
                                  <input
                                    type="checkbox"
                                    checked={formData.sectionId == item.id}
                                    onChange={e => {
                                      setFormData({
                                        ...formData,
                                        sectionId: item.id,
                                      });
                                    }}
                                  />

                                  {item.name?.toUpperCase()}
                                </div>
                              ))}
                          </div>
                        </lable>
                        <hr />
                      </div>
                    ))}
                </div>

                <div>
                  <InputTag
                    textareaOn={true}
                    // style={{width: '95%'}}
                    placeholder="Remarks"
                    type="text"
                    name="PreferredSportsandGames"
                    value={formData.PreferredSportsandGames}
                    onChange={handleInputChange}
                    // required
                  />
                </div>
              </form>
              <div className="btngrp">
                <button
                  className="backbtn btnModal"
                  onClick={() => setActivePart('PersonalDetails')}>
                  <h6>
                    <FaArrowLeft /> Back
                  </h6>
                </button>
                <button
                  type="submit"
                  onClick={() => {
                    cb(formData);
                    // setActivePart('PersonalDetails');
                    resetForm();
                  }}
                  className="addModalButton btnModal">
                  <h6>{isEdit ? 'Update+' : 'Add+'}</h6>
                </button>
              </div>
            </div>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default StudentModal;
