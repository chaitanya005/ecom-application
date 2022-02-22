import React from "react";
import { useNavigate } from "react-router";
import { useState } from "react";
import "./resetPassword.css";
import axios from "../../utils/ajax-helper";
import validator from "validator";
import { Button } from "react-bootstrap";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    let token = window.location.pathname.substring(16);
    let decoded = parseJwt(token);
    if (password == confirmPassword) {
      if (
        validator.isStrongPassword(password, {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        })
      ) {
        axios
          .put("/reset_password", {
            email: decoded.email,
            password: password,
          })
          .then((res) => {
            setMessage("reset password successfull");
            setTimeout(() => {
              setMessage(null);
            }, 2000);
            navigate("/login");
          })
          .catch((err) => {
            setMessage("reset password failed");
            setTimeout(() => {
              setMessage(null);
            }, 2000);
            navigate("/forgot_password");
          });
      } else {
        setErrorMessage("Is Not Strong Password");
        setTimeout(() => {
          setErrorMessage(null);
        }, 2000);
      }
    } else {
      setErrorMessage("password do not patch");
      setTimeout(() => {
        setErrorMessage(null);
      }, 2000);
    }
  };
  function parseJwt(token) {
    if (!token) {
      return;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  }

  return (
    <div>
      <div style={{ background: "#fcf0e2", height: "1000px" }}>
        <nav className="navbar navbar-expand-lg ">
          <a className="navbar-brand" href="#">
            <h3>E-commerence</h3>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link" href="#">
                  Men
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Women
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Kids
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <div className="card" style={{ marginLeft: "30%", marginTop: "10%" }}>
          <div className="card-header">
            <h5>Reset Password</h5>
            <br />
            <h4 className="message">{message}</h4>
          </div>
          <div className="card-body">
            <form className="form" onSubmit={submitHandler}>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  style={{
                    fontWeight: "bold",
                    color: "red",
                  }}
                >
                  {errorMessage}
                </span>
              </div>
              <br />
              <div className="form-group">
                <label htmlFor="confirmPassword">confirmPassword</label>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="confirmPassword"
                  className="form-control"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <br />
              <Button type="submit" className="continue">
                Reset
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
