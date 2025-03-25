import React, { useState, useEffect } from "react";
import {
  CCard,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
  CButton,
  CNav,
  CNavItem,
  CNavLink,
  CTabContent,
  CTabPane,
  CInputGroup,
  CFormInput,
  CFormSelect,
} from "@coreui/react";
import "ldrs/zoomies";
import * as XLSX from "xlsx";

  const Reports = () => {
  const [serviceReports, setServiceReports] = useState([]); 
  const [holyCommunionReports, setHolyCommunionReports] = useState([]); 
  const [activeTab, setActiveTab] = useState("general"); 
  const [holyCommunionTab, setHolyCommunionTab] = useState("allReports");
  const [loading, setLoading] = useState(false);

  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;
 
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [districts, setDistricts] = useState([]); 


  const downloadExcel = (data, fileName) => {
    if (data.length === 0) {
      alert("No data available to download.");
      return;
    }
  
    const applyFilters = (reports) => {
      return reports.filter((report) => {
        const reportDate = new Date(report.datex);
        const matchesDateRange =
          (!startDate || reportDate >= new Date(startDate)) &&
          (!endDate || reportDate <= new Date(endDate));
        const matchesDistrict =
          !selectedDistrict || report.district === selectedDistrict;
        const matchesGender = !selectedGender || report.gender === selectedGender;
        const matchesSearch =
          !searchQuery ||
          report.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          report.mobileNumber.includes(searchQuery) ||
          report.zpnumber.includes(searchQuery);
        return matchesDateRange && matchesDistrict && matchesGender && matchesSearch;
      });
    };

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Reports");
  
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  };
  
  useEffect(() => {
    if (activeTab === "general") {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in local storage.");
        return;
      }

      setLoading(true);
      fetch(
        //"http://197.232.170.121:8596/reports/all?type=Service"
        `${VITE_THIRD_BASE_URL}/reports/all?type=Service`,
        {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
          return response.json();
        })
        .then((data) => {
          setServiceReports(data.serviceData || []);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching service reports:", error.message);
          setServiceReports([]);
          setLoading(false);
        });
    }
  }, [activeTab]);

  
  useEffect(() => {
    if (holyCommunionTab === "allReports" || holyCommunionTab === "districts") {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found in local storage.");
        return;
      }
      
      let url = `${import.meta.env.VITE_THIRD_BASE_URL}/reports/all?type=Communion` //" http://197.232.170.121:8596/reports/all?type=Communion";
      if (startDate && endDate) {
        url += `&start=${startDate}&end=${endDate}`;
      }

      setLoading(true);
      fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
          return response.json();
        })
        .then((data) => {
          const filteredReports = data.serviceData.filter((report) => {
            const reportDate = report.datex;
            return (
              (!startDate || new Date(reportDate) >= new Date(startDate)) &&
              (!endDate || new Date(reportDate) <= new Date(endDate))
            );
          });

          setHolyCommunionReports(filteredReports);

          
          const uniqueDistricts = [...new Set(filteredReports.map((report) => report.district))];
          setDistricts(uniqueDistricts);

          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching Holy Communion reports:", error.message);
          setHolyCommunionReports([]);
          setLoading(false);
        });
    }
  }, [holyCommunionTab, startDate, endDate]);

  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentServiceReports = serviceReports.slice(indexOfFirstItem, indexOfLastItem);
  const currentHolyCommunionReports = holyCommunionReports.slice(indexOfFirstItem, indexOfLastItem);

  const renderServiceReports = () => {
    const totalPages = Math.ceil(serviceReports.length / itemsPerPage);
  
    return (
      <div>
        <h5 className="text-center" style={{ color: "blue", fontWeight: "bold" }}>
          Service Reports
        </h5>
  
        {/* Download Excel Button */}
        <div className="d-flex justify-content-end mb-3">
          <CButton style={{color:"white",fontWeight:"bold"}} color="success" onClick={() => downloadExcel(serviceReports, "Service_Reports")}>
            Download Excel
          </CButton>
        </div>
  
        {loading ? (
          <div className="text-center">
            <l-zoomies size="120" stroke="5" bg-opacity="0.1" speed="1.4" color="blue" />
            <p>Loading data...</p>
          </div>
        ) : (
          <>
            <CTable striped hover responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>No.</CTableHeaderCell>
                  <CTableHeaderCell>Full Name</CTableHeaderCell>
                  <CTableHeaderCell>Date</CTableHeaderCell>
                  <CTableHeaderCell>ZP Number</CTableHeaderCell>
                  <CTableHeaderCell>Mobile</CTableHeaderCell>
                  <CTableHeaderCell>District</CTableHeaderCell>
                  <CTableHeaderCell>ZP Number</CTableHeaderCell>
                  <CTableHeaderCell>Gender</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {currentServiceReports.map((report, index) => (
                  <CTableRow key={index}>
                    <CTableDataCell style={{ fontWeight: "bold" }}>{index + 1 + indexOfFirstItem}</CTableDataCell>
                    <CTableDataCell>{report.fullName}</CTableDataCell>
                    <CTableDataCell>{report.datex}</CTableDataCell>
                    <CTableDataCell>{report.zpnumber}</CTableDataCell>
                    <CTableDataCell>{report.mobileNumber}</CTableDataCell>
                    <CTableDataCell>{report.district}</CTableDataCell>
                    <CTableDataCell>{report.zpnumber}</CTableDataCell>
                    <CTableDataCell>{report.gender}</CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
  
            <div className="d-flex justify-content-center mt-3">
              <CButton
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="me-2"
                style={{ fontWeight: "bold" }}
              >
                Previous
              </CButton>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <CButton
                  key={page}
                  color={page === currentPage ? "primary" : "secondary"}
                  onClick={() => setCurrentPage(page)}
                  className="mx-1"
                >
                  {page}
                </CButton>
              ))}
              <CButton
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="ms-2"
                style={{ fontWeight: "bold" }}
              >
                Next
              </CButton>
            </div>
          </>
        )}
      </div>
    );
  };
  
  const renderHolyCommunionContent = () => {
    if (holyCommunionTab === "allReports") {
      const totalPages = Math.ceil(holyCommunionReports.length / itemsPerPage);
  
      return (
        <div>
          <h5 className="text-center" style={{ color: "blue", fontWeight: "bold" }}>
            All Holy Communion Reports
          </h5>
  
          <div className="d-flex justify-content-end mb-3">
            <CButton style={{ color: "white", fontWeight: "bold" }} color="success" onClick={() => downloadExcel(holyCommunionReports, "Holy_Communion_Reports")}>
              Download Excel
            </CButton>
          </div>
  
          <CInputGroup className="mb-4">
            <CFormInput
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              placeholder="Start Date"
            />
            <CFormInput
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              placeholder="End Date"
            />
            <CButton color="primary" onClick={() => setCurrentPage(1)}>
              Filter
            </CButton>
          </CInputGroup>
  
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <CTable striped hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>No.</CTableHeaderCell>
                    <CTableHeaderCell>Full Name</CTableHeaderCell>
                    <CTableHeaderCell>District</CTableHeaderCell>
                    <CTableHeaderCell>Mobile</CTableHeaderCell>
                    <CTableHeaderCell>Date</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {currentHolyCommunionReports.map((report, index) => (
                    <CTableRow key={index}>
                      <CTableDataCell style={{ fontWeight: "bold" }}>{index + 1 + indexOfFirstItem}</CTableDataCell>
                      <CTableDataCell>{report.fullName}</CTableDataCell>
                      <CTableDataCell>{report.district}</CTableDataCell>
                      <CTableDataCell>{report.mobileNumber}</CTableDataCell>
                      <CTableDataCell>{report.datex}</CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
  
              <div className="d-flex justify-content-center mt-3">
                <CButton
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  className="me-2"
                  style={{ fontWeight: "bold" }}
                >
                  Previous
                </CButton>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <CButton
                    key={page}
                    color={page === currentPage ? "primary" : "secondary"}
                    onClick={() => setCurrentPage(page)}
                    className="mx-1"
                  >
                    {page}
                  </CButton>
                ))}
                <CButton
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className="ms-2"
                  style={{ fontWeight: "bold" }}
                >
                  Next
                </CButton>
              </div>
            </>
          )}
        </div>
      );
    } else if (holyCommunionTab === "districts") {
      return (
        <div>
          <h5 className="text-center" style={{ color: "blue", fontWeight: "bold" }}>
            Holy Communion Reports by District
          </h5>
  
          {/* District Selection */}
          <CInputGroup className="mb-3">
            <CFormSelect
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
            >
              <option value="">Select District</option>
              {districts.map((district, index) => (
                <option key={index} value={district}>
                  {district}
                </option>
              ))}
            </CFormSelect>
          </CInputGroup>
  
          {/* Display Filtered Reports */}
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              <CTable striped hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>No.</CTableHeaderCell>
                    <CTableHeaderCell>Full Name</CTableHeaderCell>
                    <CTableHeaderCell>Mobile</CTableHeaderCell>
                    <CTableHeaderCell>Date</CTableHeaderCell>
                    <CTableHeaderCell>ZP Number</CTableHeaderCell>
                    <CTableHeaderCell>Gender</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {holyCommunionReports
                    .filter((report) => selectedDistrict === "" || report.district === selectedDistrict)
                    .map((report, index) => (
                      <CTableRow key={index}>
                        <CTableDataCell>{index + 1}</CTableDataCell>
                        <CTableDataCell>{report.fullName}</CTableDataCell>
                        <CTableDataCell>{report.mobileNumber}</CTableDataCell>
                        <CTableDataCell>{report.datex}</CTableDataCell>
                        <CTableDataCell>{report.zpnumber}</CTableDataCell>
                        <CTableDataCell>{report.gender}</CTableDataCell>
                      </CTableRow>
                    ))}
                </CTableBody>
              </CTable>
            </>
          )}
        </div>
      );
    }
  };
  
  return (
    <>
      <CNav variant="tabs" className="mb-4">
        <CNavItem>
          <CNavLink
            active={activeTab === "general"}
            onClick={() => setActiveTab("general")}
            style={{ color: "blue", fontWeight: "bold", cursor: "pointer" }}
          >
            Service Reports
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink
            active={activeTab === "Holy Communion"}
            onClick={() => setActiveTab("Holy Communion")}
            style={{ color: "blue", fontWeight: "bold", cursor: "pointer" }}
          >
            Holy Communion Reports
          </CNavLink>
        </CNavItem>
      </CNav>

      <CTabContent>
        {activeTab === "general" && (
          <CTabPane visible={activeTab === "general"}>
            <CCard className="mb-4">{renderServiceReports()}</CCard>
          </CTabPane>
        )}
        {activeTab === "Holy Communion" && (
          <CTabPane visible={activeTab === "Holy Communion"}>
            <CNav variant="tabs" className="mb-4">
              <CNavItem>
                <CNavLink
                  active={holyCommunionTab === "allReports"}
                  onClick={() => setHolyCommunionTab("allReports")}
                  style={{ color: "blue", fontWeight: "bold", cursor: "pointer" }}
                >
                  All Reports
                </CNavLink>
              </CNavItem>
              <CNavItem>
                <CNavLink
                  active={holyCommunionTab === "districts"}
                  onClick={() => setHolyCommunionTab("districts")}
                  style={{ color: "blue", fontWeight: "bold", cursor: "pointer" }}
                >
                  Districts
                </CNavLink>
              </CNavItem>
            </CNav>
            <CCard className="mb-4">{renderHolyCommunionContent()}</CCard>
          </CTabPane>
        )}
      </CTabContent>
    </>
  );
};

export default Reports;
