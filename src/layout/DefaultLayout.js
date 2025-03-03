import React from 'react';
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index';
import { Navigate } from 'react-router-dom';

const DefaultLayout = () => {
  const token = localStorage.getItem('token'); // Check for token

  if (!token) {
    // Redirect to login if token is missing
    return <Navigate to="/login" />;
  }

  return (
    <div
      style={{
        backgroundImage: "url('src/assets/images/Geometric-2.jpg')",
        backgroundRepeat: 'repeat',
        position: 'relative',
        color: 'black',
      }}
    >
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1" style={{ zIndex: 6 }}>
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  );
};

export default DefaultLayout;
