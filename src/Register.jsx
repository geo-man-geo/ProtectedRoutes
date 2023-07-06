import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Link } from "react-router-dom";
import axios from "axios";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "", message: "" };
  }

  handleRegister = () => {
    const { username, password } = this.state;

    // Make the POST request to register API
    axios
      .post("http://localhost:3001/register", {
        username,
        password,
      })
      .then((response) => {
        console.log("Registration successful");
        // Do something with the response if needed
        // You can update the state or navigate to another page
      })
      .catch((error) => {
        console.log("Registration failed", error);
      });
  };

  render() {
    return (
      <React.Fragment>
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <div className="col-lg-9">
            <h4 className="m-1 p-2 text-center">Register</h4>
            <div className="form-group form-row justify-content-center">
              <input
                type="text"
                className="form-control col-lg-4  placeholder-transparent text-center"
                placeholder="Enter your username"
                value={this.state.username}
                onChange={(event) => {
                  this.setState({ username: event.target.value });
                }}
              />
            </div>

            <div className="form-group form-row justify-content-center">
              <input
                type="password"
                className="form-control col-lg-4  placeholder-transparent text-center"
                placeholder="Enter your password"
                value={this.state.password}
                onChange={(event) => {
                  this.setState({ password: event.target.value });
                }}
              />
            </div>

            <div className="form-group form-row justify-content-center">
              <button
                className="btn btn-primary m-1 align-items-center"
                onClick={this.handleRegister}
              >
                Register
              </button>
            </div>

            <div className="form-group form-row justify-content-center align-items-center">
              <h6 className="mr-2">Already a user?</h6>
              <Link to="/login">
                <button className="btn btn-primary m-1 align-items-center">
                  Login
                </button>
              </Link>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Register;
