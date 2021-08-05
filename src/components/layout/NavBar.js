import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const NavBar = ({ title }) => {
  return (
    <nav className="navbar bg-primary">
      <h1>
        <i className="fab fa-github"></i> {title}
      </h1>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/about">About us</NavLink>
        </li>
      </ul>
    </nav>
  );
};

NavBar.defaultProps = {
  title: "App Title",
};

NavBar.propTypes = {
  title: PropTypes.string.isRequired,
};
export default NavBar;
