

import React, { useState } from "react";
import { CCard, CCardBody, CForm, CFormLabel, CFormInput, CButton, CContainer, CRow, CCol, CCardSubtitle, CCardTitle, CFormSelect, CAlert } from "@coreui/react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddMinister = () => {
  const [formData, setFormData] = useState({
    OfficiatingMinister: "",
    DATE: "",
    ServiceType: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/PostMinister`/*"http://197.232.170.121:8594/api/registrations/PostMinister"*/, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error("Failed to submit data");
      }
      
      const data = await response.json();
      data.status == "00"?
      Swal.fire({
        icon: "success",
        title: "Success",
        text: data.statusDescription
      }):Swal.fire({
        icon: "info",
        title: "Error",
        text: data.statusDescription
      });
      console.log(data);
    } catch (error) {
      console.error("Error submitting data:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to submit data."
      });
    }
  };

  return (
    <CContainer>
      <CRow className="justify-content-center">
        <CCol md={10}>
          <CCard>
            <CCardBody>
               <CCardSubtitle className="mb-3">
                <CButton color="primary" variant="outline" onClick={()=>navigate("/Minister")}>Go Back</CButton>
               </CCardSubtitle> 
              <CCardTitle>
              <CAlert variant="solid">
                <h2>Add Officiating Minister</h2>
              </CAlert>
              </CCardTitle>
              <CForm onSubmit={handleSubmit}>
                <CFormLabel>Officiating Minister</CFormLabel>
                <CFormInput
                  type="text"
                  name="OfficiatingMinister"
                  value={formData.OfficiatingMinister}
                  onChange={handleChange}
                  required
                />
                <CFormLabel className="mt-3">Date</CFormLabel>
                <CFormInput
                  type="date"
                  name="DATE"
                  value={formData.DATE}
                  onChange={handleChange}
                  required
                />
                <CFormLabel className="mt-3">Service Type</CFormLabel>
                <CFormSelect name="ServiceType" value={formData.ServiceType} onChange={handleChange} required>
                  <option value="">Select Services</option>
                  <option value="SpecialService">Special Service</option>
                  <option value="HolyCommunion">Holy Communion</option>
                  <option value="FirstService">First Service</option>
                  <option value="SecondService">Second Service</option>
                </CFormSelect>
                <CButton color="primary" type="submit" className="mt-4 w-100">
                  Submit
                </CButton>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default AddMinister;
