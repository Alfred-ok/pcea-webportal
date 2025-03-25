/*

import React, { useState, useEffect } from "react";
import {
  CCard,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CFormSelect,
  CButton,
  CRow,
  CCol,
  CPagination,
  CPaginationItem
} from "@coreui/react";
import * as XLSX from 'xlsx';

const Reports = () => {
  const [activeTab, setActiveTab] = useState("serviceReport");
  const [serviceData, setServiceData] = useState([]);
  const [communionData, setCommunionData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("All");
  const [selectedGender, setSelectedGender] = useState("All");
  const [selectedAgeGroup, setSelectedAgeGroup] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;

  useEffect(() => {
    const fetchData = async (url, setData) => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found in localStorage");
          return;
        }

        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const handleDownload = () => {
          const ws = XLSX.utils.json_to_sheet(filteredData);
          const wb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, "Reports");
          XLSX.writeFile(wb, "reports.xlsx");
        };

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        if (result?.serviceData && Array.isArray(result.serviceData)) {
          setData(result.serviceData);
          setFilteredData(result.serviceData);
          setDistricts([
            "No District", 
            ...new Set(result.serviceData.map((item) => item.district || "No District"))
          ]);
        } else {
          console.error("Unexpected API response format", result);
          setData([]);
          setFilteredData([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
        setFilteredData([]);
      }
    };

    if (activeTab === "serviceReport") {
      fetchData("http://197.232.170.121:8596/reports/all?type=Service", setServiceData);
    } else if (activeTab === "holyCommunionReport") {
      fetchData("http://197.232.170.121:8596/reports/all?type=Communion", setCommunionData);
    }
  }, [activeTab]);

  console.log(filteredData);

  useEffect(() => {
    let filtered = activeTab === "serviceReport" ? serviceData : communionData;

    if (selectedDistrict !== "All") {
      filtered = filtered.filter((item) => (item.district || "No District") === selectedDistrict);
    }
    if (selectedGender !== "All") {
      filtered = filtered.filter((item) => item.gender?.toLowerCase() === selectedGender.toLowerCase());
    }
    if (selectedAgeGroup !== "All") {
      filtered = filtered.filter((item) => {
        const birthYear = parseInt(item.dob?.split("-")[0]);
        if (selectedAgeGroup === "2007-2013") return birthYear >= 2007 && birthYear <= 2013;
        if (selectedAgeGroup === "1990-2006") return birthYear >= 1990 && birthYear <= 2006;
        return birthYear < 1990;
      });
    }
    setFilteredData(filtered);
    setCurrentPage(1);
  }, [selectedDistrict, selectedGender, selectedAgeGroup, serviceData, communionData, activeTab]);

  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleDownload = () => {
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Reports");
    XLSX.writeFile(wb, "reports.xlsx");
  };

  return (
    <CCard className="p-3">
      <CNav variant="tabs">
        <CNavItem>
          <CNavLink style={{cursor:"pointer", fontWeight:"bold"}} active={activeTab === "serviceReport"} onClick={() => setActiveTab("serviceReport")}>
            Service Report
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink style={{cursor:"pointer", fontWeight:"bold"}}  active={activeTab === "holyCommunionReport"} onClick={() => setActiveTab("holyCommunionReport")}>
            Holy Communion Report
          </CNavLink>
        </CNavItem>
      </CNav>
      <CRow className="mb-3">
        <CCol>
          <CFormSelect value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)}>
            <option value="All">All Districts</option>
            {districts.map((district, index) => <option key={index} value={district}>{district}</option>)}
          </CFormSelect>
        </CCol>
        <CCol>
          <CFormSelect value={selectedGender} onChange={(e) => setSelectedGender(e.target.value)}>
            <option value="All">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </CFormSelect>
        </CCol>
        <CCol>
          <CFormSelect value={selectedAgeGroup} onChange={(e) => setSelectedAgeGroup(e.target.value)}>
            <option value="All">Age Groups</option>
            <option value="2007-2013">12-18yrs</option>
            <option value="1990-2006">19-34yrs</option>
            <option value="Mature">35yrs and above</option>
          </CFormSelect>
        </CCol>
      </CRow>

      <CCol className="d-flex justify-content-end mb-3">
          <CButton  style={{fontWeight:"bold", color:"white"}} color="success" onClick={handleDownload}>Download Excel</CButton>
        </CCol>

      

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
            <CTableHeaderCell>Date</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {paginatedData.length > 0 ? (
            paginatedData.map((report, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{index + 1 + (currentPage - 1) * itemsPerPage}</CTableDataCell>
                <CTableDataCell>{report.fullName}</CTableDataCell>
                <CTableDataCell>{report.dob}</CTableDataCell>
                <CTableDataCell>{report.zpnumber}</CTableDataCell>
                <CTableDataCell>{report.mobileNumber}</CTableDataCell>
                <CTableDataCell>{report.district || "No District"}</CTableDataCell>
                <CTableDataCell>{report.gender}</CTableDataCell>
                <CTableDataCell>{report.datex}</CTableDataCell>
              </CTableRow>
            ))
          ) : (
            <CTableRow>
              <CTableDataCell colSpan={7} className="text-center">No reports available.</CTableDataCell>
            </CTableRow>
          )}
        </CTableBody>
      </CTable>
      <CPagination  className="justify-content-center">
        {[...Array(totalPages)].map((_, i) => (
          <CPaginationItem  style={{cursor:"pointer"}} key={i} active={i + 1 === currentPage} onClick={() => setCurrentPage(i + 1)}>
            {i + 1}
          </CPaginationItem>
        ))}
      </CPagination>
    </CCard>
  );
};
export default Reports;
*/




