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
  CModalTitle,
  CForm,
  
} from "@coreui/react";

function newMembers() {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [comments, setComments] = useState("admitted");
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

        const response = await fetch("http://197.232.170.121:8594/api/registrations/newlyregistered", {
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
  
  //const handleDiscontinueCommunion = (member) => {
    //setSelectedMember(member);
    //setModalVisible(true);
  //};

  const handleapproval = async (approvalId) =>{
    
    const payload = {
      id:approvalId,
      status: status,
      comments: comments,
    };

    console.log(payload)

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await fetch("http://197.232.170.121:8594/api/registrations/approve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to update status");

      alert("Status updated successfully!");

      setTableRefresh(!tableRefresh)
      
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Error updating status. Please try again.");
    }
  
  }




/*

  const handleSubmit = async () => {
    if (!selectedMember) return;
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");
  
      const payload = {
        id: selectedMember.id,
        status: status,
        comments,
      };
  
      const response = await fetch("http://197.232.170.121:8594/api/registrations/approvetransfer", {
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
  
      
      Swal.fire({        title: "Success!", text: "Holy Communion status updated successfully.", icon: "success",timer: 2000, showConfirmButton: false,
      });
  
      setModalVisible(false);
    } catch (err) {
      console.error("Error submitting request:", err);
      
      
      Swal.fire("Error", err.message || "Failed to update Holy Communion status.", "error");
    }
  };
  */


  const totalRecords = filteredMembers.length;
  const totalPages = Math.ceil(totalRecords / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredMembers.slice(indexOfFirstRecord, indexOfLastRecord);

  return (
    <>
      <CCard  className="mb-4">
        <CCardHeader>
          <h3 style={{ color: "blue" }}>Admission</h3>
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
                  <CTableRow>
                    <CTableHeaderCell>No.</CTableHeaderCell>
                    <CTableHeaderCell>Full Name</CTableHeaderCell>
                    <CTableHeaderCell>Mobile Number</CTableHeaderCell>
                    <CTableHeaderCell>Districts</CTableHeaderCell>
                    <CTableHeaderCell>Gender</CTableHeaderCell>
                    <CTableHeaderCell>Action</CTableHeaderCell>  
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {currentRecords.map((member, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell style={{fontWeight:"bold", color:"blue"}}>{indexOfFirstRecord + index + 1}</CTableDataCell>
                      <CTableDataCell>{member.names}</CTableDataCell>
                      <CTableDataCell>{member.telephone}</CTableDataCell>
                        <CTableDataCell>{member.district}</CTableDataCell>
                        <CTableDataCell>{member.gender}</CTableDataCell>
                     <CTableDataCell>
                        <CButton style={{color:"white", fontWeight:"bold"}}  color="success" onClick={() =>{ handleapproval(member.id);}}>
                          Admit
                        </CButton>
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
    </>
  );
}

export default newMembers;
