import { cilCloudDownload, cilInfo, cilLockLocked, cilMagnifyingGlass } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CAlert, CButton, CCallout, CCard, CCardBody, CCardHeader, CCardTitle, CCol, CFormInput, CInputGroup, CInputGroupText, CListGroup, CListGroupItem, CRow, CSpinner } from '@coreui/react'
import React from 'react'
import { useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from "jspdf-autotable";
import logo1 from  "../assets/images/logo1.png" 



function MemberInformation() {
    const [zpNumber, setZpNumber] = useState("");
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        if (!zpNumber) return;
        setLoading(true);
        setError(null);
        setData(null);
        
        try {
          const response = await fetch(
            //`http://197.232.170.121:8594/api/registrations/transfer?zp=${zpNumber}`
            `${import.meta.env.VITE_BASE_URL}/transfer?zp=${zpNumber}`,
          );
          
          if (!response.ok) {
            let errorMessage =  await response.text()
            let cleanedMessage = errorMessage.replace("An error occurred:", "").trim();
            setError(cleanedMessage);
            throw new Error("Failed to fetch data");
          }
          const result = await response.json();
          setData(result);
        } catch (err) {
          console.log(err.message);
        } finally {
          setLoading(false);
        }
      };
      console.log(data)


/*

      
const handleDownloadPDF = async() => {
  if (!data) return;


  const doc = new jsPDF();



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


try{

  const logoBase64 = await getBase64(logo1);

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


  doc.setFontSize(16);
  doc.text("Member Information", 10, 10);

  let y = 20; // Starting Y position

  const tableColumn = ["Label", "Value"];
  const tableRows = [];

  const addToTable = (label, value) => {
    if (value) {
      tableRows.push([label, value]);
    }
  };

  addToTable("Full Name", data.fullName);
  addToTable("Wife", data.name);
  addToTable("Mobile Number", data.mobileNumber);
  addToTable("ZP Number", data.zpnumber);
  addToTable("Holy Communion Status", data.member?.holyCommunionStatus);
  addToTable("Marital Status", data.member?.maritalStatus);
  addToTable("District", data.member?.district);
  addToTable("National ID", data.member?.nationalID);
  addToTable("Spouse Name", data.member?.spouseName);
  addToTable("Spouse ZP Number", data.member?.spouseZPNumber);
  addToTable("EPC Number", data.member?.ePCNumber);
  addToTable("DOB", data.member?.dob);
  addToTable("Gender", data.member?.gender);
  addToTable("Card Serial Number", data.member?.cardSerialNumber);
  addToTable("Created At", data.member?.createdAt);
  addToTable("Updated At", data.member?.updatedAt);
  addToTable("Created By", data.member?.createdBy);
  addToTable("Updated By", data.member?.updatedBy);

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: y + 5,
  });

  let nextY = doc.lastAutoTable?.finalY + 15 || y + 15; // Extra space after first table

  if (data.child && data.child.length > 0) {
    doc.setFontSize(14);
    doc.text("Children Information", 10, nextY);

    nextY += 8; // Add space below "Children Information"

    const childTableColumn = ["#", "Full Name", "Guardian ZP", "Baptized", "Communicant", "Guardian Telephone"];
    const childTableRows = [];

    data.child.forEach((child, index) => {
      childTableRows.push([
        index + 1,
        child.fullName || "-",
        child.guardianZpNumber || "-",
        child.baptized || "-",
        child.communicant || "-",
        child.guardianTelephone || "-"
      ]);
    });

    autoTable(doc, {
      head: [childTableColumn],
      body: childTableRows,
      startY: nextY, // Ensure space before child table
    });
  }

  doc.save(`Member_${data.zpnumber}.pdf`);

} catch (error) {
  console.error("Error loading images:", error);
}
};

*/


const handleDownloadPDF = async () => {
  if (!data) return;

  const doc = new jsPDF();
  const pageWidth = 210; // A4 width in mm
  const marginY = 10; // Top margin

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
    // Load Logo Image
    let logoBase64 = "";
    if (logo1) {
      logoBase64 = await getBase64(logo1);
    }

    // Add Logo
    if (logoBase64) {
      const logoWidth = 40;
      const logoHeight = 40;
      const logoX = (pageWidth - logoWidth) / 2;

      doc.addImage(logoBase64, "PNG", logoX, marginY, logoWidth, logoHeight);
    }

    // Add Title
    doc.setFontSize(14);
    doc.text(
      "PCEA ZIMMERMAN MEMBER INFORMATION REPORT",
      pageWidth / 2,
      marginY + 60,
      { align: "center" }
    );

    let y = 80; // Start position for content

    // Member Information Table
    const tableColumn = ["Label", "Value"];
    const tableRows = [];

    const addToTable = (label, value) => {
      if (value) {
        tableRows.push([label, value]);
      }
    };

    addToTable("Full Name", data.fullName);
    addToTable("Wife", data.name);
    addToTable("Mobile Number", data.mobileNumber);
    addToTable("ZP Number", data.zpnumber);
    addToTable("Holy Communion Status", data.member?.holyCommunionStatus);
    addToTable("Marital Status", data.member?.maritalStatus);
    addToTable("District", data.member?.district);
    addToTable("National ID", data.member?.nationalID);
    addToTable("Spouse Name", data.member?.spouseName);
    addToTable("Spouse ZP Number", data.member?.spouseZPNumber);
    addToTable("EPC Number", data.member?.ePCNumber);
    addToTable("DOB", data.member?.dob);
    addToTable("Gender", data.member?.gender);
    addToTable("Card Serial Number", data.member?.cardSerialNumber);
    addToTable("Created At", data.member?.createdAt);
    addToTable("Updated At", data.member?.updatedAt);
    addToTable("Created By", data.member?.createdBy);
    addToTable("Updated By", data.member?.updatedBy);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: y,
    });

    let nextY = doc.lastAutoTable?.finalY + 15 || y + 15;

    // Children Information Table
    if (Array.isArray(data.child) && data.child.length > 0) {
      doc.setFontSize(14);
      doc.text("Children Information", 10, nextY);

      nextY += 8;

      const childTableColumn = [
        "#",
        "Full Name",
        "Guardian ZP",
        "Baptized",
        "Communicant",
        "Guardian Telephone",
      ];
      const childTableRows = [];

      data.child.forEach((child, index) => {
        childTableRows.push([
          index + 1,
          child.fullName || "-",
          child.guardianZpNumber || "-",
          child.baptized || "-",
          child.communicant || "-",
          child.guardianTelephone || "-",
        ]);
      });

      autoTable(doc, {
        head: [childTableColumn],
        body: childTableRows,
        startY: nextY,
      });
    }

    // Save PDF
    doc.save(`Member_${data.zpnumber}.pdf`);
  } catch (error) {
    console.error("Error loading images:", error);
  }
};



















      

  return (
   
    <div>
        <CCard>
            <CCardHeader>
            <CAlert color="primary" variant="solid" style={{ display: "flex", marginTop:"10px"}}>
            <CIcon icon={cilMagnifyingGlass} size="xxl"/>
              <h3>Member Information</h3>
              
            </CAlert>
            <CInputGroup className="mb-3">
                <CInputGroupText style={{ backgroundColor: "rgb(71, 71, 212)", color: "#fff" }}>
                      <CIcon icon={cilMagnifyingGlass} />
                </CInputGroupText>
                <CFormInput
                placeholder="Search by Zpnumber ( Enter 4 digit )"
                aria-label="Search by Zpnumber"
                aria-describedby="button-addon2"
                type="number"
                value={zpNumber}
                onChange={(e) => setZpNumber(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                />
                <CButton type="button" onClick={handleSearch} color="primary" style={{ backgroundColor: "rgb(71, 71, 212)", color: "#fff" }} variant="outline" id="button-addon2">
                 {loading ? <CSpinner size="sm" /> : "Search"}
                </CButton>
            </CInputGroup>
            </CCardHeader>
           <CCardBody>

           {error &&  
           <CAlert color="primary" className="d-flex align-items-center">
            <CIcon icon={cilInfo} className="flex-shrink-0 me-2" width={24} height={24} />
            <div>{error}</div>
           </CAlert> 
          }
        {data && (
          <>
          <div className="container mt-2">
          <CCard className="p-2" style={{border:"none"}} >
          <CCardHeader className="bg-primary text-white text-center">
            <CCardTitle className="h3 mb-0 mt-2">{data.fullName}</CCardTitle>
            <p>Member</p>
          </CCardHeader>

          <CCardBody>
          <CRow>
          <CListGroup flush className="mt-3">
          <CRow>
            <CCol md={6}>
            <CCard className="mb-3">
            <CCardBody>
            <CListGroup flush>
            {data.fullName && <CListGroupItem><strong>Full Name:</strong> {data.fullName}</CListGroupItem>}
            {data.name && <CListGroupItem><strong>Wife:</strong> {data.name}</CListGroupItem>}
            {data.mobileNumber && <CListGroupItem><strong>Mobile Number:</strong> {data.mobileNumber}</CListGroupItem>}
            {data.zpnumber && <CListGroupItem><strong>ZP Number:</strong> {data.zpnumber}</CListGroupItem>}
            {data.member.holyCommunionStatus && <CListGroupItem><strong>Holy Communion Status:</strong> {data.member.holyCommunionStatus}</CListGroupItem>}
            {data.member.maritalStatus && <CListGroupItem><strong>Marital Status :</strong> {data.member.maritalStatus}</CListGroupItem>}
            {data.member.district && <CListGroupItem><strong>District :</strong> {data.member.district}</CListGroupItem>}
            {data.member.nationalID && <CListGroupItem><strong>NationalID :</strong> {data.member.nationalID}</CListGroupItem>}
            {data.member.spouseName && <CListGroupItem><strong>Spouse Name:</strong> {data.member.spouseName}</CListGroupItem>} 
            {data.member.spouseZPNumber && <CListGroupItem><strong>SpouseZPNumber :</strong> {data.member.spouseZPNumber}</CListGroupItem>}
            {data.member.ePCNumber && <CListGroupItem><strong>EPC Number :</strong> {data.member.ePCNumber}</CListGroupItem>}
            </CListGroup>
            </CCardBody>
            </CCard>
            </CCol>
            <CCol md={6}>
            {
            //{data.member.disabled && <CListGroupItem><strong>disabled :</strong> {data.member.disabled}</CListGroupItem>}
            //{data.member.status && <CListGroupItem><strong>status :</strong> {data.member.status}</CListGroupItem>}
            }
            <CCard className="mb-3">
            <CCardBody>
            <CListGroup flush>
            {data.member.dob && <CListGroupItem><strong>Date of Birth :</strong> {data.member.dob}</CListGroupItem>}
            {data.member.gender && <CListGroupItem><strong>Gender :</strong> {data.member.gender}</CListGroupItem>}
            {data.member.cardSerialNumber && <CListGroupItem><strong>Card Serial Number :</strong> {data.member.cardSerialNumber}</CListGroupItem>}
            {data.member.createdAt && <CListGroupItem><strong>createdAt:</strong> {data.member.createdAt}</CListGroupItem>}
            {data.member.updatedAt && <CListGroupItem><strong>updatedAt :</strong> {data.member.updatedAt}</CListGroupItem>}
            {data.member.createdBy && <CListGroupItem><strong>createdBy :</strong> {data.member.createdBy}</CListGroupItem>}
            {data.member.updatedBy && <CListGroupItem><strong>updatedBy :</strong> {data.member.updatedBy}</CListGroupItem>}
            </CListGroup>
            </CCardBody>
            </CCard>
            </CCol>
          </CRow>
          <div className="mb-4"></div>
            {data.child && data.child.length > 0 && (
              <>
                <CAlert><strong>Children</strong>
                <div>Number of Children : {data.child.length}</div></CAlert>
                {data.child.map((child) => (
                <CCallout color="primary">
                    <CListGroup flush key={child.id}>
                    <CListGroupItem><strong>Name:</strong> {child.fullName} </CListGroupItem>
                    <CListGroupItem> <strong>Guardian ZP:</strong> {child.guardianZpNumber}</CListGroupItem>
                    <CListGroupItem> <strong>Baptized:</strong> {child.baptized} </CListGroupItem>
                    <CListGroupItem> <strong>Communicant:</strong> {child.communicant} </CListGroupItem>
                    <CListGroupItem>  {child.guardianTelephone && <><strong>Guardian Telephone:</strong> {child.guardianTelephone}</>}</CListGroupItem>
                    </CListGroup>
                  </CCallout> 
                ))}
              </>
            )}
          </CListGroup>
          </CRow>
          <CButton color="success" style={{color:"#fff"}} className="mt-3" onClick={handleDownloadPDF}>
                <CIcon icon={cilCloudDownload} className="me-2" /> Download Member PDF
          </CButton>
          </CCardBody>
          </CCard>
          </div>
          </>
        )}
           </CCardBody>
        </CCard>
    </div>
      )
      

}

export default MemberInformation