/*

import React, { useState, useEffect } from "react";
import {
  CCard,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CFormSelect,
  CButton,
  CRow,
  CCol,
  CFormInput,
  CPagination,
  CPaginationItem,
  CFormLabel
} from "@coreui/react";
import * as XLSX from 'xlsx';

const Reports = () => {
  const [activeTab, setActiveTab] = useState("serviceReport");
  const [serviceData, setServiceData] = useState([]);
  const [communionData, setCommunionData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("All");
  const [selectedGender, setSelectedGender] = useState("All");
  const [selectedAgeGroup, setSelectedAgeGroup] = useState("All");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [summaryData, setSummaryData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;


  

  useEffect(() => {
    const fetchData = async (url, setData) => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found in localStorage");
          return;
        }

        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();

        if (result?.serviceData && Array.isArray(result.serviceData)) {
          setData(result.serviceData);
          setFilteredData(result.serviceData);
          setDistricts([
            "No District", 
            ...new Set(result.serviceData.map((item) => item.district || "No District"))
          ]);
        } else {
          console.error("Unexpected API response format", result);
          setData([]);
          setFilteredData([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
        setFilteredData([]);
      }
    };

    //VITE_THIRD_BASE_URL=http://197.232.170.121:8596

    if (activeTab === "serviceReport") {
      fetchData(`${import.meta.env.VITE_THIRD_BASE_URL}/reports/all?type=Service`/*"http://197.232.170.121:8596/reports/all?type=Service"*///, setServiceData);
    /*} else if (activeTab === "holyCommunionReport") {
    fetchData(`${import.meta.env.VITE_THIRD_BASE_URL}/reports/all?type=Communion`/*"http://197.232.170.121:8596/reports/all?type=Communion"*///, setCommunionData);
  // } 
  //}, [activeTab]);
