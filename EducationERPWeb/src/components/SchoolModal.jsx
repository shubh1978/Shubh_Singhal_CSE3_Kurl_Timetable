import React, {useEffect, useState} from 'react';
import '../assets/css/SchoolModal.css';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import {toast} from 'react-toastify';
import InputTag from './InputTag';
import {addSchoolOperation} from '../services/operations/onBoardOperation';
import {Modal} from 'react-bootstrap';
import {schoolDataValidation} from '../utils/validation';
// import { useNavigate } from "react-router-dom";

const SchoolModal = ({payload, isEdit, show, handleClose, cb}) => {
  const {address, admin, email, mobile, name, id} = payload;

  const [formData, setFormData] = useState({
    address: '',
    admin_email: '',
    admin_mobile: '',
    admin_password: '',
    admin_username: '',
    email: '',
    first_name: '',
    last_name: '',
    mobile: '',
    name: '',
    short_name: '',
    suspended: false,
  });

  useEffect(() => {
    if (isEdit && payload) {
      setFormData({
        address: address || '',
        email: email || '',
        mobile: mobile || '',
        name: name || '',
        suspended: false,
        id: id,
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
    if (schoolDataValidation(data)) {
      cb(data);
      setFormData({});
    }
  };

  return (
    <Modal
      show={show}
      onHide={() => {
        setFormData({});
        handleClose();
      }}>
      <Modal.Header closeButton>
        <Modal.Title>{isEdit ? 'Edit School' : 'Create School'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          className="scrollable-container"
          style={{height: '400px', overflow: 'scroll',overflowX:"hidden"}}>
          {
            <form className="ModalForm" onSubmit={handleSubmit}>
              <div className="school-listdesign">
                <div className="d-flex">
                  <InputTag
                    // style={{cursor: `${isEdit ? 'not-allowed' : 'text'}`}}
                    isEdit={isEdit}
                    placeholder="Admin Username*"
                    name="admin_username"
                    required
                    value={
                      formData.admin_username
                        ? formData.admin_username
                        : admin?.username
                    }
                    onChange={handleInputChange}
                    disabled={isEdit ? 'disabled' : ''}
                  />
                  <InputTag
                    // style={{cursor: `${isEdit ? 'not-allowed' : 'text'}`}}
                    placeholder="Admin Mobile*"
                    type="number"
                    name="admin_mobile"
                    value={
                      formData.admin_mobile
                        ? formData.admin_mobile
                        : admin?.mobile
                    }
                    onChange={handleInputChange}
                    disabled={isEdit ? 'disabled' : ''}
                  />
                </div>

                <div className="d-flex">
                  <InputTag
                    placeholder="Admin Password*"
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
                    // style={{cursor: `${isEdit ? 'not-allowed' : ''}`}}
                  />
                  <InputTag
                    // style={{cursor: `${isEdit ? 'not-allowed' : ''}`}}
                    placeholder="Admin Email"
                    type="email"
                    name="admin_email"
                    value={
                      formData.admin_email ? formData.admin_email : admin?.email
                    }
                    onChange={handleInputChange}
                    disabled={isEdit ? 'disabled' : ''}
                  />
                </div>

                <div className="d-flex">
                  <InputTag
                    placeholder=" School Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                  <InputTag
                    // style={{cursor: `${isEdit ? 'not-allowed' : 'default'}`}}
                    placeholder="First Name"
                    type="text"
                    name="first_name"
                    value={
                      formData.first_name
                        ? formData.first_name
                        : admin?.firstName
                    }
                    onChange={handleInputChange}
                    disabled={isEdit ? 'disabled' : ''}
                  />
                </div>

                <div className="d-flex">
                  <InputTag
                    // style={{cursor: `${isEdit ? 'not-allowed' : 'default'}`}}
                    placeholder="Last Name"
                    type="text"
                    name="last_name"
                    value={
                      formData.last_name ? formData.last_name : admin?.lastName
                    }
                    onChange={handleInputChange}
                    disabled={isEdit ? 'disabled' : ''}
                  />
                  <InputTag
                    placeholder="Mobile"
                    type="number"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="d-flex">
                  <InputTag
                    placeholder="School Name*"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                  <InputTag
                    // style={{cursor: `${isEdit ? 'not-allowed' : 'default'}`}}
                    placeholder="Short Name"
                    type="text"
                    name="short_name"
                    value={
                      formData.short_name
                        ? formData.short_name
                        : admin?.shortName
                    }
                    onChange={handleInputChange}
                    disabled={isEdit ? 'disabled' : ''}
                  />
                </div>

                <InputTag
                  textareaOn={true}
                  placeholder="School Address*"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </form>
          }
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
            type="button"
            onClick={handleSubmit}
            className="addModalButton">
            {isEdit ? 'Update +' : 'Add +'}
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SchoolModal;
