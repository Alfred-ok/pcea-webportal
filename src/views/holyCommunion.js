import React, { useEffect, useState } from "react";
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
  CButton,
  CSpinner,
  CPagination,
  CPaginationItem,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CFormTextarea,
  CFormSelect,
  CFormInput,
  CRow,
  CAlert,
  
} from "@coreui/react";
import Swal from "sweetalert2";
import { MdCookie } from "react-icons/md";

function holyCommunion() {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [comments, setComments] = useState("");
  const [status, setStatus] = useState("7");
  const [searchZP, setSearchZP] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [tableRefresh, setTableRefresh ] = useState(true);

  const recordsPerPage = 300;

  useEffect(() => {
    const fetchMemberStatus = async () => {
      

      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/holyCommunion`/*"http://197.232.170.121:8594/api/registrations/holyCommunion"*/, {
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
        setFilteredMembers(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMemberStatus();
  }, [tableRefresh]);


  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchZP(value);
    if (value.trim() === "") {
      setFilteredMembers(members);
    } else {
      const filtered = members.filter((member) =>
        member.zpnumber.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredMembers(filtered);
    }
    setCurrentPage(1); 
  };

  const filterMembers = (zp, gender, district) => {
    let filtered = members;
    if (zp.trim() !== "") {
      filtered = filtered.filter((member) =>
        member.zpnumber.toLowerCase().includes(zp.toLowerCase())
      );
    }
    if (gender) {
      filtered = filtered.filter((member) =>
        member.gender.toLowerCase() === gender.toLowerCase()
      );
    }
    if (district) {
      filtered = filtered.filter((member) => member.district === district);
    }
    setFilteredMembers(filtered);
    setCurrentPage(1);
  };

  const handleGenderChange = (e) => {
    setSelectedGender(e.target.value);
    filterMembers(searchZP, e.target.value, selectedDistrict);
  };
  
  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
    filterMembers(searchZP, selectedGender, e.target.value);
  };
  
  const handleDiscontinueCommunion = (member) => {
    setSelectedMember(member);
    setModalVisible(true);
  };

  const handleSubmit = async () => {
    if (!selectedMember) return;
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");
  
      const payload = {
        id: selectedMember.id,
        status: Number(status),
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
        throw new Error(errorResponse.message || "Failed to update Holy Communion status.");
      }
  
      
      Swal.fire({title: "Success!", text: "Holy Communion status updated successfully.", icon: "success",timer: 2000, showConfirmButton: false,
      });
  
      setModalVisible(false);
      setTableRefresh(!tableRefresh);
    } catch (err) {
      console.error("Error submitting request:", err);
      
      
      Swal.fire("Error", err.message || "Failed to update Holy Communion status.", "error");
    }
  };
  
  const totalRecords = filteredMembers.length;
  const totalPages = Math.ceil(totalRecords / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredMembers.slice(indexOfFirstRecord, indexOfLastRecord);

  const roleId = localStorage.getItem("roleId");

  return (
    <>
      <CCard className="mb-4" style={{  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)"}}>
        <CCardHeader className="mt-2">
          <CAlert color="primary" variant="solid" style={{display:"flex", alignItems:"center"}}>
            <MdCookie style={{marginRight:"8px", fontSize:"40"}} />
            <h3 style={{ color: "#fff" }}>Holy Communion</h3>
          </CAlert>   
        </CCardHeader>
        <CCardBody>

        <div className="mb-3 d-flex justify-content-end align-items-center gap-3">
  {/* Search Input */}
  <CFormInput
    type="text"
    placeholder="Search by ZP Number"
    value={searchZP}
    onChange={handleSearchChange}
  />

  {/* Gender Filter */}
  <CFormSelect value={selectedGender} onChange={handleGenderChange}>
    <option style={{ fontWeight: "bold" }} value="">All Genders</option>
    <option style={{ fontWeight: "bold" }} value="Male">Male</option>
    <option style={{ fontWeight: "bold" }} value="Female">Female</option>
  </CFormSelect>

  {/* District Filter */}
  <CFormSelect value={selectedDistrict} onChange={handleDistrictChange}>
    <option value="">All Districts</option>
    {[...new Set(members.map((member) => member.district))].map((district) => (
      <option key={district} value={district}>{district}</option>
    ))}
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
            <p style={{ textAlign: "center" }}>No member records found.</p>
          ) : (
            <>
              <CTable striped bordered hover>
                <CTableHead>
                  <CTableRow color="primary">
                    <CTableHeaderCell>No.</CTableHeaderCell>
                    <CTableHeaderCell>Full Name</CTableHeaderCell>
                    <CTableHeaderCell>Mobile Number</CTableHeaderCell>
                    <CTableHeaderCell>ZP Number</CTableHeaderCell>
                    <CTableHeaderCell>Districts</CTableHeaderCell>
                    <CTableHeaderCell>Gender</CTableHeaderCell>
                    { roleId == "1" ? null : <CTableHeaderCell>Action</CTableHeaderCell>}
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {currentRecords.map((member, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell style={{fontWeight:"bold", color:"blue"}}>{indexOfFirstRecord + index + 1}</CTableDataCell>
                      <CTableDataCell>{member.fullName}</CTableDataCell>
                      <CTableDataCell>{member.mobileNumber}</CTableDataCell>
                      <CTableDataCell>{member.zpnumber}</CTableDataCell>
                        <CTableDataCell>{member.district}</CTableDataCell>
                        <CTableDataCell>{member.gender}</CTableDataCell>
                      <CTableDataCell>
                      { roleId == "1" ?
                        null
                        :
                        <CButton style={{color:"white", fontWeight:"bold"}}  color="success" onClick={() => handleDiscontinueCommunion(member)}>
                        <MdCookie style={{marginRight:"4px", fontSize:"20"}} /> Stop Communion
                        </CButton>
                      }  
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>

              <CPagination  className="mt-3 justify-content-center">
                <CPaginationItem 
                 style={{ cursor: "pointer", fontWeight: "bold" }}
                 disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
                  Previous
                </CPaginationItem>
                {Array.from({ length: totalPages }, (_, i) => (
                  <CPaginationItem style={{fontWeight:"bold", cursor:"pointer"}} key={i + 1} active={i + 1 === currentPage} onClick={() => setCurrentPage(i + 1)}>
                    {i + 1}
                  </CPaginationItem>
                ))}
                <CPaginationItem  
                style={{fontWeight:"bold", cursor:"pointer"}} disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
                  Next
                </CPaginationItem>
              </CPagination>
            </>
          )}
        </CCardBody>
      </CCard>
      <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <CModalHeader>Stop Holy Communion</CModalHeader>
        <CModalBody>
          {/*<p style={{fontWeight:"bold"}} >{selectedMember?.id}</p>*/}
          <CFormSelect label="Status" className="mb-3" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="7">Yes</option>
            {
            //<option value="1">No</option>
            }
          </CFormSelect>
          <CFormTextarea label="comments" className="mb-3" value={comments} onChange={(e) => setComments(e.target.value)} placeholder="Enter comments" />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalVisible(false)}>Cancel</CButton>
          <CButton style={{color:"white", fontWeight:"bold"}} color="success" onClick={handleSubmit}>Confirm</CButton>
        </CModalFooter>
      </CModal>
    </>
  );
}

export default holyCommunion;
