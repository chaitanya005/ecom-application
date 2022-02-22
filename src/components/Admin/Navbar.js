import React from "react";
import './css/admin-style.css'

const Navbar = () => {
  return (
    <>
      {/* <Helmet>
        <link rel="stylesheet" href="/css/style.css" />
      </Helmet> */}
      <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
        <div
          className="navbar-menu-wrapper d-flex align-items-center justify-content-end"
          style={{ width: "100%" }}
        >
          <ul className="navbar-nav mr-lg-2">
            <li className="nav-item nav-search d-none d-lg-block">
              <div className="input-group">
                <div
                  className="input-group-prepend hover-cursor"
                  id="navbar-search-icon"
                >
                  <span className="input-group-text" id="search">
                    <i className="icon-search"></i>
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="navbar-search-input"
                  placeholder="Search now"
                  aria-label="search"
                  aria-describedby="search"
                />
              </div>
            </li>
          </ul>
          <ul className="navbar-nav navbar-nav-right">
            <li className="nav-item nav-profile dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                data-toggle="dropdown"
                id="profileDropdown"
              >
                {/* <img src="/images/face28.jpg" alt="profile" /> */}
              </a>
            </li>
          </ul>
          <button
            className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
            type="button"
            data-toggle="offcanvas"
          >
            <span className="icon-menu"></span>
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
