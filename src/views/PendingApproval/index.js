import React, { useEffect, useState } from 'react';
import { CCard, CCardBody, CCardHeader, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CAlert, CButton, CCollapse, CSpinner } from '@coreui/react';

const PendingApproval = () => {
  const [data, setData] = useState([]);
  const [expandedRows, setExpandedRows] = useState({});
  const [loading, setLoading] = useState(true);
  const API_URL = 'http://192.168.12.245:8594/api/registrations/byStatus?status=0';

  useEffect(() => {
    fetch(API_URL)
      .then(response => response.json())
      .then(data =>{ 
        setData(data)
        setLoading(false);
    })
      .catch(error => {
        console.error('Error fetching data:', error)
        setLoading(false);
    });
  }, []);

  const toggleRow = (id) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };


  return (
    <CCard>
      <CCardHeader>
        <CAlert color="primary" variant="solid">
              <div style={{ display: "flex" }}>
                <h3 style={{ marginLeft: "10px" }}>Pending Approval</h3>
              </div>
        </CAlert>
      </CCardHeader>
      <CCardBody>
      {loading ? (
            <div style={{display:"flex", width:"100%", justifyContent:"center", alignItems:"center" }}>
                <div>
                    <CSpinner color="primary" /> Loading...
                </div>
            </div>
            ) : (
        <CTable striped hover responsive bordered>
          <CTableHead color='primary'>
            <CTableRow>
              <CTableHeaderCell></CTableHeaderCell>
              <CTableHeaderCell>ID</CTableHeaderCell>
              <CTableHeaderCell>Name</CTableHeaderCell>
              <CTableHeaderCell>Telephone</CTableHeaderCell>
              <CTableHeaderCell>Email</CTableHeaderCell>
              <CTableHeaderCell>Gender</CTableHeaderCell>
              <CTableHeaderCell>Membership Type</CTableHeaderCell>
              <CTableHeaderCell>Baptized</CTableHeaderCell>
              <CTableHeaderCell>Year of Joining</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          
          <CTableBody>
            {data.map((item) => (
            <React.Fragment key={item.id}>
              <CTableRow key={item.id}>
                <CTableDataCell>
                    <CButton size="sm" onClick={() => toggleRow(item.id)}>
                      {expandedRows[item.id] ? <CButton color='primary'>-</CButton> : <CButton color='primary'>+</CButton>}
                    </CButton>
                </CTableDataCell>
                <CTableDataCell>{item.id}</CTableDataCell>
                <CTableDataCell>{item.names}</CTableDataCell>
                <CTableDataCell>{item.telephone}</CTableDataCell>
                <CTableDataCell>{item.email}</CTableDataCell>
                <CTableDataCell>{item.gender}</CTableDataCell>
                <CTableDataCell>{item.membershipType}</CTableDataCell>
                <CTableDataCell>{item.baptized}</CTableDataCell>
                 <CTableDataCell>{item.yearOfJoining}</CTableDataCell>
              </CTableRow>
              <CTableRow>
                  <CTableDataCell colSpan="11">
                    <CCollapse visible={expandedRows[item.id]}>
                            <CCardBody style={{display:"flex" , justifyContent:"center", alignItems:'center'}}>
                            <div style={{
                                     width: "300px",
                                    height: "300px",
                                    backgroundImage: `url("data:image/jpeg;base64,${item.passportPhoto}")`,
                                    backgroundRepeat:"no-repeat",
                                    backgroundSize: "contain",
                                    marginTop:"8px",
                                    objectFit:"cover",
                                    overflow:"hidden"
                                }}>

                                </div>
                                <div>
                                <CTable responsive bordered>
                                    <CTableHead color='primary'>
                                        <CTableRow>
                                            <CTableHeaderCell>District</CTableHeaderCell>
                                            <CTableHeaderCell>Zone</CTableHeaderCell>
                                            <CTableHeaderCell>Address</CTableHeaderCell>
                                            <CTableHeaderCell>Spouse Name</CTableHeaderCell>
                                            <CTableHeaderCell>Baptized By</CTableHeaderCell>
                                            <CTableHeaderCell>Date of Baptism</CTableHeaderCell>
                                            <CTableHeaderCell>Communicant</CTableHeaderCell>
                                            <CTableHeaderCell>Guardian Phone</CTableHeaderCell>
                                        </CTableRow>
                                    </CTableHead>  
                                    <CTableBody>
                                        <CTableRow>
                                            <CTableDataCell>{item.district || 'N/A'}</CTableDataCell>
                                            <CTableDataCell>{item.zone || 'N/A'}</CTableDataCell>
                                            <CTableDataCell>{item.address || 'N/A'}</CTableDataCell>
                                            <CTableDataCell> {item.spouseName || 'N/A'}</CTableDataCell>
                                            <CTableDataCell>{item.baptizedBy || 'N/A'}</CTableDataCell>
                                            <CTableDataCell> {item.dateOfBaptism || 'N/A'}</CTableDataCell>
                                            <CTableDataCell> {item.communicant || 'N/A'}</CTableDataCell>
                                            <CTableDataCell> {item.guardianPhone || 'N/A'}</CTableDataCell>
                                        </CTableRow>
                                    </CTableBody>
                                </CTable>

                                <CTable responsive bordered>
                                    <CTableHead color='primary'>
                                        <CTableRow>
                                            <CTableHeaderCell>Marital Status</CTableHeaderCell>
                                            <CTableHeaderCell>Marriage Type</CTableHeaderCell>
                                            <CTableHeaderCell>date of confirmation</CTableHeaderCell>
                                            <CTableHeaderCell>Confirmed by</CTableHeaderCell>
                                            <CTableHeaderCell>Confirm location</CTableHeaderCell>
                                            {/*<CTableHeaderCell>teenager</CTableHeaderCell>*/}
                                            <CTableHeaderCell>year of birth</CTableHeaderCell>
                                            <CTableHeaderCell>SpouseZp</CTableHeaderCell>
                                        </CTableRow>
                                    </CTableHead>  
                                    <CTableBody>
                                        <CTableRow>
                                            <CTableDataCell>{item.maritalStatus || 'N/A'}</CTableDataCell>
                                            <CTableDataCell>{item.marriageType || 'N/A'}</CTableDataCell>
                                            <CTableDataCell>{item.dateOfConfirmation || 'N/A'}</CTableDataCell>
                                            <CTableDataCell> {item.confirmedBy || 'N/A'}</CTableDataCell>
                                            <CTableDataCell>{item.confirmationLocation || 'N/A'}</CTableDataCell>
                                           {/* <CTableDataCell> {item.teenager || 'N/A'}</CTableDataCell>*/}
                                            <CTableDataCell> {item.yearOfBirth || 'N/A'}</CTableDataCell>
                                            <CTableDataCell> {item.spouseZP || 'N/A'}</CTableDataCell>
                                        </CTableRow>
                                    </CTableBody>
                                </CTable>
                                </div>
                            </CCardBody>
                    </CCollapse>
                  </CTableDataCell>
                </CTableRow>
            </React.Fragment>
            ))}
          </CTableBody> 
        </CTable>
        )}
      </CCardBody>
    </CCard>
  );
};

export default PendingApproval;
