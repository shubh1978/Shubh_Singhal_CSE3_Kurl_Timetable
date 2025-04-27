import React, {useEffect, useState} from 'react';
import '../assets/css/SchoolModal.css';
import '../assets/css/ShiftModal.css';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import InputTag from './InputTag';
import {Modal} from 'react-bootstrap';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';

const ClassModal = ({payload, isEdit, show, handleClose, cb, classData}) => {
  const {selectedShift, selectedCampus} = useSelector(state => state.userInfo);
  const [formData, setFormData] = useState({
    campus_id: '',
    name: '',
    sections: [],
    shift_id: '',
  });

  useEffect(() => {
    if (isEdit && payload) {
      setFormData({
        name: payload?.name || '',
        id: payload.id,
        sections: payload?.sectionList
          ? payload.sectionList.map(section => section.name)
          : [],
      });
    } else {
      setFormData({
        campus_id: selectedCampus?.id,
        name: '',
        sections: [],
        shift_id: selectedShift?.id,
      });
    }
  }, [payload, isEdit]);

  const handleInputChange = e => {
    const {name, value} = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({
      campus_id: selectedCampus?.id || '',
      name: '',
      sections: [],
      shift_id: selectedShift?.id || '',
    });
  };

  const validateFormData = () => {
    // if (classData.some(it => it.name === formData.name)) {
    //   toast.error('Class already exists');
    //   return false;
    // }

    // if (formData.name.length != 1) {
    //   toast.error('Single class name required');
    //   return false;
    // }
    if (!isEdit && formData.sections.length === 0) {
      toast.error('At least one section is required');
      return false;
    }
    return true;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (validateFormData()) {
      cb(formData);
      resetForm();
    }
  };

  const handleSection = e => {
    if (e.key.match(/^[A-Za-z]$/) && !e.getModifierState('Shift')) {
      let sectionList = [...formData.sections, e.key.toUpperCase()];
      setFormData({
        ...formData,
        sections: sectionList,
      });
    }
    if (e.key === 'Backspace' && e.target.value) {
      let sectionList = [...formData?.sections];
      sectionList.pop();
      setFormData({
        ...formData,
        sections: sectionList,
      });
    }
  };

  return (
    <Modal
      show={show}
      onHide={() => {
        resetForm();
        handleClose();
      }}>
      <Modal.Header closeButton>
        <Modal.Title>{isEdit ? 'Edit Class' : 'Create Class'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="ModalForm" onSubmit={handleSubmit}>
          <div>
            <InputTag
              placeholder="Enter Class here*"
              type="text"
              name="name"
              value={formData?.name}
              onChange={handleInputChange}
              // number={true}
              // required
            />
          </div>
          <div>
            <InputTag
              // style={{cursor: `${isEdit ? 'not-allowed' : ''}`}}
              placeholder="Sections eg. A, B, C*"
              type="text"
              value={formData.sections?.join(', ').toUpperCase()}
              onKeyDown={e => {
                handleSection(e);
              }}
              // required
              // disabled={isEdit ? true : false}
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
              style={{width: '45%'}}>
              {isEdit ? 'Update +' : 'Add +'}
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default ClassModal;
