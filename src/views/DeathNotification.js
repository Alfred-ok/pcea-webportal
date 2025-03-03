import { CAlert, CButton, CCard, CCardBody, CCardTitle, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from "@coreui/react";
import React, { useEffect, useState } from "react";
import { MdReceiptLong } from "react-icons/md";
import { useNavigate } from "react-router";

const DeathNotification = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(
      "http://197.232.170.121:8594/api/registrations/getDeathNotification?ZpNumber=ZP123456"
    )
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  let navigate = useNavigate();
  console.log(data);

  return (
         
    <div className="p-4">
    <CCard className="mb-4" style={{ boxShadow: "0px -2px 19px 1px rgba(0,0,0,0.39)" }}>
    <CCardBody>
          <CCardTitle>
            <CAlert color="primary" variant="solid" style={{ display: "flex", justifyContent:"space-between"}}>
            <div style={{display:"flex"}}>
              <MdReceiptLong className="nav-icon" size={40} />
              {
             // <h3 style={{ marginLeft: '10px' }}>Death Notification Records</h3>
              }
            </div>
            <div>
              <CButton color="light" variant="outline" onClick={()=>navigate("/DeathNotificationRegister")} style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
              <svg style={{marginRight:"8px"}} xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="currentColor" class="bi bi-person-fill-add" viewBox="0 0 16 16">
                <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.5-5v1h1a.5.5 0 0 1 0 1h-1v1a.5.5 0 0 1-1 0v-1h-1a.5.5 0 0 1 0-1h1v-1a.5.5 0 0 1 1 0m-2-6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4"/>
              </svg>
                Death Register
              </CButton>
            </div>    
            </CAlert>
          </CCardTitle>
     <CTable striped bordered hover >
        <CTableHead>
        <CTableRow color="primary">
            <CTableHeaderCell>ID</CTableHeaderCell>
            <CTableHeaderCell>Deceased Name</CTableHeaderCell>
            <CTableHeaderCell>ID Number</CTableHeaderCell>
            <CTableHeaderCell>Date of Death</CTableHeaderCell>
            <CTableHeaderCell>Place of Death</CTableHeaderCell>
            <CTableHeaderCell>Reported By</CTableHeaderCell>
            <CTableHeaderCell>Reporter Contact</CTableHeaderCell>
            <CTableHeaderCell>Relationship</CTableHeaderCell>
            <CTableHeaderCell>Remarks</CTableHeaderCell>
            <CTableHeaderCell>ZP Number</CTableHeaderCell>
            <CTableHeaderCell>Created At</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {data.map((item) => (
            <CTableRow key={item.id} className="text-center border">
                <CTableDataCell>{item.id}</CTableDataCell>
                <CTableDataCell>{item.deceasedName}</CTableDataCell>
                <CTableDataCell>{item.idNumber}</CTableDataCell>
                <CTableDataCell>{item.dateOfDeath || "N/A"}</CTableDataCell>
                <CTableDataCell>{item.placeOfDeath}</CTableDataCell>
                <CTableDataCell>{item.reportedBy}</CTableDataCell>
                <CTableDataCell>{item.reporterContact}</CTableDataCell>
                <CTableDataCell>{item.relationship}</CTableDataCell>
                <CTableDataCell>{item.remarks}</CTableDataCell>
                <CTableDataCell>{item.zpNumber}</CTableDataCell>
                <CTableDataCell>
                    {new Date(item.createdAt).toLocaleDateString()}
                </CTableDataCell>
            </CTableRow>
          ))}
          </CTableBody>
        </CTable>
     </CCardBody>
     </CCard> 
      
    </div>
  );
};

export default DeathNotification;
