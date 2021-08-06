import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import Spinner from "../layout/Spinner";
import { NavLink } from "react-router-dom";
import Repos from "../repos/Repos";

const UserDetail = ({
  userDetail,
  loading,
  getUserDetails,
  getUserRepos,
  userRepos,
  match,
}) => {
  useEffect(() => {
    getUserDetails(match.params.username);
    getUserRepos(match.params.username);
    //eslint-disable-next-line
  }, []);

  const {
    name,
    avatar_url,
    location,
    bio,
    blog,
    login,
    html_url,
    company,
    followers,
    following,
    public_repos,
    public_gists,
    hireable,
  } = userDetail;

  if (loading) return <Spinner />;
  return (
    <Fragment>
      <NavLink to="/" className="btn btn-light">
        Back to Search
      </NavLink>
      Hierable: {""}
      {hireable ? (
        <i className="fas fa-check text-success" />
      ) : (
        <i className="fas fa-times-circle text-danger" />
      )}
      <div className="card grid-2">
        <div className="all-center">
          <img
            src={avatar_url}
            className="round-img"
            alt=""
            style={{ width: "150px" }}
          />
          <h1>{name}</h1>
          <p>Location : {location}</p>
        </div>
        <div>
          {bio && (
            <Fragment>
              <h3>Bio</h3>
              <p>{bio}</p>
            </Fragment>
          )}
          <a href={html_url} className="btn btn-dark my-1">
            Visit GitHub Profile
          </a>
          <ul>
            <li>
              {login && (
                <Fragment>
                  <strong>Username : </strong>
                  {login}
                </Fragment>
              )}
            </li>
            <li>
              {company && (
                <Fragment>
                  <strong>Company : </strong>
                  {company}
                </Fragment>
              )}
            </li>
            <li>
              {blog && (
                <Fragment>
                  <strong>Website : </strong>
                  {blog}
                </Fragment>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className="card text-center">
        <div className="badge badge-primary">Followers : {followers}</div>
        <div className="badge badge-success">Following : {following}</div>
        <div className="badge badge-light">Public Repos : {public_repos}</div>
        <div className="badge badge-dark">Public Gists : {public_gists}</div>
      </div>
      <Repos userRepos={userRepos} />
    </Fragment>
  );
};

UserDetail.propTypes = {
  loading: PropTypes.bool.isRequired,
  userDetail: PropTypes.object.isRequired,
  userRepos: PropTypes.array.isRequired,
  getUserDetails: PropTypes.func.isRequired,
  getUserRepos: PropTypes.func.isRequired,
};

export default UserDetail;
