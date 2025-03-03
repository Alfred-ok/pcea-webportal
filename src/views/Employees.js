/*
import { CAlert, CButton, CCard, CCardBody, CCardTitle, CForm, CFormInput, CFormSelect, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { MdReceiptLong } from "react-icons/md";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const Employee = () => {
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false)
  const [dataDetail, setDataDetail] = useState();
  
  const [formData, setFormData] = useState({ 
    firstName: "",
    middleName: "",
    surname: "",
    idNumber: "",
    phoneNumber: "",
    department: "",
    jobType: "",
    profession: "",
    status:""
   });

  useEffect(() => {
    fetch(
      "http://197.232.170.121:8595/api/employee/all"
    )
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  console.log(data);

  const handleModal = async (id) => {
    console.log(id);
    try {
      const response = await fetch(
        `http://197.232.170.121:8595/api/employee/${id}`
      );
  
      if (!response.ok) {
        throw new Error("Failed to get employee");
      }
  
      const data = await response.json();
      setDataDetail(data); // Assuming setDataDetail is defined in state
      setFormData({ 
        firstName: data.firstName,
        middleName: data.middleName,
        surname: data.surname,
        idNumber: data.idNumber,
        phoneNumber: data.phoneNumber,
        department: data.department,
        jobType: data.jobType,
        profession: data.profession,
        status: data.status,
       }); // Populate form
  
      console.log(data);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


   // Handle input changes
   const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  // Send updated data to API
  const handleSave = async (e) => {
    e.preventDefault();
    if (!dataDetail) return;
    try {
      const response = await fetch(
        `http://197.232.170.121:8595/api/employee/${dataDetail.id}/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

       // Log raw response to see what the API returns
        const responseText = await response.text();

        if (!response.ok) {
          throw new Error(`Failed to update employee`);
        }
    
        // Try parsing as JSON
        let updatedData;
        try {
          updatedData = JSON.parse(responseText);
        } catch (error) {
          console.warn("Response is not valid JSON. Using plain text response instead.");
          updatedData = { message: responseText }; // Use plain text as a fallback
        }
    
        console.log("Employee updated successfully:", updatedData.message);
        setVisible(false); // Close modal after saving

         // Success alert
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Employee updated successfully!",
          timer: 2000,
          showConfirmButton: false,
        });

      
      setVisible(false); // Close modal after saving
    } catch (error) {
      console.error("Error updating employee:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "There was an issue updating the employee details.",
      });
    }
  };

  let navigate = useNavigate();

  return (
         
    <div className="p-4">
    <CCard className="mb-4" style={{ boxShadow: "0px -2px 19px 1px rgba(0,0,0,0.39)" }}>
    <CCardBody>
          <CCardTitle>
            <CAlert color="primary" variant="solid" style={{ display: "flex", justifyContent:"space-between"}}>
            <div style={{display:"flex"}}>
              <MdReceiptLong className="nav-icon" size={40} />
              <h3 style={{ marginLeft: '10px' }}>Employee Records</h3>
            </div>
            <div>
              <CButton color="light" variant="outline" onClick={()=>navigate("/EmployeeRegistration")} style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
              <svg style={{marginRight:"8px"}} xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" class="bi bi-person-fill-add" viewBox="0 0 16 16">
                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4"/>
              </svg>
                Employee Register
              </CButton>
            </div>  
            </CAlert>
          </CCardTitle>
     <CTable striped bordered hover style={{overflow:"hidden"}}>
        <CTableHead>
        <CTableRow color="primary">
            <CTableHeaderCell>UserId</CTableHeaderCell>
            <CTableHeaderCell>First Name</CTableHeaderCell>
            <CTableHeaderCell>Middle Name</CTableHeaderCell>
            <CTableHeaderCell>Surname</CTableHeaderCell>
            <CTableHeaderCell>Employee No.</CTableHeaderCell>
            <CTableHeaderCell>Phone Number</CTableHeaderCell>
            <CTableHeaderCell>Department</CTableHeaderCell>
            <CTableHeaderCell>Job Type</CTableHeaderCell>
            <CTableHeaderCell>Profession</CTableHeaderCell>
            <CTableHeaderCell>Id Number</CTableHeaderCell>
            <CTableHeaderCell>Status</CTableHeaderCell>
            <CTableHeaderCell>Actions</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {data.map((item) => (
            <CTableRow key={item.id} className="text-center border">
                <CTableDataCell>{item.id}</CTableDataCell>
                <CTableDataCell>{item.firstName}</CTableDataCell>
                <CTableDataCell>{item.middleName}</CTableDataCell>
                <CTableDataCell>{item.surname || "N/A"}</CTableDataCell>
                <CTableDataCell>{item.employeeNo}</CTableDataCell>
                <CTableDataCell>{item.phoneNumber}</CTableDataCell>
                <CTableDataCell>{item.department}</CTableDataCell>
                <CTableDataCell>{item.jobType}</CTableDataCell>
                <CTableDataCell>{item.profession}</CTableDataCell>
                <CTableDataCell>{item.idNumber}</CTableDataCell>
                <CTableDataCell>{item.status == 0 ? <span style={{color:"red",fontWeight:"600"}}>Inactive</span>: <span style={{color:"green",fontWeight:"600"}}>Active</span>}</CTableDataCell>
                <CTableDataCell>
                  <CButton color="primary" onClick={() => {setVisible(!visible); handleModal(item.id)}} >Edit</CButton>
                </CTableDataCell>
            </CTableRow>
          ))}
          </CTableBody>
        </CTable>
     </CCardBody>
     </CCard> 


     <CModal
        backdrop="static"
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="StaticBackdropExampleLabel"
      >
        <CModalHeader>
          <CModalTitle id="StaticBackdropExampleLabel">Update Employee Details</CModalTitle>
        </CModalHeader>
        <CModalBody>
        {dataDetail ? (
            <CForm onSubmit={handleSave}>
              <CFormInput
                type="text"
                name="firstName"
                label="First Name"
                value={formData.firstName}
                onChange={handleChange}
              />
              <CFormInput
                type="text"
                name="middleName"
                label="Middle Name"
                value={formData.middleName}
                onChange={handleChange}
              />
              <CFormInput
                type="text"
                name="surname"
                label="Surname"
                value={formData.surname}
                onChange={handleChange}
              />
              <CFormInput
                type="number"
                name="phoneNumber"
                label="Phone Number"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              <CFormSelect label="Department" name="department" value={formData.department} onChange={handleChange}>
                    <option>Department</option>
                    <option value="Parish">Parish</option>
                    <option value="CBM">CBM</option>
                    <option value="NIMPA">NIMPA</option>
              </CFormSelect>
              <CFormSelect label="Job Type" name="jobType" value={formData.jobType} onChange={handleChange}>
                    <option>Job Type</option>
                    <option value="Part-time">Part-Time</option>
                    <option value="Full-time">Full-Time</option>
              </CFormSelect>
              <CFormInput
                type="text"
                name="profession"
                label="Profession"
                value={formData.profession}
                onChange={handleChange}
              />
              <CFormInput
                type="number"
                name="idNumber"
                label="National Id"
                value={formData.idNumber}
                onChange={handleChange}
              />
               
              <CFormSelect label="Status" name="status" value={formData.status} onChange={handleChange}>
                    <option>Status</option>
                    <option value="1">Active</option>
                    <option value="0">Inactive</option>
              </CFormSelect>
              <CButton type="submit" color="primary">
                Save changes
              </CButton>
            </CForm>
          ) : (
            <p>Loading...</p>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          
        </CModalFooter>
      </CModal>
      
    </div>
  );
};

export default Employee;

*/


