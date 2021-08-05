import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const UserItem = ({ user: { avatar_url, html_url, login } }) => {
  return (
    <div className="card text-center">
      <img
        src={avatar_url}
        alt=""
        className="round-img"
        style={{ width: "60px" }}
      />
      <h3>{login}</h3>
      <div>
        <NavLink to={`/user/${login}`} className="btn btn-dark btn-sm my-1">
          More
        </NavLink>
      </div>
    </div>
  );
};

UserItem.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserItem;
