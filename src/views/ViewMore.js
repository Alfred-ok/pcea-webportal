

import React, { useRef } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CRow,
  CCol,
  CListGroup,
  CListGroupItem,
  CButton,
} from "@coreui/react";
import { FaEnvelope, FaPhone, FaLinkedin, FaGithub, FaAddressBook } from "react-icons/fa";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";
//import html2pdf from "html2pdf.js";
import logo1 from  "../assets/images/logo1.png" 


const ViewMore = ({viewMoreVisibleData}) => {
    console.log(viewMoreVisibleData);
    
    const base64Image = viewMoreVisibleData.passportPhoto; // Your Base64 string

    const divStyle = {
        width: "300px",
        height: "300px",
        backgroundImage: `url("data:image/jpeg;base64,${base64Image}")`,
        backgroundSize: "contain",
        marginTop:"8px",
        objectFit:"contain",
        overflow:"hidden"
    };

   

    const generatePDF = async () => {
        const doc = new jsPDF("p", "mm", "a4");
    
        // Constants for layout
        const marginY = 10;
        const pageWidth = doc.internal.pageSize.getWidth();
    
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
            // Load logo
            const logoBase64 = await getBase64(logo1);
    
           // 📌 Add Logo (Centered)
            const logoWidth = 30;
            const logoHeight = 30;
            const logoX = (pageWidth - logoWidth) / 2;
            let currentY = marginY; // Track Y position

            doc.addImage(logoBase64, "PNG", logoX, currentY, logoWidth, logoHeight);
            currentY += logoHeight + 10; // Space after logo

            // 📌 Title Below Logo
            doc.setFontSize(14);
            doc.setFont("helvetica", "bold");
            doc.text(
                "PCEA ZIMMERMAN MEMBER REPORT",
                pageWidth / 2,
                currentY,
                { align: "center" }
            );
            currentY += 5; // Space after title

            // 📌 Draw Separator Line
            doc.setLineWidth(0.5);
            doc.line(20, currentY, 190, currentY);
            

                    
           // 📌 Align Name on Top of Profile Image (Centered)
            doc.setFont("helvetica", "bold");
            doc.setFontSize(20);

            // Center Name
            const nameX = pageWidth / 2;
            const nameY = currentY + 10; // Adjust top margin
            doc.text(viewMoreVisibleData.fullName || "Member", nameX, nameY, { align: "center" });

           
            

            // Move down after placing profile image
            currentY = nameY + 5;

            // 📌 Draw Another Separator Line
            doc.setLineWidth(0.5);
            doc.line(20, currentY, 190, currentY);
            currentY += 10; // Space after line



    
            autoTable(doc, {
                startY: currentY + 5,
                head: [["Field", "Value"]],
                body: [
                    ["Email", viewMoreVisibleData.email || "-"],
                   // ["Phone", viewMoreVisibleData.telephone || "-"],
                  //  ["Address", viewMoreVisibleData.address || "-"],
                    ["District", viewMoreVisibleData.district || "-"],
                   // ["Guardian Phone", viewMoreVisibleData.guardianPhone || "-"],
                    
                   // ["Passport Photo", viewMoreVisibleData.passportPhoto || "-"],
                
                    ["Spouse Name", viewMoreVisibleData.spouseName || "-"],
                    ["Spouse ZP Number", viewMoreVisibleData.spouseZPNumber || "-"],
                    ["Marital Status", viewMoreVisibleData.maritalStatus || "-"],
                   // ["Marriage Type", viewMoreVisibleData.marriageType || "-"],
                   // ["Teenager", viewMoreVisibleData.teenager || "-"],
                
                    ["National ID", viewMoreVisibleData.nationalID || "-"],
                    ["Mobile Number", viewMoreVisibleData.mobileNumber || "-"],
                    ["ZP Number", viewMoreVisibleData.zPNumber || "-"],
                    ["Card Serial Number", viewMoreVisibleData.cardSerialNumber || "-"],
                  //  ["Baptized", viewMoreVisibleData.baptized || "-"],
                   // ["Baptized By", viewMoreVisibleData.baptizedBy || "-"],
                   // ["Comments", viewMoreVisibleData.comments || "-"],
                    
                   // ["Communicant", viewMoreVisibleData.communicant || "-"],
                   // ["Communicant Number", viewMoreVisibleData.communicantNumber || "-"],
                   // ["Confirmation Location", viewMoreVisibleData.confirmationLocation || "-"],
                  //  ["Confirmed By", viewMoreVisibleData.confirmedBy || "-"],
                   // ["Date Of Baptism", viewMoreVisibleData.dob || "-"],
                  //  ["Date Of Confirmation", viewMoreVisibleData.dateOfConfirmation || "-"],
                    
                    ["Disability Type", viewMoreVisibleData.disabilityType || "-"],
                    ["Disabled", viewMoreVisibleData.disabled || "-"],
                    ["ID", viewMoreVisibleData.id || "-"],
                    ["Holy Communion Status", viewMoreVisibleData.holyCommunionStatus || "-"],
                    
                   // ["Membership Type", viewMoreVisibleData.membershipType || "-"],
                    ["Gender", viewMoreVisibleData.gender || "-"],
                    ["Year Of Birth", viewMoreVisibleData.dob || "-"],
                   // ["Year Of Joining", viewMoreVisibleData.yearOfJoining || "-"],
                   // ["Zone", viewMoreVisibleData.zone || "-"],
                    ["EPC Number", viewMoreVisibleData.ePCNumber || "-"],
                ],
                theme: "grid",
                headStyles: { fillColor: [41, 128, 185], textColor: 255 },
                alternateRowStyles: { fillColor: [240, 240, 240] }
            });
    
            // Save PDF
            doc.save("CV.pdf");
    
        } catch (error) {
            console.error("Error loading images:", error);
        }
    };
    



  return (
    <div className="container mt-2">
      <CCard className="p-4 shadow-lg" >
        <CCardHeader className="bg-primary text-white text-center">
          <CCardTitle className="h3 mb-0">{viewMoreVisibleData.fullName}</CCardTitle>
          <p>Member</p>
        </CCardHeader>
        <CCardBody>
          <CRow>
            <CCol md={4}>
              <h5>Contact Information</h5>
              <CListGroup>
                {viewMoreVisibleData.email && <CListGroupItem><FaEnvelope /> Email: {viewMoreVisibleData.email}</CListGroupItem>}
                {viewMoreVisibleData.telephone && <CListGroupItem><FaPhone /> Telephone: {viewMoreVisibleData.telephone}</CListGroupItem>}
                {viewMoreVisibleData.address && <CListGroupItem><FaAddressBook /> Address: {viewMoreVisibleData.address}</CListGroupItem>}
                {viewMoreVisibleData.district && <CListGroupItem><FaAddressBook /> District: {viewMoreVisibleData.district}</CListGroupItem>}
                { viewMoreVisibleData.guardianPhone && <CListGroupItem><FaAddressBook /> Guardian Phone: {viewMoreVisibleData.guardianPhone}</CListGroupItem>}
                { viewMoreVisibleData.passportPhoto && 
               <CListGroupItem><FaAddressBook /> 
                     Passport :
                    <div style={divStyle}></div>
                </CListGroupItem>}
              </CListGroup>
            </CCol>
            <CCol md={8}>
              <h5>Family</h5>
              <CCard className="mb-3">
                <CCardBody>
                <CListGroup flush>
                  {viewMoreVisibleData.spouseName && <CListGroupItem><strong>Spouse Name :</strong> {viewMoreVisibleData.spouseName}</CListGroupItem>}
                  {viewMoreVisibleData.spouseZPNumber && <CListGroupItem><strong>Spouse ZpNumber :</strong> {viewMoreVisibleData.spouseZPNumber}</CListGroupItem>}
                  {viewMoreVisibleData.maritalStatus && <CListGroupItem><strong>Marital Status :</strong> {viewMoreVisibleData.maritalStatus}</CListGroupItem>}
                  {viewMoreVisibleData.marriageType && <CListGroupItem><strong>Marriage Type :</strong> {viewMoreVisibleData.marriageType}</CListGroupItem>}
                  {viewMoreVisibleData.teenager && <CListGroupItem><strong>Teenager :</strong> {viewMoreVisibleData.teenager}</CListGroupItem>}
                </CListGroup>
                </CCardBody>
              </CCard>
              <h5>Other Details</h5>
              <CCard className="mb-3">
                <CCardBody>
                <CListGroup flush>
                    {viewMoreVisibleData.nationalID && <CListGroupItem><strong>National ID</strong> {viewMoreVisibleData.nationalID}</CListGroupItem>}
                    {viewMoreVisibleData.mobileNumber && <CListGroupItem><strong>Mobile Number</strong> {viewMoreVisibleData.mobileNumber}</CListGroupItem>}
                    {viewMoreVisibleData.zPNumber && <CListGroupItem><strong>ZP Number</strong> {viewMoreVisibleData.zPNumber}</CListGroupItem>}
                    {viewMoreVisibleData.cardSerialNumber && <CListGroupItem><strong>Card Serial Number</strong> {viewMoreVisibleData.cardSerialNumber}</CListGroupItem>}
                    {viewMoreVisibleData.baptized && <CListGroupItem><strong>Baptised</strong> {viewMoreVisibleData.baptized}</CListGroupItem>}
                    {viewMoreVisibleData.baptizedBy && <CListGroupItem><strong>Baptised By:</strong> {viewMoreVisibleData.baptizedBy}</CListGroupItem>}
                    {viewMoreVisibleData.comments && <CListGroupItem><strong>Comments :</strong> {viewMoreVisibleData.comments}</CListGroupItem>}
                    {viewMoreVisibleData.communicant && <CListGroupItem><strong>Communicant :</strong> {viewMoreVisibleData.communicant}</CListGroupItem>}
                    {viewMoreVisibleData.communicantNumber && <CListGroupItem><strong>Communicant Number:</strong> {viewMoreVisibleData.communicantNumber}</CListGroupItem>} 
                    {viewMoreVisibleData.confirmationLocation && <CListGroupItem><strong>Location :</strong> {viewMoreVisibleData.confirmationLocation}</CListGroupItem>}
                    {viewMoreVisibleData.confirmedBy && <CListGroupItem><strong>Confirmed By :</strong> {viewMoreVisibleData.confirmedBy}</CListGroupItem>}
                    {viewMoreVisibleData.dob && <CListGroupItem><strong>Date Of Baptism :</strong> {viewMoreVisibleData.dob}</CListGroupItem>}
                    {viewMoreVisibleData.dateOfConfirmation && <CListGroupItem><strong>Date Of Confirmation :</strong> {viewMoreVisibleData.dateOfConfirmation}</CListGroupItem>}
                    {viewMoreVisibleData.disabilityType && <CListGroupItem><strong>Disability Type :</strong> {viewMoreVisibleData.disabilityType}</CListGroupItem>}
                    {viewMoreVisibleData.disabled && <CListGroupItem><strong>Disabled :</strong> {viewMoreVisibleData.disabled}</CListGroupItem>}
                    {viewMoreVisibleData.id && <CListGroupItem><strong>Id :</strong> {viewMoreVisibleData.id}</CListGroupItem>}
                    {viewMoreVisibleData.holyCommunionStatus && <CListGroupItem><strong>Holy Communion status :</strong> {viewMoreVisibleData.holyCommunionStatus}</CListGroupItem>}
                    
                    {viewMoreVisibleData.membershipType && <CListGroupItem><strong>Membership Type :</strong> {viewMoreVisibleData.membershipType}</CListGroupItem>}
                    {viewMoreVisibleData.gender && <CListGroupItem><strong>Gender :</strong> {viewMoreVisibleData.gender}</CListGroupItem>}
                   
                    
                    {viewMoreVisibleData.teenager && <CListGroupItem><strong>Teenager :</strong> {viewMoreVisibleData.teenager}</CListGroupItem>}
                    {viewMoreVisibleData.yearOfBirth && <CListGroupItem><strong>Year Of Birth :</strong> {viewMoreVisibleData.yearOfBirth}</CListGroupItem>}
                    {viewMoreVisibleData.yearOfJoining && <CListGroupItem><strong>Year Of Joining :</strong> {viewMoreVisibleData.yearOfJoining}</CListGroupItem>}
                    {viewMoreVisibleData.zone && <CListGroupItem><strong>Zone :</strong> {viewMoreVisibleData.zone}</CListGroupItem>}
                    {viewMoreVisibleData.ePCNumber && <CListGroupItem><strong>EPC Number :</strong> {viewMoreVisibleData.ePCNumber}</CListGroupItem>}
                </CListGroup> 
                </CCardBody>
              </CCard>
             
            </CCol>
          </CRow>
          <div className="text-center mt-4">
          <CButton color="primary" onClick={generatePDF} className="mt-3">Download CV</CButton>
          </div>
        </CCardBody>
      </CCard>
    </div>
  );
};

export default ViewMore;
