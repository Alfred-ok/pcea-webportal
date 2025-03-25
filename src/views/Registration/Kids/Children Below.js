

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
  CAlert,
} from "@coreui/react";
import Districtdata from  "../Registration Form/Districtdata";
import Zones from "../Registration Form/Zones";
import { MdPersonAddAlt1 } from "react-icons/md";
import { CSpinner } from '@coreui/react'

const Kids = () => {
  const [selectedZone, setSelectedZone] = useState("");
  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");

  const [loadingButton, setLoadingButton] = useState(false);

  const [formData, setFormData] = useState({
    gender: "",
    names: "", 
    yearOfBirth: "",
    disabled: "",
    disabilityType:"",
    email: "",
    telephone:"",
    guardianPhone: "", 
    yearOfBirth: "", 
    district: "",
    zone: selectedZone,
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




  const handleDistrictChange = (event) => {
    const districtName = event.target.value;
    setSelectedDistrict(districtName);
    
    setFormData((prev) => ({
      ...prev,
      district: districtName,
    }));

    const districtObj = Districtdata.find((d) => d.district === districtName);

    if (districtObj) {
      const zoneObj = Zones.find((z) => z.zoneId === districtObj.zoneId);
      const zoneName = zoneObj ? zoneObj.zone : "";
      setSelectedZone(zoneName);
  
      setFormData((prev) => ({
        ...prev,
        zone: zoneName,
      }));
    } else {
      setSelectedZone("");
      setFormData((prev) => ({
        ...prev,
        zone: "",
      }));
    }
  };


  
// Filter districts when selectedZone changes
useEffect(() => {
  if (selectedZone) {
    const zoneObj = Zones.find((zone) => zone.zone === selectedZone);
    const zoneId = zoneObj ? zoneObj.zoneId : null;
    if (zoneId) {
      const filtered = Districtdata.filter((district) => district.zoneId === zoneId);
      setFilteredDistricts(filtered);
    } else {
      setFilteredDistricts([]);
    }
  } else {
    setFilteredDistricts(Districtdata); // Reset if no zone selected
  }
}, [selectedZone]);
    

    

  
 




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
  
  console.log(formData);

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

    console.log(dataToSubmit);

    setLoadingButton(true)

    try {
      const response = await fetch(
        //"http://197.232.170.121:8594/api/registrations/teenager", 
        `${import.meta.env.VITE_BASE_URL}/teenager`,
        {
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
          telephone:"",
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

        setLoadingButton(false);
      } else {
        const errorResponse = await response.json();
        Swal.fire("Error", errorResponse.message || "Failed to submit registration data.", "error");
        setLoadingButton(false);
      }
    } catch (error) {
      console.error("Error submitting registration:", error);
      Swal.fire("Error", "Failed to submit registration data. Please try again.", "error");
      setLoadingButton(false);
    }
  };





  
  const renderFormInput = (label, name, type = "text", options) => (
    <CCol md="6">
      <CFormLabel style={{ fontWeight: "bold", color: "blue" }}>{label}</CFormLabel>
      {type === "select" && (options || "district") ? (
        <CFormSelect name={name} value={formData[name]} onChange={handleChange} required>
          <option value="">Select {label}</option>
          {(options || filteredDistricts).map((opt, idx) => (
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
        <CAlert color="primary" variant="solid" style={{display:"flex", alignItems:"center"}}>
            <MdPersonAddAlt1 style={{marginRight:"8px", fontSize:"40"}} />
            <h3 className="fw-bold" style={{ color: "#fff" }}>Teenager Registration</h3>
          </CAlert>
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
    <CFormLabel style={{ fontWeight: "bold", color: "blue" }}>Telephone</CFormLabel>
    <CInputGroup>
      <CInputGroupText>+254</CInputGroupText>
      <CFormInput
        name="telephone"
        type="text"
        value={formData.telephone}
        onChange={handleChange}
        maxLength="9"
        
      />
    </CInputGroup>
  </CCol>
</CRow>
<CRow>
  <CCol md="6">
    <CFormLabel style={{ fontWeight: "bold", color: "blue" }}>Guardian Telephone</CFormLabel>
    <CInputGroup>
      <CInputGroupText>+254</CInputGroupText>
      <CFormInput
        name="guardianPhone"
        type="text"
        value={formData.guardianPhone}
        onChange={handleChange}
        maxLength="9"
        
      />
    </CInputGroup>
  </CCol>
  {renderFormInput("Year of Birth", "yearOfBirth", "select", yearOptions)}
</CRow>

{/* Zone Selector */}
<CRow>
<CCol md="6">
        <CFormLabel style={{ color: "blue", fontWeight: "bold" }}>* District:</CFormLabel>
        <CFormSelect value={selectedDistrict} onChange={handleDistrictChange}>
          <option value="">Select District</option>
          {Districtdata.map((district) => (
            <option key={district.id} value={district.district}>
              {district.district}
            </option>
          ))}
        </CFormSelect>
      </CCol>

      <CCol md="6">
        <CFormLabel style={{ fontWeight: "bold", color: "blue" }}>* Zone</CFormLabel>
        <CFormInput type="text" value={selectedZone} readOnly />
      </CCol>     
</CRow>

<CRow>
  {renderFormInput("Membership Type", "membershipType", "select", ["New","Adherent", "Transfer"])}
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
          { loadingButton ?
            <CButton color="primary" disabled style={{fontWeight :"bold"}}>
              <CSpinner as="span" className="me-2" size="sm" aria-hidden="true" />
              <span>Register...</span>
            </CButton>
          :
            <CButton style={{fontWeight :"bold"}} color="primary" type="submit">
             Register
            </CButton>
          }
          </div>
        </CForm>
      </CCardBody>
    </CCard>
  );
};

export default Kids;
