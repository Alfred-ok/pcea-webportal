


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
  CPaginationItem,
  CFormLabel,
  CFormInput
} from "@coreui/react";
import * as XLSX from 'xlsx';
import Districtdata from  "../Registration/Registration Form/Districtdata"

const CommAndService = () => {
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;
  const [service, setService] = useState();
  const [tableRefresh, settableRefresh] = useState(false);


  useEffect(()=>{
    if(tableRefresh){
      setFromDate("")
      setToDate("")
      setSelectedGender("All")
    }
    
  
  },[tableRefresh])

  useEffect(()=>{
    if(activeTab === "holyCommunionReport"){
      settableRefresh(!tableRefresh);
    }
  },[activeTab])
  

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
      settableRefresh(!tableRefresh)
      fetchData(`${import.meta.env.VITE_THIRD_BASE_URL}/reports/all?type=Service`/*"http://197.232.170.121:8596/reports/all?type=Service"*/, setServiceData);
    } else if (activeTab === "holyCommunionReport") {
      
      fetchData(`${import.meta.env.VITE_THIRD_BASE_URL}/reports/all?type=Communion`/*"http://197.232.170.121:8596/reports/all?type=Communion"*/, setCommunionData);
    }
  }, [activeTab]);

  






  const getServiceType = (createdDate) => {
    const dateObj = new Date(createdDate);
    const day = dateObj.getDay(); // 0 = Sunday, 1 = Monday, ..., 3 = Wednesday
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();

    // Sunday Services
    if (day === 0) {
        if (hours >= 7 && (hours < 10 || (hours === 10 && minutes === 0))) {
            return "First Service";
        } else if ((hours === 10 && minutes > 0) || (hours > 10 && hours < 14)) {
            return "Second Service";
        }
    }

    // Mid-Week Service (Wednesday)
    if (day === 3 && hours >= 17 && hours < 21) {
        return "Mid-Week Service";
    }

    // Youth Service (Monday)
    if (day === 1 && hours >= 18 && hours < 21) {
        return "Youth Service";
    }

    // If no match, it's a Special Service
    return "Special Service";
};







  console.log(filteredData);



  useEffect(() => {
    let filtered = activeTab === "serviceReport" ? serviceData : communionData;

    if (fromDate && toDate) {
      filtered = filtered.filter((item) => {
        const itemDate = new Date(item.datex);
        return itemDate >= new Date(fromDate) && itemDate <= new Date(toDate);
      });
    }

    if (selectedDistrict !== "All") {
      filtered = filtered.filter((item) => (item.district || "No District") === selectedDistrict);
    }
    if (service && service !== "All") {
      filtered = filtered.filter((item) => getServiceType(item.createdDate) === service);
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
  }, [selectedDistrict, selectedGender, selectedAgeGroup,service,fromDate, toDate, serviceData, communionData, activeTab, tableRefresh]);

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
      <CRow className="mb-3 p-3">
        <CCol>
          <CFormLabel htmlFor="district">
            District
          </CFormLabel>
          <CFormSelect value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)}>
            <option value="All">All Districts</option>
            { Districtdata.map((data, index) => <option key={index} value={data.district}>{data.district}</option>)}
          </CFormSelect>
        </CCol>
        <CCol>
          <CFormLabel htmlFor="gender">
            Gender
          </CFormLabel>
          <CFormSelect value={selectedGender} onChange={(e) => setSelectedGender(e.target.value)}>
            <option value="All">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </CFormSelect>
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
        <CCol>
          <CFormLabel>
            Service
          </CFormLabel>
          <CFormSelect value={service} onChange={(e) => setService(e.target.value)}>
          <option value="All">All</option>
            <option value="First Service">First Service</option>
            <option value="Second Service">Second Service</option>
            <option value="Mid-Week Service">Mid-Week Service</option>
            <option value="Youth Service">Youth Service</option>
            <option value="Special Service">Special Service</option>
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
      </CRow>

      <CCol className="d-flex justify-content-end mb-3">
          <CButton  style={{fontWeight:"bold", color:"white"}} color="success" onClick={handleDownload}>Download Excel</CButton>
        </CCol>

      

      <CTable striped bordered hover>
        <CTableHead color="primary">
          <CTableRow>
            <CTableHeaderCell>No.</CTableHeaderCell>
            <CTableHeaderCell>Full Name</CTableHeaderCell>
            <CTableHeaderCell>DOB</CTableHeaderCell>
            <CTableHeaderCell>ZP Number</CTableHeaderCell>
            <CTableHeaderCell>Mobile Number</CTableHeaderCell>
            <CTableHeaderCell>District</CTableHeaderCell>
            <CTableHeaderCell>Gender</CTableHeaderCell>
            <CTableHeaderCell>Date</CTableHeaderCell>
            <CTableHeaderCell>Service</CTableHeaderCell>
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
                <CTableDataCell>{getServiceType(report.createdDate)}</CTableDataCell>
              </CTableRow>
            ))
          ) : (
            <CTableRow>
              <CTableDataCell colSpan={7} className="text-center"><span>No reports available.</span></CTableDataCell>
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
export default CommAndService;