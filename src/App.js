import React, { Component } from "react";
import axios from "axios";
import NavBar from "./components/layout/NavBar";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import "./App.css";

class App extends Component {
  state = {
    users: [],
    loading: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_ID}`
    );
    this.setState({ users: res.data, loading: false });
  }

  searchUsers = async (text) => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_ID}`
    );
    this.setState({ users: res.data.items, loading: false });
    console.log(this.state.users);
  };

  render() {
    const { users, loading } = this.state;
    return (
      <div className="App">
        <NavBar title="Github Finder" />
        <div className="container">
          <Search searchUsers={this.searchUsers} />
          <Users users={users} loading={loading} />
        </div>
      </div>
    );
  }
}

export default App;
