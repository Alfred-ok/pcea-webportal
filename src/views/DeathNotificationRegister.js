import React, { useState } from "react";
import {
  CCard,
  CCardBody,
  CForm,
  CFormLabel,
  CFormInput,
  CFormTextarea,
  CButton,
  CAlert,
  CRow,
  CCol,
  CCardTitle,
} from "@coreui/react";
import { MdReceiptLong } from "react-icons/md";

const DeathNotificationRegister = () => {
  const [formData, setFormData] = useState({
    deceased_name: "",
    id_number: "",
    date_of_death: "",
    place_of_death: "",
    reported_by: "",
    reporter_contact: "",
    relationship: "",
    remarks: "",
    created_at: new Date().toISOString().split("T")[0],
    dateofbirth: "",
    zp_number: "" 
  });

  const [alert, setAlert] = useState({ message: "", type: "" });

  // Handle form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData)

    try {
      const response = await fetch(
        
        //"http://197.232.170.121:8594/api/registrations/DeathNotification",
        `${import.meta.env.VITE_BASE_URL}/DeathNotification`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      console.log(response);

      if (response.ok ) {
        setAlert({ message: "Service request registered successfully", type: "success" });
        setFormData({
          deceased_name: "",
          id_number: "",
          date_of_death: "",
          place_of_death: "",
          reported_by: "",
          reporter_contact: "",
          relationship: "",
          remarks: "",
          created_at: new Date().toISOString().split("T")[0],
          dateofbirth: "",
          zp_number: "" 
        });
      } else {
        setAlert({ message: response.statusDescription, type: "danger" });
      }
    } catch (error) {
      setAlert({ message: "Error submitting data.", type: "danger" });
    }
  };

  return (
    <CCard className="p-2" style={{  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", maxWidth: "70rem", margin:"0 auto" }}>
      <CCardBody>
        
        <CCardTitle>
            <CAlert color="primary" variant="solid" style={{ display: "flex" }}>
              <MdReceiptLong className="nav-icon" size={40} />
              <h3>Death Notification Registration</h3>
            </CAlert>
        </CCardTitle>

        {alert.message && <CAlert color={alert.type}>{alert.message}</CAlert>}

        <CForm onSubmit={handleSubmit}>
          <CRow>
            <CCol md={6}>
              <CFormLabel style={{color:"blue"}}>Deceased Name (Full name)</CFormLabel>
              <CFormInput type="text" name="deceased_name" value={formData.deceased_name} onChange={handleChange} required />
            </CCol>

            <CCol md={6}>
              <CFormLabel style={{color:"blue"}}>ID Number</CFormLabel>
              <CFormInput type="number" name="id_number" value={formData.id_number} onChange={handleChange} required />
            </CCol>
          </CRow>

          <CRow className="mt-3">
            <CCol md={6}>
              <CFormLabel style={{color:"blue"}}>Date of Death</CFormLabel>
              <CFormInput type="date" name="date_of_death" value={formData.date_of_death} onChange={handleChange} required />
            </CCol>

            <CCol md={6}>
              <CFormLabel style={{color:"blue"}}>Place of Death</CFormLabel>
              <CFormInput type="text" name="place_of_death" value={formData.place_of_death} onChange={handleChange} required />
            </CCol>
          </CRow>

          <CRow className="mt-3">
            <CCol md={6}>
              <CFormLabel style={{color:"blue"}}>Reported By</CFormLabel>
              <CFormInput type="text" name="reported_by" value={formData.reported_by} onChange={handleChange} required />
            </CCol>

            <CCol md={6}>
              <CFormLabel style={{color:"blue"}}>Reporter Contact</CFormLabel>
              <CFormInput type="number" name="reporter_contact" value={formData.reporter_contact} onChange={handleChange} required />
            </CCol>
          </CRow>

          <CRow className="mt-3">
            <CCol md={6}>
              <CFormLabel style={{color:"blue"}}>Relationship</CFormLabel>
              <CFormInput type="text" name="relationship" value={formData.relationship} onChange={handleChange} required />
            </CCol>

            <CCol md={6}>
              <CFormLabel style={{color:"blue"}}>Date of Birth</CFormLabel>
              <CFormInput type="date" name="dateofbirth" value={formData.dateofbirth} onChange={handleChange} required />
            </CCol>
          </CRow>

          <CRow className="mt-3">
            <CCol md={6}>
              <CFormLabel style={{color:"blue"}}>ZP Number <i>e.g ZP123456</i></CFormLabel>
              <CFormInput type="text" name="zp_number" value={formData.zp_number} onChange={handleChange} required />
            </CCol>

            <CCol md={6}>
              <CFormLabel style={{color:"blue"}}>Remarks</CFormLabel>
              <CFormTextarea name="remarks" value={formData.remarks} onChange={handleChange} rows="2" />
            </CCol>
          </CRow>

          <CButton type="submit" color="primary" className="mt-4">Register</CButton>
        </CForm>
      </CCardBody>
    </CCard>
  );
};

export default DeathNotificationRegister;
