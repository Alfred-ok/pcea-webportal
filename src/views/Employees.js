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
import Swal from "sweetalert2";
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
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormLabel,
  CFormInput,
  CCol,
  CRow,
  CFormSelect,
} from "@coreui/react";
import { MdReceiptLong } from "react-icons/md";
import { useNavigate } from "react-router";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import CIcon from "@coreui/icons-react";
import { cilArrowBottom, cilArrowThickToBottom } from "@coreui/icons";
import logo1 from  "../assets/images/logo1.png" 

const Employee = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [tableRefresh, setTableRefresh] = useState(false)
  const [department, setDepartment] = useState(""); // Selected department
  const [jobType, setJobType] = useState(""); // Selected job type
  // const [employees, setEmployees] = useState([]); // Stores fetched employees
 // const [totalPages, setTotalPages] = useState(1);
 

  const navigate = useNavigate();
  
  useEffect(() => {
    fetch(`${import.meta.env.VITE_SECOND_BASE_URL}/api/employee/all`/*"http://197.232.170.121:8595/api/employee/all"*/)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [tableRefresh]);

   // Fetch employees based on filters
   useEffect(() => {
    let url = `${import.meta.env.VITE_SECOND_BASE_URL}/api/employee/filteremployees`;/*"http://197.232.170.121:8595/api/employee/filteremployees";*/

    if (department && jobType) {
      url += `?jobType=${jobType}&department=${department}`;
    } else if (department) {
      url += `?department=${department}`;
    } else if (jobType) {
      url += `?jobType=${jobType}`;
    } else {
      return; // Don't fetch if no filters are selected
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        //setTotalPages(Math.ceil(data.length / pageSize));
      })
      .catch((error) => setError("Error fetching filtered data: " + error.message));
  }, [department, jobType, tableRefresh]);

  const indexOfLastItem = currentPage * pageSize;
  const indexOfFirstItem = indexOfLastItem - pageSize;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);
  //const totalPages = Math.ceil(data.length / pageSize);

  const handleUpdateClick = (employee) => {
    setSelectedEmployee(employee);
    setModalVisible(true);
  };

  const handleInputChange = (e) => {
    setSelectedEmployee({ ...selectedEmployee, [e.target.name]: e.target.value });
  };

 
  const handleUpdateSubmit = async() => {
    if (!selectedEmployee || !selectedEmployee.id) {
      console.error("No employee selected for update");
      return;
    }

    try {
  
      fetch(
       // `http://197.232.170.121:8595/api/employee/${selectedEmployee.id}/update`, 
        `${import.meta.env.VITE_SECOND_BASE_URL}/api/employee/${selectedEmployee.id}/update`,
        {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selectedEmployee),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const result = response.text();
          console.log(result);
          return result;
        })
        .then((result) => {
          console.log("Server Response:", result); // Now it will log "Employee Updated Successfully"
          if(result == "Employee Updated Successfully"){
            Swal.fire({
              icon: "success",
              title: "Success",
              text: "Employee updated successfully!",
            });
            setTableRefresh(!tableRefresh);
          }
          setModalVisible(false)
          
        })
        .catch((error) => console.error("Error updating employee:", error));
      }catch(error){
        console.error("Error updating employee:", error);
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: "There was an issue updating the employee details.",
        });
        setModalVisible(false)
      }    
  };
  
  console.log(selectedEmployee)





  const downloadPDF = async () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Convert images to Base64
    const getBase64 = (url) => {
      return new Promise((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = "Anonymous";
          img.src = url;
          img.onload = () => {
              const canvas = document.createElement("canvas");
              canvas.width = img.width;
              canvas.height = img.height;
              const ctx = canvas.getContext("2d");
              ctx.drawImage(img, 0, 0);
              resolve(canvas.toDataURL("image/png"));
          };
          img.onerror = (err) => reject(err);
      });
  };


  try{
    const logoBase64 = await getBase64(logo1);
    // Add company logo
    const imgUrl = logoBase64; // Replace with your actual logo URL
    const imgWidth = 40; // Adjust as needed
    const imgHeight = 40; // Adjust as needed
    const logoX = (pageWidth - imgWidth) / 2;
    doc.addImage(imgUrl, "PNG", logoX , 10, imgWidth, imgHeight);
  
    // Title
    doc.setFontSize(21);
    doc.text("Employee Records",  pageWidth / 2, 60,{ align: "center" });
  
    // Define columns
    const columns = [
      "UserId", "First Name", "Middle Name", "Surname", "Employee No.", 
      "Phone Number", "Department", "Job Type", "Profession", "Status"
    ];
  
    // Map data rows
    const rows = data.map((item) => [
      item.id,
      item.firstName,
      item.middleName || "N/A",
      item.surname || "N/A",
      item.employeeNo,
      item.phoneNumber,
      item.department,
      item.jobType,
      item.profession || "N/A",
      item.status == 0 ? "Inactive" : "Active"
    ]);

  
    // Add table
    autoTable(doc,{
      head: [columns],
      body: rows,
      startY: 65,
      theme: "striped",
      styles: {
        fontSize: 8, // Reduce font size
        cellPadding: 2, // Reduce padding
    },
    headStyles: {
        fontSize: 9, // Slightly larger for headers
        fillColor: [44, 62, 80], // Darker header background
        textColor: 255, // White text
    },
    });
  
    // Save the file
    doc.save("Employee_Records.pdf");

  } catch (error) {
    console.error("Error loading images:", error);
    
  }

  };









  

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
              <CButton color="light" variant="outline" onClick={()=>navigate("/EmployeeRegistration")}>Employee Registration</CButton>
            </CAlert>
          </CCardTitle>

          {/* Filter Section */}
          <CRow className="mb-3">
          <div className="d-flex justify-content-start mb-3">
            <CFormSelect className="me-2" value={department} onChange={(e) => setDepartment(e.target.value)}>
              <option value="">Filter by Department</option>
              <option value="CBM">CBM</option>
              <option value="Parish">Parish</option>
              <option value="NIMPA">NIMPA</option>
            </CFormSelect>

            <CFormSelect value={jobType} onChange={(e) => setJobType(e.target.value)}>
              <option value="">Filter by Job Type</option>
              <option value="Permanent">Permanent</option>
              <option value="Intern">Intern</option>
              <option value="Part-time">Part-time</option>
              <option value="Casuals">Casuals</option>
              <option value="Employment Contract">Employment Contract</option>
              <option value="Service Contract">Service Contract</option>
            </CFormSelect>
          </div>
          <CCol cl>
          <CButton color="primary" onClick={downloadPDF}>
            <CIcon icon={cilArrowThickToBottom} style={{marginRight:"5px"}}/>
            Download Employee Records
          </CButton>
          </CCol>
          </CRow>
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
                <CTableHeaderCell>Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {currentData.map((item) => (
                <CTableRow key={item.id || item.employeeNo || Math.random()} className="text-center border">
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
                  <CTableDataCell>
                    <CButton color="primary" size="sm" onClick={() => handleUpdateClick(item)}>
                      Update
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>

          {/* Update Modal */}
          <CModal visible={modalVisible} onClose={() => setModalVisible(false)} size="lg" >
            <CModalHeader closeButton>
              <CModalTitle>Update Employee</CModalTitle>
            </CModalHeader>
            <CModalBody>
              {selectedEmployee && (
                <CForm>
                <CRow>
                <CCol >
                  <div className="mb-3">
                    <CFormLabel>First Name</CFormLabel>
                    <CFormInput
                      type="text"
                      name="firstName"
                      value={selectedEmployee.firstName}
                      onChange={handleInputChange}
                    />
                  </div>
                  </CCol>
                  <CCol >
                  <div className="mb-3">
                    <CFormLabel>Middle Name</CFormLabel>
                    <CFormInput
                      type="text"
                      name="middleName"
                      value={selectedEmployee.middleName}
                      onChange={handleInputChange}
                    />
                  </div>
                  </CCol>
                  </CRow>
                  <CRow>
                  <CCol>
                  <div className="mb-3">
                    <CFormLabel>Surname</CFormLabel>
                    <CFormInput
                      type="text"
                      name="surname"
                      value={selectedEmployee.surname}
                      onChange={handleInputChange}
                    />
                  </div>
                  </CCol>
                  <CCol>
                  <div className="mb-3">
                    <CFormLabel>Phone Number</CFormLabel>
                    <CFormInput
                      type="text"
                      name="phoneNumber"
                      value={selectedEmployee.phoneNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                  </CCol>
                  </CRow>
                  <CRow>
                  <CCol>
                  <div className="mb-3">
                    <CFormLabel>Department</CFormLabel>
                    
                    <CFormSelect name="department"  value={selectedEmployee.department} onChange={handleInputChange}>
                      <option>Department</option>
                      <option value="Parish">Parish</option>
                      <option value="CBM">CBM</option>
                      <option value="NIMPA">NIMPA</option>
                    </CFormSelect>
                  </div>
                  </CCol>
                  <CCol>
                  <div className="mb-3">
                    <CFormLabel>jobType</CFormLabel>
                    <CFormSelect name="jobType"  value={selectedEmployee.jobType} onChange={handleInputChange}>
                    <option>Job Type</option>
                    <option value="Permanent">Permanent</option>
                    <option value="Intern">Intern</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Casuals">Casuals</option>
                    <option value="Employment Contract">Employment Contract</option>
                    <option value="Service Contract">Service Contract</option>
                </CFormSelect>
                  </div>
                  </CCol>
                  </CRow>
                  <CRow>
                  <CCol>
                  <div className="mb-3">
                    <CFormLabel>profession</CFormLabel>
                    <CFormInput
                      type="text"
                      name="profession"
                      value={selectedEmployee.profession}
                      onChange={handleInputChange}
                    />
                  </div>
                  </CCol>
                  <CCol>
                  <div className="mb-3">
                    <CFormLabel>Employee No</CFormLabel>
                    <CFormInput
                      type="text"
                      name="Employee No"
                      value={selectedEmployee.employeeNo}
                      onChange={handleInputChange}
                    />
                  </div>
                  </CCol>
                  </CRow>
                  <CRow>
                  <CCol>
                  <div className="mb-3">
                    <CFormLabel>Status</CFormLabel>
                    <CFormSelect name="status" value={selectedEmployee.status} onChange={handleInputChange} required>
                      <option>Status</option>
                      <option value="1">Active</option>
                      <option value="0">Inactive</option>
                    </CFormSelect>
                  </div>
                  </CCol>
                  </CRow>
                </CForm>
              )}
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => setModalVisible(false)}>
                Cancel
              </CButton>
              <CButton color="primary" onClick={handleUpdateSubmit}>
                Save Changes
              </CButton>
            </CModalFooter>
          </CModal>
        </CCardBody>
      </CCard>
    </div>
  );
};

export default Employee;
