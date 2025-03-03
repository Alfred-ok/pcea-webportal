import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import "../scss/nav1.css";

import { CBadge, CNavLink, CSidebarNav } from "@coreui/react";
import styled from "styled-components";

const NavIcon = styled.span`
  svg {
    width: 30px !important;
    height: 30px !important;
    fill: currentColor;
    transition: fill 0.3s ease;
  }

  &:hover svg {
    fill: green !important;
  }
`;

export const AppSidebarNav = ({ items }) => {
  const localRole = localStorage.getItem("roleId");
  const navLink = (name, icon, badge, indent = false) => {
    return (
      <>
        {icon ? (
          <NavIcon>{icon}</NavIcon>
        ) : (
          indent && (
            <span className="nav-icon">
              <span className="nav-icon-bullet"></span>
            </span>
          )
        )}
        {name && name}
        {badge && (
          <CBadge color={badge.color} className="ms-auto">
            {badge.text}
          </CBadge>
        )}
      </>
    );
  };

  const navItem = (item, index, indent = false) => {
    const { component, name, badge, icon, ...rest } = item;
    const Component = component;
    return (
      item.roleId == localRole || item.role == "AdminRole"? 
      <Component as="div" key={index} color="success">
        {rest.to || rest.href ? (
          <CNavLink {...(rest.to && { as: NavLink })} {...rest}>
            {navLink(name, icon, badge, indent)}
          </CNavLink>
        ) : (
          navLink(name, icon, badge, indent)
        )}
      </Component>
      : null
    );
  };

  const navGroup = (item, index) => {
    const { component, name, icon, items, to, ...rest } = item;
    const Component = component;
    return (
      item.roleId == localRole || item.role == "AdminRole"?
      <Component
        compact
        as="div"
        key={index}
        toggler={navLink(name, icon)}
        {...rest}
      >
        {item.items?.map((item, index) =>
          item.items ? navGroup(item, index) : navItem(item, index, true)
        )}
      </Component>
      : null
    );
  };

  return (
    <CSidebarNav as={SimpleBar}>
      {items &&
        items.map((item, index) =>
          item.items ? navGroup(item, index) : navItem(item, index)
        )}
    </CSidebarNav>
  );
};

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
};
