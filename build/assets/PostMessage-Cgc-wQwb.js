import{r as a,o as S,j as e}from"./index--2Vg46XJ.js";import{a as v}from"./index.esm-CI-HiMCL.js";import{C as y,a as f,b as M}from"./CForm-uSoNT2u_.js";import{C as h}from"./CCardTitle-Bhw-tENH.js";import{a as g}from"./CFormInput-DcpM5UbD.js";import{c as b}from"./cil-arrow-thick-left-CYRoSyxD.js";import{C as o}from"./CAlert-CwhgRHPq.js";import{C as T}from"./CFormTextarea-CBhWhc4W.js";import{a as w}from"./index-Bp6JkL8A.js";import"./CCloseButton-CvX7nGj0.js";const q=()=>{const[t,n]=a.useState(""),[i,l]=a.useState(""),[c,m]=a.useState(null),[d,p]=a.useState(null),u=S(),x=async s=>{s.preventDefault(),m(null),p(null);const j={Message:t,MessagesType:i};try{const r=await fetch("http://192.168.13.244:8594/api/registrations/PostMessages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(j)});if(!r.ok)throw new Error("Failed to send message");const C=await r.json();m("Message sent successfully!"),n(""),l(""),console.log(C),u("/messages")}catch(r){p(r.message)}};return e.jsx("div",{className:"p-4",children:e.jsx(y,{className:"mb-4",children:e.jsxs(f,{children:[e.jsx(h,{className:"mb-3",children:e.jsxs(g,{onClick:()=>u(-1),color:"primary",variant:"outline",children:[e.jsx(v,{icon:b,style:{marginRight:"6px"}}),"Back"]})}),e.jsx(h,{children:e.jsx(o,{color:"primary",variant:"solid",children:e.jsx("h3",{children:"Send a Message"})})}),c&&e.jsx(o,{color:"success",children:c}),d&&e.jsx(o,{color:"danger",children:d}),e.jsxs(M,{onSubmit:x,children:[e.jsx(T,{rows:3,label:"Message",placeholder:"Enter your message",value:t,onChange:s=>n(s.target.value),required:!0}),e.jsxs(w,{label:"Message Type",value:i,onChange:s=>l(s.target.value),children:[e.jsx("option",{value:"Special Service",children:"Special Service"}),e.jsx("option",{value:"Holy Communion",children:"Holy Communion"}),e.jsx("option",{value:"First Service",children:"First Service"}),e.jsx("option",{value:"Second Service",children:"Second Service"})]}),e.jsx(g,{type:"submit",color:"primary",className:"mt-3",children:"Send Message"})]})]})})})};export{q as default};
