import{r as t,o as H,j as e}from"./index--2Vg46XJ.js";import{c as I,a as R}from"./index-Bp6JkL8A.js";import{S as y}from"./sweetalert2.all-BHDornT5.js";import{C as w,a as D}from"./CForm-uSoNT2u_.js";import{C as B}from"./CCardTitle-Bhw-tENH.js";import{C as O}from"./CAlert-CwhgRHPq.js";import{a as o,b as z}from"./CFormInput-DcpM5UbD.js";import{o as A,p as L,q as S,r as c,s as U,t as d,l as $,m as g}from"./DefaultLayout-JRVaWF0p.js";import{b as q,c as J,d as _,e as G}from"./logo1-B-TheImU.js";import{C as K}from"./CModalTitle-Bc9MZI4H.js";import"./CCloseButton-CvX7nGj0.js";import"./index.esm-CI-HiMCL.js";import"./cil-user-Ddrdy7PS.js";const ne=()=>{const[h,f]=t.useState([]),[r,p]=t.useState(1),[i,b]=t.useState(10),[x,M]=t.useState("specialservice"),[T,l]=t.useState(!1),[a,m]=t.useState(null),[j,F]=t.useState(!0),N=H();t.useEffect(()=>{fetch(`http://192.168.13.244:8594/api/registrations/getmessages?MessageType=${x}`).then(s=>s.json()).then(s=>f(s)).catch(s=>console.error("Error fetching data:",s))},[x,j]),console.log(h);const E=s=>{m(s),l(!0)},P=()=>{a&&fetch("http://192.168.13.244:8594/api/registrations/UpdateMessages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({Id:a.id,Messages:a.messages,MessagesType:a.messageType})}).then(s=>s.json()).then(s=>{s.statusDescription=y.fire({icon:"success",title:s.statusDescription,text:"Message updated successfully!"}),l(!1),console.log(s),F(!j)}).catch(s=>{y.fire({icon:"error",title:"Error",text:"Failed to update message."}),console.error("Error updating message:",s)})};console.log(a);const u=r*i,k=u-i,v=h.slice(k,u),C=Math.ceil(h.length/i);return e.jsx("div",{className:"p-4",children:e.jsx(w,{className:"mb-4",children:e.jsxs(D,{children:[e.jsx(B,{children:e.jsx(O,{color:"primary",variant:"solid",children:e.jsxs("div",{style:{display:"flex",justifyContent:"space-between"},children:[e.jsxs("div",{style:{display:"flex"},children:[e.jsx(I,{className:"nav-icon",size:40}),e.jsx("h3",{style:{marginLeft:"10px"},children:"Messages"})]}),e.jsx("div",{children:e.jsx(o,{color:"light",variant:"outline",onClick:()=>N("/postmessages"),children:"Send Messages"})})]})})}),e.jsxs("div",{className:"d-flex justify-content-between align-items-center mt-3 mb-3",children:[e.jsxs("div",{children:[e.jsx("label",{style:{marginRight:"10px"},children:"Filter by MessageType:"}),e.jsxs("select",{style:{padding:"2px"},value:x,onChange:s=>M(s.target.value),children:[e.jsx("option",{value:"Special Service",children:"Special Service"}),e.jsx("option",{value:"Holy Communion",children:"Holy Communion"}),e.jsx("option",{value:"First Service",children:"First Service"}),e.jsx("option",{value:"Second Service",children:"Second Service"})]})]}),e.jsxs("div",{children:[e.jsx("label",{style:{marginRight:"10px"},children:"Items per page: "}),e.jsxs("select",{style:{padding:"2px"},value:i,onChange:s=>b(Number(s.target.value)),children:[e.jsx("option",{value:"5",children:"5"}),e.jsx("option",{value:"10",children:"10"}),e.jsx("option",{value:"20",children:"20"}),e.jsx("option",{value:"50",children:"50"})]})]})]}),e.jsxs(A,{striped:!0,bordered:!0,hover:!0,children:[e.jsx(L,{children:e.jsxs(S,{color:"primary",children:[e.jsx(c,{children:"Message ID"}),e.jsx(c,{children:"MessageType"}),e.jsx(c,{children:"Messages"}),e.jsx(c,{children:"Action"})]})}),e.jsx(U,{children:v&&v.map(s=>e.jsxs(S,{className:"text-center border",children:[e.jsx(d,{children:s.id}),e.jsx(d,{children:s.messageType}),e.jsx(d,{children:s.messages}),e.jsx(d,{children:e.jsx(o,{color:"primary",onClick:()=>E(s),children:"Edit"})})]},s.id))})]}),e.jsxs($,{align:"center",className:"mt-3",children:[e.jsx(g,{disabled:r===1,onClick:()=>p(r-1),children:"Previous"}),Array.from({length:C},(s,n)=>e.jsx(g,{active:n+1===r,onClick:()=>p(n+1),children:n+1},n+1)),e.jsx(g,{disabled:r===C,onClick:()=>p(r+1),children:"Next"})]}),e.jsxs(q,{visible:T,onClose:()=>l(!1),children:[e.jsx(J,{children:e.jsx(K,{children:"Edit Message"})}),e.jsxs(_,{children:[e.jsx(z,{label:"Message",value:(a==null?void 0:a.messages)||"",onChange:s=>m({...a,messages:s.target.value})}),e.jsxs(R,{label:"Message Type",value:(a==null?void 0:a.messageType)||"",onChange:s=>m({...a,messageType:s.target.value}),children:[e.jsx("option",{value:"Special Service",children:"Special Service"}),e.jsx("option",{value:"Holy Communion",children:"Holy Communion"}),e.jsx("option",{value:"First Service",children:"First Service"}),e.jsx("option",{value:"Second Service",children:"Second Service"})]})]}),e.jsxs(G,{children:[e.jsx(o,{color:"secondary",onClick:()=>l(!1),children:"Cancel"}),e.jsx(o,{color:"primary",onClick:P,children:"Update"})]})]})]})})})};export{ne as default};
