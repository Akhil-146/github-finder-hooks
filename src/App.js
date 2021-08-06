import React, { useState, Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import axios from "axios";
import NavBar from "./components/layout/NavBar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import Alert from "./components/layout/Alert";
import About from "./components/pages/About";
import UserDetail from "./components/users/UserDetail";
import "./App.css";

const App = () => {
  const [users, setUsers] = useState([]);
  const [userDetail, setUserDetail] = useState({});
  const [userRepos, setUserRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const searchUsers = async (text) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_ID}`
      );
      setUsers(res.data.items);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e.message);
    }
  };

  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  };

  const showAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 3000);
  };

  const getUserDetails = async (username) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_ID}`
      );
      setUserDetail(res.data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e.message);
    }
  };

  const getUserRepos = async (username) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_ID}`
      );
      setUserRepos(res.data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e.message);
    }
  };

  return (
    <BrowserRouter>
      <div className="App">
        <NavBar title="Github Finder" />
        <div className="container">
          <Alert alert={alert} />
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <Fragment>
                  <Search
                    searchUsers={searchUsers}
                    clearUsers={clearUsers}
                    showClearBtn={users.length > 0 ? true : false}
                    setAlert={showAlert}
                  />
                  <Users users={users} loading={loading} />
                </Fragment>
              )}
            />
            <Route exact path="/about" component={About} />
            <Route
              exact
              path="/user/:username"
              render={(props) => (
                <UserDetail
                  {...props}
                  getUserDetails={getUserDetails}
                  getUserRepos={getUserRepos}
                  userDetail={userDetail}
                  userRepos={userRepos}
                  loading={loading}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
