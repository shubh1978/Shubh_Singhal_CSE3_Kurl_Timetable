import React, {useState} from 'react';
import {Modal} from 'react-bootstrap';
import InputTag from './InputTag';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';

export default function ChangePassModal({showModal, setShowModal, cb}) {
  const {userData} = useSelector(state => state.userInfo);

  const [formData, setFormData] = useState({
    username: userData?.authentication?.principal?.username,
    currentPassword: '',
    newPassword: '',
  });
  const [confPassword, setConfPassword] = useState('');

  const handleInputChange = e => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (confPassword != formData.newPassword)
      toast.error('password and confirm password are different', {
        autoClose: 200,
      });
    else cb(formData);
  }

  return (
    <Modal
      show={showModal}
      onHide={() => {
        setShowModal(false);
      }}>
      <Modal.Header closeButton>
        <Modal.Title>Change password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className="ModalForm" onSubmit={handleSubmit} style={{}}>
          {/* <input
                            style={{ cursor: `${true ? "not-allowed" : "default"}` }}
                            className="w-100"
                            placeholder="Username*"
                            type="text"
                            name="username"
                            required
                            value={userData?.authentication?.principal?.username}
                            onChange={handleInputChange}
                        /> */}
          {/* <input
                            style={{ cursor: `${false ? "not-allowed" : "default"}` }}
                            className="w-100"
                            placeholder="Current Password*"
                            type='password'
                            name="currentPassword"
                            required
                            value={formData.currentPassword}
                            onChange={handleInputChange}
                        /> */}

          <InputTag
            placeholder="Current Password*"
            type="password"
            name="currentPassword"
            required
            value={formData.currentPassword}
            onChange={handleInputChange}
          />
          <InputTag
            placeholder="New Password*"
            type="password"
            name="newPassword"
            required
            value={formData.newPassword}
            onChange={handleInputChange}
          />
          <InputTag
            placeholder="Confirm Password*"
            type="password"
            name="confPassword"
            required
            value={confPassword}
            onChange={e => setConfPassword(e.target.value)}
          />

          <div
            style={{
              width: '98%',
              marginTop: '10px',
              flex: 'end',
              display: 'flex',
              justifyContent: 'flex-end',
            }}>
            <button type="submit" className="addModalButton">
              Update
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
