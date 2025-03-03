

import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  CCard,
  CCardHeader,
  CCardBody,
  CForm,
  CFormLabel,
  CFormInput,
  CButton,
  CRow,
  CCol,
  CFormSelect,
  CInputGroup,
  CInputGroupText,
} from "@coreui/react";
import Districtdata from  "../Registration Form/Districtdata";

const Kids = () => {
  const [formData, setFormData] = useState({
    gender: "",
    names: "", 
    yearOfBirth: "",
    disabled: "",
    disabilityType:"",
    email: "",
    guardianPhone: "", 
    yearOfBirth: "", 
    district: "",
    zone: "",
    age: "",
    baptized: "", 
    communicant: "",
    dateOfBaptism: "",
    baptizedBy: "",
    communicantNumber: "",
    dateOfConfirmation: "",
    confirmedBy: "",
    confirmationLocation: "",
    yearOfJoining: "",
    address: "",
    passportPhoto: null,
    membershipType: "Full",
    transferLetter: null,
    communionForm: null,
    teenager: "", 
  });

  const [districts, setDistricts] = useState([]);
  const [yearOptions, setYearOptions] = useState([]);




  

  useEffect(() => {
    /*
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          Swal.fire("Error", "User is not authenticated. Please log in.", "error");
          return;
        }

        const districtResponse = await fetch(
          "http://localhost:8080/api/districts/all_districts",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!districtResponse.ok) {
          const errorData = await districtResponse.json();
          Swal.fire("Error", errorData.message || "Failed to fetch districts.", "error");
          return;
        }

        const districtData = await districtResponse.json();
        setDistricts(districtData);
      } catch (err) {
        console.error("Error fetching districts:", err);
        Swal.fire(
          "Error",
          "An error occurred while fetching districts. Please try again.",
          "error"
        );
      }
    };
*/
    const generateYears = () => {
      const currentYear = new Date().getFullYear();
      const years = Array.from({ length: currentYear - 1969 }, (_, i) => 1970 + i);
      setYearOptions(years);
    };

   // fetchData();
    generateYears();
  }, []);









  const handleChange = ({ target: { name, value, type } }) => {
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? value === "on" : value }));
  };

  const handleFileChange = ({ target: { name, files } }) => {
    const file = files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result.split(",")[1];
        setFormData((prev) => ({
          ...prev,
          [name]: base64String, 
        }));
      };
      reader.onerror = (error) => {
        console.error("Error converting file to Base64:", error);
        Swal.fire("Error", "Failed to process file. Please try again.", "error");
      };
    }
  };
  
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire("Error", "User is not authenticated. Please log in.", "error");
      return;
    }
  
    const { passportPhoto, transferLetter, communionForm, ...otherData } = formData;
  
    const dataToSubmit = {
      ...otherData,
      passportPhoto: passportPhoto || null,
      transferLetter: transferLetter || null,
      communionForm: communionForm || null,
      telephone: `+254${formData.guardianPhone}`,
    };
  
    try {
      const response = await fetch("http://197.232.170.121:8594/api/registrations/teenager", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(dataToSubmit),
      });
  
      if (response.ok) {
        Swal.fire("Success!", "Registration data submitted successfully.", "success");
        setFormData({
          
          names: "",
          email: "",
          age: "",
          yearOfBirth: "",
          disabled: "",
          disabilityType:"",
          guardianPhone: "",
          yearOfBirth: "",
          district: "",
          zone: "",
          baptized: "",
          communicant: "",
          gender: "",
          dateOfBaptism: "",
          baptizedBy: "",
          communicantNumber: "",
          dateOfConfirmation: "",
          confirmedBy: "",
          confirmationLocation: "",
          yearOfJoining: "",
          address: "",
          passportPhoto: null,
          membershipType: "Full",
          transferLetter: null,
          communionForm: null,
          teenager: "",
        });
      } else {
        const errorResponse = await response.json();
        Swal.fire("Error", errorResponse.message || "Failed to submit registration data.", "error");
      }
    } catch (error) {
      console.error("Error submitting registration:", error);
      Swal.fire("Error", "Failed to submit registration data. Please try again.", "error");
    }
  };
  
  const renderFormInput = (label, name, type = "text", options) => (
    <CCol md="6">
      <CFormLabel style={{ fontWeight: "bold", color: "blue" }}>{label}</CFormLabel>
      {type === "select" && (options || "district") ? (
        <CFormSelect name={name} value={formData[name]} onChange={handleChange} required>
          <option value="">Select {label}</option>
          {(options || Districtdata).map((opt, idx) => (
            <option key={idx} value={ opt.district || opt.zoneName || opt.districtName || opt}>
              { opt.district ||opt.zoneName || opt.districtName || opt}
            </option>
          ))}
        </CFormSelect>
      ) : (
        <CFormInput
          name={name}
          type={type}
          value={type !== "file" ? formData[name] : undefined}
          onChange={type === "file" ? handleFileChange : handleChange}
          required={type !== "file"}
        />
      )}
    </CCol>
  );

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <h3 className="text-primary fw-bold">Registration</h3>
      </CCardHeader>
      <CCardBody>
        <CForm onSubmit={handleSubmit}>
        <CRow>
  
  {renderFormInput("Full Name", "names")}
  {renderFormInput("Gender", "gender", "select", ["Male", "Female"])}
  {renderFormInput("Email", "email")}
