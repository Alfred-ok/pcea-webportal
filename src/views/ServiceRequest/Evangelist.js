

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


const Evangelist = () => {

  const ChangeStatus = 1;
 
  const [activeTab, setActiveTab] = useState('baptism');
  return (
    <div>
      <CNav variant="underline-border">
        <CNavItem>
          <CNavLink className="nav-link-custom" active={activeTab === 'baptism'} onClick={() => setActiveTab('baptism')}>Baptism</CNavLink>
        </CNavItem>
   
      </CNav>
      {activeTab === 'baptism' && (
        <Baptism ChangeStatus={ChangeStatus} />
      )}
    </div>
  );
};

export default Evangelist;
