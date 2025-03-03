
import React from 'react'
import { CAlert, CCard, CTab, CTabContent, CTabList, CTabPanel, CTabs } from '@coreui/react'
import Evangelist from './Evangelist'
import Pastoral from './Pastoral'
import Catechism from './Catechism'
import Prayer from './service/Prayer'
import Parish from './Parish'

function ServiceRequest() {
  
  const roleId = localStorage.getItem("roleId");

  const active = roleId==="2" ? "Parish Minister" : roleId==="3" ? "Evangelist" : "Catechism";

  return (
    <>
    <CCard style={{ boxShadow: "0px -2px 19px 1px rgba(0,0,0,0.39)",padding: "15px" }}>
    <CAlert color="primary" variant="solid"><h3 style={{ color: "#fff" }}>Member Service</h3></CAlert>
    <CTabs activeItemKey= {active} style={{backgroundColor:"green"}}>
      <CTabList variant="tabs">

        {roleId==="3" ?<CTab itemKey="Evangelist">Evangelist</CTab>: <></>}
        {roleId==="3" ?<CTab itemKey="Pastoral">Pastoral</CTab>: <></>}
        {roleId==="3" ?<CTab itemKey="Catechism">Catechism</CTab> : <></>}
        {roleId==="2" ?<CTab itemKey="Parish Minister">Parish Minister</CTab> : <></>}

      </CTabList>
      <CTabContent>
        <CTabPanel className="p-3" itemKey="Evangelist" style={{backgroundColor:"#fff"}}>
          <Evangelist/>
        </CTabPanel>
        <CTabPanel className="p-3" itemKey="Pastoral" style={{backgroundColor:"#fff"}}>
          <Pastoral/>
        </CTabPanel>
        <CTabPanel className="p-3" itemKey="Catechism" style={{backgroundColor:"#fff"}}>
          <Catechism/>
        </CTabPanel>
        <CTabPanel className="p-3" itemKey="Parish Minister" style={{backgroundColor:"#fff"}}>
          <Parish/>
        </CTabPanel>
      </CTabContent>
    </CTabs>
    </CCard>
    </>
  )
}

export default ServiceRequest