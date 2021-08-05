import React from "react";
import PropTypes from "prop-types";

const NavBar = ({ title }) => {
  return (
    <nav className="navbar bg-primary">
      <h1>
        <i className="fab fa-github"></i> {title}
      </h1>
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
