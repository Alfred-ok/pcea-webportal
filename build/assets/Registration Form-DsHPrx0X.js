import{r as d,j as e,C as W}from"./index-C94lwiJv.js";import{S as x}from"./sweetalert2.all-huutmort.js";import{D as N}from"./Districtdata-DjCRdM62.js";import{Z as F}from"./Zones-CmHuVysO.js";import{C as Z,M as H,a as p}from"./index-CynBYxOh.js";import{C as q,a as J,b as $}from"./CForm-By0H7RBh.js";import{C as G}from"./CAlert-h_oXZGtT.js";import{C as o,a as c}from"./CRow-Bgj36awN.js";import{c as m,b as j,a as S}from"./CFormInput-ChrqK6Lh.js";import{C as V,a as _}from"./CInputGroupText-Cjvru9WV.js";import{C as U}from"./CFormCheck-CrqSB_FR.js";import"./CCloseButton-fePu8NsK.js";const de=()=>{const[O,z]=d.useState([]),[I,Y]=d.useState(""),[b,B]=d.useState(""),[D,T]=d.useState(""),[k,y]=d.useState(!1),[n,h]=d.useState({telephone:"",disabled:"",disabilityType:"",spouseZP:"",names:"",email:"",gender:"",maritalStatus:"",marriageType:"",spouseName:"",membershipType:"Full",baptized:"",dateOfBaptism:"",baptizedBy:"",communicant:"",communicantNumber:"",dateOfConfirmation:"",confirmedBy:"",confirmationLocation:"",yearOfJoining:"",district:I,zone:b,address:"",teenager:"",guardianPhone:null,passportPhoto:null,transferLetter:null,communionForm:null,addChild:!1,children:[]});d.useState([]);const[L,M]=d.useState([]),[g,C]=d.useState([{name:"",age:"",baptized:"No",confirmed:"No"}]);d.useEffect(()=>{(()=>{const s=new Date().getFullYear(),i=Array.from({length:s-1899},(a,r)=>1900+r);M(i)})()},[]);const P=t=>{const s=t.target.value;Y(s),h(a=>({...a,district:s}));const i=N.find(a=>a.district===s);if(i){const a=F.find(u=>u.zoneId===i.zoneId),r=a?a.zone:"";B(r),h(u=>({...u,zone:r}))}else B(""),h(a=>({...a,zone:""}))};d.useEffect(()=>{if(b){const t=F.find(i=>i.zone===b),s=t?t.zoneId:null;if(s){const i=N.filter(a=>a.zoneId===s);z(i)}else z([])}else z(N)},[b]),d.useEffect(()=>{h(t=>({...t,spouseZP:D}))},[D]),console.log(n);const v=({target:{name:t,value:s,type:i,checked:a}})=>{h(r=>({...r,[t]:i==="checkbox"?a:s}))},w=({target:{name:t,files:s}})=>{const i=s[0];if(i){const a=new FileReader;a.readAsDataURL(i),a.onload=()=>{const r=a.result.split(",")[1];console.log(`Base64 for ${t}:`,r),h(u=>({...u,[t]:r}))},a.onerror=r=>{console.error("Error converting file to Base64:",r),x.fire("Error","Failed to process file. Please try again.","error")}}},f=(t,s,i)=>{const a=[...g];a[t][s]=i,C(a)},E=()=>C([...g,{name:"",age:"",baptized:"No",confirmed:"No",disabled:"",disabilityType:""}]),R=t=>C(g.filter((s,i)=>i!==t)),A=async t=>{t.preventDefault();const s=localStorage.getItem("token");if(!s){x.fire("Error","User is not authenticated. Please log in.","error");return}const i={...n,telephone:`+254${n.telephone}`,communicantNumber:n.communicantNumber?parseInt(n.communicantNumber,10):null,children:n.addChild?g:[]};console.log("Submitting Data:",JSON.stringify(i,null,2)),y(!0);try{const a=await fetch("http://192.168.12.245:8594/api/registrations",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${s}`},body:JSON.stringify(i)});if(console.log(a),a.ok)x.fire("Success!","Registration data submitted successfully.","success"),h({fullName:"",disabled:"",disabilityType:"",spouseZP:"",email:"",telephone:"",yearOfBirth:"",district:"",zone:"",maritalStatus:"",marriageType:"",holyCommunion:"",communicant:"",gender:"",spouseName:"",dateOfBaptism:"",baptizedBy:"",communicantNumber:"",dateOfConfirmation:"",confirmedBy:"",confirmationLocation:"",yearOfJoining:"",address:"",passportPhoto:null,membershipType:"Full",transferLetter:null,communionForm:null,addChild:!1,children:[]}),C([{name:"",age:"",baptized:"",confirmed:"",disabled:"",disabilityType:""}]),y(!1);else{const r=await a.json();y(!1),x.fire("Error",r.message||"Failed to submit registration data.","error")}}catch(a){console.error("Error submitting registration:",a),x.fire("Error","Failed to submit registration data. Please try again.","error"),y(!1)}},l=(t,s,i="text",a)=>e.jsxs(c,{md:"6",children:[e.jsx(m,{style:{fontWeight:"bold",color:"blue"},children:t}),i==="select"&&(a||!0)?e.jsxs(p,{name:s,value:n[s],onChange:v,children:[e.jsxs("option",{value:"",children:["Select ",t]}),(a||O).map((r,u)=>e.jsx("option",{value:r.district||r.zoneName||r.districtName||r,children:r.district||r.zoneName||r.districtName||r},u))]}):e.jsx(j,{name:s,type:i,value:i!=="file"?n[s]:void 0,onChange:i==="file"?w:v,required:i!=="file"})]});return e.jsxs(q,{className:"mb-4",style:{boxShadow:"0 4px 8px rgba(0, 0, 0, 0.2)"},children:[e.jsx(Z,{className:"mt-2",children:e.jsxs(G,{color:"primary",variant:"solid",style:{display:"flex",alignItems:"center"},children:[e.jsx(H,{style:{marginRight:"8px",fontSize:"40"}}),e.jsx("h3",{className:"fw-bold",style:{color:"#fff"},children:"Member Registration"})]})}),e.jsx(J,{children:e.jsxs($,{onSubmit:A,children:[e.jsxs(o,{children:[l("*Full Name","names"),l("*Gender","gender","select",["Male","Female"]),l("*Email","email")]}),e.jsxs(o,{children:[e.jsxs(c,{md:"6",children:[e.jsx(m,{style:{color:"blue",fontWeight:700},children:"*Telephone"}),e.jsxs(V,{children:[e.jsx(_,{children:"+254"}),e.jsx(j,{name:"telephone",type:"text",value:n.telephone,onChange:v,maxLength:"9",required:!0})]})]}),l("*Year of Birth","yearOfBirth","select",L)]}),e.jsxs(o,{children:[e.jsxs(c,{md:"6",children:[e.jsx(m,{style:{color:"blue",fontWeight:"bold"},children:"* District:"}),e.jsxs(p,{value:I,onChange:P,children:[e.jsx("option",{value:"",children:"Select District"}),N.map(t=>e.jsx("option",{value:t.district,children:t.district},t.id))]})]}),e.jsxs(c,{md:"6",children:[e.jsx(m,{style:{fontWeight:"bold",color:"blue"},children:"* Zone"}),e.jsx(j,{type:"text",value:b,readOnly:!0})]})]}),e.jsxs(o,{children:[l("*Marital Status","maritalStatus","select",["Married","Single","Widow","Widower","Divorced"]),n.maritalStatus==="Married"&&e.jsxs(e.Fragment,{children:[l("Marriage Type","marriageType","select",["Christian","Customary","Civil","Others"]),l("Spouse Name","spouseName"),e.jsxs(c,{md:"6",children:[e.jsx(m,{style:{fontWeight:"bold",color:"blue"},children:"Spouse Zp"}),e.jsx(j,{type:"text",value:D,onChange:t=>T(t.target.value),placeholder:"spouse zp"})]})]})]}),e.jsxs(o,{children:[l("*Membership Type","membershipType","select",["New","Adherent","Transfer"]),l("*Baptized?","baptized","select",["Yes","No"]),n.baptized==="Yes"&&l("Communicant?","communicant","select",["Yes","No"])]}),n.baptized==="Yes"&&e.jsx(o,{children:[{label:"Date of Baptism",key:"dateOfBaptism"},{label:"Baptized By",key:"baptizedBy"}].map(({label:t,key:s})=>l(t,s))}),n.communicant==="Yes"&&e.jsx(o,{children:[{label:"Communicant Number",key:"communicantNumber"},{label:"Date of Confirmation",key:"dateOfConfirmation"},{label:"Confirmed By",key:"confirmedBy"},{label:"Confirmation Location",key:"confirmationLocation"}].map(({label:t,key:s})=>l(t,s))}),e.jsxs(o,{children:[l("*Year of Joining","yearOfJoining"),l("*Address","address")]}),e.jsxs(o,{children:[l("*Disabled","disabled","select",["Yes","No"]),n.disabled==="Yes"&&e.jsx(e.Fragment,{children:l("Disability Type","disabilityType","select",["Intellectual Disability","Mental Health","Chronic Illness","Learning Disability","Mobility Impairment","Hearing Impairment","Visual Impairment","Others"])})]}),e.jsx(o,{children:[{label:"Passport Photo",key:"passportPhoto"},{label:"Transfer Letter",key:"transferLetter"},{label:"Communion Form",key:"communionForm"}].map(({label:t,key:s})=>l(t,s,"file"))}),e.jsx(o,{children:e.jsx(c,{md:"6",children:e.jsx(U,{id:"addChildCheck",label:e.jsx("span",{style:{fontWeight:"bold",color:"green"},children:"Have a child?"}),name:"addChild",checked:n.addChild,onChange:v})})}),n.addChild&&g.map((t,s)=>e.jsxs("div",{className:"mb-3",children:[e.jsxs(o,{children:[e.jsxs(c,{md:"4",children:[e.jsx(m,{children:"Child Name"}),e.jsx(j,{value:t.name,onChange:i=>f(s,"name",i.target.value),required:!0})]}),e.jsxs(c,{md:"2",children:[e.jsx(m,{children:"DOB"}),e.jsxs(p,{value:t.age,onChange:i=>f(s,"age",i.target.value),required:!0,children:[e.jsx("option",{value:"",children:"Select Year"}),Array.from({length:new Date().getFullYear()-2004},(i,a)=>e.jsx("option",{value:2005+a,children:2005+a},a))]})]}),e.jsxs(c,{md:"3",children:[e.jsx(m,{children:"Baptized"}),e.jsxs(p,{value:t.baptized,onChange:i=>f(s,"baptized",i.target.value),children:[e.jsx("option",{value:"Yes",children:"Yes"}),e.jsx("option",{value:"No",children:"No"})]})]}),t.baptized==="Yes"&&e.jsxs(c,{md:"3",children:[e.jsx(m,{children:"Confirmed"}),e.jsxs(p,{value:t.confirmed,onChange:i=>f(s,"confirmed",i.target.value),children:[e.jsx("option",{value:"Yes",children:"Yes"}),e.jsx("option",{value:"No",children:"No"})]})]}),e.jsxs(o,{children:[e.jsxs(c,{md:"3",children:[e.jsx(m,{children:"Disabled"}),e.jsxs(p,{value:t.disabled,onChange:i=>f(s,"disabled",i.target.value),required:!0,children:[e.jsx("option",{value:"",children:"Select"}),e.jsx("option",{value:"Yes",children:"Yes"}),e.jsx("option",{value:"No",children:"No"})]})]}),t.disabled==="Yes"&&e.jsxs(c,{md:"3",children:[e.jsx(m,{children:"Disability Type"}),e.jsxs(p,{value:t.disabilityType,onChange:i=>f(s,"disabilityType",i.target.value),required:t.disabled==="Yes",children:[e.jsx("option",{value:"",children:"Select"}),e.jsx("option",{value:"Intellectual Disability",children:"Intellectual Disability"}),e.jsx("option",{value:"Mental Health",children:"Mental Health"}),e.jsx("option",{value:"Chronic Illness",children:"Chronic Illness"}),e.jsx("option",{value:"Learning Disability",children:"Learning Disability"}),e.jsx("option",{value:"Mobility Impairment",children:"Mobility Impairment"}),e.jsx("option",{value:"Hearing Impairment",children:"Hearing Impairment"}),e.jsx("option",{value:"Visual Impairment",children:"Visual Impairment"}),e.jsx("option",{value:"Others",children:"Others"})]})]})]})]}),e.jsx(S,{style:{color:"white",fontWeight:"bold"},color:"success",className:"mt-2",onClick:()=>R(s),children:"Remove"})]},s)),n.addChild&&e.jsx(S,{color:"primary",onClick:E,children:"Add Another Child"}),e.jsx("div",{className:"mt-4",children:k?e.jsxs(S,{color:"primary",disabled:!0,style:{fontWeight:"bold"},children:[e.jsx(W,{as:"span",className:"me-2",size:"sm","aria-hidden":"true"}),e.jsx("span",{children:"Register..."})]}):e.jsx(S,{style:{fontWeight:"bold"},color:"primary",type:"submit",children:"Register"})})]})})]})};export{de as default};
