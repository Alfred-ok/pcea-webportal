
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
} from "@coreui/react";

function Proposal() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authentication token not found");

        const response = await fetch(
          "http://197.232.170.121:8594/api/registrations/getMemberFeedback?feedbackType=Proposal",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

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

    fetchData();
  }, []);

  return (
    <CCard className="mb-4">
      <CCardHeader style={{ backgroundColor:"rgba(22, 89, 177, 0.925)" }}>
        <h3 style={{ color: "#fff" }}>Proposals</h3>
      </CCardHeader>
      <CCardBody>
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
              <CTableRow>
                <CTableHeaderCell>#</CTableHeaderCell>
                <CTableHeaderCell>Name</CTableHeaderCell>
                <CTableHeaderCell>Message</CTableHeaderCell>
                <CTableHeaderCell>Feed back Type</CTableHeaderCell>
                <CTableHeaderCell>ZpNumber</CTableHeaderCell>
                <CTableHeaderCell>Date</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {data.map((member, index) => (
                <CTableRow key={index}>
                  <CTableDataCell>{index + 1}</CTableDataCell>
                  <CTableDataCell>{member.name}</CTableDataCell>
                  <CTableDataCell>{member.message}</CTableDataCell>
                  <CTableDataCell>{member.FeedbackType}</CTableDataCell>
                  <CTableDataCell>{member.ZPNumber}</CTableDataCell>
                  <CTableDataCell>{member.createdAt}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        )}
      </CCardBody>
    </CCard>
  );
}

export default Proposal;
