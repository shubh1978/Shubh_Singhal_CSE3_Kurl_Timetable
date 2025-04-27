import React from 'react';
import {Dropdown, DropdownButton} from 'react-bootstrap';
import {FaEllipsisV} from 'react-icons/fa';

const RowActionMenu = ({
  staff,
  setIsEdit,
  setShow,
  setUpdatedStaffData,
  setEditData,
  setShowDeleteModal,
  visibleActions = ['edit', 'view', 'suspend', 'delete'], // Default to showing all actions
}) => {
  const viewStaff = () => {
    console.log('Viewing', staff);
  };

  const suspendStaff = () => {
    console.log('Suspending', staff);
  };

  const editStaff = () => {
    setIsEdit(true);
    setShow(true);
    setUpdatedStaffData(staff);
    setEditData(staff);
  };

  const deleteStaff = () => {
    setShowDeleteModal(staff);
  };

  const actionComponents = {
    view: <Dropdown.Item onClick={viewStaff}>View</Dropdown.Item>,
    suspend: <Dropdown.Item onClick={suspendStaff}>Suspend</Dropdown.Item>,
    edit: <Dropdown.Item onClick={editStaff}>Edit</Dropdown.Item>,
    delete: (
      <Dropdown.Item style={{color: 'red'}} onClick={deleteStaff}>
        Delete
      </Dropdown.Item>
    ),
  };

  return (
    <td style={{textAlign: 'right'}}>
      <DropdownButton
        variant=""
        drop="start"
        title={
          <FaEllipsisV
            className="threeDots"
            style={{color: 'black', visibility: 'visible'}}
          />
        }>
        {visibleActions.map(action => actionComponents[action])}
      </DropdownButton>
    </td>
  );
};

export default RowActionMenu;
