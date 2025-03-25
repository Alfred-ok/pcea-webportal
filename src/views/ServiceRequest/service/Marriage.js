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
    CFormSelect,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
    CDropdown
  } from '@coreui/react';
  import Swal from 'sweetalert2';
  import { useSchedule } from "../../ScheduleContext"
import { useNavigate } from "react-router-dom";


function Marriage({Marriagestatus}) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [visible, setVisible] = useState(false)
    const [status, setStatus] = useState();
    const [comments, setComments] = useState("");
    const [approvalMemberId, setApprovalMemberId] = useState();
    const [zp, setZp] =useState();
    const [tableRefresh, setTableRefresh ] = useState(true);
    const { setSelectedAppointments, selectedAppointments } = useSchedule(); // Use context

    const navigate = useNavigate();


    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/getservicerequestTypeandstatus?ServiceType=marriagerequest&Status=1`/*'http://197.232.170.121:8594/api/registrations/getservicerequestTypeandstatus?ServiceType=marriagerequest&Status=1'*/);
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
      }, [tableRefresh]);


      console.log(data);
    
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
      ServiceType: "MarriageRequest"
  };

  try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/servicerequestupdate`/*"http://197.232.170.121:8594/api/registrations/servicerequestupdate"*/, {
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
      setTableRefresh(!tableRefresh)
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


    console.log(selectedAppointments);


  return (
    <div>
        <CCard className='mt-4'>
          <CCardHeader style={{ backgroundColor:"rgba(22, 89, 177, 0.925)" }}>
          <h4 style={{ color: "#fff" }}>Marriage</h4>
          </CCardHeader>
          <CCardBody>
            {loading && <CSpinner color="primary" />} 
            {error && <CAlert color="danger">{error}</CAlert>} 
            {!loading && !error && (
              <CTable bordered stripedColumns hover small>
                <CTableHead>
                  <CTableRow color='primary'>
                    <CTableHeaderCell>ID</CTableHeaderCell>
                    <CTableHeaderCell>Date</CTableHeaderCell>
                    <CTableHeaderCell>Name</CTableHeaderCell>
                    <CTableHeaderCell>District</CTableHeaderCell>
                    <CTableHeaderCell>Marital Status</CTableHeaderCell>
                    <CTableHeaderCell>Mobile Number</CTableHeaderCell>
                    <CTableHeaderCell>Elder Name</CTableHeaderCell>
                    {/*<CTableHeaderCell>Elder Comments</CTableHeaderCell>*/}
                    <CTableHeaderCell>ZP Number</CTableHeaderCell>
                    {
                    //<CTableHeaderCell>Status</CTableHeaderCell>
                    }
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
                      {/*<CTableDataCell>{item.elderComments || 'N/A'}</CTableDataCell>*/}
                      <CTableDataCell>{item.zpnumber}</CTableDataCell>
                      {
                    //  <CTableDataCell>{item.status}</CTableDataCell>
                  }
                      <CTableDataCell style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                      <CDropdown>
                        <CDropdownToggle color="primary">Action</CDropdownToggle>
                        <CDropdownMenu>
                          <CDropdownItem>
                              <CButton color="success" style={{color:"#fff", marginRight:"3px"}} onClick={() => {setVisible(!visible); setApprovalMemberId(item.id); setZp(item.zpnumber)}}>
                              Approve
                            </CButton>
                          </CDropdownItem>
                          <CDropdownItem>
                            <CButton color="primary" onClick={()=>{setSelectedAppointments(item); navigate("/ScheduleMeeting")}}>Schedule meeting</CButton>
                          </CDropdownItem>
                          
                        </CDropdownMenu>
                      </CDropdown>
            
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
            <option value="2">Yes</option>
            {
            //<option value="0">No</option>
            }
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

export default Marriage