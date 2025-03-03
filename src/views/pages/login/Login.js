import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CImage,
  CInputGroup,
  CInputGroupText,
  CRow,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";
import logo1 from "src/assets/images/logo1.png";
import { lineSpinner } from "ldrs";
lineSpinner.register();

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
  
    try {
      const response = await fetch("http://197.232.170.121:8598/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          UserName: username,
          Password: password,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Invalid username or password");
      }
  
      const data = await response.json();
  
      // Ensure roleId exists in response
      const roleId = data?.user?.authorities[0]?.roleId;
      if (!roleId) throw new Error("You did not input Username and Password.");
  
      localStorage.setItem("token", data.jwt);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("username", username);
      localStorage.setItem("roleId", roleId);
  
      // Redirect based on role
      if (data.user.firstlogin === 0) {
        setShowChangePasswordModal(true);
      } else {
        navigate(roleId === 1 ? "/dashboard" : "/dashboard"); //navigate(roleId === 1 ? "/dashboard" : "/reports");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match! Please try again.");
      return;
    }

    try {
      const response = await fetch("http://197.232.170.121:8598/auth/changepin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          UserName: username,
          OldPassword: password,
          NewPassword: newPassword,
        }),
      });

      const result = await response.json();

      if (result.status === "00") {
        alert("Password changed successfully. Please log in with your new password.");
        setShowChangePasswordModal(false);
      } else {
        alert(result.statusDescription || "Failed to change password.");
      }
    } catch (error) {
      alert("Error changing password. Please try again.");
    }
  };

  const inputStyle = {
    width: "100%",
  };

  return (
    <div
      className="min-vh-100 d-flex flex-row align-items-center"
      style={{
        backgroundImage: "url('src/assets/images/1.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundBlendMode: "multiply",
      }}
    >
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={4}>
            <CCard className="p-4" style={{ boxShadow: "0px 15px 34px rgba(0,0,0,0.2)" }}>
              <CCardBody>
                <CForm onSubmit={handleLogin} style={{ textAlign: "center" }}>
                  <CImage rounded src={logo1} height={150} />
                  <h1 style={{ marginTop: "20px", color: "#374ad6" }}>Login</h1>
                  {error && <p style={{ color: "red" }}>{error}</p>}
                  {loading && (
                    <div style={{ marginBottom: "20px" }}>
                      <l-line-spinner
                        size="40"
                        stroke="3"
                        speed="1"
                        color="blue"
                      ></l-line-spinner>
                    </div>
                  )}
                  <CInputGroup className="mb-3" style={inputStyle}>
                    <CInputGroupText style={{ backgroundColor: "rgb(71, 71, 212)", color: "#fff" }}>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Username"
                      autoComplete="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      style={{ borderColor: "rgb(71, 71, 212)" }}
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-4" style={inputStyle}>
                    <CInputGroupText style={{ backgroundColor: "rgb(71, 71, 212)", color: "#fff" }}>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={{ borderColor: "rgb(71, 71, 212)" }}
                    />
                  </CInputGroup>

                  <CCol style={{ marginTop: "20px" }}>
                    <CButton type="submit" color="primary" style={inputStyle}>
                      Login
                    </CButton>
                    <CButton
                      style={{ fontWeight: "bold", marginTop: "10px" }}
                      color="link"
                    >
                      Forgot Password
                    </CButton>
                  </CCol>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>

      <CModal visible={showChangePasswordModal} onClose={() => setShowChangePasswordModal(false)}>
        <CModalHeader style={{ fontWeight: "bold" }}>Change Password</CModalHeader>
        <CModalBody>
          <p style={{ fontWeight: "bold" }}>Please change your password to continue.</p>
          <CInputGroup className="mb-3">
            <CInputGroupText>New Password</CInputGroupText>
            <CFormInput
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </CInputGroup>
          <CInputGroup className="mb-3">
            <CInputGroupText>Confirm Password</CInputGroupText>
            <CFormInput
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </CInputGroup>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowChangePasswordModal(false)}>
            Cancel
          </CButton>
          <CButton color="primary" onClick={handleChangePassword}>
            Submit
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
};

export default Login;
