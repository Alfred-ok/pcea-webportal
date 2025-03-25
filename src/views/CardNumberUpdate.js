


import { useState } from "react";
import { CAlert, CCard, CCardBody, CCardHeader } from "@coreui/react";
import { CButton } from "@coreui/react";
import { CForm, CFormLabel, CFormInput } from "@coreui/react";

const CardNumberUpdate = () => {
  const [formData, setFormData] = useState({
    ZPNumber: "",
    EPCNumber: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
       // "http://197.232.170.121:8594/api/registrations/UpdateMember",
       `${import.meta.env.VITE_BASE_URL}/UpdateMember`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      )
      if (response.ok) {
        //setMessage("Member updated successfully!");
        const result = await response.json()
        console.log(result)
        if(result.status=="00"){
            setMessage({ message: "Member updated successfully!", type: "success" })
            
        }
      } else {
        setMessage({ message: "Error updating member. Please try again.", type: "danger" });
      }
    } catch (error) {
      setMessage({ message:"Error updating member. Please try again.", type: "danger" });
    }
    setLoading(false);
    setFormData({ZPNumber: "",EPCNumber: "",})
  };

  return (
    <CCard className="max-w-md mx-auto shadow-lg">
      <CCardHeader className="p-3">
        <CAlert color="primary" variant="solid">
              <div style={{ display: "flex" }}>
                <h3 style={{ marginLeft: "10px" }}>Update Card Number</h3>
              </div>
            </CAlert>
      </CCardHeader>
      <CCardBody>
        {message && <CAlert color={message.type} dismissible >{message.message}</CAlert>}
        <CForm onSubmit={handleSubmit}>
          <div className="mb-4">
            <CFormLabel htmlFor="ZPNumber">ZP Number</CFormLabel>
            <CFormInput
              type="text"
              name="ZPNumber"
              value={formData.ZPNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <CFormLabel htmlFor="EPCNumber">EPC Number</CFormLabel>
            <CFormInput
              type="text"
              name="EPCNumber"
              value={formData.EPCNumber}
              onChange={handleChange}
              required
            />
          </div>
          <CButton type="submit" disabled={loading} className="w-full" color="primary">
            {loading ? "Updating..." : "Update Member"}
          </CButton>
        </CForm>
      </CCardBody>
    </CCard>
  );
};

export default CardNumberUpdate;
