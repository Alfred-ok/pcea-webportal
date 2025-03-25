import React, { useEffect, useState } from 'react';
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell } from '@coreui/react';

function ServiceReports() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  /*
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found in localStorage");
      return;
    }
    fetch("http://197.232.170.121:8596/reports/all?type=Service",{
        headers: {
            Authorization: `Bearer ${token}`,
          },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
*/
  return (
    <CTable striped bordered hover>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell>No.</CTableHeaderCell>
          <CTableHeaderCell>Full Name</CTableHeaderCell>
          <CTableHeaderCell>DOB</CTableHeaderCell>
          <CTableHeaderCell>ZP Number</CTableHeaderCell>
          <CTableHeaderCell>Mobile Number</CTableHeaderCell>
          <CTableHeaderCell>District</CTableHeaderCell>
          <CTableHeaderCell>Gender</CTableHeaderCell>
          <CTableHeaderCell>Created Date</CTableHeaderCell>
          <CTableHeaderCell>Date</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {data.map((report, index) => (
          <CTableRow key={index}>
            <CTableDataCell>{index + 1 + (currentPage - 1) * itemsPerPage}</CTableDataCell>
            <CTableDataCell>{report.fullName}</CTableDataCell>
            <CTableDataCell>{report.dob}</CTableDataCell>
            <CTableDataCell>{report.zpnumber}</CTableDataCell>
            <CTableDataCell>{report.mobileNumber}</CTableDataCell>
            <CTableDataCell>{report.district || "No District"}</CTableDataCell>
            <CTableDataCell>{report.gender}</CTableDataCell>
            <CTableDataCell>{report.createdDate}</CTableDataCell>
            <CTableDataCell>{report.datex}</CTableDataCell>
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  );
}

export default ServiceReports;
