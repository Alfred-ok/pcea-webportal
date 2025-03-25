

import React from 'react'
import { CAlert, CCard, CCardHeader, CTab, CTabContent, CTabList, CTabPanel, CTabs } from '@coreui/react'
import MemberCommunionService from './MemberCommunionStatus';
import MemberServiceStatus from './MemberServiceStatus';
import MemberCommunionStatus from './MemberCommunionStatus';


function Status() {
  return (
    <>
    <CCard style={{ boxShadow: "0px -2px 19px 1px rgba(0,0,0,0.39)",padding: "15px" }}>
    <CAlert style={{ backgroundColor:"rgba(22, 89, 177, 0.925)" }}>
        <h3 style={{ color: "#fff" }}>Member Status</h3>
    </CAlert>
    <CTabs activeItemKey="Communion">
      <CTabList variant="tabs">
        <CTab itemKey="Communion">Communion Status</CTab>
        <CTab itemKey="Service">Service Status</CTab>
      </CTabList>
      <CTabContent>
        <CTabPanel className="p-3" itemKey="Communion" style={{backgroundColor:"#fff"}}>
          <MemberCommunionStatus/>
        </CTabPanel>
        <CTabPanel className="p-3" itemKey="Service" style={{backgroundColor:"#fff"}}>
          <MemberServiceStatus/>
        </CTabPanel>
      </CTabContent>
    </CTabs>
    </CCard>
    </>
  )
}

export default Status;