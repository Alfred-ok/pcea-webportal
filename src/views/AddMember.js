import React, { useState } from "react";
import { CCard, CCardBody, CCardHeader, CForm, CFormLabel, CFormInput, CFormSelect, CFormCheck, CButton, CRow, CCol, CAlert, CAccordion, CAccordionItem, CAccordionHeader, CAccordionBody } from "@coreui/react";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import Districtdata from "./Registration/Registration Form/Districtdata";

const AddMember = () => {
  
  const [formData, setFormData] = useState({
    DOB: "",
    CardSerialNumber: "",
    CreatedBy: "Admin",
    District: "",
    FullName: "",
    Gender: "",
    HolyCommunionStatus: "",
    MaritalStatus: "",
    MobileNumber: "",
    NationalID: "",
    SpouseName: "",
    SpouseZPNumber: null,
    Disabled: false,
    DisabilityType: "",
    UpdatedBy: "Admin",
    ZPNumber: null,
    EPCNumber: "",
    Status: 1,
    Children: [
      {
        FullName: "",
        Baptized: false,
        Communicant: false,
        yearOfBirth: null,
        Disabled: false,
        DisabilityType: "",
        GuardianZpNumber: "",
        Status: 1,
      },
    ],
  });

  const [plusChild, setPlusChild] = useState(false)

  const [childData, setChildData] = useState([
    {  FullName: "", Communicant: false, yearOfBirth: null, Disabled: false,DisabilityType: "",GuardianZpNumber: "", Baptized: false, },
  ]);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleChildChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    setChildData((prevChildren) =>
      prevChildren.map((child, i) =>
        i === index ? { ...child, [name]: type === "checkbox" ? checked : value } : child
      )
    );
  };



  
  const addChild = () =>
    setChildData([...childData, { name: "", age: "", baptized: "No", confirmed: "No", disabled:"", disabilityType:"" }]);

  const removeChild = (index) => setChildData(childData.filter((_, i) => i !== index));

  const dataToSubmit = {
    ...formData,
    children: plusChild ? childData : [],
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/insertMemberAndChild`/*"http://197.232.170.121:8594/api/registrations/insertMemberAndChild"*/, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSubmit),
      });
      let result = await response.json();
      console.log(result);
      if (response.ok) {
        //alert("Registration submitted successfully!");
        
        if(result.status == '00'){
          
          Swal.fire({
            icon: "success",
            title: result.statusDescription,
            text: "Member Added successfully",
          }).finally(() => {
            navigate("/MemberInformation")
          });
        }

      } else {
        //alert("Failed to submit registration.");
       

        Swal.fire({
          icon: "error",
          title: result.statusDescription,
          text: "Failed to Add Member",
        });
      }
    } catch (error) {
      alert("An error occurred.");
    }
  };

  //console.log(formData);
console.log(dataToSubmit);
  return (
    <CCard>
      <CCardHeader>
      
        <CAlert color="primary" variant="solid" style={{ marginTop:"10px", display: "flex" }}>
            <h3>Add Member</h3>
        </CAlert>
      </CCardHeader>
      <CCardBody>
      <CForm onSubmit={handleSubmit}>
      <CRow>
        <CCol md={6}>
        <CFormInput label="*Full Name" placeholder="Enter Full Name" type="text" name="FullName" value={formData.FullName} onChange={handleChange} className="mb-3" required/>
        <CFormInput label="*Date of Birth" type="date" name="DOB" value={formData.DOB} onChange={handleChange} className="mb-3" required/>
        </CCol>
        <CCol md={6}>
          <CFormSelect label="*Gender" name="Gender" value={formData.Gender} onChange={handleChange} className="mb-3" required>
            <option>Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </CFormSelect>
          <CFormSelect label="*Holy Communion Status" name="HolyCommunionStatus" value={formData.HolyCommunionStatus} onChange={handleChange} className="mb-3" required>
            <option>Select Holy Communion Status</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </CFormSelect>
        </CCol>
        </CRow>
        <CRow>
        <CCol md={6}>
          <CFormSelect label="*Marital Status" name="MaritalStatus" value={formData.MaritalStatus} onChange={handleChange} className="mb-3" required>
          <option>Select Marital Status</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Divorced">Divorced</option>
            <option value="Widowed">Widowed</option>
          </CFormSelect>
          <CFormInput label="*Mobile Number" placeholder="Enter Mobile Number" type="number" name="MobileNumber" value={formData.MobileNumber} className="mb-3" onChange={handleChange} required/>
        </CCol>
        <CCol md={6}>
          <CFormInput label="*National ID" placeholder="Enter National ID" type="number" name="NationalID" value={formData.NationalID} className="mb-3" onChange={handleChange} required/>
          <CFormInput label="*Card Serial Number" type="number" placeholder="Enter Card Serial Number" name="CardSerialNumber" value={formData.CardSerialNumber} className="mb-3" onChange={handleChange} required/>
        </CCol>
      </CRow>
      <CRow>
      <CCol md={6}>
      <CFormInput label="EPC Number" placeholder="Enter ZPNumber e.g EP123" type="text" name="EPCNumber" value={formData.EPCNumber} className="mb-3" onChange={handleChange} />
      </CCol>
      <CCol md={6}>
      <CFormInput label="*ZP Number" type="number" placeholder="Enter ZPNumber e.g 0123" name="ZPNumber" value={formData.ZPNumber} className="mb-3" onChange={handleChange} required/>
      </CCol>
      <CCol md={6}>
        <CFormSelect label="*District" name="District"  placeholder="Enter District" value={formData.District} onChange={handleChange} className="mb-3" required>
          <option>Select District</option>
          {Districtdata.map((dist) => (
              <option key={dist.id} value={dist.district}>
                {dist.district}
              </option>
            ))}
          </CFormSelect>
      </CCol>
        <CCol md={6}>
        <CFormInput label="Spouse Name" type="text" name="SpouseName" placeholder="Enter Spouse Name" value={formData.SpouseName} className="mb-3" onChange={handleChange} />
        </CCol>
      </CRow>
      <CRow>
        <CCol md={6}>
          <CFormInput label="Spouse ZP Number" type="number" placeholder="Enter ZPNumber e.g 0123" name="SpouseZPNumber" value={formData.SpouseZPNumber} className="mb-3" onChange={handleChange} />
        </CCol>
     
      
        <CCol md={6} style={{margin:"10px"}}>
          <CFormCheck label="Disabled" name="Disabled" checked={formData.Disabled} onChange={handleChange} className="mb-3" />

          {formData.Disabled && (
            <CFormInput label="Disability Type" type="text"  name="DisabilityType" value={formData.DisabilityType} className="mb-3" onChange={handleChange} />
          )}
         </CCol>
      </CRow>

      <CRow>
            <CCol md="6">
            <CFormCheck
              label={<span style={{ fontWeight: "bold", color: "green" }}>Have a child?</span>}
              checked={plusChild}
              onChange={()=>setPlusChild(!plusChild)}
              className="mb-3"
            />
            </CCol>
          </CRow>

          {plusChild &&
            childData.map((child, index) => (
          <CAccordion activeItemKey={index} style={{border:"1px solid #6082B6", backgroundColor:"blue", margin:"10px"}}>
          <CAccordionItem itemKey={0}>
            <CAccordionHeader>Add Children</CAccordionHeader>
            <CAccordionBody>
            <>
              <CFormLabel>Children</CFormLabel>
             
                <CRow key={index}>
                  <CCol md={4}>
                    <CFormLabel>*Full Name</CFormLabel>
                    <CFormInput name="FullName" placeholder="Enter Full Name" value={child.FullName} className="mb-3" onChange={(e) => handleChildChange(index, e)} required />
                  </CCol>
                  <CCol md={4}>
                    <CFormLabel>*Year of Birth</CFormLabel>
                    <CFormInput name="yearOfBirth" type="number" placeholder="Enter Year of Birth" className="mb-3" value={child.yearOfBirth} onChange={(e) => handleChildChange(index, e)} required/>
                  </CCol>
                  <CCol md={4}>
                    <CFormLabel>*Guardian ZP Number</CFormLabel>
                    <CFormInput name="GuardianZpNumber"  placeholder="Enter ZPNumber e.g ZP123" className="mb-3" value={child.GuardianZpNumber} onChange={(e) => handleChildChange(index, e)} required/>
                  </CCol>
                  <CCol md={4}>
                    <CFormCheck
                      label="Baptized"
                      name="Baptized"
                      checked={child.Baptized}
                      onChange={(e) => handleChildChange(index, e)}
                      className="mb-3"
                    />
                   
                    <CFormCheck
                      label="Communicant"
                      name="Communicant"
                      checked={child.Communicant}
                      onChange={(e) => handleChildChange(index, e)}
                      className="mb-3"
                    />
                    
                    <CFormCheck
                      label="Disabled"
                      name="Disabled"
                      checked={child.Disabled}
                      onChange={(e) => handleChildChange(index, e)}
                      className="mb-3"
                    />

                    {child.Disabled && (
                      <CFormInput
                        label="Disability Type"
                        type="text"
                        name="DisabilityType"
                        value={child.DisabilityType}
                        onChange={(e) => handleChildChange(index, e)}
                        className="mb-3"
                      />
                    )}
                  </CCol>
                </CRow>
                <CRow >
                <CCol md={4}>
                <CButton style={{color:"white"}} color="danger" onClick={() => removeChild(index)}>
                  Remove
                </CButton>
                </CCol>
                
                </CRow>
            </>
            </CAccordionBody>
          </CAccordionItem>
          </CAccordion> 
          ))}
          {plusChild && (
          <div className="mb-3 mt-3" style={{display:"flex", flexDirection:"row", alignItems:"center"}} >
          <CButton color="primary" onClick={addChild} style={{marginRight:"5px"}}>
              Add Another Child
          </CButton>
          </div>
          )}
        <CButton type="submit" color="primary">Submit</CButton>
        </CForm>
      </CCardBody>
    </CCard>
  );
};

export default AddMember;
