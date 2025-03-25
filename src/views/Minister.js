

import React, { useState, useEffect } from "react";
import { CCard, CCardBody, CForm, CFormLabel, CFormInput, CButton, CContainer, CRow, CCol, CFormSelect, CTable, CTableHead, CTableBody, CTableRow, CTableHeaderCell, CTableDataCell, CAlert } from "@coreui/react";

import { useNavigate } from "react-router-dom";

const Minister = () => {
 
  const [ministers, setMinisters] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchMinisters();
  }, []);

  const fetchMinisters = async () => {
    try {
      const response = await fetch(
        //"http://197.232.170.121:8594/api/registrations/GetMinister"
        `${import.meta.env.VITE_BASE_URL}/GetMinister`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      setMinisters(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  
  return (
    <CContainer>
      <CRow className="mt-5">
        <CCol>
          <CCard>
            <CCardBody>
              <CAlert variant="solid" style={{display:"flex", justifyContent:'space-between'}}>
                <h2>Officiating Minister</h2>
                <CButton color="light" variant="outline" onClick={()=>navigate("/AddMinister")}>Add Minister</CButton>
              </CAlert>

              <CTable striped hover responsive>
                <CTableHead color="primary">
                  <CTableRow>
                    <CTableHeaderCell>ID</CTableHeaderCell>
                    <CTableHeaderCell>Date</CTableHeaderCell>
                    <CTableHeaderCell>Service Type</CTableHeaderCell>
                    <CTableHeaderCell>Officiating Minister</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {ministers.map((minister) => (
                    <CTableRow key={minister.id}>
                      <CTableDataCell>{minister.id}</CTableDataCell>
                      <CTableDataCell>{minister.date}</CTableDataCell>
                      <CTableDataCell>{minister.serviceType}</CTableDataCell>
                      <CTableDataCell>{minister.officiatingMinister}</CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default Minister;