/*
  useEffect(() => {
    let filtered = activeTab === "serviceReport" ? serviceData : communionData;

    if (selectedDistrict !== "All") {
      filtered = filtered.filter((item) => (item.district || "No District") === selectedDistrict);
    }
    if (selectedGender !== "All") {
      filtered = filtered.filter((item) => item.gender?.toLowerCase() === selectedGender.toLowerCase());
    }
    if (selectedAgeGroup !== "All") {
      filtered = filtered.filter((item) => {
        const birthYear = parseInt(item.dob?.split("-")[0]);
        if (selectedAgeGroup === "2007-2013") return birthYear >= 2007 && birthYear <= 2013;
        if (selectedAgeGroup === "1990-2006") return birthYear >= 1990 && birthYear <= 2006;
        return birthYear < 1990;
      });
    }
    if (fromDate && toDate) {
      filtered = filtered.filter((item) => {
        const itemDate = new Date(item.datex);
        return itemDate >= new Date(fromDate) && itemDate <= new Date(toDate);
      });
    }

    setFilteredData(filtered);
    setCurrentPage(1);
  }, [selectedDistrict, selectedGender, selectedAgeGroup, fromDate, toDate, serviceData, communionData, activeTab]);

  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleDownload = () => {
    const ws = XLSX.utils.json_to_sheet(filteredData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Reports");
    XLSX.writeFile(wb, "reports.xlsx");
  };



  useEffect(() => {
    if (activeTab === "summaryReport") {
      const allData = [...serviceData, ...communionData];
      let filtered = allData;

      if (fromDate && toDate) {
        filtered = filtered.filter((item) => {
          const itemDate = new Date(item.datex);
          return itemDate >= new Date(fromDate) && itemDate <= new Date(toDate);
        });
      }

      const totalAttendance = filtered.length;
      const genderStats = {
        Male: filtered.filter((item) => item.gender?.toLowerCase() === "male").length,
        Female: filtered.filter((item) => item.gender?.toLowerCase() === "female").length,
      };

      const ageGroupStats = {
        "12-18 yrs": filtered.filter((item) => {
          const birthYear = parseInt(item.dob?.split("-")[0]);
          return birthYear >= 2007 && birthYear <= 2013;
        }).length,
        "19-34 yrs": filtered.filter((item) => {
          const birthYear = parseInt(item.dob?.split("-")[0]);
          return birthYear >= 1990 && birthYear <= 2006;
        }).length,
        "35+ yrs": filtered.filter((item) => {
          const birthYear = parseInt(item.dob?.split("-")[0]);
          return birthYear < 1990;
        }).length,
      };

      setSummaryData({ totalAttendance, genderStats, ageGroupStats });
    }
  }, [serviceData, communionData, fromDate, toDate, activeTab]);


  return (
    <CCard className="p-3">
      <CNav variant="tabs">
        <CNavItem>
          <CNavLink style={{cursor:"pointer", fontWeight:"bold"}} active={activeTab === "serviceReport"} onClick={() => setActiveTab("serviceReport")}>
            Service Report
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink style={{cursor:"pointer", fontWeight:"bold"}} active={activeTab === "holyCommunionReport"} onClick={() => setActiveTab("holyCommunionReport")}>
            Holy Communion Report
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink style={{ cursor: "pointer", fontWeight: "bold" }} active={activeTab === "summaryReport"} onClick={() => setActiveTab("summaryReport")}>
            Summary Report
          </CNavLink>
        </CNavItem>
      </CNav>
      {activeTab !== "summaryReport" ?
      <>
      <CRow className="mb-3 p-3">
        <CCol>
          <CFormLabel htmlFor="district">
            District
          </CFormLabel>
          <CFormSelect value={selectedDistrict} id="district" onChange={(e) => setSelectedDistrict(e.target.value)}>
            <option value="All">All Districts</option>
            {districts.map((district, index) => <option key={index} value={district}>{district}</option>)}
          </CFormSelect>
        </CCol>
        <CCol>
          <CFormLabel htmlFor="gender">
            Gender
          </CFormLabel>
          <CFormSelect value={selectedGender} id="gender" onChange={(e) => setSelectedGender(e.target.value)}>
            <option value="All">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </CFormSelect>
        </CCol>
        <CCol>
          <CFormLabel htmlFor="from">
            From
          </CFormLabel>
          <CFormInput id="from" type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} placeholder="From Date" />
        </CCol>
        <CCol>
          <CFormLabel htmlFor="to">
            To
          </CFormLabel>
          <CFormInput id="to" type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} placeholder="To Date" />
        </CCol>
        <CCol>
          <CFormLabel>
            Age Group
          </CFormLabel>
          <CFormSelect value={selectedAgeGroup} onChange={(e) => setSelectedAgeGroup(e.target.value)}>
            <option value="All">Age Groups</option>
            <option value="2007-2013">12-18yrs</option>
            <option value="1990-2006">19-34yrs</option>
            <option value="Mature">35yrs and above</option>
          </CFormSelect>
        </CCol>
        <CCol className="d-flex justify-content-end mb-3">
          <CButton  style={{fontWeight:"bold", color:"white"}} color="success" onClick={handleDownload}>Download Excel</CButton>
        </CCol>
      </CRow>
      

      <CTable striped bordered hover>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>No.</CTableHeaderCell>
            <CTableHeaderCell>Full Name</CTableHeaderCell>
            {/*<CTableHeaderCell>DOB</CTableHeaderCell>*///}
           /* <CTableHeaderCell>ZP Number</CTableHeaderCell>
            <CTableHeaderCell>Mobile Number</CTableHeaderCell>
            <CTableHeaderCell>District</CTableHeaderCell>
            <CTableHeaderCell>Gender</CTableHeaderCell>
            <CTableHeaderCell>createdDate</CTableHeaderCell>
            <CTableHeaderCell>Date</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {filteredData.map((report, index) => (
            <CTableRow key={index}>
              <CTableDataCell>{index + 1 + (currentPage - 1) * itemsPerPage}</CTableDataCell>
              <CTableDataCell>{report.fullName}</CTableDataCell>
              {/*<CTableDataCell>{report.dob}</CTableDataCell>*///}
             /* <CTableDataCell>{report.zpnumber}</CTableDataCell>
              <CTableDataCell>{report.mobileNumber}</CTableDataCell>
              <CTableDataCell>{report.district || "No District"}</CTableDataCell>
              <CTableDataCell>{report.gender}</CTableDataCell>
              <CTableDataCell>{report.createdDate}</CTableDataCell>
              <CTableDataCell>{report.datex}</CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>

      </>
          :
        <>
        
          <CRow className="mb-3 p-3">
            <CCol>
              <CFormLabel htmlFor="from">From</CFormLabel>
              <CFormInput id="from" type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} placeholder="From Date" />
            </CCol>
            <CCol>
              <CFormLabel htmlFor="to">To</CFormLabel>
              <CFormInput id="to" type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} placeholder="To Date" />
            </CCol>
          </CRow>
          
          
          <CTable striped bordered hover>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Category</CTableHeaderCell>
                <CTableHeaderCell>Count</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow>
                <CTableDataCell>Total Attendance</CTableDataCell>
                <CTableDataCell>{summaryData.totalAttendance || 0}</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableDataCell>Male Attendees</CTableDataCell>
                <CTableDataCell>{summaryData.genderStats?.Male || 0}</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableDataCell>Female Attendees</CTableDataCell>
                <CTableDataCell>{summaryData.genderStats?.Female || 0}</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableDataCell>12-18 yrs</CTableDataCell>
                <CTableDataCell>{summaryData.ageGroupStats?.["12-18 yrs"] || 0}</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableDataCell>19-34 yrs</CTableDataCell>
                <CTableDataCell>{summaryData.ageGroupStats?.["19-34 yrs"] || 0}</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableDataCell>35+ yrs</CTableDataCell>
                <CTableDataCell>{summaryData.ageGroupStats?.["35+ yrs"] || 0}</CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </>
      }







      
    </CCard>
  );
};
export default Reports;


*/

