import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/category/search">
              Search Category
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/category/goods">
              Search Goods
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
