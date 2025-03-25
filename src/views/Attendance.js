/*

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

*/

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
  CFormLabel,
  CFormSelect,
} from "@coreui/react";

function Attendance() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [department, setDepartment] = useState(""); // Selected department
  const [jobType, setJobType] = useState(""); // Selected job type
  const [tableRefresh, setTableRefresh] = useState(false)

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authentication token not found");

      let url = `${import.meta.env.VITE_SECOND_BASE_URL}/api/employee/attendance`/*"http://197.232.170.121:8595/api/employee/attendance"*/;
      const params = new URLSearchParams();
      if (userId) params.append("userId", userId);
      if (startDate) params.append("startDate", startDate);
      if (endDate) params.append("endDate", endDate);
      if (department) params.append("department", department);
      if (jobType) params.append("jobType", jobType);
      if (params.toString()) url += `?${params.toString()}`;

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
        <CForm onSubmit={handleFilter} className="mb-3 d-flex gap-2 alignItems-center">
          
          
          <CFormInput
            type="number"
            label="UserId"
            placeholder="Enter User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
      
          <CFormInput
            type="date"
            label="From"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
         
          <CFormInput
            type="date"
            label="To"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />

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
                <CTableHeaderCell>Hours Worked</CTableHeaderCell>
                <CTableHeaderCell>Employee Name</CTableHeaderCell>
                <CTableHeaderCell>Department</CTableHeaderCell>
                <CTableHeaderCell>Job Type</CTableHeaderCell>
                <CTableHeaderCell>Check-In Time</CTableHeaderCell>
                <CTableHeaderCell>Check-Out Time</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {data.map((member, index) => (
                <CTableRow key={index}>
                  <CTableDataCell>{index + 1}</CTableDataCell>
                  <CTableDataCell>{member.userId}</CTableDataCell>
                  <CTableDataCell>{member.hoursWorked}</CTableDataCell>
                  <CTableDataCell>{member.employeeName}</CTableDataCell>
                  <CTableDataCell>{member.department}</CTableDataCell>
                  <CTableDataCell>{member.jobType}</CTableDataCell>
                  <CTableDataCell>{member.checkInTime}</CTableDataCell>
                  <CTableDataCell>{member.checkOutTime}</CTableDataCell>
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

