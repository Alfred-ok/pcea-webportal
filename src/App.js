import React, { Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { CSpinner, useColorModes } from "@coreui/react";
import "./scss/style.scss";

// Containers
const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));

// Pages
const Login = React.lazy(() => import("./views/pages/login/Login"));
const Register = React.lazy(() => import("./views/pages/register/Register"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));

const ChildrenBelow = React.lazy(() => import("./views/Registration/Kids/Children Below")); 


import { MembersProvider } from "./views/MembersContext"; 

import { ScheduleProvider } from "./views/ScheduleContext";



const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); 
  return token ? children : <Navigate to="/login" />;
};

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes(
    "coreui-free-react-admin-template-theme"
  );
  //const storedTheme = useSelector((state) => state.theme);

  useEffect(() => {
  /*  const urlParams = new URLSearchParams(window.location.href.split("?")[1]);
    const theme =
      urlParams.get("theme") &&
      urlParams.get("theme").match(/^[A-Za-z0-9\s]+/)[0];
    if (theme) {
      setColorMode("light");
    }

    if (isColorModeSet()) {
      return;
    }*/

    setColorMode("light");
  }, [setColorMode]); 

  return (
   
    <MembersProvider>
      <ScheduleProvider>
      <BrowserRouter>
        <Suspense
          fallback={
            <div className="pt-3 text-center">
              <CSpinner color="primary" variant="grow" />
            </div>
          }
        >
          <Routes>
            {/* Public Routes */}
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route
              exact
              path="/register"
              name="Register Page"
              element={<Register />}
            />
            <Route
              exact
              path="/children-below"
              name="Children Below"
              element={<ChildrenBelow />}
            />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />

            {/* Protected Routes */}
            <Route
              path="*"
              name="Home"
              element={
                
                <ProtectedRoute>
                  <DefaultLayout />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
      </ScheduleProvider>
    </MembersProvider>
  );
};

export default App;
