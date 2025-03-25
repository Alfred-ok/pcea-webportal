
import React, { useEffect, useState } from "react";
import {
  CCard,  CCardHeader,CCardBody,CTable,CTableHead,CTableBody,CTableRow,
  CTableHeaderCell, CTableDataCell, CButton, CSpinner,CFormSelect, CPagination, CPaginationItem, CFormInput,CModal,CModalHeader,CModalBody,CModalFooter
} from "@coreui/react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import logo1 from  "../assets/images/logo1.png" 
import signature1 from "../assets/images/oprah-winfrey-signature-signaturely.png"



function MemberCommunionStatus() {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState("all");
  const recordsPerPage = 300;
  const [searchZP, setSearchZP] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState([]);

  const [pdfLoading, setPdfLoading] = useState(false);

  const [pdfUsername, setPdfUsername] = useState();







  const exportPDF = async () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Set general margins
    const marginX = 20;
    const marginY = 15;

    // Convert images to Base64
    const getBase64 = (url) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "Anonymous";
            img.src = url;
            img.onload = () => {
                const canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0);
                resolve(canvas.toDataURL("image/png"));
            };
            img.onerror = (err) => reject(err);
        });
    };

    try {
        setPdfLoading(true);
        const logoBase64 = await getBase64(logo1);
        const signatureBase64 = await getBase64(signature1);

        // 📌 Add Logo (Centered)
        const logoWidth = 40;
        const logoHeight = 40;
        const logoX = (pageWidth - logoWidth) / 2;
        doc.addImage(logoBase64, "PNG", logoX, marginY, logoWidth, logoHeight);

        // Adjust spacing
        const logoBottomY = marginY + logoHeight;
        const titleSpacing = 15;

        

        // 📌 Add Title
        doc.setFontSize(14);
        doc.text(
            "PCEA ZIMMERMAN HOLY COMMUNION ATTENDANCE REPORT",
            pageWidth / 2,
            logoBottomY + titleSpacing,
            { align: "center" }
        );


        // 📌 Add Username Below Title (Smaller Font)
          doc.setFontSize(11);
          doc.setFont("helvetica");
          doc.text(
              "Name: "+pdfUsername,
              pageWidth / 2,
              logoBottomY + titleSpacing + 8, // Slightly below title
              { align: "center" }
          );

        // Table position
        const tableStartY = logoBottomY + titleSpacing + 10;

        // 📌 Add Table
        autoTable(doc, {
            startY: tableStartY,
            margin: { left: marginX, right: marginX },
            head: [["Service", "Serial Number", "Officiating Minister", "Date"]],
            body: modalData.map((record) => [
                getServiceType(record.createdDate),
                record.serialNumber,
                record.officiatingMinister,
                record.datex,
            ]),
            theme: "striped",
        });

        // 📌 Signature Placement (Centered)
        /*
          const signatureWidth = 40;
          const signatureHeight = 15;
          const signatureX = (pageWidth - signatureWidth) / 2; // Center horizontally
          const signatureY = pageHeight - 70; // Move signature up to avoid overlap
          doc.addImage(signatureBase64, "PNG", signatureX, signatureY, signatureWidth, signatureHeight);
          */
          const signatureHeight = 15;
          const signatureY = pageHeight - 70; // Move signature up to avoid overlap
          // 📌 Officiated Text (Centered Below Signature)
          doc.setFontSize(12);
          doc.text(
              "Authorized by: " + (modalData.length > 0 ? modalData[0].officiatingMinister : "N/A"),
              pageWidth / 2, // Centered horizontally
              signatureY + signatureHeight + 8, // Below signature with spacing
              { align: "center" }
          );

          // 📌 Add Statement Above Footer (Gray Color)
          doc.setFontSize(11);
          doc.setFont("helvetica", "italic");
          doc.setTextColor(128, 128, 128); // Gray color (RGB: 128,128,128)
          doc.text(
              "The above is a true record without alteration",
              pageWidth / 2,
              pageHeight - 35, // Move up to prevent overlapping
              { align: "center" }
          );


        // 📌 Add Footer Background (Blue)
        const footerHeight = 15;
        doc.setFillColor(19, 86, 175); // Blue background
        doc.rect(0, pageHeight - footerHeight, pageWidth, footerHeight, "F");

        // 📌 Add Footer Text (White)
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(10);
        doc.text("Generated on: " + new Date().toLocaleDateString(), marginX, pageHeight - 5);
        doc.text("© PCEA ZIMMERMAN CHURCH", pageWidth - 60, pageHeight - 5);

        doc.save("PCEA ZIMMERMAN HOLY COMMUNION ATTENDANCE REPORT.pdf");
        setPdfLoading(false);
    } catch (error) {
        console.error("Error loading images:", error);
        setPdfLoading(false);
    }
};


  







