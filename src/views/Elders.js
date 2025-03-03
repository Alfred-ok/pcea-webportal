import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  CDropdown,
  CCard,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CCardHeader,
  CCardBody,
  CFormSelect,
  CForm,
  CFormLabel,
  CFormInput,
  CButton,
  CRow,
  CCol,
  CTable,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CTableDataCell,
  CTableBody,
  CNav,
  CNavItem,
  CNavLink,
  CPagination,
  CPaginationItem,
} from "@coreui/react";
import { dotWave, zoomies } from "ldrs";

dotWave.register();
zoomies.register();

function ElderForm() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    role: "",
    elderZP: "",
    createdBy: "",
    district: "",
  });
  const [districts, setDistricts] = useState([]);
  const [elderDataList, setElderDataList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nameError, setNameError] = useState("");
  const [activeTab, setActiveTab] = useState("registration");
  const [editingElder, setEditingElder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDataFetched, setIsDataFetched] = useState(false);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = elderDataList.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    const fetchDistricts = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch("http://localhost:8080/api/districts/all_districts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setDistricts(data);
        } else {
          console.error("Failed to fetch districts");
        }
      } catch (error) {
        console.error("Error fetching districts:", error);
      }
    };

    fetchDistricts();
  }, []);

  const fetchElderData = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:8080/api/elders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (Array.isArray(data)) {
        setElderDataList(data);
      } else {
        console.error("Unexpected data format:", data);
        setElderDataList([]);
      }
      setIsDataFetched(true);
    } catch (error) {
      console.error("Error fetching elder data:", error);
      setElderDataList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "details" && !isDataFetched) {
      fetchElderData();
    }
  }, [activeTab, isDataFetched]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editingElder
      ? `http://localhost:8080/api/elders/${editingElder.id}`
      : "http://localhost:8080/api/elders";
    const method = editingElder ? "PUT" : "POST";
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchElderData();
        Swal.fire("Saved!", "Elder information saved!", "success");
      } else {
        Swal.fire("Oops...", "Something went wrong!", "error");
      }
    } catch (error) {
      Swal.fire("Oops...", "Something went wrong!", "error");
    }
  };

  const handleEdit = (elder) => {
    setEditingElder(elder);
    setFormData({
      name: elder.name,
      age: elder.age,
      role: elder.role,
      elderZP: elder.elderZP,
      createdBy: elder.createdBy,
    });
    setActiveTab("registration");
  };

  const handlePageChange = (page) => setCurrentPage(page);


  return (
    <>
      <CNav variant="tabs" className="my-4">
        <CNavItem>
          <CNavLink
            href="#"
            active={activeTab === "registration"}
            onClick={() => setActiveTab("registration")}
            style={{ color: "blue", fontWeight: "bold" }}
          >
            Elder Registration
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            href="#"
            active={activeTab === "details"}
            onClick={() => setActiveTab("details")}
            style={{ color: "blue", fontWeight: "bold" }}
          >
            Registered Elders
          </CNavLink>
        </CNavItem>
      </CNav>

      {activeTab === "registration" && (
        <CCard className="mb-4">
          <CCardHeader>
            <h3 style={{ color: "blue", fontWeight: "bold" }}>
              {editingElder ? "Edit Elder" : "Add Elder"}
            </h3>
          </CCardHeader>
          <CCardBody>
            <CForm onSubmit={handleSubmit}>
              <CRow className="mb-3">
                <CCol md="6">
                  <CFormLabel
                    htmlFor="name"
                    style={{ color: "blue", fontWeight: "bold" }}
                  >
                    Full Name
                  </CFormLabel>
                  <CFormInput
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter name"
                    required
                  />
                  {nameError && (
                    <p style={{ color: "red", fontSize: "14px" }}>
                      {nameError}
                    </p>
                  )}
                </CCol>
                <CCol md="6">
                  <CFormLabel
                    htmlFor="age"
                    style={{ color: "blue", fontWeight: "bold" }}
                  >
                    Mobile
                  </CFormLabel>
                  <CFormInput
                    type="number"
                    id="phone"
                    name="phone"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="Enter Mobile"
                    required
                  />
                </CCol>
              </CRow>

              <CRow className="mb-3">
              <CCol md="6">
                                  <CFormLabel style={{ color: "blue", fontWeight: "bold" }}>District</CFormLabel>
                                  <CFormSelect
                                    name="district"
                                    value={formData.district}
                                    onChange={handleChange}
                                    required={!formData.alternative}
                                  >
                                    <option value=""style={{ color: "blue", fontWeight: "bold" }}>Select District</option>
                                    {districts.map((district) => (
                                      <option key={district.id} value={district.districtName}>
                                        {district.districtName}
                                      </option>
                                    ))}
                                  </CFormSelect>
                                </CCol>
                <CCol md="6">
                  <CFormLabel
                    htmlFor="elderZP"
                    style={{ color: "blue", fontWeight: "bold" }}
                  >
                    Elder ZP
                  </CFormLabel>
                  <CFormInput
                    id="elderZP"
                    name="elderZP"
                    value={formData.elderZP}
                    onChange={handleChange}
                    placeholder="Enter Elder ZP"
                    required
                  />
                </CCol>
              </CRow>

              <CRow className="mb-3">
                <CCol md="6">
                  <CFormLabel
                    htmlFor="serialNumber"
                    style={{ color: "blue", fontWeight: "bold" }}
                  >
                    Serial Number
                  </CFormLabel>
                  <CFormInput
                    id="serialNumber"
                    name="serialNumber"
                    value={formData.serialNumber}
                    onChange={handleChange}
                    placeholder="Enter Serial Number"
                    required
                  />
                </CCol>


              </CRow>

              <CButton
                type="submit"
                color="primary"
                style={{ fontWeight: "bold" }}
              >
                {editingElder ? "Update" : "Submit"}
              </CButton>
            </CForm>
          </CCardBody>
        </CCard>
      )}

      {activeTab === "details" && (
        <CCard className="mb-4">
          <CCardHeader>
            <h3 style={{ color: "blue", fontWeight: "bold" }}>
              REGISTERED ELDERS
            </h3>
          </CCardHeader>
          <CCardBody>
            {loading ? (
              <div className="text-center">
                <l-zoomies size="120" color="blue"></l-zoomies>
              </div>
            ) : (
              <>
                <CTable striped>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell
                        style={{ color: "blue", fontWeight: "bold" }}
                      >
                        No.
                      </CTableHeaderCell>
                      <CTableHeaderCell
                        style={{ color: "blue", fontWeight: "bold" }}
                      >
                        Name
                      </CTableHeaderCell>
              
                      
                      <CTableHeaderCell
                        style={{ color: "blue", fontWeight: "bold" }}
                      >
                        ZP
                      </CTableHeaderCell>
                      
                      <CTableHeaderCell
                        style={{ color: "blue", fontWeight: "bold" }}
                      >
                        Actions
                      </CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {currentItems.map((elder, index) => (
                      <CTableRow key={elder.id}>
                        <CTableDataCell>
                          {indexOfFirstItem + index + 1}
                        </CTableDataCell>

                        <CTableDataCell>{elder.name}</CTableDataCell>
                        
                       
                        <CTableDataCell>{elder.elderZP}</CTableDataCell>
                        
                        <CTableDataCell>
                          <CDropdown>
                            <CDropdownToggle
                              color="success"
                              style={{ color: "white", fontWeight: "bold" }}
                            >
                              Actions
                            </CDropdownToggle>
                            <CDropdownMenu>
                              <CDropdownItem
                                onClick={() => handleEdit(elder)}
                                style={{
                                  fontWeight: "bold",
                                  cursor: "pointer",
                                }}
                              >
                                Edit
                              </CDropdownItem>
                              <CDropdownItem
                                style={{
                                  fontWeight: "bold",
                                  cursor: "pointer",
                                  color: "danger",
                                }}
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
                <CPagination align="center">
                  <CPaginationItem
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    Previous
                  </CPaginationItem>
                  {[
                    ...Array(Math.ceil(elderDataList.length / itemsPerPage)),
                  ].map((_, index) => (
                    <CPaginationItem
                      key={index}
                      active={currentPage === index + 1}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </CPaginationItem>
                  ))}
                  <CPaginationItem
                    disabled={
                      currentPage ===
                      Math.ceil(elderDataList.length / itemsPerPage)
                    }
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    Next
                  </CPaginationItem>
                </CPagination>
              </>
            )}
          </CCardBody>
        </CCard>
      )}
    </>
  );
}

export default ElderForm;
