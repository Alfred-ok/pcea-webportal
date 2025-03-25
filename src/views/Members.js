import React, { useState, useEffect } from "react";
import {
  CCard,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CNav,
  CNavItem,
  CNavLink,
  CButton,
  CModalHeader,
  CModalTitle,
  CFormTextarea,
  CModalBody,
  CModalFooter,
  CModal,
  CCardHeader,
  CCardTitle,
  CAlert,
  CCardBody,
  CFormCheck,
} from "@coreui/react";
import "ldrs/zoomies";
import { MdGroupAdd } from "react-icons/md";
import CV from "./CV";
import { CSpinner } from '@coreui/react'

const ServiceRequest = () => {
  const [activeTab, setActiveTab] = useState("movedToEvangelist");
  const [members, setMembers] = useState({ movedToPastoral: [], movedToEvangelist: [], movedToCatechism: [] });
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState("");
  const [selectedMember, setSelectedMember] = useState(null);
  const [comment, setComment] = useState("");
  const [tableRefresh, setTableRefresh ] = useState(true);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [viewMoreVisible, setViewMoreVisible] = useState(false);
  const [viewMoreVisibleData, setViewMoreVisibleData] = useState();
  const [showApproveAllModal, setShowApproveAllModal] = useState(false);
  const [approveallStatus, setApproveallStatus] = useState("")
  const [approveallcomments, setApproveallcomments] = useState("")
  const [loadingApproeallButton, setLoadingApproeallButton] = useState(false);


  const roleId = localStorage.getItem("roleId");

  useEffect(() => {
    const fetchData = async (tab, url) => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const response = await fetch(url, {
          method: "GET",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        setMembers((prev) => ({ ...prev, [tab]: Array.isArray(data) ? data : [] }));
        setSelectedMembers([]); // Reset selections on tab change
      } catch (error) {
        console.error(`Error fetching ${tab} members:`, error);
        setMembers((prev) => ({ ...prev, [tab]: [] }));
      } finally {
        setLoading(false);
      }
    };

    fetchData("movedToPastoral", `${import.meta.env.VITE_BASE_URL}/byStatus?status=4`/*"http://197.232.170.121:8594/api/registrations/byStatus?status=4"*/);//4
    fetchData("movedToEvangelist", `${import.meta.env.VITE_BASE_URL}/byStatus?status=3`/* "http://197.232.170.121:8594/api/registrations/byStatus?status=3"*/);//3
    fetchData("movedToCatechism", `${import.meta.env.VITE_BASE_URL}/byStatus?status=6`/*"http://197.232.170.121:8594/api/registrations/byStatus?status=6"*/);//6
  }, [tableRefresh]);

  const approval = roleId == "1" ? "":"Approval";

  const tableHeaders = {
    movedToPastoral: ["Full Name", "District", "Gender", "Telephone", approval],
    movedToEvangelist: ["Full Name", "District", "Gender" , "Telephone", approval],
    movedToCatechism: ["Full Name", "District", "Gender","Telephone", approval],
  };

  // Select/Deselect Individual Member
  const toggleSelection = (memberId) => {
    setSelectedMembers((prev) =>
      prev.includes(memberId) ? prev.filter((id) => id !== memberId) : [...prev, memberId]
    );
  };

  // Select/Deselect All Members
  const toggleSelectAll = () => {
    if (selectedMembers.length === members[activeTab].length) {
      setSelectedMembers([]); // Deselect all
    } else {
      setSelectedMembers(members[activeTab].map((m) => m.id)); // Select all
    }
  };


  //viewmore
  const handleViewMore = (person) =>{
    if(person){
      setViewMoreVisibleData(person)
      setViewMoreVisible(true)
    }
    
  }

  console.log(viewMoreVisibleData);

  const handleApprove = (memberId) => {
    const member = members[activeTab].find((m) => m.id === memberId);
    if (member) {
      setSelectedMember(member);
      setShowModal(true);
    }
  };



  const handleSubmit = async () => {
    if (!selectedMember || !registrationStatus) {
      alert("Please select a registration status.");
      return;
    }

    const payload = {
      id: selectedMember.id,
      status: registrationStatus,
      comments: comment,
    };

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/approve`/*"http://197.232.170.121:8594/api/registrations/approve"*/, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to update status");

      alert("Status updated successfully!");
      setShowModal(false);
      setTableRefresh(!tableRefresh);
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Error updating status. Please try again.");
    }
  };



  const handleApproveAll = async () => {
    if (selectedMembers.length === 0) {
      alert("No members selected.");
      return;
    }

    
  
    const approvals = selectedMembers.map((id) => ({
      id: id,
      status: approveallStatus, // Change this based on the active tab
      comments: approveallcomments,
    }));

    console.log("end",approvals);

    setLoadingApproeallButton(true);
  
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");
  
      await Promise.all(
        approvals.map((payload) =>
          fetch(`${import.meta.env.VITE_BASE_URL}/approve`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(payload),
          })
        )
      );
      setLoadingApproeallButton(false);
      setShowApproveAllModal(false)
      setTableRefresh(!tableRefresh);
      setSelectedMembers([]); // Reset selection

      alert("All selected members approved!");
      
      
    } catch (error) {
      console.error("Error approving all:", error);
      alert("Error approving all. Please try again.");
      setLoadingApproeallButton(false);
    }
  };
  






  console.log("start",selectedMembers);

 

  console.log(members);


  return (
    <CCard className="mb-4">
    <CCardHeader>
      <CCardTitle>
      <CAlert color="primary" variant="solid"  style={{display:"flex"}}>
        <MdGroupAdd size={40} className="nav-icon" style={{marginRight:"10px"}} />
        <h3>New Applicant</h3>
      </CAlert>
      </CCardTitle>
    </CCardHeader>
    <CCardBody>
<CNav variant="tabs">
  {["movedToEvangelist", "movedToPastoral", "movedToCatechism"].map((tab) => (
    <CNavItem key={tab}>
      <CNavLink
        active={activeTab === tab}
        onClick={() => setActiveTab(tab)}
        style={{ cursor: "pointer", fontWeight: "bold" }}
      >
        {tab === "movedToEvangelist"
          ? "Moved to Evangelist"
          : tab === "movedToPastoral"
          ? "Moved to Pastoral"
          : "Moved to Catechism"}
      </CNavLink>
    </CNavItem>
  ))}
</CNav>

      {loading ? (
        <div className="text-center">
          <l-zoomies size="120" stroke="5" bg-opacity="0.1" speed="1.4" color="blue" />
          <p>Loading data...</p>
        </div>
      ) : (
        <>
        {/*approval button*/}
        {
          selectedMembers.length !== 0 &&
          <CButton
            color="success"
            style={{ marginBottom: "10px", fontWeight: "bold", color:'#fff', marginTop:"10px" }}
            onClick={()=>setShowApproveAllModal(true)}
          >
            Approve All
          </CButton>
        }


        <CTable striped bordered hover>

        
          <CTableHead>
            <CTableRow color="primary">
              <CTableHeaderCell style={{ color: "blue", fontWeight: "bold" }}>#</CTableHeaderCell>
              <CTableHeaderCell style={{ color: "blue", fontWeight: "bold" }}>No.</CTableHeaderCell>
              {tableHeaders[activeTab].map((header) => (
                <CTableHeaderCell key={header} style={{ color: "blue", fontWeight: "bold" }}>{header}</CTableHeaderCell>
              ))}
            </CTableRow>
          </CTableHead>


          <CTableBody>
            {members[activeTab].map((person, index) => (
              <CTableRow key={person.id}>
                <CTableDataCell>
                    <CFormCheck
                      checked={selectedMembers.includes(person.id)}
                      onChange={() => toggleSelection(person.id)}
                    />
                </CTableDataCell>    
                <CTableDataCell>{index + 1}</CTableDataCell>
                <CTableDataCell>{person.names}</CTableDataCell>
                <CTableDataCell>{person.district}</CTableDataCell>
                <CTableDataCell>{person.gender}</CTableDataCell>
                {
               // <CTableDataCell>{person.membershipType || person.zpnumber}</CTableDataCell>
            }
                <CTableDataCell>{person.telephone}</CTableDataCell>
                {(activeTab === "movedToPastoral" || activeTab === "movedToEvangelist"|| activeTab === "movedToCatechism") && (
                  <CTableDataCell>
                  { roleId == "1" ?
                    <></>
                    :
                    <>
                    <CButton style={{color:"white", fontWeight:"bold",marginRight:"5px"}} color="success" onClick={() => handleApprove(person.id)}>
                      Approve
                    </CButton>
                    <CButton style={{color:"white", fontWeight:"bold"}} color="primary" onClick={() => handleViewMore(person)}>
                      View More
                    </CButton>
                    </>
                    }
                  </CTableDataCell>
                )}
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
        </>
      )}
      <CModal visible={showModal} onClose={() => setShowModal(false)}>
  <CModalHeader>
    <CModalTitle>Approval Details</CModalTitle>
  </CModalHeader>
  <CModalBody style={{ maxHeight: "60vh", overflowY: "auto" }}>
    {selectedMember && (
      <>
      {/*
        <p><strong style={{ color: "blue" }}>Names:</strong> {selectedMember.names}</p>
        <p><strong style={{ color: "blue" }}>Telephone:</strong> {selectedMember.telephone}</p>
        <p><strong style={{ color: "blue" }}>Email:</strong> {selectedMember.email}</p>
        <p><strong style={{ color: "blue" }}>Membership Type:</strong> {selectedMember.membershipType}</p>
        <p><strong style={{ color: "blue" }}>Baptized:</strong> {selectedMember.baptized}</p>
        <p><strong style={{ color: "blue" }}>Communicant:</strong> {selectedMember.communicant}</p>
        <p><strong style={{ color: "blue" }}>Communicant Number:</strong> {selectedMember.communicantNumber}</p>
        <p><strong style={{ color: "blue" }}>Date of Baptism:</strong> {selectedMember.dateOfBaptism}</p>
        <p><strong style={{ color: "blue" }}>Baptized By:</strong> {selectedMember.baptisedBy}</p>
        <p><strong style={{ color: "blue" }}>Date of Confirmation:</strong> {selectedMember.dateOfConfirmation}</p>
        <p><strong style={{ color: "blue" }}>Confirmed By:</strong> {selectedMember.confirmedBy}</p>
        <p><strong style={{ color: "blue" }}>Confirmation Location:</strong> {selectedMember.confirmationLocation}</p>
        <p><strong style={{ color: "blue" }}>District:</strong> {selectedMember.district}</p>

        <p><strong style={{ color: "blue" }}>Passport Photo:</strong></p>
        <img src={`data:image/jpeg;base64,${selectedMember.passportPhoto}`} alt="Passport Photo" style={{ width: "350px", height: "350px" }} />

        <p><strong style={{ color: "blue" }}>Transfer Letter:</strong></p>
        <img src={`data:image/jpeg;base64,${selectedMember.transferLetter}`} alt="Transfer Letter" style={{ width: "350px", height: "350px" }} />

        <p><strong style={{ color: "blue" }}>Communion Form:</strong></p>
        <img src={`data:image/jpeg;base64,${selectedMember.communionForm}`} alt="Communion Form" style={{ width: "350px", height: "350px" }} />
      */}
        <label htmlFor="registrationStatus" className="mt-2" style={{ fontWeight: "bold", color: "blue" }}>
  Approve Registration:
</label>
{activeTab === "movedToEvangelist" ?
<select
  id="registrationStatus"
  className="form-control mt-2"
  value={registrationStatus}
  onChange={(e) => setRegistrationStatus(e.target.value)}
>
  <option value="">Select</option>
  
  <option value={activeTab === "movedToEvangelist" ? "4" : activeTab === "movedToPastoral" ? "5" : "5"}>Moved To Pastoral</option>
  {
  //<option value={activeTab === "movedToEvangelist" ? "2" : activeTab === "movedToPastoral" ? "6" : "5"}>Moved Back to Elder </option>
  }
</select>
:
activeTab === "movedToPastoral" ?
<select
  id="registrationStatus"
  className="form-control mt-2"
  value={registrationStatus}
  onChange={(e) => setRegistrationStatus(e.target.value)}
>
  <option value="">Select</option>
  
  <option value={activeTab === "movedToEvangelist" ? "4" : activeTab === "movedToPastoral" ? "5" : "5"}>Move to Full Member awaiting Admission</option>
  <option value={activeTab === "movedToEvangelist" ? "2" : activeTab === "movedToPastoral" ? "6" : "5"}>Moved To Catechism</option>
  
</select>
  :
  activeTab === "movedToCatechism" ?
<select
  id="registrationStatus"
  className="form-control mt-2"
  value={registrationStatus}
  onChange={(e) => setRegistrationStatus(e.target.value)}
>
  <option value="">Select</option>
  
  <option value={activeTab === "movedToEvangelist" ? "4" : activeTab === "movedToPastoral" ? "5" : "5"}>Move to Full Member awaiting Admission</option>
  {
  //<option value={activeTab === "movedToEvangelist" ? "2" : activeTab === "movedToPastoral" ? "6" : "5"}>Moved To Catechism</option>
  }
</select>
  :
  <>Action Disabled</>
  }

        <CFormTextarea
          className="mt-2"
          placeholder="Add a comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </>
    )}
  </CModalBody>
  <CModalFooter>
    <CButton color="secondary" onClick={() => setShowModal(false)}>Close</CButton>
    <CButton color="success" onClick={handleSubmit}>Confirm</CButton>
  </CModalFooter>
</CModal>


    <CModal
        visible={viewMoreVisible}
        onClose={() => setViewMoreVisible(false)}
        aria-labelledby="LiveDemoExampleLabel"
        size="xl"
        alignment="center"
        backdrop="static"
      >
      <CModalHeader>
          
        </CModalHeader>
        {viewMoreVisibleData && <CV viewMoreVisibleData={viewMoreVisibleData}/>}
      
      </CModal>
      






      {/** approve all section */}
      <CModal visible={showApproveAllModal} onClose={() => setShowApproveAllModal(false)}>
      <CModalHeader>
        <CModalTitle>Approval All Details</CModalTitle>
      </CModalHeader>
      <CModalBody style={{ maxHeight: "60vh", overflowY: "auto" }}>
      
      <>

      <label htmlFor="registrationStatus" className="mt-2" style={{ fontWeight: "bold", color: "blue" }}>
      Approval All Details
</label>
{activeTab === "movedToEvangelist" ?
        <select
          id="registrationStatus"
          className="form-control mt-2"
          value={approveallStatus}
          onChange={(e) => setApproveallStatus(e.target.value)}
        >
          <option value="">Select</option>
          
          <option value={activeTab === "movedToEvangelist" ? "4" : activeTab === "movedToPastoral" ? "5" : "5"}>Moved To Pastoral</option>
          {
          //<option value={activeTab === "movedToEvangelist" ? "2" : activeTab === "movedToPastoral" ? "6" : "5"}>Moved Back to Elder </option>
          }
        </select>
:
activeTab === "movedToPastoral" ?
          <select
            id="registrationStatus"
            className="form-control mt-2"
            value={approveallStatus}
            onChange={(e) => setApproveallStatus(e.target.value)}
          >
            <option value="">Select</option>
            
            <option value={activeTab === "movedToEvangelist" ? "4" : activeTab === "movedToPastoral" ? "5" : "5"}>Move to Full Member awaiting Admission</option>
            <option value={activeTab === "movedToEvangelist" ? "2" : activeTab === "movedToPastoral" ? "6" : "5"}>Moved To Catechism</option>
            
          </select>
  :
  activeTab === "movedToCatechism" ?
          <select
            id="registrationStatus"
            className="form-control mt-2"
            value={approveallStatus}
            onChange={(e) => setApproveallStatus(e.target.value)}
          >
            <option value="">Select</option>
            
            <option value={activeTab === "movedToEvangelist" ? "4" : activeTab === "movedToPastoral" ? "5" : "5"}>Move to Full Member awaiting Admission</option>
            {
            //<option value={activeTab === "movedToEvangelist" ? "2" : activeTab === "movedToPastoral" ? "6" : "5"}>Moved To Catechism</option>
            }
          </select>
  :
  <>Action Disabled</>
  }

        <CFormTextarea
          className="mt-2"
          placeholder="Add a comment"
          value={approveallcomments}
          onChange={(e) => setApproveallcomments(e.target.value)}
        />
      </>
    
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setShowApproveAllModal(false)}>Close</CButton>
        { loadingApproeallButton ?
            <CButton color="primary" disabled onClick={handleApproveAll} style={{fontWeight :"bold"}}>
              <CSpinner as="span" className="me-2" size="sm" aria-hidden="true" />
              <span>Confirm...</span>
            </CButton>
          :
            <CButton style={{fontWeight :"bold"}} onClick={handleApproveAll} color="primary" type="submit">
             Confirm
            </CButton>
          }
      </CModalFooter>
    </CModal>


    </CCardBody>
    </CCard>
  );
};

export default ServiceRequest;
