import React, { useState, useEffect } from 'react';
import {
  CDropdown, CDropdownMenu, CFormSelect, CDropdownToggle, CDropdownItem, CModal,
  CModalHeader, CModalBody, CModalFooter, CButton, CForm, CFormInput, CFormLabel
} from '@coreui/react';
import swal from 'sweetalert';

const AppHeaderDropdown = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    Names: '', UserName: '', Email: '', Gender: '', MobileNumber: '',
    Designation: 'USER', Role: 'USER'
  });
  const [loggedUsername, setLoggedUsername] = useState(localStorage.getItem('username') || 'Guest');
  const [roleId, setRoleId] = useState(localStorage.getItem('roleId'));

  const handleInputChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "Role" ? { Designation: value } : {}) // Auto-update Designation based on Role
    }));
  };

  const validateFormData = () => {
    const { Names, UserName, Email, MobileNumber } = formData;
    if (!Names.trim() || !UserName.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email) || !/^\d{10}$/.test(MobileNumber)) {
      swal('Validation Error', 'Please enter valid details.', 'warning');
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (roleId !== '1') return swal('Access Denied', 'Permission required.', 'error');
    if (!validateFormData()) return;

    console.log("Data being sent to API:", formData);
    
    try {
      const response = await fetch('http://197.232.170.121:8598/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      response.ok ? swal('Success', 'User added!', 'success') : swal('Error', result.message || 'Unexpected error', 'error');
      if (response.ok) setModalVisible(false);
    } catch {
      swal('Error', 'Something went wrong.', 'error');
    }
  };

  return (
    <>
      <CDropdown>
        <CDropdownToggle className="py-0 pe-0" caret={false}>
          <div style={{ textAlign: 'center' }}>
            <img src="/src/assets/images/user.png" alt="User" style={{ height: 35, width: 35, borderRadius: '50%', marginBottom: 5 }} />
            <p style={{ fontWeight: 'bold', fontSize: '0.9rem', margin: 0, color: '#333' }}>{loggedUsername}</p>
          </div>
        </CDropdownToggle>
        <CDropdownMenu className="pt-0" placement="bottom-end">
          {roleId === '1' && <CDropdownItem style={{ color: 'blue', fontWeight: 'bold' }} href="#" onClick={() => setModalVisible(true)}>Add User</CDropdownItem>}
        </CDropdownMenu>
      </CDropdown>

      <CModal  visible={modalVisible} onClose={() => setModalVisible(false)} >
        <CModalHeader style={{color:"blue", fontWeight:"bold"}}>Add New User</CModalHeader>
        <CModalBody  style={{ maxHeight: '60vh', overflowY: 'auto' }}>
          <CForm style={{ color: 'blue', fontWeight: 'bold' }}>
            {['Names', 'UserName', 'Email', 'MobileNumber'].map((field) => (
              <div key={field} className="mb-3">
                <CFormLabel style={{ color: 'blue' }}>{field.replace(/([A-Z])/g, ' $1')}</CFormLabel>
                <CFormInput name={field} placeholder={`Enter ${field}`} value={formData[field]} onChange={handleInputChange} />
              </div>
            ))}
            <div className="mb-3">
              <CFormLabel style={{ color: 'blue', fontWeight:"bold" }}>Gender</CFormLabel>
              <CFormSelect name="Gender" value={formData.Gender} onChange={handleInputChange}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </CFormSelect>
            </div>

            <div className="mb-3">
              <CFormLabel style={{ color: 'blue' }}>Role</CFormLabel>
              <CFormSelect name="Role" value={formData.Role} onChange={handleInputChange}>
                <option value="">Select Role</option>
                <option value="EVANGELIST">Evangelist</option>
                <option value="USER">Parish Minister</option>
              </CFormSelect>
            </div>

            <div className="mb-3">
              <CFormLabel style={{ color: 'blue' }}>Designation</CFormLabel>
              <CFormInput name="Designation" value={formData.Designation} readOnly />
            </div>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalVisible(false)}>Cancel</CButton>
          <CButton color="primary" onClick={handleRegister}>Add User</CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default AppHeaderDropdown;
