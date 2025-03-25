

import React, { useState } from "react";
import { CButton, CCard, CCardBody, CCardTitle, CForm, CFormInput, CFormSelect, CAlert, CFormTextarea } from "@coreui/react";
import { useNavigate } from "react-router-dom";
import CIcon from "@coreui/icons-react";
import { cilArrowThickLeft } from "@coreui/icons";

const PostMessage = () => {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponse(null);
    setError(null);

    const payload = {
      Message: message,
      MessagesType: messageType,
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/PostMessages`/*"http://197.232.170.121:8594/api/registrations/PostMessages"*/, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      
      if (!res.ok) throw new Error("Failed to send message");
      const data = await res.json();
      setResponse("Message sent successfully!");
      setMessage("");
      setMessageType("");
      console.log(data);
      navigate('/messages')
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-4">
      <CCard className="mb-4">
        <CCardBody>
          <CCardTitle className="mb-3">
            <CButton onClick={()=>navigate(-1)} color="primary" variant="outline"><CIcon icon={cilArrowThickLeft} style={{marginRight:"6px"}} />Back</CButton>
          </CCardTitle>
          <CCardTitle>
            <CAlert color="primary" variant="solid">
              <h3>Send a Message</h3>
            </CAlert>
          </CCardTitle>
          {response && <CAlert color="success">{response}</CAlert>}
          {error && <CAlert color="danger">{error}</CAlert>}
          <CForm onSubmit={handleSubmit}>
            <CFormTextarea
              rows={3}
              label="Message"
              placeholder="Enter your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
            <CFormSelect
              label="Message Type"
              value={messageType}
              onChange={(e) => setMessageType(e.target.value)}
            >
              <option value="Special Service">Special Service</option>
              <option value="Holy Communion">Holy Communion</option>
              <option value="First Service">First Service</option>
              <option value="Second Service">Second Service</option>
            </CFormSelect>
            <CButton type="submit" color="primary" className="mt-3">
              Send Message
            </CButton>
          </CForm>
        </CCardBody>
      </CCard>
    </div>
  );
};

export default PostMessage;
