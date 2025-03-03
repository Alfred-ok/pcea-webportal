

import React, { useState } from "react";
import { CButton, CCard, CCardBody, CCardTitle, CForm, CFormInput, CFormSelect, CAlert } from "@coreui/react";

const PostMessage = () => {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("Congrats");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponse(null);
    setError(null);

    const payload = {
      Message: message,
      MessageType: messageType,
    };

    try {
      const res = await fetch("http://197.232.170.121:8594/api/registrations/PostMessages", {
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
      setMessageType("Congrats");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-4">
      <CCard className="mb-4">
        <CCardBody>
          <CCardTitle>
            <CAlert color="primary" variant="solid">
              <h3>Send a Message</h3>
            </CAlert>
          </CCardTitle>
          {response && <CAlert color="success">{response}</CAlert>}
          {error && <CAlert color="danger">{error}</CAlert>}
          <CForm onSubmit={handleSubmit}>
            <CFormInput
              type="text"
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
              <option value="Congrats">Congrats</option>
              <option value="SpecialService">Special Service</option>
              <option value="HolyCommunion">Holy Communion</option>
              <option value="FirstService">First Service</option>
              <option value="SecondService">Second Service</option>
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
