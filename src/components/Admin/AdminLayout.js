import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const AdminLayout = ({ children }) => {
  return (
    <div>
      <div className="container-scroller">
        <div className="container-fluid page-body-wrapper">
          <Navbar />
          <Sidebar />
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
