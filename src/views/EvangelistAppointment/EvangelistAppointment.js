
import React from 'react'
import { CAlert, CCard, CCardHeader, CTab, CTabContent, CTabList, CTabPanel, CTabs } from '@coreui/react'

import CBM from './CBM'
import Session from './Session'
import Counsellor from './Counsellor'

function EvangelistAppointment() {
  return (
    <>
    <CCard style={{ boxShadow: "0px -2px 19px 1px rgba(0,0,0,0.39)",padding: "15px" }}>
    <CAlert style={{ backgroundColor:"rgba(22, 89, 177, 0.925)" }}>
        <h3 style={{ color: "#fff" }}>Appointments</h3>
    </CAlert>
    <CTabs activeItemKey="CBM">
      <CTabList variant="tabs">
        <CTab itemKey="CBM">CBM</CTab>
        <CTab itemKey="Session">Session</CTab>
        <CTab itemKey="Counselling">Counselling</CTab>
      </CTabList>
      <CTabContent>
        <CTabPanel className="p-3" itemKey="CBM" style={{backgroundColor:"#fff"}}>
          <CBM/>
        </CTabPanel>
        <CTabPanel className="p-3" itemKey="Session" style={{backgroundColor:"#fff"}}>
          <Session/>
        </CTabPanel>
        <CTabPanel className="p-3" itemKey="Counselling" style={{backgroundColor:"#fff"}}>
          <Counsellor/>
        </CTabPanel>
      </CTabContent>
    </CTabs>
    </CCard>
    </>
  )
}

export default EvangelistAppointment