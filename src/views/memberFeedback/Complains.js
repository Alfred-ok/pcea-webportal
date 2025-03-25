import React, { useEffect, useState } from "react";
import emailjs from "emailjs-com";
import Swal from 'sweetalert2'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CSpinner,
  CAlert,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CForm,
  CFormLabel,
  CFormInput,
  CFormTextarea,
  CModalFooter,
  CButton,
} from "@coreui/react";

function Complains() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [nameEmail, setNameEmail] = useState("")
  const[showMessage, setShowMessage] = useState("");
  const[showMessageModal, setShowMessageModal] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authentication token not found");

        const response = await fetch(
          //"http://197.232.170.121:8594/api/registrations/getMemberFeedback?feedbackType=complaint",
          `${import.meta.env.VITE_BASE_URL}/getMemberFeedback?feedbackType=complaint`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        setData(Array.isArray(result) ? result : []);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  
  const handleOpenModal = (member) => {
    setSelectedEmail(member.email);
    setNameEmail(member.name)
    setShowModal(true);
    console.log(member.email);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEmail("");
    setEmailBody("");
  };



  const handleSendEmail = () => {

    const templateParams = {
      email: selectedEmail,
      subject: "Complains Response",
      message: `Hello ${nameEmail},\n\n ${emailBody}`
    };
    emailjs
      .send("service_v2vm3zj", "template_buj7p5i", templateParams, "8Tn-sABtVH3vPgLtE")
      .then(() => {
       // alert("Email sent successfully!");
        Swal.fire({
          icon: "success",
          title: "Email sent successfully",
          text: "Successfully",
        })
        setShowModal(false);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        //alert("Failed to send email.");
        Swal.fire({
          icon: "error",
          title: "Failed to send email.",
          text: "Failed",
        });
        setShowModal(false);
      });
  }
  

  return (
    <CCard className="mb-4">
      <CCardHeader style={{ backgroundColor:"rgba(22, 89, 177, 0.925)" }}>
        <h3 style={{ color: "#fff" }}>Complains</h3>
      </CCardHeader>
      <CCardBody>
        {loading ? (
          <div className="text-center">
            <CSpinner color="primary" />
            <p>Loading...</p>
          </div>
        ) : error ? (
          <CAlert color="danger">Error: {error}</CAlert>
        ) : data.length === 0 ? (
          <p>No records found.</p>
        ) : (
          <CTable striped bordered hover>
            <CTableHead color="primary">
              <CTableRow>
                <CTableHeaderCell>#</CTableHeaderCell>
                <CTableHeaderCell>Name</CTableHeaderCell>
                <CTableHeaderCell><span style={{fontSize:"12px"}}><i>(Click for more message)</i></span> <br/> Message </CTableHeaderCell>
                <CTableHeaderCell>Feed back Type</CTableHeaderCell>
                <CTableHeaderCell>Email</CTableHeaderCell>
                <CTableHeaderCell>ZpNumber</CTableHeaderCell>
                <CTableHeaderCell>posted Date</CTableHeaderCell>
                <CTableHeaderCell>Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {data.map((member, index) => (
                <CTableRow key={index}>
                <CTableDataCell>{index + 1}</CTableDataCell>
                  <CTableDataCell>{member.name}</CTableDataCell>
                  <CTableDataCell onClick={()=>{setShowMessageModal(true); setShowMessage(member.message)}}>{member.message.slice(0, 30) + "..."}</CTableDataCell>
                  <CTableDataCell>{member.FeedbackType}</CTableDataCell>
                  <CTableDataCell>{member.email}</CTableDataCell>
                  <CTableDataCell>{member.ZpNumber}</CTableDataCell>
                  <CTableDataCell>{member.createdAt}</CTableDataCell>
                  <CTableDataCell>
                  <CButton color="primary" size="sm" onClick={() => handleOpenModal(member)}>
                    Send Email
                  </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        )}
      </CCardBody>
      {/* Email Sending Modal */}
      <CModal visible={showModal} onClose={handleCloseModal}>
        <CModalHeader closeButton>
          <CModalTitle>Send Email</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            {/*
            <div className="mb-3">
              <CFormLabel>Email</CFormLabel>
              <CFormInput type="email" value={selectedEmail} disabled />
            </div>
            */}
            <div className="mb-3">
              {`Hello ${nameEmail},`}
            </div>
            <div className="mb-3">
             {/* <CFormLabel>Message</CFormLabel>*/}
              <CFormTextarea
                rows="4"
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
                placeholder="Enter your message..."
              />
            </div>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={handleCloseModal}>
            Close
          </CButton>
          <CButton color="primary" onClick={handleSendEmail}>
            Send
          </CButton>
        </CModalFooter>
      </CModal>


      <CModal
        alignment="center"
        visible={showMessageModal}
        onClose={() => setShowMessageModal(false)}
        aria-labelledby="VerticallyCenteredExample"
      >
        <CModalHeader>
          <CModalTitle id="VerticallyCenteredExample">Message</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {showMessage}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowMessageModal(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </CCard>
  );
}

export default Complains;
