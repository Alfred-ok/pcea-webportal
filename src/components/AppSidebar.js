import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CButton,
} from "@coreui/react";
import { AppSidebarNav } from "./AppSidebarNav";

import logo1 from "src/assets/images/logo1.png";
import logoutImage from "src/assets/images/avatars/17.png";
import { CImage } from "@coreui/react";

import navigation from "../_nav";

const AppSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const unfoldable = useSelector((state) => state.sidebarUnfoldable);
  const sidebarShow = useSelector((state) => state.sidebarShow);
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = async () => {
    setLoading(true); // Start loading spinner
    try {
      // Optionally send a logout request to the server
      const token = localStorage.getItem("token");
      if (token) {
        await fetch("http://197.232.170.121:8598/auth/validate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      }

      // Clear local storage and session storage
      localStorage.clear();
      sessionStorage.clear();

      // Clear cookies if they are being used for session (Optional)
      document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

      // Prevent caching of authenticated pages and redirect to login page
      window.location.replace("/login"); // Forces navigation to login without caching the page
    } catch (error) {
      console.error("Error during logout:", error);
      window.location.replace("/login");
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: "set", sidebarShow: visible });
      }}
      style={{
        backgroundColor: "rgba(22, 89, 177, 0.925)",
        color: "white",
        boxShadow: "20px 0px 60px -5px rgba(0,0,0,0.2)",
        zIndex: 3,
      }}
    >
      <CSidebarHeader className="border-bottom">
        <div
          style={{
            display: "flex",
            alignItems: "end",
            justifyContent: "center",
          }}
        >
          <CImage style={{marginLeft: "80px"}} rounded src={logo1} width={50} height={50} />
          {
          //<h4>PCEA Zimmerman</h4>
          }
        </div>
        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => dispatch({ type: "set", sidebarShow: false })}
        />
      </CSidebarHeader>

      {/* Navigation items */}
      <AppSidebarNav items={navigation} />

      {/* Sidebar Footer for Sign-Out Button */}
      <CSidebarFooter
        className="border-top d-none d-lg-flex"
        style={{ padding: "10px" }}
      >
        <CButton
          onClick={handleLogout}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            backgroundColor: "transparent",
            border: "none",
            boxShadow: "none",
            padding: "10px 20px",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "black";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
          disabled={loading} // Disable button during loading
        >
          <l-line-spinner
            size="40"
            stroke="3"
            speed="1"
            color="white"
            style={{ marginRight: "16px", display: loading ? "block" : "none" }}
          ></l-line-spinner>
          {!loading && (
            <img
              src={logoutImage}
              alt="Logout"
              style={{ width: "36px", marginRight: "16px" }}
            />
          )}
          {loading ? "Signing Out..." : "Sign Out"}
        </CButton>
      </CSidebarFooter>
    </CSidebar>
  );
};

export default React.memo(AppSidebar);
