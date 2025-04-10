



import React from 'react'
import { CAlert, CCard, CCardHeader, CTab, CTabContent, CTabList, CTabPanel, CTabs } from '@coreui/react'
import Member from './Member'
import Allshepherd from './Allshepherd'
import Children from './Children'
import Teenagers from './Teenagers'


function Allmember() {
  return (
    <>
    <CCard style={{ boxShadow: "0px -2px 19px 1px rgba(0,0,0,0.39)",padding: "15px" }}>
    <CAlert style={{ backgroundColor:"rgba(22, 89, 177, 0.925)" }}>
        <h3 style={{ color: "#fff" }}>All Members</h3>
    </CAlert>
    
    <CTabs activeItemKey="Member">
      <CTabList variant="tabs">
        <CTab itemKey="Member">Member</CTab>
        <CTab itemKey="Shepherd">Shepherd</CTab>
        <CTab itemKey="Teenagers">Teenagers</CTab>
        <CTab itemKey="Children">Children</CTab>
        
      </CTabList>
      <CTabContent>
        <CTabPanel className="p-3" itemKey="Member" style={{backgroundColor:"#fff"}}>
          <Member/>
        </CTabPanel>
        <CTabPanel className="p-3" itemKey="Shepherd" style={{backgroundColor:"#fff"}}>
          <Allshepherd/>
        </CTabPanel>
        <CTabPanel className="p-3" itemKey="Teenagers" style={{backgroundColor:"#fff"}}>
          <Teenagers/>
        </CTabPanel>
        <CTabPanel className="p-3" itemKey="Children" style={{backgroundColor:"#fff"}}>
          <Children/>
        </CTabPanel>
      </CTabContent>
    </CTabs>
    </CCard>
    </>
  )
}

export default Allmember



