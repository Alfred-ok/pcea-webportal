import React, { useEffect, useState } from "react";
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CCard, CCardBody, CSpinner, CPagination, CPaginationItem, CFormInput, CFormSelect, CAlert } from "@coreui/react";
import Districtdata from "../Registration/Registration Form/Districtdata";

const Member = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [fullNameFilter, setFullNameFilter] = useState("");
  const [zpNumberFilter, setZpNumberFilter] = useState("");
  const [mobileFilter, setMobileFilter] = useState("");
  const [districtFilter, setDistrictFilter] = useState("")
  const itemsPerPage = 20;

  useEffect(() => {
    fetch("http://192.168.12.245:8594/api/registrations/AllMembers")
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
      member.zpnumber.toLowerCase().includes(zpNumberFilter.toLowerCase()) &&
      member.mobileNumber.includes(mobileFilter) &&
      member.district.toLowerCase().includes(districtFilter.toLowerCase())
    );
    setFilteredMembers(filtered);
    setCurrentPage(1);
  }, [fullNameFilter, zpNumberFilter, mobileFilter, districtFilter, members]);


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const displayedItems = filteredMembers.length > 0 ? filteredMembers : members;
  const currentItems = displayedItems.slice(indexOfFirstItem, indexOfLastItem);
 // const currentItems = filteredMembers.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage);

  const getPageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.max(1, currentPage - 5);
    const endPage = Math.min(totalPages, startPage + 9);
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };


  

  return (
    <CCard className="p-3">
      <CCardBody>
        <CAlert style={{ backgroundColor:"rgba(22, 89, 177, 0.925)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <h3 style={{ color: "#fff" }}>Registered Members</h3>
            <h5 style={{ color: "#fff" }}>Total Number of Members : {members.length}</h5>
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
            placeholder="Filter by ZP Number" 
            value={zpNumberFilter} 
            onChange={(e) => setZpNumberFilter(e.target.value)}
          />
          <CFormInput
            type="text" 
            placeholder="Filter by Mobile" 
            value={mobileFilter} 
            onChange={(e) => setMobileFilter(e.target.value)}
          />
          <CFormSelect value={districtFilter} onChange={(e) => setDistrictFilter(e.target.value)}>
            <option value="All">All Districts</option>
            {Districtdata.map((data, index) => <option key={index} value={data.district}>{data.district}</option>)}
          </CFormSelect>
        </div>
        {loading ? (
          <CSpinner color="primary" />
        ) : (
            <>
          <CTable striped bordered hover responsive>
            <CTableHead color="primary">
              <CTableRow>
                <CTableHeaderCell>#</CTableHeaderCell>
                <CTableHeaderCell>Full Name</CTableHeaderCell>
                <CTableHeaderCell>Gender</CTableHeaderCell>
                <CTableHeaderCell>Mobile</CTableHeaderCell>
                <CTableHeaderCell>ZP Number</CTableHeaderCell>
                <CTableHeaderCell>District</CTableHeaderCell>
                <CTableHeaderCell>Marital Status</CTableHeaderCell>
                <CTableHeaderCell>Spouse Name</CTableHeaderCell>
                {/*<CTableHeaderCell>National ID</CTableHeaderCell>*/}
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {currentItems.map((member, index) => (
                <CTableRow key={member.id}>
                  <CTableDataCell>{member.id}</CTableDataCell>
                  <CTableDataCell>{member.fullName}</CTableDataCell>
                  <CTableDataCell>{member.gender}</CTableDataCell>
                  <CTableDataCell>{member.mobileNumber}</CTableDataCell>
                  <CTableDataCell>{member.zPNumber}</CTableDataCell>
                  <CTableDataCell>{member.district}</CTableDataCell>
                  <CTableDataCell>{member.maritalStatus}</CTableDataCell>
                  <CTableDataCell>{member.spouseName || "N/A"}</CTableDataCell>
                  {/*<CTableDataCell>{member.nationalID}</CTableDataCell>*/}
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
          <CPagination align="center" className="mt-3">
              <CPaginationItem disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</CPaginationItem>
              {getPageNumbers().map((num) => (
                <CPaginationItem key={num} active={num === currentPage} onClick={() => setCurrentPage(num)}>
                  {num}
                </CPaginationItem>
              ))}
              <CPaginationItem disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</CPaginationItem>
            </CPagination>
          </>
        )}
      </CCardBody>
    </CCard>
  );
};

export default Member;