</CRow>

<CRow>
  <CCol md="6">
    <CFormLabel>Guardian Telephone</CFormLabel>
    <CInputGroup>
      <CInputGroupText>+254</CInputGroupText>
      <CFormInput
        name="guardianPhone"
        type="text"
        value={formData.guardianPhone}
        onChange={handleChange}
        maxLength="9"
        required
      />
    </CInputGroup>
  </CCol>
  {renderFormInput("Year of Birth", "yearOfBirth", "select", yearOptions)}
</CRow>

<CRow>
  {renderFormInput("District", "district", "select")}
  {renderFormInput("Zone", "zone")}
</CRow>

<CRow>
  {renderFormInput("Baptized?", "baptized", "select", ["Yes", "No"])}
  {renderFormInput("Communicant?", "communicant", "select", ["Yes", "No"])}
</CRow>

{formData.baptized === "Yes" && (
  <CRow>
    {[
      { label: "Date of Baptism", key: "dateOfBaptism" },
      { label: "Baptized By", key: "baptizedBy" },
    ].map(({ label, key }) => renderFormInput(label, key))}
  </CRow>
)}

{formData.communicant === "Yes" && (
  <CRow>
    {[
      { label: "Communicant Number", key: "communicantNumber" },
      { label: "Date of Confirmation", key: "dateOfConfirmation" },
      { label: "Confirmed By", key: "confirmedBy" },
      { label: "Confirmation Location", key: "confirmationLocation" },
    ].map(({ label, key }) => renderFormInput(label, key))}
  </CRow>
)}

<CRow>
  {renderFormInput("Membership Type", "membershipType", "select", ["Full", "Transfer"])}
  {renderFormInput("Year of Joining", "yearOfJoining")}
  {renderFormInput("Address", "address")}
</CRow>

 <CRow>
  {renderFormInput("Disabled", "disabled", "select", [
    "Yes",
    "No",
  ])}
  
  {formData.disabled === "Yes" && (
    <>
      {renderFormInput("Disability Type", "disabilityType", "select", ["Intellectual Disability",
        "Mental Health", "Chronic Illness","Learning Disability","Mobility Impairment","Hearing Impairment","Visual Impairment","Others"])}
      
     
    </>
  )}
</CRow>

<CRow>
  {[
    { label: "Passport Photo", key: "passportPhoto" },
    { label: "Transfer Letter", key: "transferLetter" },
    { label: "Communion Form", key: "communionForm" },
  ].map(({ label, key }) => renderFormInput(label, key, "file"))}
</CRow>

          <div className="mt-4">
            <CButton style={{fontWeight :"bold"}} color="primary" type="submit">
              Register
            </CButton>
          </div>
        </CForm>
      </CCardBody>
    </CCard>
  );
};

export default Kids;
