import React, { useEffect, useState } from 'react';
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
    CSpinner,
    CAlert,
    CButton,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CForm,
    CModalFooter,
    CFormTextarea,
    CFormSelect
  } from '@coreui/react';
  import Swal from 'sweetalert2';

function Prayer({Marriagestatus}) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [visible, setVisible] = useState(false)
    const [status, setStatus] = useState();
    const [comments, setComments] = useState("");
    const [approvalMemberId, setApprovalMemberId] = useState();
    const [zp, setZp] =useState();


    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('http://197.232.170.121:8594/api/registrations/getservicerequestType?ServiceType=prayerrequest');
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const result = await response.json();
            setData(result);
          } catch (error) {
            setError(error.message);
          } finally {
            setLoading(false);
          }
        };
        fetchData();
      }, []);
    
    /*
      const handleapproval = async() =>{
          const payload = {
            ID: Number(approvalMemberId), 
            Status: Number(status), 
            Comment: comments, 
            ZpNumber: zp, 
            ServiceType: "MarriageRequest"
            }

          console.log(payload);
          try {
           // const token = localStorage.getItem("token");
      
            const response = await fetch("http://197.232.170.121:8594/api/registrations/servicerequestupdate", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                //Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(payload),
            });
      
            if (!response.ok) throw new Error("Failed to update status");
    
            console.log(response)
    
            setShowModal(false);
          } catch (error) {
            console.error("Error updating status:", error);
            alert("Error");
           
          }
        
      
      }
*/

const handleapproval = async (e) => {
  e.preventDefault(); // Prevent page reload

  const payload = {
      ID: Number(approvalMemberId),
      Status: Number(status),
      Comment: comments,
      ZpNumber: zp,
      ServiceType: "PrayerRequest"
  };

  try {
      const response = await fetch("http://197.232.170.121:8594/api/registrations/servicerequestupdate", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to update status");

      console.log("Response:", await response.json());

      Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Status updated successfully!",
      });

      setVisible(false); // Close modal
  } catch (error) {
      console.error("Error updating status:", error);
      Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to update status. Please try again.",
      });
  }
};

      console.log(data)

       // **Filter the data where status === 0**
    const filteredData = data.filter(item => item.status == Marriagestatus)


  return (
    <div>
        <CCard className='mt-4'>
          <CCardHeader style={{ backgroundColor:"rgba(22, 89, 177, 0.925)" }}>
          <h4 style={{ color: "#fff" }}>Prayer</h4>
          </CCardHeader>
          <CCardBody>
            {loading && <CSpinner color="primary" />} 
            {error && <CAlert color="danger">{error}</CAlert>} 
            {!loading && !error && (
              <CTable bordered stripedColumns hover responsive small>
                <CTableHead>
                  <CTableRow color='primary'>
                    <CTableHeaderCell>ID</CTableHeaderCell>
                    <CTableHeaderCell>Date</CTableHeaderCell>
                    <CTableHeaderCell>Name</CTableHeaderCell>
                    <CTableHeaderCell>District</CTableHeaderCell>
                    <CTableHeaderCell>Marital Status</CTableHeaderCell>
                    <CTableHeaderCell>Mobile Number</CTableHeaderCell>
                    <CTableHeaderCell>Elder Name</CTableHeaderCell>
                    <CTableHeaderCell>Elder Comments</CTableHeaderCell>
                    <CTableHeaderCell>ZP Number</CTableHeaderCell>
                    <CTableHeaderCell>Status</CTableHeaderCell>
                    <CTableHeaderCell>Action</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {data.map((item) => (
                    <CTableRow key={item.id}>
                      <CTableDataCell>{item.id}</CTableDataCell>
                      <CTableDataCell>{new Date(item.datex).toLocaleString()}</CTableDataCell>
                      <CTableDataCell>{item.name}</CTableDataCell>
                      <CTableDataCell>{item.district}</CTableDataCell>
                      <CTableDataCell>{item.maritalStatus}</CTableDataCell>
                      <CTableDataCell>{item.mobileNumber}</CTableDataCell>
                      <CTableDataCell>{item.elderName}</CTableDataCell>
                      <CTableDataCell>{item.elderComments || 'N/A'}</CTableDataCell>
                      <CTableDataCell>{item.zpnumber}</CTableDataCell>
                      <CTableDataCell>{item.status}</CTableDataCell>
                      <CTableDataCell>
                        
                        { item.status == "0" ?
                        <CButton color="success" style={{color:"#fff"}} onClick={() => {setVisible(!visible); setApprovalMemberId(item.id); setZp(item.zpnumber)}}>
                          Approve
                        </CButton>
                        :
                        <CButton disabled color="primary" style={{color:"#fff"}} onClick={() => {setVisible(!visible); setApprovalMemberId(item.id); setZp(item.zpnumber)}}>
                          Acccepted
                        </CButton>
                      }
                      </CTableDataCell>
                      
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            )}
          </CCardBody>
        </CCard>

      <CModal
        visible={visible}
        onClose={() => setVisible(false)}
        aria-labelledby="LiveDemoExampleLabel"
      >
        <CModalHeader>
          <CModalTitle id="LiveDemoExampleLabel">Approve Request</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm onSubmit={handleapproval}>
          <CFormSelect
            id="registrationStatus"
            className="form-control mt-2 mb-2"
            label= "Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Select</option>
            <option value="1">Yes</option>
            <option value="0">No</option>
          </CFormSelect>

          <CFormTextarea
            className="mt-2"
            placeholder="Add a comment"
            label= "Comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
          <CButton style={{color:"#fff"}} className='mt-4' type='submit' color="success">Approve</CButton>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton  color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default Prayer

