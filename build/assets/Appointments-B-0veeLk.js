import{r as a,y as C,o as f,j as e}from"./index--2Vg46XJ.js";import{C as y,a as g}from"./CForm-uSoNT2u_.js";import{C as A}from"./index-Bp6JkL8A.js";import{C as b}from"./CAlert-CwhgRHPq.js";import{o as N,p as T,q as c,r,s as w,t}from"./DefaultLayout-JRVaWF0p.js";import{a as S}from"./CFormInput-DcpM5UbD.js";import"./CCloseButton-CvX7nGj0.js";import"./index.esm-CI-HiMCL.js";import"./cil-user-Ddrdy7PS.js";import"./logo1-B-TheImU.js";const z=()=>{const[o,d]=a.useState([]),[l,p]=a.useState(!0),[n,h]=a.useState(""),{setSelectedAppointments:m,selectedAppointments:x}=C(),j=f();return a.useEffect(()=>{(async()=>{try{const i=await fetch("http://192.168.13.244:8594/api/registrations/GetAppointmentsbydepartment?department=Parish Office");if(!i.ok)throw new Error("Failed to fetch appointments");const u=await i.json();d(u)}catch(i){h(i.message)}p(!1)})()},[]),console.log(o),console.log(x),e.jsxs(y,{className:"max-w-4xl mx-auto shadow-lg",children:[e.jsx(A,{children:e.jsx(b,{color:"primary",variant:"solid",children:e.jsx("div",{style:{display:"flex"},children:e.jsx("h3",{style:{marginLeft:"10px"},children:"Appointments"})})})}),e.jsxs(g,{children:[l&&e.jsx("p",{children:"Loading..."}),n&&e.jsx("p",{className:"text-red-500",children:n}),!l&&!n&&e.jsxs(N,{striped:!0,hover:!0,responsive:!0,children:[e.jsx(T,{color:"primary",children:e.jsxs(c,{children:[e.jsx(r,{children:"ID"}),e.jsx(r,{children:"Name"}),e.jsx(r,{children:"ZP Number"}),e.jsx(r,{children:"Department"}),e.jsx(r,{children:"Appointment Type"}),e.jsx(r,{children:"Notes"}),e.jsx(r,{children:"Action"})]})}),e.jsx(w,{children:o.map(s=>e.jsxs(c,{children:[e.jsx(t,{children:s.id}),e.jsx(t,{children:s.ministerName}),e.jsx(t,{children:s.zpNumber}),e.jsx(t,{children:s.department}),e.jsx(t,{children:s.appointmentType}),e.jsx(t,{children:s.notes}),e.jsx(t,{children:e.jsx(S,{color:"primary",onClick:()=>{m(s),j("/ScheduleMeeting")},children:"Schedule meeting"})})]},s.id))})]})]})]})};export{z as default};
