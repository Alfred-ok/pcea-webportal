import React, { useEffect, useState } from "react";
import Swal from "sweetalert2"; // Import SweetAlert2
import {
  CCard, CCardBody, CCardHeader, CTable, CTableHead, CTableBody, CTableRow, CTableHeaderCell, CTableDataCell,
  CButton, CModal, CModalHeader, CModalBody, CModalFooter, CFormTextarea, CFormSelect, CNav, CNavItem, CNavLink, CTabContent, CTabPane
} from "@coreui/react";

const ApprovalTabs = () => {
  const [activeTab, setActiveTab] = useState('rejoining');

  return (
    <>
      <CNav variant="tabs">
        <CNavItem>
          <CNavLink style={{fontWeight:"bold", cursor:"pointer"}} active={activeTab === 'rejoining'} onClick={() => setActiveTab('rejoining')}>
            Admin Approval
          </CNavLink>
        </CNavItem>
       {/*  <CNavItem>
         <CNavLink style={{fontWeight:"bold", cursor: "pointer"}} active={activeTab === 'evangelist'} onClick={() => setActiveTab('evangelist')}>
            Evangelist Approval
          </CNavLink>
        </CNavItem>*/}
      </CNav>
      <CTabContent>
        <CTabPane visible={activeTab === 'rejoining'}>
          <Rejoining apiUrl={`${import.meta.env.VITE_BASE_URL}/blockedMembers`}/*"http://197.232.170.121:8594/api/registrations/blockedMembers"*/ activeTab={activeTab} />
        </CTabPane>
        <CTabPane visible={activeTab === 'evangelist'}>
          <Rejoining apiUrl={`${import.meta.env.VITE_BASE_URL}/elderApproved`}/*"http://197.232.170.121:8594/api/registrations/elderApproved"*/ activeTab={activeTab} />
        </CTabPane>
      </CTabContent>
    </>
  );
};

const Rejoining = ({ apiUrl, activeTab }) => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [rejoinStatus, setRejoinStatus] = useState("");
  const [comments, setComments] = useState("");

  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data);
        setMembers(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, [apiUrl]);

  const handleViewMore = (member) => {
    setSelectedMember(member);
    setModalVisible(true);
  };

  const handleApprove = async () => {
    if (!selectedMember) return;
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");
  
      const payload = {
        id: selectedMember.id,
        status: rejoinStatus,
        comments,
      };
  
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/approvetransfer`/*"http://197.232.170.121:8594/api/registrations/approvetransfer"*/, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "Failed to submit registration data.");
      }
  
      Swal.fire({
        title: "Success!",
        text: "Registration data submitted successfully.",
        icon: "success",
        timer: 2000, 
        showConfirmButton: false,
      });
  
      setModalVisible(false);
    } catch (err) {
      console.error("Error submitting request:", err);
      
      Swal.fire("Error", err.message || "Failed to submit registration data.", "error");
    }
  };

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>
          <h3 style={{ color: "blue", fontWeight:"bold"}}>Welcome Back!</h3>
        </CCardHeader>
        <CCardBody>
          {loading ? (
            <p>Loading members...</p>
          ) : error ? (
            <p style={{ color: "red" }}>404!: {error}</p>
          ) : members.length === 0 ? (
            <p></p>
          ) : (
            <CTable striped>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>No.</CTableHeaderCell>
                  <CTableHeaderCell>Name</CTableHeaderCell>
                  <CTableHeaderCell>ZP Number</CTableHeaderCell>
                  <CTableHeaderCell>Card Serial Number</CTableHeaderCell>
                  <CTableHeaderCell>Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {members.map((member, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell style={{fontWeight:"bold"}}>{index + 1}</CTableDataCell>
                    <CTableDataCell>{member.fullName}</CTableDataCell>
                    <CTableDataCell>{member.zpnumber}</CTableDataCell>
                    <CTableDataCell>{member.cardSerialNumber}</CTableDataCell>
                    <CTableDataCell>
                      <CButton style={{color:"white",fontWeight:"bold"}} color="info" onClick={() => handleViewMore(member)}>
                        View More
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          )}
        </CCardBody>
      </CCard>
      <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <CModalHeader>{selectedMember?.fullName}</CModalHeader>
        <CModalBody>
          <p><strong>ZP Number:</strong> {selectedMember?.zpnumber}</p>
          <p><strong>Card Serial Number:</strong> {selectedMember?.cardSerialNumber}</p>
          <p><strong>Year of Birth:</strong> {selectedMember?.dob}</p>
          <p><strong>Gender:</strong> {selectedMember?.gender}</p>
          <p><strong>Mobile Number:</strong> {selectedMember?.mobileNumber}</p>
          <p><strong>District:</strong> {selectedMember?.district}</p>
          <CFormSelect value={rejoinStatus} onChange={(e) => setRejoinStatus(e.target.value)}>
            <option value="">Select Rejoin Status</option>
            {activeTab === 'rejoining' ? (
              <>
                <option value="8">Yes</option>
                <option value="7">No</option>
              </>
            ) : (
              <>
                <option value="8">Yes</option>
                <option value="7">No</option>
              </>
            )}
          </CFormSelect>
          <CFormTextarea value={comments} onChange={(e) => setComments(e.target.value)} placeholder="Enter comments" />
        </CModalBody>
        <CModalFooter>
          <CButton style={{color:"white"}} color="success" onClick={handleApprove}>Approve</CButton>
          <CButton color="secondary" onClick={() => setModalVisible(false)}>Close</CButton>
        </CModalFooter>
      </CModal>
    </>
  );
};

export default ApprovalTabs;
