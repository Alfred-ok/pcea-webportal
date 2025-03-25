



import React from 'react'
import { CAlert, CCard, CCardHeader, CTab, CTabContent, CTabList, CTabPanel, CTabs } from '@coreui/react'


import Admission from './newMembers'
import Readmission from './AwaitingReAdmission'
import AwaitingBaptism from './AwaitingBaptism'

function AwaitingConfirmation() {
  return (
    <>
    <CCard style={{ boxShadow: "0px -2px 19px 1px rgba(0,0,0,0.39)",padding: "15px" }}>
    <CAlert style={{ backgroundColor:"rgba(22, 89, 177, 0.925)" }}>
        <h3 style={{ color: "#fff" }}>Awaiting Confirmation</h3>
    </CAlert>
    <CTabs activeItemKey="Admission">
      <CTabList variant="tabs">
        <CTab itemKey="Admission">Admission</CTab>
        <CTab itemKey="Readmission">Readmission</CTab>
        <CTab itemKey="AwaitingBaptism">Awaiting Baptism</CTab>
      </CTabList>
      <CTabContent>
        <CTabPanel className="p-3" itemKey="Admission" style={{backgroundColor:"#fff"}}>
          <Admission/>
        </CTabPanel>
        <CTabPanel className="p-3" itemKey="Readmission" style={{backgroundColor:"#fff"}}>
          <Readmission/>
        </CTabPanel>
        <CTabPanel className="p-3" itemKey="AwaitingBaptism" style={{backgroundColor:"#fff"}}>
          <AwaitingBaptism/>
        </CTabPanel>
      </CTabContent>
    </CTabs>
    </CCard>
    </>
  )
}

export default AwaitingConfirmation;