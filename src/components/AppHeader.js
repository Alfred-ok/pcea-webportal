import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  CContainer,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilMenu } from "@coreui/icons";

import { AppBreadcrumb } from "./index";
import { AppHeaderDropdown } from "./header/index";

const AppHeader = () => {
  const headerRef = useRef();

  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.sidebarShow);

  useEffect(() => {
    document.addEventListener("scroll", () => {
      headerRef.current &&
        headerRef.current.classList.toggle(
          "shadow-sm",
          document.documentElement.scrollTop > 0
        );
    });
  }, []);

  return (
    <CHeader
      position="sticky"
      className="mb-4 p-0"
      ref={headerRef}
      style={{ borderBottom: "1px solid rgb(207, 206, 206)" }}
    >
      <CContainer
        className="border-bottom px-4"
        fluid
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          height: "82px",
          boxShadow: "0px 10px 8px 0px rgba(0,0,0,0.1)",
        }}
      >
        <CHeaderToggler
          onClick={() => dispatch({ type: "set", sidebarShow: !sidebarShow })}
          style={{ marginInlineStart: "-14px" }}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
       
        <div>
          <AppBreadcrumb />
        </div>

        <div style={{margin: "0px auto"}}>
         <h2 style={{fontWeight: 700}}>PCEA ZIMMERMAN</h2>
        </div> 

        <CHeaderNav className="ms-auto">
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
    </CHeader>
  );
};

export default AppHeader;
