

import React from 'react'
import { CAlert, CCard, CCardHeader, CTab, CTabContent, CTabList, CTabPanel, CTabs } from '@coreui/react'
import ExistMember from './ExistMember'
import Shepherd from './Shepherd'



function Reports() {
  return (
    <>
    <CCard style={{ boxShadow: "0px -2px 19px 1px rgba(0,0,0,0.39)",padding: "15px" }}>
    <CAlert style={{ backgroundColor:"rgba(22, 89, 177, 0.925)" }}>
        <h3 style={{ color: "#fff" }}>Add Member</h3>
    </CAlert>
    
    <CTabs activeItemKey="ExistMember">
      <CTabList variant="tabs">
        <CTab itemKey="ExistMember">Existing Member</CTab>
        <CTab itemKey="Shepherd">Shepherding</CTab>
      </CTabList>
      <CTabContent>
        <CTabPanel className="p-3" itemKey="ExistMember" style={{backgroundColor:"#fff"}}>
          <ExistMember/>
        </CTabPanel>
        <CTabPanel className="p-3" itemKey="Shepherd" style={{backgroundColor:"#fff"}}>
          <Shepherd/>
        </CTabPanel>
      </CTabContent>
    </CTabs>
    </CCard>
    </>
  )
}

export default Reports

