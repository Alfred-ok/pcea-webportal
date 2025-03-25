
/*

import React, { useEffect, useState } from "react";
import { CWidgetStatsA, CWidgetStatsB, CWidgetStatsC } from "@coreui/react";

const SummaryReports = () => {
  const [serviceData, setServiceData] = useState([]);
  const [communionData, setCommunionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found in localStorage");
    return;
  }


  const API_URL_SERVICE = "http://197.232.170.121:8596/reports/all?type=Service";
  const API_URL_COMMUNION =
    "http://197.232.170.121:8596/reports/all?type=Communion";
  const BEARER_TOKEN = token ; // Replace with the actual token

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${BEARER_TOKEN}`,
          "Content-Type": "application/json",
        };

        const [serviceResponse, communionResponse] = await Promise.all([
          fetch(API_URL_SERVICE, { headers }).then((res) => res.json()),
          fetch(API_URL_COMMUNION, { headers }).then((res) => res.json()),
        ]);

        setServiceData(serviceResponse.serviceData);
        setCommunionData(communionResponse.serviceData);
      } catch (error) {
        setError("Failed to fetch data");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log(serviceData)
  console.log(communionData)

  const calculateStatistics = (data) => {
    if (!data || data.length === 0) return {};
    
    return {
      totalAttendees: data.length,
      maleAttendees: data.filter((person) => person.gender === "Male").length,
      femaleAttendees: data.filter((person) => person.gender === "Female").length,
      ageGroup12_18: data.filter((person) => person.age >= 12 && person.age <= 18).length,
      ageGroup19_34: data.filter((person) => person.age >= 19 && person.age <= 34).length,
      ageGroup35Above: data.filter((person) => person.age >= 35).length,
    };
  };

  const serviceStats = calculateStatistics(serviceData);
  const communionStats = calculateStatistics(communionData);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Service Attendance Summary</h2>
      <CWidgetStatsA color="primary" value={serviceStats.totalAttendees || 0} title="Total Attendees" />
      <CWidgetStatsB color="info" value={serviceStats.maleAttendees || 0} title="Male Attendees" />
      <CWidgetStatsB color="warning" value={serviceStats.femaleAttendees || 0} title="Female Attendees" />
      <CWidgetStatsC color="success" value={serviceStats.ageGroup12_18 || 0} title="Ages 12-18" />
      <CWidgetStatsC color="danger" value={serviceStats.ageGroup19_34 || 0} title="Ages 19-34" />
      <CWidgetStatsC color="secondary" value={serviceStats.ageGroup35Above || 0} title="Ages 35 and above" />

      <h2>Communion Attendance Summary</h2>
      <CWidgetStatsA color="primary" value={communionStats.totalAttendees || 0} title="Total Attendees" />
      <CWidgetStatsB color="info" value={communionStats.maleAttendees || 0} title="Male Attendees" />
      <CWidgetStatsB color="warning" value={communionStats.femaleAttendees || 0} title="Female Attendees" />
      <CWidgetStatsC color="success" value={communionStats.ageGroup12_18 || 0} title="Ages 12-18" />
      <CWidgetStatsC color="danger" value={communionStats.ageGroup19_34 || 0} title="Ages 19-34" />
      <CWidgetStatsC color="secondary" value={communionStats.ageGroup35Above || 0} title="Ages 35 and above" />
    </div>
  );
};

export default SummaryReports;
*/




import React, { useEffect, useState } from "react";
import { CCard, CCardBody, CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CFormLabel, CFormInput, CCol, CRow } from "@coreui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CIcon from "@coreui/icons-react";
import { cilArrowThickRight } from "@coreui/icons";

