import React from "react";
import { CFooter } from "@coreui/react";

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        <a
          href="https://swizzsoft.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          SwizzSoft
        </a>
        <span className="ms-1" style={{ fontWeight: "bold" }}>
          &copy; 2024 Swift.Soft.Secure.
        </span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a
          href="https://swizzsoft.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          SwizzSoft
        </a>
      </div>
    </CFooter>
  );
};

export default React.memo(AppFooter);