/*

  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(modalData.map(record => ({
      Type: record.type,
      "Serial Number": record.serialNumber,
      Date: record.datex,
    })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "History Records");
    XLSX.writeFile(workbook, "history_records.xlsx");
  };

*/


  useEffect(() => {
    const fetchMemberStatus = async () => {
      setLoading(true);
      setError("");

      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const response = await fetch(
          //"http://197.232.170.121:8594/api/registrations/Getmemberhistorycommunion",
          `${import.meta.env.VITE_BASE_URL}/Getmemberhistorycommunion`,
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

        const data = await response.json();
        console.log("API Response:", data);
        setMembers(Array.isArray(data) ? data : []);
        setFilteredMembers(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMemberStatus();
  }, []);

  useEffect(() => {
    let updatedMembers = members;
    
    if (filterStatus !== "all") {
      updatedMembers = updatedMembers.filter((member) => member.status.toLowerCase() === filterStatus);
    }
    
    if (searchZP) {
      updatedMembers = updatedMembers.filter((member) => member.zpnumber.includes(searchZP));
    }
  
    setFilteredMembers(updatedMembers);
    setCurrentPage(1);
  }, [filterStatus, searchZP, members]);

  useEffect(() => {
    if (filterStatus === "all") {
      setFilteredMembers(members);
    } else {
      setFilteredMembers(members.filter((member) => member.status.toLowerCase() === filterStatus));
    }
    setCurrentPage(1);
  }, [filterStatus, members]);

  const totalRecords = filteredMembers.length;
  const totalPages = Math.ceil(totalRecords / recordsPerPage);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredMembers.slice(indexOfFirstRecord, indexOfLastRecord);
  const handleViewMore = async (member) => {
    setPdfUsername(member.fullName)
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found");
  
      const response = await fetch(
        //`http://197.232.170.121:8594/api/registrations/Membercommunionhistory?zp=${zpnumber}`,
        `${import.meta.env.VITE_BASE_URL}/Membercommunionhistory?zp=${member.zpnumber}`,
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
  
      const data = await response.json();
      console.log("Modal API Response:", data);
  
      // Ensure data is an array
      setModalData(Array.isArray(data) ? data : []);
      setModalVisible(true);
    } catch (error) {
      console.error("Error fetching member details:", error);
      setError(error.message);
    }
  };







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
  
  return (
    <CCard className="mb-4">
      <CCardHeader>
        <h3 style={{ color: "blue" }}>Member Status</h3>
      </CCardHeader>
      <CCardBody>
      <div className="mb-3 d-flex justify-content-end gap-3">
  <CFormInput
    style={{ width: "250px" }}
    placeholder="Search by ZP Number"
    value={searchZP}
    onChange={(e) => setSearchZP(e.target.value)}
  />
  
  <CFormSelect
    style={{ width: "200px" }}
    value={filterStatus}
    onChange={(e) => setFilterStatus(e.target.value)}
  >
    <option style={{ fontWeight: "bold" }} value="all">All Members</option>
    <option style={{ fontWeight: "bold" }} value="active">Active</option>
    <option style={{ fontWeight: "bold" }} value="inactive">Inactive</option>
  </CFormSelect>
</div>


        {loading ? (
          <div className="text-center">
            <CSpinner color="primary" />
            <p>Loading members...</p>
          </div>
        ) : error ? (
          <p style={{ color: "red", textAlign: "center" }}>Error: {error}</p>
        ) : filteredMembers.length === 0 ? (
          <p style={{ textAlign: "center" }}>Oops seems there are no records.</p>
        ) : (
          <>
            <CTable striped bordered hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell style={{ color: "blue", fontWeight: "bold" }}>No.</CTableHeaderCell>
                  <CTableHeaderCell style={{ color: "blue", fontWeight: "bold" }}>Full Name</CTableHeaderCell>
                  <CTableHeaderCell style={{ color: "blue", fontWeight: "bold" }}>Mobile Number</CTableHeaderCell>
                  <CTableHeaderCell style={{ color: "blue", fontWeight: "bold" }}>ZP Number</CTableHeaderCell>
                  <CTableHeaderCell style={{ color: "blue", fontWeight: "bold" }}>Status</CTableHeaderCell>
                  <CTableHeaderCell style={{ color: "blue", fontWeight: "bold" }}>Action</CTableHeaderCell>
                 
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {currentRecords.map((member, index) => (
                  <CTableRow key={indexOfFirstRecord + index + 1}>
                    <CTableDataCell style={{ fontWeight: "bold", color: "blue" }}>
                      {indexOfFirstRecord + index + 1}
                    </CTableDataCell>
                    <CTableDataCell>{member.fullName}</CTableDataCell>
                    <CTableDataCell>{member.mobileNumber}</CTableDataCell>
                    <CTableDataCell>{member.zpnumber}</CTableDataCell>
                    <CTableDataCell
                      style={{
                        color: member.status.toLowerCase() === "inactive" ? "red" : "green",
                        fontWeight: "bold",
                      }}
                    >
                      {member.status}
                    </CTableDataCell>
                    <CTableDataCell>
                      <CButton style={{color:"white", fontWeight:"bold"}} color="success" onClick={() => handleViewMore(member)} >
                        View More
                      </CButton>
                    </CTableDataCell>
                   
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>

            <CModal size="lg" visible={modalVisible} onClose={() => setModalVisible(false)}>
  <CModalHeader>
    <strong>Member History Details</strong>
  </CModalHeader>
  <CModalBody style={{ maxHeight: "auto", overflowY: "auto" }}>
       {
        modalData.length > 0 ?
        <div className="mb-3">
        {pdfLoading ?
        <CButton disabled color="success" style={{color:"#fff"}} onClick={exportPDF} className="me-2">
         <CSpinner size="sm" color="light" style={{marginRight:"4px"}} />Download PDF
        </CButton>
        :
        <CButton color="success" style={{color:"#fff"}} onClick={exportPDF} className="me-2">
          Download PDF
        </CButton>
        }
        {/*<CButton color="primary" style={{color:"#fff"}} onClick={exportExcel}>Download Excel</CButton>*/}
        </div>
        :
        <></>
       }
    {modalData.length > 0 ? (
      <CTable striped bordered hover>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell><strong>Type</strong></CTableHeaderCell>
            <CTableHeaderCell><strong>Serial Number</strong></CTableHeaderCell>
            <CTableHeaderCell><strong>Date</strong></CTableHeaderCell>
            <CTableHeaderCell><strong>Officiating Minister</strong></CTableHeaderCell>
            <CTableHeaderCell><strong>Service</strong></CTableHeaderCell>
            {/*<CTableHeaderCell><strong>Status</strong></CTableHeaderCell>*/}
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {modalData.map((record, index) => (
            <CTableRow key={index}>
              <CTableDataCell>{record.type}</CTableDataCell>
              <CTableDataCell>{record.serialNumber}</CTableDataCell>
              <CTableDataCell>{record.datex}</CTableDataCell>
              <CTableDataCell>{record.officiatingMinister}</CTableDataCell>
              <CTableDataCell>{getServiceType(record.createdDate)}</CTableDataCell>
              {/*<CTableDataCell
                style={{ color: record.status === "1" ? "green" : "red", fontWeight: "bold" }}
              >
                {record.status === "1" ? "Active" : "Inactive"}
              </CTableDataCell>*/}
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    ) : (
      <p>No history records found.</p>
    )}
  </CModalBody>
  <CModalFooter>
    <CButton color="secondary" onClick={() => setModalVisible(false)}>Close</CButton>
  </CModalFooter>
</CModal>

            <CPagination align="center">
              <CPaginationItem 
                style={{ cursor: "pointer", fontWeight: "bold" }} 
                disabled={currentPage === 1} 
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              >
                Previous
              </CPaginationItem>

              {Array.from({ length: totalPages }).map((_, index) => (
                <CPaginationItem 
                  key={index} 
                  style={{ cursor: "pointer", fontWeight: "bold" }} 
                  active={currentPage === index + 1} 
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </CPaginationItem>
              ))}

              <CPaginationItem 
                style={{ cursor: "pointer", fontWeight: "bold" }} 
                disabled={currentPage === totalPages} 
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              >
                Next
              </CPaginationItem>
            </CPagination>
          </>
        )}
      </CCardBody>
    </CCard>
  );
}

export default MemberCommunionStatus;
