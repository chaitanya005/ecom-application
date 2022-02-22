import React, { useState } from "react";
import axios from "../../utils/ajax-helper";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const signup = (e) => {
    e.preventDefault();
    axios
      .post("/signup", {
        first_name: firstName,
        last_name: lastName,
        username: userName,
        email: email,
        password: password,
      })
      .then((res) => {
        toast.success("User Created Sucessfully! Please Login.");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      })
      .catch((err) => {
        if (err.response) {
          setError(err.response.data.message);
        }
        if (err.response.data[0].msg) {
          setError(err.response.data[0].msg);
        } else {
          setError(err);
        }
      });
  };
  return (
    <div className="container">
      <Toaster />
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              {error ? (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              ) : (
                <></>
              )}
              <h1 className="card-title text-center mb-5 fw-light fs-5">
                <span>Signup</span>
              </h1>
              <form onSubmit={(e) => signup(e)} className="form">
                <div className="form-group">
                  <div className="form-floating mb-3">
                    <input
                      required={true}
                      type="text"
                      onChange={(e) => setFirstName(e.target.value)}
                      className="form-control"
                      id="first_name"
                      placeholder="First Name"
                    />
                    <label htmlFor="first_name">First Name *</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      required={true}
                      type="text"
                      onChange={(e) => setLastName(e.target.value)}
                      className="form-control"
                      id="last_name"
                      placeholder="Last Name"
                    />
                    <label htmlFor="last_name">Last Name *</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      required={true}
                      onChange={(e) => setUserName(e.target.value)}
                      className="form-control"
                      id="username"
                      placeholder="Username"
                    />
                    <label htmlFor="username">Username *</label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      required={true}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control"
                      id="email"
                      placeholder="Email"
                    />
                    <label htmlFor="email">Email address *</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      required={true}
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-control"
                      id="password"
                      placeholder="Password"
                    />
                    <label htmlFor="password">Password *</label>
                  </div>
                  <div className="form-group text-center">
                    <button type="submit" className="btn btn-primary btn-lg">
                      Sign Up
                    </button>
                  </div>
                </div>
              </form>
              <div className="text-center">
                <p>
                  Already have an account? <a href="/login">Login</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
