import React from 'react'
import { CAlert, CCard, CCardHeader, CTab, CTabContent, CTabList, CTabPanel, CTabs } from '@coreui/react'
import Remarks from './Remarks'
import Complains from './Complains'
import Proposal from './proposal'

function MemberFeedback() {
  return (
    <>
    <CCard style={{ boxShadow: "0px -2px 19px 1px rgba(0,0,0,0.39)",padding: "15px" }}>
    <CAlert style={{ backgroundColor:"rgba(22, 89, 177, 0.925)" }}>
        <h3 style={{ color: "#fff" }}>Members FeedBack</h3>
    </CAlert>
    <CTabs activeItemKey="Remarks">
      <CTabList variant="tabs">
        <CTab itemKey="Remarks">Remarks</CTab>
        <CTab itemKey="Proposal">Proposal</CTab>
        <CTab itemKey="Complains">Complains</CTab>
      </CTabList>
      <CTabContent>
        <CTabPanel className="p-3" itemKey="Remarks" style={{backgroundColor:"#fff"}}>
          <Remarks/>
        </CTabPanel>
        <CTabPanel className="p-3" itemKey="Proposal" style={{backgroundColor:"#fff"}}>
          <Proposal/>
        </CTabPanel>
        <CTabPanel className="p-3" itemKey="Complains" style={{backgroundColor:"#fff"}}>
          <Complains/>
        </CTabPanel>
      </CTabContent>
    </CTabs>
    </CCard>
    </>
  )
}

export default MemberFeedback