const SummaryReports = () => {
  const [serviceData, setServiceData] = useState([]);
  const [communionData, setCommunionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Date range for filtering
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

// Single date filter
  const [selectedDate, setSelectedDate] = useState(null);

  //Services
 

  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found in localStorage");
    return;
  }

  const API_URL_SERVICE = `${import.meta.env.VITE_THIRD_BASE_URL}/reports/all?type=Service`; //"http://197.232.170.121:8596/reports/all?type=Service";
  const API_URL_COMMUNION = `${import.meta.env.VITE_THIRD_BASE_URL}/reports/all?type=Communion` //"http://197.232.170.121:8596/reports/all?type=Communion";
  const BEARER_TOKEN = token; // Replace with actual token

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${BEARER_TOKEN}`,
          "Content-Type": "application/json",
        };

        const [serviceResponse, communionResponse] = await Promise.all([
          fetch(API_URL_SERVICE, { headers }).then((res) => res.json()),
          fetch(API_URL_COMMUNION, { headers }).then((res) => res.json()),
        ]);

        setServiceData(serviceResponse.serviceData);
        setCommunionData(communionResponse.serviceData);
      } catch (error) {
        setError("Failed to fetch data");
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  
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
/*
// Function to filter data based on selected date
const filterDataBySingleDate = (data) => {
  if (!selectedDate) return data;

  return data.filter((item) => {
    const itemDate = new Date(item.createdDate);
    return (
      itemDate.getFullYear() === selectedDate.getFullYear() &&
      itemDate.getMonth() === selectedDate.getMonth() &&
      itemDate.getDate() === selectedDate.getDate()
    );
  });
};

  // Function to filter data based on selected date range
  const filterDataByDate = (data) => {
    if (!startDate || !endDate) return data;

    return data.filter((item) => {
      const itemDate = new Date(item.createdDate); // Assuming `date` is available in API response
      return itemDate >= startDate && itemDate <= endDate;
    });
  };

  */

  const filterData = (data) => {
  if (!data) return [];

  if (selectedDate) {
    return data.filter((item) => {
      const itemDate = new Date(item.createdDate);
      return (
        itemDate.getFullYear() === selectedDate.getFullYear() &&
        itemDate.getMonth() === selectedDate.getMonth() &&
        itemDate.getDate() === selectedDate.getDate()
      );
    });
  }

  if (startDate && endDate) {
    return data.filter((item) => {
      const itemDate = new Date(item.createdDate);
      return itemDate >= startDate && itemDate <= endDate;
    });
  }

  return data;
};

/*
  // Apply filtering
  const filteredServiceData = filterDataByDate(serviceData);
  const filteredCommunionData = filterDataByDate(communionData);
*/

  const filteredServiceData = filterData(serviceData);
  const filteredCommunionData = filterData(communionData);


  // Function to calculate attendance statistics
  const calculateStatistics = (data) => {
    if (!data || data.length === 0) return {

      totalAttendees: 0,
      maleAttendees: 0,
      femaleAttendees: 0,
      ageGroup12_18: 0,
      ageGroup19_34: 0,
      ageGroup35Above: 0,
      services: {}
    };

    return {
      totalAttendees: data.length,
      maleAttendees: data.filter((person) => person.gender === "Male").length,
      femaleAttendees: data.filter((person) => person.gender === "Female").length,
     // ageGroup12_18: data.filter((person) => person.age >= 12 && person.age <= 18).length,
     // ageGroup19_34: data.filter((person) => person.age >= 19 && person.age <= 34).length,
     // ageGroup35Above: data.filter((person) => person.age >= 35).length,
    
      ageGroup12_18: data.filter((item) => {
        const birthYear = parseInt(item.dob?.split("-")[0]);
        return birthYear >= 2007 && birthYear <= 2013;
      }).length,
      ageGroup19_34: data.filter((item) => {
        const birthYear = parseInt(item.dob?.split("-")[0]);
        return birthYear >= 1990 && birthYear <= 2006;
      }).length,
      ageGroup35Above: data.filter((item) => {
        const birthYear = parseInt(item.dob?.split("-")[0]);
        return birthYear < 1990;
      }).length,

      //total amount per service
      services: data.reduce((acc, item) => {
        const serviceType = getServiceType(item.createdDate);
        acc[serviceType] = (acc[serviceType] || 0) + 1;
        return acc;
      }, {})
    };
  };

  const serviceStats = calculateStatistics(filteredServiceData);
  const communionStats = calculateStatistics(filteredCommunionData);
  
  console.log(serviceStats.services)




  

  return (
    <div>
     
    {/*  <DatePicker selected={startDate} onChange={setStartDate} placeholderText="Start Date" />
        <DatePicker selected={endDate} onChange={setEndDate} placeholderText="End Date" />
        
          <DatePicker 
            selected={selectedDate} 
            onChange={setSelectedDate} 
            placeholderText="Select a Single Date" 
          /><div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <D
      </div>*/}
      
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        gap: "15px", 
        padding: "15px", 
       
        borderRadius: "10px", 
        margin: "20px auto" 
      }}>
<CRow>
  <CCol>   
  <div style={{ textAlign: "center" }}>
    <label style={{ fontWeight: "bold", marginBottom: "5px", display: "block" }}>Start Date</label>
    <DatePicker 
      selected={startDate} 
      onChange={setStartDate} 
      placeholderText="Select Start Date" 
      className="custom-datepicker"
    />
  </div>
  </CCol>

  <CCol>
  <div><CIcon icon={cilArrowThickRight} size="xl"/></div>
  </CCol>

  <CCol>
  <div style={{ textAlign: "center" }}>
    <label style={{ fontWeight: "bold", marginBottom: "5px", display: "block" }}>End Date</label>
    <DatePicker 
      selected={endDate} 
      onChange={setEndDate} 
      placeholderText="Select End Date" 
      className="custom-datepicker"
    />
  </div>
  </CCol>

  <CCol style={{marginLeft:"30px"}}>
  <div style={{ textAlign: "center" }}>
    <label style={{ fontWeight: "bold", marginBottom: "5px", display: "block" }}>Single Date</label>
    <DatePicker 
      selected={selectedDate} 
      onChange={setSelectedDate} 
      placeholderText="Pick a Date" 
      className="custom-datepicker"
    />
  </div>
  </CCol>
  </CRow>
</div>



      

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <>
        <CCard>
          <CCardBody>
            <h2>Attendance Summary</h2>
            <CTable bordered striped stripedColumns hover>
              <CTableHead color="primary">
                <CTableRow>
                  <CTableHeaderCell>Category</CTableHeaderCell>
                  <CTableHeaderCell>Service</CTableHeaderCell>
                  <CTableHeaderCell>Communion</CTableHeaderCell>
                  <CTableHeaderCell>Total</CTableHeaderCell> {/* New Total Column */}
                </CTableRow>
              </CTableHead>
              <CTableBody>
                <CTableRow>
                  <CTableDataCell>Total Attendees</CTableDataCell>
                  <CTableDataCell>{serviceStats.totalAttendees || 0}</CTableDataCell>
                  <CTableDataCell>{communionStats.totalAttendees || 0}</CTableDataCell>
                  <CTableDataCell>{(serviceStats.totalAttendees || 0) + (communionStats.totalAttendees || 0)}</CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableDataCell>Male Attendees</CTableDataCell>
                  <CTableDataCell>{serviceStats.maleAttendees || 0}</CTableDataCell>
                  <CTableDataCell>{communionStats.maleAttendees || 0}</CTableDataCell>
                  <CTableDataCell>{(serviceStats.maleAttendees || 0) + (communionStats.maleAttendees || 0)}</CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableDataCell>Female Attendees</CTableDataCell>
                  <CTableDataCell>{serviceStats.femaleAttendees || 0}</CTableDataCell>
                  <CTableDataCell>{communionStats.femaleAttendees || 0}</CTableDataCell>
                  <CTableDataCell>{(serviceStats.femaleAttendees || 0) + (communionStats.femaleAttendees || 0)}</CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableDataCell>Ages 12-18</CTableDataCell>
                  <CTableDataCell>{serviceStats.ageGroup12_18 || 0}</CTableDataCell>
                  <CTableDataCell>{communionStats.ageGroup12_18 || 0}</CTableDataCell>
                  <CTableDataCell>{(serviceStats.ageGroup12_18 || 0) + (communionStats.ageGroup12_18 || 0)}</CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableDataCell>Ages 19-34</CTableDataCell>
                  <CTableDataCell>{serviceStats.ageGroup19_34 || 0}</CTableDataCell>
                  <CTableDataCell>{communionStats.ageGroup19_34 || 0}</CTableDataCell>
                  <CTableDataCell>{(serviceStats.ageGroup19_34 || 0) + (communionStats.ageGroup19_34 || 0)}</CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableDataCell>Ages 35+</CTableDataCell>
                  <CTableDataCell>{serviceStats.ageGroup35Above || 0}</CTableDataCell>
                  <CTableDataCell>{communionStats.ageGroup35Above || 0}</CTableDataCell>
                  <CTableDataCell>{(serviceStats.ageGroup35Above || 0) + (communionStats.ageGroup35Above || 0)}</CTableDataCell>
                </CTableRow>
                
                <CTableRow>
                  <CTableDataCell>First Service</CTableDataCell>
                  <CTableDataCell>{serviceStats.services["First Service"] || 0}</CTableDataCell>
                  <CTableDataCell>{communionStats.services["First Service"] || 0}</CTableDataCell>
                  <CTableDataCell>
                    {(serviceStats.services["First Service"] || 0) + (communionStats.services["First Service"] || 0)}
                  </CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableDataCell>Second Service</CTableDataCell>
                  <CTableDataCell>{serviceStats.services["Second Service"] || 0}</CTableDataCell>
                  <CTableDataCell>{communionStats.services["Second Service"] || 0}</CTableDataCell>
                  <CTableDataCell>
                    {(serviceStats.services["Second Service"] || 0) + (communionStats.services["Second Service"] || 0)}
                  </CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableDataCell>Mid-Week Service</CTableDataCell>
                  <CTableDataCell>{serviceStats.services["Mid-Week Service"] || 0}</CTableDataCell>
                  <CTableDataCell>{communionStats.services["Mid-Week Service"] || 0}</CTableDataCell>
                  <CTableDataCell>
                    {(serviceStats.services["Mid-Week Service"] || 0) + (communionStats.services["Mid-Week Service"] || 0)}
                  </CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableDataCell>Youth Service</CTableDataCell>
                  <CTableDataCell>{serviceStats.services["Youth Service"] || 0}</CTableDataCell>
                  <CTableDataCell>{communionStats.services["Youth Service"] || 0}</CTableDataCell>
                  <CTableDataCell>
                    {(serviceStats.services["Youth Service"] || 0) + (communionStats.services["Youth Service"] || 0)}
                  </CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableDataCell>Special Service</CTableDataCell>
                  <CTableDataCell>{serviceStats.services["Special Service"] || 0}</CTableDataCell>
                  <CTableDataCell>{communionStats.services["Special Service"] || 0}</CTableDataCell>
                  <CTableDataCell>
                    {(serviceStats.services["Special Service"] || 0) + (communionStats.services["Special Service"] || 0)}
                  </CTableDataCell>
                </CTableRow>

              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
        </>
      )}
    </div>
  );
};

export default SummaryReports;
