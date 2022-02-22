import React from "react";
import { useEffect, useState } from "react";
import axios from "../../utils/ajax-helper";
import { useNavigate } from "react-router-dom";
import "./address.css";
import { getJWT } from "../../utils/jwt";
import { parseJwt } from "../../utils/jwt";

const NewAddress = () => {
  let [street, setStreet] = useState(null);
  let [city, setCity] = useState(null);
  let [pin_code, setPin_code] = useState(null);
  let [state, setState] = useState(null);
  let [country_id, setCountry_id] = useState(null);
  let decoded = parseJwt(getJWT());
  let [user_id, setUser_id] = useState(decoded.id);
  let [countries, setCountries] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    axios
      .post("/user/address/new", {
        street: street,
        city: city,
        pin_code: pin_code,
        state: state,
        country_id: country_id,
        user_id: user_id,
      })
      .then((res) => {
        navigate("/user/address");
      })
      .catch((err) => {
        setMessage(
          "Oppsie! Something went wrong. Please try entering valid datas"
        );
        navigate("/user/address/new");
      });
  };

  useEffect(() => {
    axios
      .get("/country")
      .then((res) => {
        if (res.data.length == 0) {
          setMessage("no contry is available");
        } else {
          setCountries(res.data);
        }
      })
      .catch((err) => {
        setMessage("Sorry! Something went wrong. Please Try again", err);
      });
  }, []);

  return (
    <React.Fragment>
      <div className="main-panel">
        <div className="content-wrapper">
          <div className="container">
            <form className="forms-sample" onSubmit={submitHandler}>
              <h2>Add new address :</h2>
              <br />
              <div className="form-group">
                <label htmlFor="exampleInputName1">Street</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputName1"
                  placeholder="Street"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputName1">City</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputName1"
                  placeholder="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="exampleInputName1">pin_code</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputName1"
                  placeholder="pin_code"
                  value={pin_code}
                  onChange={(e) => setPin_code(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="exampleInputName1">State</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputName1"
                  placeholder="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
              </div>
              {countries && (
                <div className="form-group">
                  <label htmlFor="country">Country</label>
                  <select
                    value={country_id}
                    className="form-control form-control-sm"
                    name="country"
                    onChange={(e) => setCountry_id(e.target.value)}
                  >
                    <option value="0">Select country</option>
                    {countries.map((country) => {
                      return <option value={country.id}>{country.name}</option>;
                    })}
                  </select>
                </div>
              )}

              <button type="submit" className="btn btn-primary mr-2">
                Submit
              </button>
              <button className="btn btn-light">Cancel</button>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NewAddress;
