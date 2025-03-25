import{r as c,j as e,C as A}from"./index--2Vg46XJ.js";import{S as x}from"./sweetalert2.all-BHDornT5.js";import{D as v}from"./Districtdata-DjCRdM62.js";import{Z as B}from"./Zones-CmHuVysO.js";import{C as E,M as W,a as p}from"./index-Bp6JkL8A.js";import{C as Z,a as H,b as q}from"./CForm-uSoNT2u_.js";import{C as J}from"./CAlert-CwhgRHPq.js";import{C as o,a as d}from"./CRow-BUZD3U73.js";import{c as m,b as N,a as S}from"./CFormInput-DcpM5UbD.js";import{C as $,a as G}from"./CInputGroupText-Bft_3Juj.js";import{C as V}from"./CFormCheck-DFANe7fa.js";import"./CCloseButton-CvX7nGj0.js";const le=()=>{const[F,z]=c.useState([]),[D,O]=c.useState(""),[h,I]=c.useState(""),[Y,j]=c.useState(!1),[l,f]=c.useState({telephone:"",disabled:"",disabilityType:"",spouseZP:"",names:"",email:"",gender:"",maritalStatus:"",marriageType:"",spouseName:"",membershipType:"Full",baptized:"",dateOfBaptism:"",baptizedBy:"",communicant:"",communicantNumber:"",dateOfConfirmation:"",confirmedBy:"",confirmationLocation:"",yearOfJoining:"",district:D,zone:h,address:"",teenager:"",guardianPhone:null,passportPhoto:null,transferLetter:null,communionForm:null,addChild:!1,children:[]});c.useState([]);const[T,k]=c.useState([]),[b,y]=c.useState([{name:"",age:"",baptized:"No",confirmed:"No"}]);c.useEffect(()=>{(()=>{const s=new Date().getFullYear(),i=Array.from({length:s-1899},(a,r)=>1900+r);k(i)})()},[]);const L=t=>{const s=t.target.value;O(s),f(a=>({...a,district:s}));const i=v.find(a=>a.district===s);if(i){const a=B.find(u=>u.zoneId===i.zoneId),r=a?a.zone:"";I(r),f(u=>({...u,zone:r}))}else I(""),f(a=>({...a,zone:""}))};c.useEffect(()=>{if(h){const t=B.find(i=>i.zone===h),s=t?t.zoneId:null;if(s){const i=v.filter(a=>a.zoneId===s);z(i)}else z([])}else z(v)},[h]),console.log(h),console.log(l.district),console.log(D),console.log(h);const C=({target:{name:t,value:s,type:i,checked:a}})=>{f(r=>({...r,[t]:i==="checkbox"?a:s}))},M=({target:{name:t,files:s}})=>{const i=s[0];if(i){const a=new FileReader;a.readAsDataURL(i),a.onload=()=>{const r=a.result.split(",")[1];console.log(`Base64 for ${t}:`,r),f(u=>({...u,[t]:r}))},a.onerror=r=>{console.error("Error converting file to Base64:",r),x.fire("Error","Failed to process file. Please try again.","error")}}},g=(t,s,i)=>{const a=[...b];a[t][s]=i,y(a)},P=()=>y([...b,{name:"",age:"",baptized:"No",confirmed:"No",disabled:"",disabilityType:""}]),w=t=>y(b.filter((s,i)=>i!==t)),R=async t=>{t.preventDefault();const s=localStorage.getItem("token");if(!s){x.fire("Error","User is not authenticated. Please log in.","error");return}const i={...l,telephone:`+254${l.telephone}`,communicantNumber:l.communicantNumber?parseInt(l.communicantNumber,10):null,children:l.addChild?b:[]};console.log("Submitting Data:",JSON.stringify(i,null,2)),j(!0);try{const a=await fetch("http://192.168.13.244:8594/api/registrations",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${s}`},body:JSON.stringify(i)});if(console.log(a),a.ok)x.fire("Success!","Registration data submitted successfully.","success"),f({fullName:"",disabled:"",disabilityType:"",spouseZP:"",email:"",telephone:"",yearOfBirth:"",district:"",zone:"",maritalStatus:"",marriageType:"",holyCommunion:"",communicant:"",gender:"",spouseName:"",dateOfBaptism:"",baptizedBy:"",communicantNumber:"",dateOfConfirmation:"",confirmedBy:"",confirmationLocation:"",yearOfJoining:"",address:"",passportPhoto:null,membershipType:"Full",transferLetter:null,communionForm:null,addChild:!1,children:[]}),y([{name:"",age:"",baptized:"",confirmed:"",disabled:"",disabilityType:""}]),j(!1);else{const r=await a.json();j(!1),x.fire("Error",r.message||"Failed to submit registration data.","error")}}catch(a){console.error("Error submitting registration:",a),x.fire("Error","Failed to submit registration data. Please try again.","error"),j(!1)}},n=(t,s,i="text",a)=>e.jsxs(d,{md:"6",children:[e.jsx(m,{style:{fontWeight:"bold",color:"blue"},children:t}),i==="select"&&(a||!0)?e.jsxs(p,{name:s,value:l[s],onChange:C,children:[e.jsxs("option",{value:"",children:["Select ",t]}),(a||F).map((r,u)=>e.jsx("option",{value:r.district||r.zoneName||r.districtName||r,children:r.district||r.zoneName||r.districtName||r},u))]}):e.jsx(N,{name:s,type:i,value:i!=="file"?l[s]:void 0,onChange:i==="file"?M:C,required:i!=="file"})]});return e.jsxs(Z,{className:"mb-4",style:{boxShadow:"0 4px 8px rgba(0, 0, 0, 0.2)"},children:[e.jsx(E,{className:"mt-2",children:e.jsxs(J,{color:"primary",variant:"solid",style:{display:"flex",alignItems:"center"},children:[e.jsx(W,{style:{marginRight:"8px",fontSize:"40"}}),e.jsx("h3",{className:"fw-bold",style:{color:"#fff"},children:"Member Registration"})]})}),e.jsx(H,{children:e.jsxs(q,{onSubmit:R,children:[e.jsxs(o,{children:[n("*Full Name","names"),n("*Gender","gender","select",["Male","Female"]),n("*Email","email")]}),e.jsxs(o,{children:[e.jsxs(d,{md:"6",children:[e.jsx(m,{style:{color:"blue",fontWeight:700},children:"*Telephone"}),e.jsxs($,{children:[e.jsx(G,{children:"+254"}),e.jsx(N,{name:"telephone",type:"text",value:l.telephone,onChange:C,maxLength:"9",required:!0})]})]}),n("*Year of Birth","yearOfBirth","select",T)]}),e.jsxs(o,{children:[e.jsxs(d,{md:"6",children:[e.jsx(m,{style:{color:"blue",fontWeight:"bold"},children:"* District:"}),e.jsxs(p,{value:D,onChange:L,children:[e.jsx("option",{value:"",children:"Select District"}),v.map(t=>e.jsx("option",{value:t.district,children:t.district},t.id))]})]}),e.jsxs(d,{md:"6",children:[e.jsx(m,{style:{fontWeight:"bold",color:"blue"},children:"* Zone"}),e.jsx(N,{type:"text",value:h,readOnly:!0})]})]}),e.jsxs(o,{children:[n("*Marital Status","maritalStatus","select",["Married","Single","Widow","Widower","Divorced"]),l.maritalStatus==="Married"&&e.jsxs(e.Fragment,{children:[n("Marriage Type","marriageType","select",["Christian","Customary","Civil","Others"]),n("Spouse Name","spouseName"),n("Spouse ZP","spouseZP")]})]}),e.jsxs(o,{children:[n("*Membership Type","membershipType","select",["New","Adherent","Transfer"]),n("*Baptized?","baptized","select",["Yes","No"]),l.baptized==="Yes"&&n("Communicant?","communicant","select",["Yes","No"])]}),l.baptized==="Yes"&&e.jsx(o,{children:[{label:"Date of Baptism",key:"dateOfBaptism"},{label:"Baptized By",key:"baptizedBy"}].map(({label:t,key:s})=>n(t,s))}),l.communicant==="Yes"&&e.jsx(o,{children:[{label:"Communicant Number",key:"communicantNumber"},{label:"Date of Confirmation",key:"dateOfConfirmation"},{label:"Confirmed By",key:"confirmedBy"},{label:"Confirmation Location",key:"confirmationLocation"}].map(({label:t,key:s})=>n(t,s))}),e.jsxs(o,{children:[n("*Year of Joining","yearOfJoining"),n("*Address","address")]}),e.jsxs(o,{children:[n("*Disabled","disabled","select",["Yes","No"]),l.disabled==="Yes"&&e.jsx(e.Fragment,{children:n("Disability Type","disabilityType","select",["Intellectual Disability","Mental Health","Chronic Illness","Learning Disability","Mobility Impairment","Hearing Impairment","Visual Impairment","Others"])})]}),e.jsx(o,{children:[{label:"Passport Photo",key:"passportPhoto"},{label:"Transfer Letter",key:"transferLetter"},{label:"Communion Form",key:"communionForm"}].map(({label:t,key:s})=>n(t,s,"file"))}),e.jsx(o,{children:e.jsx(d,{md:"6",children:e.jsx(V,{id:"addChildCheck",label:e.jsx("span",{style:{fontWeight:"bold",color:"green"},children:"Have a child?"}),name:"addChild",checked:l.addChild,onChange:C})})}),l.addChild&&b.map((t,s)=>e.jsxs("div",{className:"mb-3",children:[e.jsxs(o,{children:[e.jsxs(d,{md:"4",children:[e.jsx(m,{children:"Child Name"}),e.jsx(N,{value:t.name,onChange:i=>g(s,"name",i.target.value),required:!0})]}),e.jsxs(d,{md:"2",children:[e.jsx(m,{children:"DOB"}),e.jsxs(p,{value:t.age,onChange:i=>g(s,"age",i.target.value),required:!0,children:[e.jsx("option",{value:"",children:"Select Year"}),Array.from({length:new Date().getFullYear()-2004},(i,a)=>e.jsx("option",{value:2005+a,children:2005+a},a))]})]}),e.jsxs(d,{md:"3",children:[e.jsx(m,{children:"Baptized"}),e.jsxs(p,{value:t.baptized,onChange:i=>g(s,"baptized",i.target.value),children:[e.jsx("option",{value:"Yes",children:"Yes"}),e.jsx("option",{value:"No",children:"No"})]})]}),t.baptized==="Yes"&&e.jsxs(d,{md:"3",children:[e.jsx(m,{children:"Confirmed"}),e.jsxs(p,{value:t.confirmed,onChange:i=>g(s,"confirmed",i.target.value),children:[e.jsx("option",{value:"Yes",children:"Yes"}),e.jsx("option",{value:"No",children:"No"})]})]}),e.jsxs(o,{children:[e.jsxs(d,{md:"3",children:[e.jsx(m,{children:"Disabled"}),e.jsxs(p,{value:t.disabled,onChange:i=>g(s,"disabled",i.target.value),required:!0,children:[e.jsx("option",{value:"",children:"Select"}),e.jsx("option",{value:"Yes",children:"Yes"}),e.jsx("option",{value:"No",children:"No"})]})]}),t.disabled==="Yes"&&e.jsxs(d,{md:"3",children:[e.jsx(m,{children:"Disability Type"}),e.jsxs(p,{value:t.disabilityType,onChange:i=>g(s,"disabilityType",i.target.value),required:t.disabled==="Yes",children:[e.jsx("option",{value:"",children:"Select"}),e.jsx("option",{value:"Intellectual Disability",children:"Intellectual Disability"}),e.jsx("option",{value:"Mental Health",children:"Mental Health"}),e.jsx("option",{value:"Chronic Illness",children:"Chronic Illness"}),e.jsx("option",{value:"Learning Disability",children:"Learning Disability"}),e.jsx("option",{value:"Mobility Impairment",children:"Mobility Impairment"}),e.jsx("option",{value:"Hearing Impairment",children:"Hearing Impairment"}),e.jsx("option",{value:"Visual Impairment",children:"Visual Impairment"}),e.jsx("option",{value:"Others",children:"Others"})]})]})]})]}),e.jsx(S,{style:{color:"white",fontWeight:"bold"},color:"success",className:"mt-2",onClick:()=>w(s),children:"Remove"})]},s)),l.addChild&&e.jsx(S,{color:"primary",onClick:P,children:"Add Another Child"}),e.jsx("div",{className:"mt-4",children:Y?e.jsxs(S,{color:"primary",disabled:!0,style:{fontWeight:"bold"},children:[e.jsx(A,{as:"span",className:"me-2",size:"sm","aria-hidden":"true"}),e.jsx("span",{children:"Register..."})]}):e.jsx(S,{style:{fontWeight:"bold"},color:"primary",type:"submit",children:"Register"})})]})})]})};export{le as default};
