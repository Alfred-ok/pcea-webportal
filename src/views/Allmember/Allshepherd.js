

import React, { useEffect, useState } from "react";
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CCard, CCardBody, CSpinner, CFormInput, CAlert } from "@coreui/react";

const Allshepherd = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [fullNameFilter, setFullNameFilter] = useState("");
  const [mobileFilter, setMobileFilter] = useState("");

  useEffect(() => {
    fetch("http://192.168.12.245:8594/api/registrations/RejoiningMemberStatus?Status=22")
      .then((response) => response.json())
      .then((data) => {
        setMembers(data);
        setFilteredMembers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching members:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtered = members.filter(member => 
      member.fullName.toLowerCase().includes(fullNameFilter.toLowerCase()) &&
      member.mobileNumber.includes(mobileFilter)
    );
    setFilteredMembers(filtered);
  }, [fullNameFilter, mobileFilter, members]);


  return (
    <CCard className="p-3">
      <CCardBody>
        <CAlert style={{ backgroundColor:"rgba(22, 89, 177, 0.925)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <h3 style={{ color: "#fff" }}>Registered Shepherd</h3>
            <h5 style={{ color: "#fff" }}>Total Number of Shepherd : {members.length}</h5>
        </CAlert>
        <div className="d-flex gap-2 mb-3">
          <CFormInput 
            type="text" 
            placeholder="Filter by Full Name" 
            value={fullNameFilter} 
            onChange={(e) => setFullNameFilter(e.target.value)}
          />
          <CFormInput
            type="text" 
            placeholder="Filter by Mobile" 
            value={mobileFilter} 
            onChange={(e) => setMobileFilter(e.target.value)}
          />
        </div>
        {loading ? (
          <CSpinner color="primary" />
        ) : (
          <CTable striped bordered hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>#</CTableHeaderCell>
                <CTableHeaderCell>Full Name</CTableHeaderCell>
                <CTableHeaderCell>Gender</CTableHeaderCell>
                <CTableHeaderCell>Mobile</CTableHeaderCell>
                {/*<CTableHeaderCell>National ID</CTableHeaderCell>*/}
                <CTableHeaderCell>District</CTableHeaderCell>
                <CTableHeaderCell>Marital Status</CTableHeaderCell>
                <CTableHeaderCell>Spouse Name</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {filteredMembers.map((member, index) => (
                <CTableRow key={member.id}>
                  <CTableDataCell>{index + 1}</CTableDataCell>
                  <CTableDataCell>{member.fullName}</CTableDataCell>
                  <CTableDataCell>{member.gender}</CTableDataCell>
                  <CTableDataCell>{member.mobileNumber}</CTableDataCell>
                  {/*<CTableDataCell>{member.nationalID}</CTableDataCell>*/}
                  <CTableDataCell>{member.district}</CTableDataCell>
                  <CTableDataCell>{member.maritalStatus}</CTableDataCell>
                  <CTableDataCell>{member.spouseName || "N/A"}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        )}
      </CCardBody>
    </CCard>
  );
};

export default Allshepherd;
