import React, {useEffect, useState} from 'react';
import '../assets/css/SchoolModal.css';
import '../assets/css/GroupModal.css';
import '../assets/css/SubjectModal.css';
import {FaChevronDown, FaChevronRight} from 'react-icons/fa';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import InputTag from './InputTag';

import {useSelector} from 'react-redux';
// import {
//   addSubjectOperation,
//   updateSubjectOperation,
// } from '../services/operations/subjectOperations';
import {getClassListByIdOperation} from '../services/operations/classOperation';
import {Modal} from 'react-bootstrap';
// import {toast} from 'react-toastify';
import {SubjectValidation} from '../utils/validation';

const SubjectModal = ({
  payload,
  isEdit,
  handleClose,
  show,
  cb,
  SubjectData,
}) => {
  const [classQueue, setClassQueue] = useState([]);
  const [classArray, setClassArray] = useState([]);
  const [sectionQueue, setSectionQueue] = useState([]);
  const {selectedShift, selectedCampus} = useSelector(state => state.userInfo);
  const [selected, setSelected] = useState(false);

  const [formData, setFormData] = useState({
    classes: '',
    name: '',
    sections: '',
    shiftId: selectedShift.id,
    shortName: '',
    subCategory: '',
    priority: false,
    multipleTeacher: false
  });


  useEffect(() => {
    if (isEdit && payload) {
      setFormData({
        name: payload.name || '',
        shortName: payload.shortName || '',
        id: payload.id,
        classes: payload.classList?.map((e)=>e.id) || '',
        sections: payload.sectionList?.map((e)=>e.id) || '',
        subCategory: payload?.subCategory,
        priority: payload?.isPriority,
        multipleTeacher: payload?.multipleTeacher,
      });
    }
    getClassListByIdOperation(selectedShift.id, setClassQueue);
  }, [payload, isEdit, selectedShift.id]);
  const handleInputChange = e => {
    const {name, value} = e.target;
    setFormData(prev => ({...prev, [name]: value}));
  };

  const handleCheckboxChange = (id, field, stateUpdater) => {
    setFormData(prev => {
      const updatedArray = prev[field].includes(id)
        ? prev[field].filter(i => i !== id)
        : [...prev[field], id];
      return {...prev, [field]: updatedArray};
    });
    stateUpdater(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id],
    );
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (isEdit || SubjectValidation(formData)) {
      cb(formData);
      // resetForm();
    } else {
      if (SubjectValidation(formData)) {
        resetForm();
        cb(formData);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      classes: '',
      name: '',
      sections: '',
      shiftId: selectedShift.id,
      shortName: '',
      priority: false
    });
    setSelected(false);
  };

  const toggle = i => setSelected(prev => (prev === i ? false : i));

  return (
    <Modal
      show={show}
      onHide={() => {
        resetForm();
        handleClose();
      }}>
      <Modal.Header closeButton>
        <Modal.Title>{isEdit ? 'Edit Subject' : 'Create Subject'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {
          <form className="ModalForm" onSubmit={handleSubmit}>
            <InputTag
              placeholder="Subject*"
              type="text"
              name="name"
              value={formData?.name}
              onChange={handleInputChange}
            />
            <InputTag
              placeholder="Sub-Categories(FootBall, Music, Dance, Cricket...)"
              type="text"
              name="subCategory"
              value={formData?.subCategory}
              onChange={handleInputChange}
            />
            <InputTag
              placeholder="Short Form*"
              type="text"
              name="shortName"
              value={formData?.shortName}
              onChange={handleInputChange}
            />

          <div className="d-flex">
            <div className='d-flex align-items-center ms-1 justify-content-start'>
              <input type="checkbox" checked={formData?.priority} style={{width:'min-content'}}
                onChange={e => {
                  setFormData({...formData, priority: e.target.checked});
                }}
              />
              <p style={{}} className='mb-0'>
                Is Priority
              </p>
            </div>

            <div className='d-flex align-items-center ms-1 justify-content-end'>
              <input type="checkbox" checked={formData?.multipleTeacher} style={{width:'min-content'}}
                onChange={e => {
                  setFormData({...formData, multipleTeacher: e.target.checked});
                }}
              />
              <p style={{}} className='mb-0'>
                Multiple Teachers
              </p>
            </div>


          </div>

            <div
              style={{
                height: '210px',
                overflow: 'scroll',
              }}
              className="primarydiv checkboxdiv">
              <p
                style={{
                  fontWeight: '700',
                  fontSize: '16px',
                  color: 'rgba(103, 103, 103, 1)',
                }}>
                Select Classes & Sec*
              </p>
              {classQueue.map((Section, i) => (
                <div key={i}>
                  <lable>
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                      <input type="checkbox"
                        checked={formData?.classes && formData?.classes.includes(Section.id)}
                        onChange={e => {
                          const sectionId = Section.id;
                          let newClassArray;
                          let newSectionsArray;
                          if (e.target.checked) {
                            newClassArray = [...formData?.classes, sectionId];
                            const newSections = Section.sectionList.map(item => item.id);
                            newSectionsArray = [...new Set([...formData.sections, ...newSections])];
                          } else {
                            newClassArray = formData?.classes.filter(id => id !== sectionId);
                            const sectionsToRemove = Section.sectionList.map(item => item.id);
                            newSectionsArray = formData.sections.filter(id => !sectionsToRemove.includes(id));
                          }
                          setFormData({...formData, classes: newClassArray, sections: newSectionsArray});
                        }}
                      />
                      {Section.name}
                      <button className="select" type="button" onClick={() => toggle(i)}>
                        <span>
                          {selected === i ? (<FaChevronDown />) : (<FaChevronRight />)}
                        </span>
                      </button>
                    </div>

                    <div className={selected === i ? 'sub-menu-down' : 'sub-menu'}>
                      {Section.sectionList.sort((a, b) => a.name.localeCompare(b.name)).map((item, idx) => (
                        <div key={idx}
                          style={{display: 'flex',alignItems: 'center',width: 'fit-content',gap: '10px'}}>
                          <input type="checkbox" checked={formData.sections.includes(item.id)}
                            onChange={e => {
                              const itemId = item.id;
                              let newClasses = formData.classes
                              let newQueue;
                              if (e.target.checked) {
                                newQueue = [...formData.sections, itemId];
                                newClasses = [...formData.classes,Section.id];
                              } else {
                                newQueue = formData.sections.filter(id => id !== itemId);
                                const classBasedSections = Section.sectionList
                                const cbsFiltered = classBasedSections.filter((cbs)=>newQueue.includes(cbs.id))
                                if(cbsFiltered?.length==0) newClasses = formData.classes.filter(id => id !== Section.id);
                              }
                              setFormData({...formData, sections: newQueue, classes: newClasses});
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
            <div
              style={{
                marginTop: '10px',
                flex: 'end',
                display: 'flex',
                justifyContent: 'flex-end',
              }}>
              <button
                type="submit"
                className="addModalButton"
                style={{width: '45%'}}
                // onClick={UpdateSubjectApi}
              >
                {isEdit ? 'Update +' : 'Add +'}
              </button>
            </div>
          </form>
        }
      </Modal.Body>
    </Modal>
  );
};

export default SubjectModal;
