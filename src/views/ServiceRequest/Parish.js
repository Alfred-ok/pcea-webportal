


import React, { useEffect, useState } from 'react';
import {

  CNav,
  CNavItem,
  CNavLink,

} from '@coreui/react';
//import './styles.css';
import '../../scss/style.scss'
import Marriage from './service/Marriage';
import Baptism from './service/Baptism';
import Prayer from './service/Prayer';


const Parish = () => {
  
 
  const [activeTab, setActiveTab] = useState('marriage');
  return (
    <div>
      <CNav variant="underline-border">
        <CNavItem>
          <CNavLink className="nav-link-custom" active={activeTab === 'marriage'} onClick={() => setActiveTab('marriage')}>Marriage</CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink className="nav-link-custom" active={activeTab === 'prayer'} onClick={() => setActiveTab('prayer')}>Prayer</CNavLink>
        </CNavItem>
   
      </CNav>
      {activeTab === 'marriage' && (
        <Marriage />
      )}
      {activeTab === 'prayer' && (
        <Prayer />
      )}
    </div>
  );
};

export default Parish;