import React, { useEffect, useState } from "react";
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardTitle,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CPagination,
  CPaginationItem,
} from "@coreui/react";
import { MdReceiptLong } from "react-icons/md";
import { useNavigate } from "react-router";


const Employee = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const navigate = useNavigate();
  
  useEffect(() => {
    fetch("http://197.232.170.121:8595/api/employee/all")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / pageSize);

  console.log(data)

  return (
    <div className="p-4">
      <CCard className="mb-4">
        <CCardBody>
          <CCardTitle>
            <CAlert color="primary" variant="solid" style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ display: "flex" }}>
                <MdReceiptLong className="nav-icon" size={40} />
                <h3 style={{ marginLeft: "10px" }}>Employee Records</h3>
              </div>
              <div>
              <CButton color="light" variant="outline" onClick={()=>navigate("/EmployeeRegistration")} style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
              <svg style={{marginRight:"8px"}} xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" class="bi bi-person-fill-add" viewBox="0 0 16 16">
                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4"/>
              </svg>
                Employee Register
              </CButton>
            </div>  
            </CAlert>
          </CCardTitle>

          <div className="d-flex justify-content-end align-items-center mt-3" >
            <div>
              <label style={{marginRight:"10px"}}>Items per page: </label>
              <select style={{padding:"2px"}} value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            </div>
            </div>
            <CPagination align="center"></CPagination>

          <CTable striped bordered hover>
            <CTableHead>
              <CTableRow color="primary">
                <CTableHeaderCell>UserId</CTableHeaderCell>
                <CTableHeaderCell>First Name</CTableHeaderCell>
                <CTableHeaderCell>Middle Name</CTableHeaderCell>
                <CTableHeaderCell>Surname</CTableHeaderCell>
                <CTableHeaderCell>Employee No.</CTableHeaderCell>
                <CTableHeaderCell>Phone Number</CTableHeaderCell>
                <CTableHeaderCell>Department</CTableHeaderCell>
                <CTableHeaderCell>Job Type</CTableHeaderCell>
                <CTableHeaderCell>Profession</CTableHeaderCell>
                <CTableHeaderCell>Status</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {currentData.map((item) => (
                <CTableRow key={item.id} className="text-center border">
                  <CTableDataCell>{item.id}</CTableDataCell>
                  <CTableDataCell>{item.firstName}</CTableDataCell>
                  <CTableDataCell>{item.middleName}</CTableDataCell>
                  <CTableDataCell>{item.surname || "N/A"}</CTableDataCell>
                  <CTableDataCell>{item.employeeNo}</CTableDataCell>
                  <CTableDataCell>{item.phoneNumber}</CTableDataCell>
                  <CTableDataCell>{item.department}</CTableDataCell>
                  <CTableDataCell>{item.jobType}</CTableDataCell>
                  <CTableDataCell>{item.profession}</CTableDataCell>
                  <CTableDataCell>
                    {item.status == 0 ? (
                      <span style={{ color: "red", fontWeight: "600" }}>Inactive</span>
                    ) : (
                      <span style={{ color: "green", fontWeight: "600" }}>Active</span>
                    )}
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>

          {/* Pagination */}
          <CPagination align="center" className="mt-3">
            <CPaginationItem
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </CPaginationItem>
            {Array.from({ length: totalPages }, (_, index) => (
              <CPaginationItem
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </CPaginationItem>
            ))}
            <CPaginationItem
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </CPaginationItem>
          </CPagination>
        </CCardBody>
      </CCard>
    </div>
  );
};

export default Employee;