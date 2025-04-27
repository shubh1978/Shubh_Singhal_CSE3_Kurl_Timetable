import React, {useEffect, useState} from 'react';
import '../assets/css/SchoolModal.css';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import InputTag from './InputTag';
import {useSelector} from 'react-redux';
import {addCampusOperation} from '../services/operations/onBoardOperation';
import {Modal} from 'react-bootstrap';
import { campusValidation } from '../utils/validation';
// import ModalFooter from "react-bootstrap/ModalFooter";
// import { useNavigate } from "react-router-dom";

const CampusModal = ({payload, isEdit, show, handleClose, cb}) => {
  const {address, admin, email, phone, name, id} = payload;
  const {selectedSchool, userData} = useSelector(state => state.userInfo);
  const [formData, setFormData] = useState({
    address: '',
    admin_email: '',
    admin_mobile: '',
    admin_password: '',
    admin_username: '',
    concerned_person: '',
    email: '',
    first_name: '',
    last_name: '',
    mobile: '',
    name: '',
    school_id: '',
    short_name: 'short',
  });

  useEffect(() => {
    if (isEdit && payload) {
      setFormData({
        address: address || '',
        email: email || '',
        mobile: phone || '',
        name: name || '',
        id: id,
        concerned_person: name || '',
      });
    } else {
      setFormData({
        admin_email: userData.authentication.principal.email,
        admin_mobile: userData.authentication.principal.mobile,
        first_name: userData.authentication.principal.firstName,
        last_name: userData.authentication.principal.lastName,
        school_id: selectedSchool.id,
      });
    }
  }, [payload, isEdit]);

  const handleInputChange = e => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };



  const handleSubmit = e => {
    e.preventDefault();
    let data = formData;
    if(campusValidation(data)){
      cb(data);
      setFormData({});
    }
  };


  

  return (
    <>
      <Modal
        show={show}
        onHide={() => {
          setFormData({});
          handleClose();
        }}>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? 'Edit Campus' : 'Create Campus'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="ModalForm" onSubmit={handleSubmit}>
            <div className="d-flex">
              <InputTag
                placeholder="Campus Name*"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <InputTag
                // style={{cursor: `${isEdit ? 'not-allowed' : 'default'}`}}
                placeholder="Concern Person*"
                type="text"
                name="concerned_person"
                value={formData.concerned_person}
                onChange={handleInputChange}
                disabled={isEdit ? 'disabled' : ''}
                required
              />
            </div>
            <div className="d-flex">
              <InputTag
                // style={{cursor: `${isEdit ? 'not-allowed' : 'default'}`}}
                placeholder="Campus Username*"
                type="text"
                name="admin_username"
                value={
                  formData.admin_username
                    ? formData.admin_username
                    : admin?.username
                }
                onChange={handleInputChange}
                disabled={isEdit ? 'disabled' : ''}
                required
              />
              <InputTag
                // style={{cursor: `${isEdit ? 'not-allowed' : 'default'}`}}
                placeholder="Campus Password*"
                type="password"
                name="admin_password"
                value={
                  formData.admin_password
                    ? formData.admin_password
                    : admin?.password
                }
                onChange={handleInputChange}
                disabled={isEdit ? 'disabled' : ''}
                password={true}
                required
              />
            </div>

            <div className="d-flex">
              <InputTag
                placeholder="Mobile*"
                type="number"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                required
              />
              <InputTag
                placeholder="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <InputTag
                textareaOn={true}
                style={{width: '95%'}}
                placeholder="Address*"
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>
            <div
              style={{
                width: '98%',
                marginTop: '10px',
                flex: 'end',
                display: 'flex',
                justifyContent: 'flex-end',
              }}>
              <button
                type="submit"
                className="addModalButton"
                // onClick={UpdateCampusApi()}
              >
                {isEdit ? 'Update +' : 'Add +'}
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CampusModal;
