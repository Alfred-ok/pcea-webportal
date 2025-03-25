import React, { useState } from "react";
import {
  CCard,
  CCardBody,
  CCardTitle,
  CForm,
  CFormInput,
  CFormLabel,
  CButton,
  CRow,
  CCol,
  CInputGroup,
  CInputGroupText,
  CAlert,
  CFormSelect,
} from "@coreui/react";
import { cilUser, cilPhone, cilBriefcase, cilPeople, cilBadge, cilBuilding, cilTask, cilArrowLeft, cilArrowThickLeft } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { MdReceiptLong } from "react-icons/md";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router";

const EmployeeRegistration = () => {

  let navigate = useNavigate();  

  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    surname: "",
    idNumber: "",
    phoneNumber: "",
    department: "",
    jobType: "",
    profession: "",
    employeeNo: "",
    status:"1"
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${import.meta.env.VITE_SECOND_BASE_URL}/api/employee/save`/*"http://197.232.170.121:8595/api/employee/save"*/, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to register employee");
      }
      

      const responseText = await response.text();

      console.log(response);
      console.log(responseText)

      if(response.ok){
        if (responseText.trim() == "Employee exists!") {
            Swal.fire({
              icon: "error",
              title: "Employee Already Exists",
              text: "Failed to register employee",
            });
            return; // Stop further execution if there's a conflict
        }else{

          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "Employee registered successfully",
          }).finally(() => {
            navigate("/employees")
          });
        }
      }
      
      
      
      setFormData({
        firstName: "",
        middleName: "",
        surname: "",
        idNumber: "",
        phoneNumber: "",
        department: "",
        jobType: "",
        profession: "",
        employeeNo: "",
        status:"1"
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to register employee",
      });
    }
  };

  return (
    <>
      <CCard className="d-flex justify-content-center mt-4 p-3" style={{  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", maxWidth: "70rem", margin:"0 auto" }}>
        <CCardBody>
          <CCardTitle className="mb-3">
            <CButton onClick={()=>navigate(-1)} color="primary" variant="outline"><CIcon icon={cilArrowThickLeft} style={{marginRight:"6px"}} />Back</CButton>
          </CCardTitle>
          <CCardTitle>
            <CAlert color="primary" variant="solid" style={{ display: "flex" }}>
            <svg style={{marginRight:"8px"}} xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" class="bi bi-person-fill-add" viewBox="0 0 16 16">
                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4"/>
              </svg>
              <h3>Employee Registration Form</h3>
            </CAlert>
          </CCardTitle>
          <CForm onSubmit={handleSubmit}>
            <CRow>
              <CCol md={6}>
                <CFormLabel>First Name</CFormLabel>
                <CInputGroup className="mb-2">
                  <CInputGroupText  style={{
                        borderColor: "rgb(71, 71, 212)",
                        backgroundColor: "rgb(71, 71, 212)",
                        color: "#fff",
                      }}><CIcon icon={cilUser} /></CInputGroupText>
                  <CFormInput
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    style={{ borderColor: "blue" }}
                  />
                </CInputGroup>
              </CCol>
              <CCol md={6}>
                <CFormLabel>Middle Name</CFormLabel>
                <CInputGroup className="mb-2">
                <CInputGroupText  style={{
                        borderColor: "rgb(71, 71, 212)",
                        backgroundColor: "rgb(71, 71, 212)",
                        color: "#fff",
                      }}><CIcon icon={cilUser} /></CInputGroupText>
                <CFormInput
                  type="text"
                  name="middleName"
                  placeholder="Middle Name"
                  value={formData.middleName}
                  onChange={handleChange}
                  style={{ borderColor: "blue" }}
                />
                </CInputGroup>
              </CCol>
            </CRow>
            <CRow>
              <CCol md={6}>
                <CFormLabel>Surname</CFormLabel>
                <CInputGroup>
                <CInputGroupText  style={{
                        borderColor: "rgb(71, 71, 212)",
                        backgroundColor: "rgb(71, 71, 212)",
                        color: "#fff",
                      }}><CIcon icon={cilUser} /></CInputGroupText>
                <CFormInput
                  type="text"
                  name="surname"
                  placeholder="surname"
                  value={formData.surname}
                  onChange={handleChange}
                  style={{ borderColor: "blue" }}
                />
                </CInputGroup>
              </CCol>
              <CCol md={6}>
                <CFormLabel>National ID</CFormLabel>
                <CInputGroup>
                <CInputGroupText  style={{
                        borderColor: "rgb(71, 71, 212)",
                        backgroundColor: "rgb(71, 71, 212)",
                        color: "#fff",
                      }}><CIcon icon={cilBadge} /></CInputGroupText>
                <CFormInput
                  type="number"
                  name="idNumber"
                  placeholder="National ID"
                  value={formData.idNumber}
                  onChange={handleChange}
                  style={{ borderColor: "blue" }}
                />
                </CInputGroup>
              </CCol>
            </CRow>
            <CRow>
              <CCol md={6}>
                <CFormLabel>Phone Number</CFormLabel>
                <CInputGroup className="mb-2">
                  <CInputGroupText  style={{
                        borderColor: "rgb(71, 71, 212)",
                        backgroundColor: "rgb(71, 71, 212)",
                        color: "#fff",
                      }}><CIcon icon={cilPhone} /></CInputGroupText>
                  <CFormInput
                    type="text"
                    name="phoneNumber"
                    placeholder="Mobile"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    style={{ borderColor: "blue" }}
                  />
                </CInputGroup>
              </CCol>
              <CCol md={6}>
                <CFormLabel>Department</CFormLabel>
                <CInputGroup>
                <CInputGroupText  style={{
                        borderColor: "rgb(71, 71, 212)",
                        backgroundColor: "rgb(71, 71, 212)",
                        color: "#fff",
                      }}><CIcon icon={cilBuilding} /></CInputGroupText>
                
                <CFormSelect name="department" value={formData.department} onChange={handleChange} style={{ borderColor: "blue" }}>
                    <option>Department</option>
                    <option value="Parish">Parish</option>
                    <option value="CBM">CBM</option>
                    <option value="NIMPA">NIMPA</option>
                </CFormSelect>
                </CInputGroup>
              </CCol>
            </CRow>
            <CRow>
              <CCol md={6}>
                <CFormLabel>Job Type</CFormLabel>
                <CInputGroup>
                <CInputGroupText  style={{
                        borderColor: "rgb(71, 71, 212)",
                        backgroundColor: "rgb(71, 71, 212)",
                        color: "#fff",
                      }}><CIcon icon={cilTask} /></CInputGroupText>
                <CFormSelect name="jobType" value={formData.jobType} onChange={handleChange} style={{ borderColor: "blue" }}>
                    <option>Job Type</option>
                    <option value="Permanent">Permanent</option>
                    <option value="Intern">Intern</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Casuals">Casuals</option>
                    <option value="Employment Contract">Employment Contract</option>
                    <option value="Service Contract">Service Contract</option>
                </CFormSelect>
                </CInputGroup>
              </CCol>
              <CCol md={6}>
                <CFormLabel>Profession</CFormLabel>
                <CInputGroup className="mb-3">
                  <CInputGroupText  style={{
                        borderColor: "rgb(71, 71, 212)",
                        backgroundColor: "rgb(71, 71, 212)",
                        color: "#fff",
                      }}><CIcon icon={cilBriefcase} /></CInputGroupText>
                  <CFormInput
                    type="text"
                    name="profession"
                    placeholder="Profession"
                    value={formData.profession}
                    onChange={handleChange}
                    style={{ borderColor: "blue" }}
                  />
                </CInputGroup>
              </CCol>
              <CCol md={6}>
              <CFormLabel>Employee Number</CFormLabel>
                <CInputGroup className="mb-3">
                  <CInputGroupText  style={{
                        borderColor: "rgb(71, 71, 212)",
                        backgroundColor: "rgb(71, 71, 212)",
                        color: "#fff",
                      }}><CIcon icon={cilBriefcase} /></CInputGroupText>
                  <CFormInput
                    type="text"
                    name="employeeNo"
                    placeholder="Employee Number"
                    value={formData.employeeNo}
                    onChange={handleChange}
                    style={{ borderColor: "blue" }}
                  />
                </CInputGroup>
              </CCol>
            </CRow>
            <CButton type="submit" color="primary">
              Register
            </CButton>
          </CForm>
        </CCardBody>
      </CCard>
    </>
  );
};

export default EmployeeRegistration;

