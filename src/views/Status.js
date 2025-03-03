import React, { useEffect, useState } from "react";
import {
  CCard,  CCardHeader,CCardBody,CTable,CTableHead,CTableBody,CTableRow,
  CTableHeaderCell, CTableDataCell, CButton, CSpinner,CFormSelect, CPagination, CPaginationItem, CFormInput,CModal,CModalHeader,CModalBody,CModalFooter
} from "@coreui/react";

function MemberStatus() {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState("all");
  const recordsPerPage = 300;
  const [searchZP, setSearchZP] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState([]);




  useEffect(() => {
    const fetchMemberStatus = async () => {
      setLoading(true);
      setError("");

      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const response = await fetch(
          "http://197.232.170.121:8594/api/registrations/memberstatus",
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

        const data = await response.json();
        console.log("API Response:", data);
        setMembers(Array.isArray(data) ? data : []);
        setFilteredMembers(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMemberStatus();
  }, []);

  useEffect(() => {
    let updatedMembers = members;
    
    if (filterStatus !== "all") {
      updatedMembers = updatedMembers.filter((member) => member.status.toLowerCase() === filterStatus);
    }
    
    if (searchZP) {
      updatedMembers = updatedMembers.filter((member) => member.zpnumber.includes(searchZP));
    }
  
    setFilteredMembers(updatedMembers);
    setCurrentPage(1);
  }, [filterStatus, searchZP, members]);

  useEffect(() => {
    if (filterStatus === "all") {
      setFilteredMembers(members);
    } else {
      setFilteredMembers(members.filter((member) => member.status.toLowerCase() === filterStatus));
    }
    setCurrentPage(1);
  }, [filterStatus, members]);

  const totalRecords = filteredMembers.length;
  const totalPages = Math.ceil(totalRecords / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredMembers.slice(indexOfFirstRecord, indexOfLastRecord);
  const handleViewMore = async (zpnumber) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found");
  
      const response = await fetch(
        `http://197.232.170.121:8594/api/registrations/memberhistory?zp=${zpnumber}`,
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
  
      const data = await response.json();
      console.log("Modal API Response:", data);
  
      // Ensure data is an array
      setModalData(Array.isArray(data) ? data : []);
      setModalVisible(true);
    } catch (error) {
      console.error("Error fetching member details:", error);
      setError(error.message);
    }
  };
  
  return (
    <CCard className="mb-4">
      <CCardHeader>
        <h3 style={{ color: "blue" }}>Member Status</h3>
      </CCardHeader>
      <CCardBody>
      <div className="mb-3 d-flex justify-content-end gap-3">
  <CFormInput
    style={{ width: "250px" }}
    placeholder="Search by ZP Number"
    value={searchZP}
    onChange={(e) => setSearchZP(e.target.value)}
  />
  
  <CFormSelect
    style={{ width: "200px" }}
    value={filterStatus}
    onChange={(e) => setFilterStatus(e.target.value)}
  >
    <option style={{ fontWeight: "bold" }} value="all">All Members</option>
    <option style={{ fontWeight: "bold" }} value="active">Active</option>
    <option style={{ fontWeight: "bold" }} value="inactive">Inactive</option>
  </CFormSelect>
</div>


        {loading ? (
          <div className="text-center">
            <CSpinner color="primary" />
            <p>Loading members...</p>
          </div>
        ) : error ? (
          <p style={{ color: "red", textAlign: "center" }}>Error: {error}</p>
        ) : filteredMembers.length === 0 ? (
          <p style={{ textAlign: "center" }}>Oops seems there are no records.</p>
        ) : (
          <>
            <CTable striped bordered hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell style={{ color: "blue", fontWeight: "bold" }}>No.</CTableHeaderCell>
                  <CTableHeaderCell style={{ color: "blue", fontWeight: "bold" }}>Full Name</CTableHeaderCell>
                  <CTableHeaderCell style={{ color: "blue", fontWeight: "bold" }}>Mobile Number</CTableHeaderCell>
                  <CTableHeaderCell style={{ color: "blue", fontWeight: "bold" }}>ZP Number</CTableHeaderCell>
                  <CTableHeaderCell style={{ color: "blue", fontWeight: "bold" }}>Status</CTableHeaderCell>
                  <CTableHeaderCell style={{ color: "blue", fontWeight: "bold" }}>Action</CTableHeaderCell>
                 
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {currentRecords.map((member, index) => (
                  <CTableRow key={indexOfFirstRecord + index + 1}>
                    <CTableDataCell style={{ fontWeight: "bold", color: "blue" }}>
                      {indexOfFirstRecord + index + 1}
                    </CTableDataCell>
                    <CTableDataCell>{member.fullName}</CTableDataCell>
                    <CTableDataCell>{member.mobileNumber}</CTableDataCell>
                    <CTableDataCell>{member.zpnumber}</CTableDataCell>
                    <CTableDataCell
                      style={{
                        color: member.status.toLowerCase() === "inactive" ? "red" : "green",
                        fontWeight: "bold",
                      }}
                    >
                      {member.status}
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton style={{color:"white", fontWeight:"bold"}} color="success" onClick={() => handleViewMore(member.zpnumber)} >
                        View More
                      </CButton>
                    </CTableDataCell>
                   
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>

            <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
  <CModalHeader>
    <strong>Member History Details</strong>
  </CModalHeader>
  <CModalBody style={{ maxHeight: "auto", overflowY: "auto" }}>
    {modalData.length > 0 ? (
      <CTable striped bordered hover>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell><strong>Type</strong></CTableHeaderCell>
            <CTableHeaderCell><strong>Serial Number</strong></CTableHeaderCell>
            <CTableHeaderCell><strong>Date</strong></CTableHeaderCell>
           {/*<CTableHeaderCell><strong>Created Date</strong></CTableHeaderCell>
            <CTableHeaderCell><strong>Status</strong></CTableHeaderCell>*/}
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {modalData.map((record, index) => (
            <CTableRow key={index}>
              <CTableDataCell>{record.type}</CTableDataCell>
              <CTableDataCell>{record.serialNumber}</CTableDataCell>
              <CTableDataCell>{record.datex}</CTableDataCell>
             {/* <CTableDataCell>{record.createdDate}</CTableDataCell>
              <CTableDataCell
                style={{ color: record.status === "1" ? "green" : "red", fontWeight: "bold" }}
              >
                {record.status === "1" ? "Active" : "Inactive"}
              </CTableDataCell>*/}
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    ) : (
      <p>No history records found.</p>
    )}
  </CModalBody>
  <CModalFooter>
    <CButton color="secondary" onClick={() => setModalVisible(false)}>Close</CButton>
  </CModalFooter>
</CModal>

            <CPagination align="center">
              <CPaginationItem 
                style={{ cursor: "pointer", fontWeight: "bold" }} 
                disabled={currentPage === 1} 
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                Previous
              </CPaginationItem>

              {Array.from({ length: totalPages }).map((_, index) => (
                <CPaginationItem 
                  key={index} 
                  style={{ cursor: "pointer", fontWeight: "bold" }} 
                  active={currentPage === index + 1} 
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </CPaginationItem>
              ))}

              <CPaginationItem 
                style={{ cursor: "pointer", fontWeight: "bold" }} 
                disabled={currentPage === totalPages} 
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              >
                Next
              </CPaginationItem>
            </CPagination>
          </>
        )}
      </CCardBody>
    </CCard>
  );
}

export default MemberStatus;
