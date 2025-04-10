import React from "react";
import { MdAccountCircle, MdBadge, MdOutlineGroups2, MdWindow, MdGroupAdd, MdPersonAddAlt1, Md360, MdCorporateFare,MdChangeCircle,MdCookie,MdReceiptLong } from "react-icons/md";
import { IoMdPersonAdd } from "react-icons/io";
import { CNavGroup, CNavItem } from "@coreui/react";
import { MdAccessibility } from "react-icons/md";
import { MdHourglassEmpty, MdHourglassFull } from "react-icons/md";
import { FaHourglassHalf } from "react-icons/fa"


const roleId = localStorage.getItem("roleId");


const _nav = [

  {
    component: CNavGroup,
    name: <span style={{ fontWeight: "bold", fontSize: "18px" }}>Registration</span>,
    icon: <MdPersonAddAlt1 className="nav-icon" style={{ fontSize: "50px" }} />,
    items: [
      { component: CNavItem, name: <span>Member Registration</span>, roleId : "3" , to: "/RegistrationForm" },
      { component: CNavItem, name: <span>Teenagers</span>, roleId : "3" , to: "/Kids" },
     // { component: CNavItem, name: <span>Rejoining</span>, role:"AdminRole", roleId : "2", to: "/Rejoining" },
      //{ component: CNavItem, name: <span>Visitors</span>, roleId : "1" , to: "/visitors" },
      
    ],
    roleId : "3"
  },
  //{ component: CNavItem, name: <span style={{ fontWeight: "bold", fontSize: "18px" }}>Re-Admission</span>, to: "/Rejoining", icon: <MdChangeCircle className="nav-icon"/>,roleId: "1"},
  //{ component: CNavItem, name: <span style={{ fontWeight: "bold", fontSize: "18px" }}>Re-Admission</span>, to: "/Join", icon: <MdChangeCircle className="nav-icon"/>,roleId: "3"},
  //{ component: CNavItem, name: <span style={{ fontWeight: "bold", fontSize: "18px" }}>Re-Admission</span>, to: "/Join", icon: <MdChangeCircle className="nav-icon"/>,roleId: "2"},
  { component: CNavItem, name: <span style={{ fontWeight: "bold", fontSize: "18px" }}>Employees</span>, to: "/employees", icon: <MdBadge className="nav-icon"/>, roleId : "1" }, //admin
//  { component: CNavItem, name: <span style={{ fontWeight: "bold", fontSize: "18px" }}>Elders</span>, to: "/elders", icon: <MdOutlineGroups2 className="nav-icon" />, roleId : "1" },

//parish - adminrole


  { component: CNavItem, name: <span style={{ fontWeight: "bold", fontSize: "18px" }}>Messages</span>, to: "/messages", icon: <MdReceiptLong className="nav-icon" /> ,roleId : "1"},//Admin
 
  { component: CNavItem, name: <span style={{ fontWeight: "bold", fontSize: "18px" }}>Readmission</span>, to: "/Readmission", icon: <MdGroupAdd className="nav-icon" /> ,roleId : "3"},//evangelist

  { component: CNavItem, name: <span style={{ fontWeight: "bold", fontSize: "18px" }}>Pending Approval</span>, to: "/PendingApproval", icon: <MdReceiptLong className="nav-icon" />, roleId : "3" },
  { component: CNavItem, name: <span style={{ fontWeight: "bold", fontSize: "18px" }}>New Applicant</span>, to: "/members", icon: <MdGroupAdd className="nav-icon" /> ,roleId : "3"},//evangelist
  { component: CNavItem, name: <span style={{ fontWeight: "bold", fontSize: "18px" }}>Member Status</span>, to: "/status", icon: <MdCorporateFare className="nav-icon" />, role:"AdminRole", roleId : "2",roleId : "3" },

  { component: CNavItem, name: <span style={{ fontWeight: "bold", fontSize: "18px" }}>Holy Communion</span>, to: "/holycommunion", icon: <MdCookie className="nav-icon" />, roleId:"3", },//evangelist

  { component: CNavItem, name: <span style={{ fontWeight: "bold", fontSize: "18px" }}>Barred Communicants</span>, to: "/Barred", icon: <Md360 className="nav-icon"/>,role:"AdminRole", roleId:"1", roleId:"3" },

  { component: CNavItem, name: <span style={{ fontWeight: "bold", fontSize: "18px" }}>Member Transfer</span>, to: "/Transfer", icon: <Md360 className="nav-icon"/>,roleId : "3" }, //evangelist

  { component: CNavItem, name: <span style={{ fontWeight: "bold", fontSize: "18px" }}>Awaiting Confirmation</span>, to: "/awaitingConfirmation", icon: <FaHourglassHalf className="nav-icon" style={{ fontSize: "50px" }} />, roleId : "1", roleId:"2",}, //parish
  //{ component: CNavItem, name: <span style={{ fontWeight: "bold", fontSize: "18px" }}>Awaiting Confirmation</span>, to: "/newMembers", icon: <FaHourglassHalf className="nav-icon" style={{ fontSize: "50px" }} />, roleId : "1", roleId:"2",}, //parish

  { component: CNavItem, name: <span style={{ fontWeight: "bold", fontSize: "18px" }}>Member Transfer</span>, to: "/parish", icon: <Md360 className="nav-icon"/>,roleId : "2" }, //parish

  { component: CNavItem, name: <span style={{ fontWeight: "bold", fontSize: "18px" }}>Reports</span>, to: "/reports", icon: <MdReceiptLong className="nav-icon" />, role:"AdminRole", roleId : "2",roleId : "3" },
  
  { component: CNavItem, name: <span style={{ fontWeight: "bold", fontSize: "18px" }}>Member Service</span>, to: "/ServiceRequest", icon: <MdReceiptLong className="nav-icon" />, roleId:"3" }, //evangelist     member service
  { component: CNavItem, name: <span style={{ fontWeight: "bold", fontSize: "18px" }}>Member Service</span>, to: "/ServiceRequest", icon: <MdReceiptLong className="nav-icon" />,roleId : "2" }, //parish     member service
  { component: CNavItem, name: <span style={{ fontWeight: "bold", fontSize: "18px" }}>Member Feedback</span>, to: "/MemberFeedBack", icon: <MdReceiptLong className="nav-icon" />,role:"AdminRole",  roleId : "1" , roleId:"3"},

  { component: CNavItem, name: <span style={{ fontWeight: "bold", fontSize: "18px" }}>Death Notification</span>, to: "/DeathNotification", icon: <MdReceiptLong className="nav-icon" />,  roleId : "2" },
  { component: CNavItem, name: <span style={{ fontWeight: "bold", fontSize: "18px" }}>Attendance</span>, to: "/Attendance", icon: <MdReceiptLong className="nav-icon" />,  roleId : "1" }, //admin

  { component: CNavItem, name: <span style={{ fontWeight: "bold", fontSize: "18px" }}>Member Information</span>, to: "/MemberInformation", icon: <MdReceiptLong className="nav-icon" />, role:"AdminRole" },
  { component: CNavItem, name: <span style={{ fontWeight: "bold", fontSize: "18px" }}>Add Member</span>, to: "/AddMember", icon: <MdReceiptLong className="nav-icon" />, roleId : "1" },
  { component: CNavItem, name: <span style={{ fontWeight: "bold", fontSize: "18px" }}>Add Member</span>, to: "/AddMember", icon: <MdReceiptLong className="nav-icon" />, roleId : "3" },

  { component: CNavItem, name: <span style={{ fontWeight: "bold", fontSize: "18px" }}>Officiating Minister</span>, to: "/Minister", icon: <MdReceiptLong className="nav-icon" />, roleId : "2" },
  { component: CNavItem, name: <span style={{ fontWeight: "bold", fontSize: "18px" }}>Appointments</span>, to: "/Appointments", icon: <MdReceiptLong className="nav-icon" />, roleId : "2" },
  
  { component: CNavItem, name: <span style={{ fontWeight: "bold", fontSize: "18px" }}>ScheduleMeeting</span>, to: "/ScheduleMeeting", icon: <MdReceiptLong className="nav-icon" />, roleId : "2" },
  
  { component: CNavItem, name: <span style={{ fontWeight: "bold", fontSize: "18px" }}>CardNumber Update</span>, to: "/CardNumberUpdate", icon: <MdReceiptLong className="nav-icon" />, roleId : "1" },

  { component: CNavItem, name: <span style={{ fontWeight: "bold", fontSize: "18px" }}>Appointment</span>, to: "/EvangelistAppointment", icon: <MdReceiptLong className="nav-icon" />, roleId : "3" },

  { component: CNavItem, name: <span style={{ fontWeight: "bold", fontSize: "18px" }}>All Member</span>, to: "/Allmember", icon: <MdReceiptLong className="nav-icon" />, roleId : "3" },
  { component: CNavItem, name: <span style={{ fontWeight: "bold", fontSize: "18px" }}>All Member</span>, to: "/Allmember", icon: <MdReceiptLong className="nav-icon" />, roleId : "1" },

  
  

  
];


//const _nav = roleId === "1" ? allNavItems : allNavItems.filter(item => item.to === "/reports");

export default _nav;
