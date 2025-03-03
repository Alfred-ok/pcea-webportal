import React, { useEffect, useState } from "react";
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
  CForm,
  CFormInput,
  CButton,
} from "@coreui/react";

function Attendance() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState("");
  const [date, setDate] = useState("");

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authentication token not found");

      let url = "http://197.232.170.121:8595/api/employee/attendance";
      if (userId || date) {
        const params = new URLSearchParams();
        if (userId) params.append("userId", userId);
        if (date) params.append("date", date);
        url += `?${params.toString()}`;
      }

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setData(Array.isArray(result) ? result : []);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFilter = (e) => {
    e.preventDefault();
    fetchData();
  };



  return (
    <CCard className="mb-4">
      <CCardHeader style={{ backgroundColor: "rgba(22, 89, 177, 0.925)" }}>
        <h3 style={{ color: "#fff" }}>Attendance</h3>
      </CCardHeader>
      <CCardBody>
        {/* Filter Form */}
        <CForm onSubmit={handleFilter} className="mb-3 d-flex gap-2">
          <CFormInput
            type="number"
            placeholder="Enter User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <CFormInput
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <CButton type="submit" color="primary">
            Filter
          </CButton>
        </CForm>

        {/* Data Display */}
        {loading ? (
          <div className="text-center">
            <CSpinner color="primary" />
            <p>Loading...</p>
          </div>
        ) : error ? (
          <CAlert color="danger">Error: {error}</CAlert>
        ) : data.length === 0 ? (
          <p>No records found.</p>
        ) : (
          <CTable striped bordered hover>
            <CTableHead>
              <CTableRow color="primary">
                <CTableHeaderCell>#</CTableHeaderCell>
                <CTableHeaderCell>User ID</CTableHeaderCell>
                {
               // <CTableHeaderCell>ID</CTableHeaderCell>
                }
                <CTableHeaderCell>Hours Worked</CTableHeaderCell>
                <CTableHeaderCell>Employee Name</CTableHeaderCell>
                <CTableHeaderCell>Check-Out Time</CTableHeaderCell>
                <CTableHeaderCell>Check-In Time</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {data.map((member, index) => (
                <CTableRow key={index}>
                  <CTableDataCell>{index + 1}</CTableDataCell>
                  <CTableDataCell>{member.userId}</CTableDataCell>
                  {
                  //<CTableDataCell>{member.id}</CTableDataCell>
                  }
                  <CTableDataCell>{member.hoursWorked}</CTableDataCell>
                  <CTableDataCell>{member.employeeName}</CTableDataCell>
                  <CTableDataCell>{member.checkOutTime}</CTableDataCell>
                  <CTableDataCell>{member.checkInTime}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        )}
      </CCardBody>
    </CCard>
  );
}

export default Attendance;
