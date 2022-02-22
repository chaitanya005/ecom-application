import axios from "../../utils/ajax-helper";
import React, { useEffect, Component } from "react";
import { getJWT } from "../../utils/jwt";
import { useNavigate } from "react-router-dom";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
    };
    this.change = this.change.bind(this);
    this.submit = this.submit.bind(this);
  }
  change(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  submit(e) {
    e.preventDefault();
    this.setState({
      error: "",
    });
    e.preventDefault();
    axios
      .post("/getToken", {
        email: this.state.email,
        password: this.state.password,
      })
      .then((res) => {
        localStorage.setItem("ecom_token", res.data.token);
        this.props.navigate("/");
      })
      .catch((err) => {
        this.setState({
          error: "Invalid Credentials",
        });
      });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card border-0 shadow rounded-3 my-5">
              <div className="card-body p-4 p-sm-5">
                {this.state.error ? (
                  <div className="alert alert-danger">{this.state.error}</div>
                ) : null}
                <h1 className="card-title text-center mb-5 fw-light fs-5">
                  <span>Login</span>
                </h1>
                <form
                  onSubmit={(e) => this.submit(e)}
                  id="form"
                  className="form"
                >
                  <div className="form-group">
                    <div className="form-floating mb-3">
                      <input
                        type="email"
                        onChange={(e) => this.change(e)}
                        value={this.state.email}
                        required={true}
                        className="form-control"
                        name="email"
                        id="email"
                        placeholder="Email"
                      />
                      <label htmlFor="email">Email address</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        name="password"
                        type="password"
                        onChange={(e) => this.change(e)}
                        value={this.state.password}
                        required={true}
                        className="form-control"
                        id="password"
                        placeholder="Password"
                      />
                      <label htmlFor="password">Password</label>
                    </div>
                    <div className="form-group text-center">
                      <button type="submit" className="btn btn-primary btn-lg">
                        Login
                      </button>
                    </div>
                  </div>
                </form>
                <div className="text-center">
                  <p>
                    <a href="/forgot_password">Forgot Password?</a>
                  </p>
                </div>
                <div className="text-center">
                  <p>
                    Don't have an account? <a href="/signup">Sign up</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function WithNavigate(props) {
  let navigate = useNavigate();
  useEffect(() => {
    if (getJWT()) {
      navigate("/");
    }
  });
  return <Login {...props} navigate={navigate} />;
}
export default WithNavigate;