import React from 'react'
import { CAlert, CCard, CCardHeader, CTab, CTabContent, CTabList, CTabPanel, CTabs } from '@coreui/react'

//import ServiceReports from './ServiceReports'
//import HolycommunionReports from './HolycommunionReports'
import SummaryReports from './SummaryReports'
//import OverallReports from './OverallReports'
import CommAndService from './CommAndService'

function Reports() {
  return (
    <>
    <CCard style={{ boxShadow: "0px -2px 19px 1px rgba(0,0,0,0.39)",padding: "15px" }}>
    <CAlert style={{ backgroundColor:"rgba(22, 89, 177, 0.925)" }}>
        <h3 style={{ color: "#fff" }}>Reports</h3>
    </CAlert>
    
    <CTabs activeItemKey="ServiceReports">
      <CTabList variant="tabs">
        <CTab itemKey="ServiceReports">Holy Communion and Service Reports</CTab>
        <CTab itemKey="SummaryReports">Summary Reports</CTab>
      </CTabList>
      <CTabContent>
        <CTabPanel className="p-3" itemKey="ServiceReports" style={{backgroundColor:"#fff"}}>
          <CommAndService/>
        </CTabPanel>
        <CTabPanel className="p-3" itemKey="SummaryReports" style={{backgroundColor:"#fff"}}>
          <SummaryReports/>
        </CTabPanel>
      </CTabContent>
    </CTabs>
    </CCard>
    </>
  )
}

export default Reports

