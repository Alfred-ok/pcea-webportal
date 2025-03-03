import React, { useState, useEffect } from "react";
import {
  CFormSelect,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CNav,
  CNavItem,
  CNavLink,
  CPagination,
  CPaginationItem,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CSpinner,
} from "@coreui/react";

import successSvg from "src/assets/images/avatars/13.svg";
import errorPng from "src/assets/images/avatars/14.png";
import { zoomies } from "ldrs";
import Swal from "sweetalert2";
zoomies.register();

const Visitors = () => {
  const [activeTab, setActiveTab] = useState("registration");
  const [visitorDataList, setVisitorDataList] = useState([]);
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    surname: "",
    nationalId: "",
    mobile: "",
    address: "",
    gender: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [isEditing, setIsEditing] = useState(false);
  const [currentVisitorId, setCurrentVisitorId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (["firstName", "middleName", "surname"].includes(name)) {
      if (/^[A-Za-z]*$/.test(value)) {
        setFormData({ ...formData, [name]: value });
      }
      return;
    }
  
    if (name === "nationalId") {
      if (/^\d*$/.test(value) && value.length <= 8) {
        setFormData((prev) => ({ ...prev, nationalId: value }));
      }
      return;
    }
  
    if (name === "mobile") {
      
      const formattedValue = value.startsWith("+254")
        ? value.replace("+254", "")
        : value;
      
      if (/^\d*$/.test(formattedValue) && formattedValue.length <= 9) {
       
        setFormData((prev) => ({
          ...prev,
          mobile: "+254" + formattedValue,
        }));
      }
      return;
    }
  
    setFormData({ ...formData, [name]: value });
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      // Update visitor data
      fetch(`http://localhost:8080/api/visitors/${currentVisitorId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((updatedVisitor) => {
          setVisitorDataList((prevList) =>
            prevList.map((visitor) =>
              visitor.id === currentVisitorId ? updatedVisitor : visitor
            )
          );
          setShowModal(false);
          setIsEditing(false);
          Swal.fire({
            title: "Updated!",
            text: "Visitor information updated successfully.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
        })
        .catch((error) => console.error("Error updating visitor:", error));
    } else {
      fetch("http://localhost:8080/api/visitors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((error) => {
              throw new Error(
                error.message || "Failed to register the visitor."
              );
            });
          }
          return response.json();
        })
        .then((data) => {
          setVisitorDataList((prevList) => [...prevList, data]);
          setFormData({
            fullName: "",
            mobile: "",
            address: "",
            gender: "",
          });
          Swal.fire({
            title: "Saved!",
            text: "Visitor Information saved!",
            icon: "success",
            timer: 1500,
            timerProgressBar: true,
            showConfirmButton: false,
            customClass: {
              popup: "swal-custom-popup",
              confirmButton: "swal-confirm-button",
            },
          });
        })
        .catch((error) => {
          console.error("Error submitting data:", error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            timer: 1500,
            text: "Something went wrong!",
            footer: '<a href="#">Please try again</a>',
            timerProgressBar: true,
            showConfirmButton: false,
          });
        });
    }
  };

  const fetchVisitors = () => {
    setLoading(true);
    fetch("http://localhost:8080/api/visitors")
      .then((response) => response.json())
      .then((data) => {
        setVisitorDataList(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching visitors:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (activeTab === "visitors") {
      fetchVisitors();
    }
  }, [activeTab]);

  const autoCloseModal = () => {
    setTimeout(() => {
      setShowModal(false);
    }, 1500);
  };

  const handleAssignCardClick = (visitor) => {
    console.log("Assigning card to visitor:", visitor);
  };

  const handleEditClick = (visitor) => {
    setFormData(visitor);
    setCurrentVisitorId(visitor.id);
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDeleteMember = (id) => {
    console.log("Deleting visitor with ID:", id);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentVisitors = visitorDataList.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(visitorDataList.length / itemsPerPage);

  return (
    <>
      <CRow className="justify-content-md-center">
        <CCol xs={10}>
          <CNav variant="tabs" style={{ marginBottom: "20px" }}>
            <CNavItem>
              <CNavLink
                href="#"
                active={activeTab === "registration"}
                onClick={() => setActiveTab("registration")}
                style={{ fontWeight: "bold" }}
              >
                Visitor Registration
              </CNavLink>
            </CNavItem>
            
          </CNav>

          {activeTab === "registration" && (
            <CCard
              className="mb-4"
              style={{
                boxShadow: "0px 15px 34px 0px rgba(0,0,0,0.2)",
                color: "blue",
                padding: "40px",
                marginTop: "20px",
              }}
            >
              <CCardHeader style={{ backgroundColor: "#fff" }}>
                <h3 color="blue" fontWeight="bold">
                  Visitor Registration
                </h3>
              </CCardHeader>
              <CCardBody>
                <CForm onSubmit={handleSubmit}>
                  <CRow className="mb-3">
                    <CCol md="6">
                      <CFormLabel
                        htmlFor="fullName"
                        style={{ color: "blue", fontWeight: "bold" }}
                      >
                        Full Name
                      </CFormLabel>
                      <CFormInput
                        id="fullName"
                        name="fullName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Enter Full Name"
                        required
                      />
                    </CCol>

                  </CRow>
                 
                  <CRow className="mb-3">
                  <CCol md="6">
    <CFormLabel htmlFor="mobile" style={{fontWeight:"bold", color:"blue"}}>Mobile Number</CFormLabel>
    <div style={{ display: "flex", alignItems: "center" }}>
      <span
        style={{
          padding: "0.375rem 0.75rem",
          backgroundColor: "#e6f7ff",
          border: "1px solid #ced4da",
          borderRadius: "0.25rem 0 0 0.25rem",
          color: "#495057",
          fontWeight: "bold",
        }}      
      >
        +254
      </span>
      <CFormInput
        id="mobile"
        name="mobile"
        value={formData.mobile.replace("+254", "")} // Display mobile number without prefix
        onChange={handleChange}
        placeholder="Enter mobile number"
        required
        maxLength="9"
        style={{ borderRadius: "0 0.25rem 0.25rem 0" }}
      />
    </div>
  </CCol>
                    <CCol md="6">
                      <CFormLabel
                        htmlFor="address"
                        style={{ color: "blue", fontWeight: "bold" }}
                      >
                        Address
                      </CFormLabel>
                      <CFormInput
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter address"
                        required
                      />
                    </CCol>
                  </CRow>
                  <CRow className="mb-3">
                    <CCol md="6">
                      <CFormLabel
                        htmlFor="gender"
                        style={{ color: "blue", fontWeight: "bold" }}
                      >
                        Gender
                      </CFormLabel>
                      <CFormSelect
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                       
                      </CFormSelect>
                    </CCol>
                  </CRow>
                  <CButton type="submit" color="primary" className="mt-3">
                    {isEditing ? "Update Visitor" : "Register Visitor"}
                  </CButton>
                </CForm>
              </CCardBody>
            </CCard>
          )}

          {activeTab === "visitors" && (
            <CCard
              className="mb-4"
              style={{
                boxShadow: "0px 15px 34px 0px rgba(0,0,0,0.2)",
                color: "blue",
                padding: "40px",
                marginTop: "20px",
              }}
            >
              <CCardHeader>
                <h3 color="blue" fontWeight="bold">
                  Registered Visitors
                </h3>
              </CCardHeader>
              <CCardBody>
                {loading ? (
                  <div className="text-center">
                    <l-zoomies
                      size="120"
                      stroke="5"
                      bg-opacity="0.1"
                      speed="1.2"
                      color="blue"
                    ></l-zoomies>
                  </div>
                ) : (
                  <CTable striped>
                    <CTableHead>
                      <CTableRow>
                        <CTableHeaderCell
                          style={{ fontWeight: "bold", color: "blue" }}
                        >
                          No.
                        </CTableHeaderCell>
                        <CTableHeaderCell
                          style={{ fontWeight: "bold", color: "blue" }}
                        >
                          Full Name
                        </CTableHeaderCell>
                       
                        <CTableHeaderCell
                          style={{ fontWeight: "bold", color: "blue" }}
                        >
                          Mobile
                        </CTableHeaderCell>
                        <CTableHeaderCell
                          style={{ fontWeight: "bold", color: "blue" }}
                        >
                          Gender
                        </CTableHeaderCell>
                        
                      </CTableRow>
                    </CTableHead>
                    <CTableBody>
                      {currentVisitors.map((visitor, index) => (
                        <CTableRow key={visitor.id}>
                          <CTableDataCell>{index + 1}</CTableDataCell>
                          <CTableDataCell>
                            {visitor.fullName}
                          </CTableDataCell>
                        
                          <CTableDataCell>{visitor.mobile}</CTableDataCell>
                          <CTableDataCell>{visitor.gender}</CTableDataCell>
                          <CTableDataCell>
                            <CDropdown>
                              <CDropdownToggle
                                color="success"
                                style={{
                                  color: "#fff",
                                  fontWeight: "bold",
                                }}
                              >
                                Actions
                              </CDropdownToggle>
                              <CDropdownMenu
                                style={{
                                  cursor: "pointer",
                                  fontWeight: "bold",
                                }}
                              >
                                <CDropdownItem
                                  onClick={() => handleAssignCardClick(visitor)}
                                  style={{ fontWeight: "bold" }}
                                >
                                  Link Card
                                </CDropdownItem>
                                <CDropdownItem
                                  onClick={() => handleEditClick(visitor)}
                                  style={{ fontWeight: "bold" }}
                                >
                                  Delink
                                </CDropdownItem>

                                <CDropdownItem
                                  onClick={() => handleEditClick(visitor)}
                                  style={{ fontWeight: "bold" }}
                                >
                                  Edit
                                </CDropdownItem>

                                <CDropdownItem
                                  onClick={() => handleEditClick(visitor)}
                                  style={{ fontWeight: "bold" }}
                                >
                                  Delete
                                </CDropdownItem>
                              </CDropdownMenu>
                            </CDropdown>
                          </CTableDataCell>
                        </CTableRow>
                      ))}
                    </CTableBody>
                  </CTable>
                )}
                <CPagination align="center">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <CPaginationItem
                      key={i}
                      active={i + 1 === currentPage}
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </CPaginationItem>
                  ))}
                </CPagination>
              </CCardBody>
            </CCard>
          )}
        </CCol>
      </CRow>

      {/* Edit Modal */}

    </>
  );
};

export default Visitors;
