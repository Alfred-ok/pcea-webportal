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
  CFormCheck,
  CInputGroup,
  CInputGroupText,
  CAlert,
} from "@coreui/react";
import Districtdata from  "./Districtdata";
import { MdPersonAddAlt1 } from "react-icons/md";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    telephone: "",
    disabled: "",
    disabilityType:"",
    spouseZP: "",
    names: "",
    email: "",
    gender: "",
    maritalStatus: "",
    marriageType: "",
    spouseName: "",
    membershipType: "Full",
    baptized: "",
    dateOfBaptism: "",
    baptizedBy: "",
    communicant: "",
    communicantNumber: "",
    dateOfConfirmation: "",
    confirmedBy: "",
    confirmationLocation: "",
    yearOfJoining: "",
    district: "",
    zone: "",
    address: "",
    teenager: "",
    guardianPhone: null,
    passportPhoto: null,
    transferLetter: null,
    communionForm: null,
    addChild: false,
    children: [],
  });

  const [districts, setDistricts] = useState([]);
  const [yearOptions, setYearOptions] = useState([]);
  const [childData, setChildData] = useState([
    { name: "", age: "", baptized: "No", confirmed: "No" },
  ]);


  

 
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
      const years = Array.from({ length: currentYear - 1899 }, (_, i) => 1900 + i);
      setYearOptions(years);
    };

    //fetchData();
    generateYears();
  }, []);

  
 















  const handleChange = ({ target: { name, value, type, checked } }) => {
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleFileChange = ({ target: { name, files } }) => {
    const file = files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result.split(",")[1]; 
        console.log(`Base64 for ${name}:`, base64String); 
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

  const handleChildChange = (index, name, value) => {
    const updatedChildren = [...childData];
    updatedChildren[index][name] = value;
    setChildData(updatedChildren);
  };

  const addChild = () =>
    setChildData([...childData, { name: "", age: "", baptized: "No", confirmed: "No", disabled:"", disabilityType:"" }]);

  const removeChild = (index) => setChildData(childData.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire("Error", "User is not authenticated. Please log in.", "error");
      return;
    }
  
    const dataToSubmit = {
      ...formData,
      telephone: `+254${formData.telephone}`,
      communicantNumber: formData.communicantNumber ? parseInt(formData.communicantNumber, 10) : null,
      children: formData.addChild ? childData : [],
    };
  
    console.log("Submitting Data:", JSON.stringify(dataToSubmit, null, 2)); // Debugging
  
    try {
      const response = await fetch("http://197.232.170.121:8594/api/registrations", {
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
          fullName: "",
          disabled: "",
          disabilityType:"",
          spouseZP: "",
          email: "",
          telephone: "",
          yearOfBirth: "",
          district: "",
          zone: "",
          maritalStatus: "",
          marriageType: "",
          holyCommunion: "",
          communicant: "",
          gender: "",
          spouseName:"",
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
          addChild: false,
          children: [],
        });
        setChildData([{ name: "", age: "", baptized: "", confirmed: "",disabled:"", disabilityType:"" }]);
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
              { opt.district || opt.zoneName || opt.districtName || opt}
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
    <CCard className="mb-4" style={{  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)"}}>
      <CCardHeader className="mt-2">
        <CAlert color="primary" variant="solid" style={{display:"flex", alignItems:"center"}}>
            <MdPersonAddAlt1 style={{marginRight:"8px", fontSize:"40"}} />
            <h3 className="fw-bold" style={{ color: "#fff" }}>Adherent Member Registration</h3>
          </CAlert>
      </CCardHeader>
      <CCardBody>
        <CForm onSubmit={handleSubmit}>
        <CRow>
  { renderFormInput("*Full Name", "names")}
 
  { renderFormInput("*Gender", "gender", "select", ["Male", "Female"])}
 
  {renderFormInput("*Email", "email")}
</CRow>

          <CRow>
            <CCol md="6">
              <CFormLabel>*Telephone</CFormLabel>
              <CInputGroup>
                <CInputGroupText>+254</CInputGroupText>
                <CFormInput
                  name="telephone"
                  type="text"
                  value={formData.telephone}
                  onChange={handleChange}
                  maxLength="9"
                  required
                />
              </CInputGroup>
            </CCol>
            {renderFormInput("*Year of Birth", "yearOfBirth", "select", yearOptions)}
          </CRow>
          <CRow>
            {// renderFormInput("District", "district", "select", districts)
              renderFormInput("*District", "district", "select")
            }
            {renderFormInput("*Zone", "zone")}
          </CRow>
          <CRow>
  {renderFormInput("*Marital Status", "maritalStatus", "select", [
    "Married",
    "Single",
    "Widow",
    "Widower",
  ])}
  
  {formData.maritalStatus === "Married" && (
    <>
      {renderFormInput("Marriage Type", "marriageType", "select", ["Christian", "Others"])}
      
      {renderFormInput("Spouse Name", "spouseName")}
      {renderFormInput("Spouse ZP", "spouseZP")}
    </>
  )}
  
</CRow>

          <CRow>
            {renderFormInput("*Baptized?", "baptized", "select", ["Yes", "No"])}
            {formData.baptized === "Yes" && renderFormInput("Communicant?", "communicant", "select", ["Yes", "No"])}
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
  {renderFormInput("*Membership Type", "membershipType", "select", ["Full", "Transfer"])}
  {renderFormInput("*Year of Joining", "yearOfJoining")}
  {renderFormInput("*Address", "address")}
</CRow>


<CRow>
  {renderFormInput("*Disabled", "disabled", "select", [
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




<CRow>
            <CCol md="6">
            <CFormCheck
  id="addChildCheck"
  label={<span style={{ fontWeight: "bold", color: "green" }}>Have a child?</span>}
  name="addChild"
  checked={formData.addChild}
  onChange={handleChange}
/>
            </CCol>
          </CRow>
          {formData.addChild &&
            childData.map((child, index) => (
              <div key={index} className="mb-3">
                <CRow>
                  <CCol md="4">
                    <CFormLabel>Child Name</CFormLabel>
                    <CFormInput
                      value={child.name}
                      onChange={(e) => handleChildChange(index, "name", e.target.value)}
                      required
                    />
                  </CCol>
                  <CCol md="2">
  <CFormLabel>DOB</CFormLabel>
  <CFormSelect
    value={child.age}
    onChange={(e) => handleChildChange(index, "age", e.target.value)}
    required
  >
    <option value="">Select Year</option>
    {Array.from({ length: new Date().getFullYear() - 2004 }, (_, i) => (
      <option key={i} value={2005 + i}>
        {2005 + i}
      </option>
    ))}
  </CFormSelect>
</CCol>
                  <CCol md="3">
                    <CFormLabel>Baptized</CFormLabel>
                    <CFormSelect
                      value={child.baptized}
                      onChange={(e) => handleChildChange(index, "baptized", e.target.value)}
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </CFormSelect>
                  </CCol>
                  {
                    child.baptized === "Yes" && (
                  <CCol md="3">
                    <CFormLabel>Confirmed</CFormLabel>
                    <CFormSelect
                      value={child.confirmed}
                      onChange={(e) => handleChildChange(index, "confirmed", e.target.value)}
                    >
                      <option value="Yes">Yes</option>
                      {
                        //<option value="No">No</option>
                      }
                    </CFormSelect>
                  </CCol>
                    )
                  }
                  <CRow>
  <CCol md="3">
    <CFormLabel>Disabled</CFormLabel>
    <CFormSelect
      value={child.disabled}
      onChange={(e) => handleChildChange(index, "disabled", e.target.value)}
      required
    >
      <option value="">Select</option>
      <option value="Yes">Yes</option>
      <option value="No">No</option>
    </CFormSelect>
  </CCol>

  {child.disabled === "Yes" && (
    <CCol md="3">
      <CFormLabel>Disability Type</CFormLabel>
      <CFormSelect
        value={child.disabilityType}
        onChange={(e) => handleChildChange(index, "disabilityType", e.target.value)}
        required={child.disabled === "Yes"}
      >
        <option value="">Select</option>
        <option value="Intellectual Disability">Intellectual Disability</option>
        <option value="Mental Health">Mental Health</option>
        <option value="Chronic Illness">Chronic Illness</option>
        <option value="Learning Disability">Learning Disability</option>
        <option value="Mobility Impairment">Mobility Impairment</option>
        <option value="Hearing Impairment">Hearing Impairment</option>
        <option value="Visual Impairment">Visual Impairment</option>
        <option value="Others">Others</option>
      </CFormSelect>
    </CCol>
  )}
</CRow>

                </CRow>
                
                <CButton style={{color:"white", fontWeight:"bold"}} color="success" className="mt-2" onClick={() => removeChild(index)}>
                  Remove
                </CButton>
              </div>
            ))}
          {formData.addChild && (
            <CButton color="primary" onClick={addChild}>
              Add Another Child
            </CButton>
          )}

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

export default RegistrationForm;