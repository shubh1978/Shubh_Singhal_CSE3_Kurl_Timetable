import React, {useEffect, useState} from 'react';
import '../assets/css/SchoolModal.css';
import '../assets/css/GroupModal.css';
import {FaChevronDown, FaChevronUp, FaChevronRight} from 'react-icons/fa';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import InputTag from './InputTag';
import {useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import {Modal} from 'react-bootstrap';
import {getClassListByIdOperation} from '../services/operations/classOperation';
import {GrouptmodelValidation} from '../utils/validation';
import {getClassListForGroupOperation} from '../services/operations/groupOperations';

const GroupModal = ({
  payload,
  isEdit,
  show,
  handleClose,
  cb,
  classQueue,
  getClassList,
}) => {
  // const [classQueue, setclassQueue] = useState([]);
  const [sectionQueue, setSectionQueue] = useState([]);
  const [classArray, setClassArray] = useState([]);
  const {selectedCampus, selectedShift} = useSelector(state => state.userInfo);
  const [selected, setSelected] = useState(false);
  const [formData, setFormData] = useState({
    campus_id: selectedCampus?.id,
    class: classArray,
    name: '',
    sections: sectionQueue,
    shift_id: selectedShift.id,
  });

  useEffect(() => {
    if (isEdit && payload) {
      setFormData({
        name: payload?.name,
        class: payload?.classes?.name || '',
        sections: payload?.classes ? payload.classes.map(ele => ele.id) : [],
        group_id: payload?.id,
      });
      getClassList();
    }
  }, [payload, isEdit]);

  const resetForm = () => {
    setFormData({
      campus_id: selectedCampus?.id || '',
      class: classArray,
      name: '',
      sections: sectionQueue,
      shift_id: selectedShift?.id || '',
    });
    setSelected(false);
    setClassArray([]);
    setSectionQueue([]);
  };

  const handleInputChange = e => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // useEffect(() => {
  //   getClassList();
  // }, []);

  // function getClassList() {
  //   getClassListForGroupOperation(selectedShift.id, setclassQueue);
  // }

  const handleSubmit = e => {
    e.preventDefault();

    if (GrouptmodelValidation(formData)) {
      cb(formData);
      resetForm();
    }
  };

  const toggle = i => {
    if (selected === i) {
      return setSelected(false);
    }
    setSelected(i);
  };

  return (
    <Modal
      show={show}
      onHide={() => {
        resetForm();
        handleClose();
      }}>
      <Modal.Header closeButton>
        <Modal.Title>
          {isEdit ? 'Edit Group' : 'Create Group '}| {selectedShift?.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {
          <form className="ModalForm" onSubmit={handleSubmit}>
            <label className="boldText">
              <InputTag
                placeholder="Group Name*"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                // required
              />
              <p style={{color: 'red', fontWeight: '500', fontSize: '13px'}}>
                *Hint: Primary, Secondary, etc...
              </p>
            </label>

            <div
              style={{height: '230px', overflow: 'scroll'}}
              className="primarydiv checkboxdiv scroller">
              <p
                style={{
                  fontWeight: '700',
                  fontSize: '16px',
                  color: 'rgba(103, 103, 103, 1)',
                }}>
                Select Classes & Sec
              </p>
              {Array.isArray(classQueue) &&
                classQueue.map((Section, i) => (
                  <div key={i}>
                    <lable>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                        }}>
                        <input
                          type="checkbox"
                          // name=""
                          checked={formData.class.includes(Section.id)}
                          onChange={e => {
                            const sectionId = Section.id;

                            setClassArray(prevArray => {
                              let newClassArray;
                              let newSectionsArray;
                              if (e.target.checked) {
                                newClassArray = [...prevArray, sectionId];
                                const newSections = Section.sectionList.map(
                                  item => item.id,
                                );
                                newSectionsArray = [
                                  ...new Set([
                                    ...formData.sections,
                                    ...newSections,
                                  ]),
                                ];
                              } else {
                                newClassArray = prevArray.filter(
                                  id => id !== sectionId,
                                );
                                const sectionsToRemove =
                                  Section.sectionList.map(item => item.id);
                                newSectionsArray = formData.sections.filter(
                                  id => !sectionsToRemove.includes(id),
                                );
                              }

                              setFormData({
                                ...formData,
                                class: newClassArray,
                                sections: newSectionsArray,
                              });

                              return newClassArray;
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
                                checked={formData.sections.includes(item.id)}
                                onChange={e => {
                                  const itemId = item.id;

                                  setSectionQueue(prevQueue => {
                                    let newQueue;
                                    if (e.target.checked) {
                                      newQueue = [...prevQueue, itemId];
                                    } else {
                                      newQueue = prevQueue.filter(
                                        id => id !== itemId,
                                      );
                                    }

                                    setFormData({
                                      ...formData,
                                      sections: newQueue,
                                    });
                                    
                                    return newQueue;
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
                // onClick={UpdateGroupApi()}
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

export default GroupModal;