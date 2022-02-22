import React, { useEffect, useState } from "react";
import "./pagination-style.css";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import axios from "../../utils/ajax-helper";
import TypeAhead from "../Admin/Categories/TypeAhead";

const Navbar = ({
  handleSearch,
  setSearchItem,
  searchItem,
  options,
  placeholder,
  setSearchInput,
  searchInput,
  handleSearchFilter
}) => {
  // get categories from server and store in state and update in navbar
  // /categories
  const [categories, setCategories] = React.useState([]);
  const [errorMsg, setErrorMsg] = React.useState(null);

  useEffect(() => {
    axios
      .get("/categories")
      .then((res) => {
        console.log(res.data.categories);
        setCategories(res.data.categories);
      })
      .catch((err) => {
        setErrorMsg("Sorry! Something went wrong. Please Try again");
      });
  }, []);

  return (
    <>
      <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row"style={{position: 'sticky'}}>
        <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
          <ul className="navbar-nav mr-lg-2">
            <li className="nav-item nav-search d-none d-lg-block">
              <a className="nav-link" href="/">
                <h4>Products</h4>
              </a>
            </li>
            {categories.map((category) => (
              <li className="nav-item">
                <a className="nav-link" href={"/products/" + category.id}>
                  {category.category}
                </a>
              </li>
            ))}
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
                <TypeAhead
                  setSearchItem={setSearchItem}
                  searchItem={searchItem}
                  handleSearch={handleSearch}
                  options={options}
                  placeholder={placeholder}
                  setSearchInput={setSearchInput}
                  searchInput={searchInput}
                  handleSearchFilter={handleSearchFilter}
                  onEnterSearchItems={true}
                />
              </div>
            </li>
          </ul>
          <ul className="navbar-nav navbar-nav-right">
            <li className="nav-item nav-profile dropdown">
              <a href="#">
                <FaHeart className="navBarIcon" />
              </a>
            </li>
            <li className="nav-item nav-profile dropdown">
              <a href="/cart">
                <FaShoppingCart className="navBarIcon" />
              </a>
            </li>
            <li className="nav-item ">
              <a href="/logout">Logout</a>
            </li>
          </ul>
          <button
            className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
            type="button"
            data-toggle="offcanvas"
          >
            Products
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
