import React from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Row,
  ButtonGroup,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "../../utils/ajax-helper";
import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./address.css";
import { getJWT } from "../../utils/jwt";
import { parseJwt } from "../../utils/jwt";

const Address = () => {
  let [addresses, setAddress] = useState([]);
  let [address_id, setAddress_id] = useState(null);
  const [message, setMessage] = useState(null);
  let decoded = parseJwt(getJWT());
  let [user_id, setUser_id] = useState(decoded.id);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/user/address/${user_id}`)
      .then((res) => {
        if (res.data.length == 0) {
          setMessage("No address found!! Please add new one");
        } else {
          setAddress(res.data);
          setAddress_id(res.data[0].id);
          document.getElementById(res.data[0].id).style.border =
            "solid 2px blue";
        }
      })
      .catch((err) => {
        setMessage("Sorry! Something went wrong. Please Try again", err);
      });
  }, []);

  // ****************************delete address********************//
  const handleDelete = (id) => {
    if (window.confirm(`Are you sure! want to delete selected address?`)) {
      axios
        .delete(`/user/address/${id}/delete`)
        .then((res) => {
          let newAddress = [...addresses];
          newAddress = newAddress.filter((address) => address.id !== id);
          setAddress(newAddress);
          setMessage("Delete successfull!!!!!!!");
          setTimeout(() => {
            setMessage(null);
          }, 6000);
        })
        .catch((err) => {
          setMessage("Sorry! You can't delete this address");
          setTimeout(() => {
            setMessage(null);
          }, 6000);
        });
    }
  };

  // ***********on select *****************//
  const clicked = (id) => {
    setAddress_id(id);
    document.getElementById(id).style.border = "solid 2px blue";
    for (let i = 0; i < addresses.length; i++) {
      if (id != addresses[i].id) {
        document.getElementById(addresses[i].id).style.border = "none";
      }
    }
  };

  // ********************on check out ***************/
  const onCheckOut = (address_id) => {
    navigate(`/checkout/${address_id}`);
  };

  return (
    <React.Fragment>
      <div className="main-panel">
        <div className="content-wrapper">
          <div className="container">
            <a
              href="/user/address/new"
              id="newAddress"
              className="btn btn-dark rounded-pill py-2 btn-block "
            >
              New Address
            </a>
            {addresses.length > 0 && <h2>select an address :</h2>}
            <br />
            <div>
              {message && <h3>{message}</h3>}
              <Container>
                <Row>
                  {addresses &&
                    addresses.map((address) => (
                      <Col className="addressCol">
                        <Card
                          id={address.id}
                          className="addressCard"
                          onClick={() => clicked(address.id)}
                        >
                          <Card.Text className="bolderText">
                            {address.username}
                          </Card.Text>
                          <Card.Text>{address.street}</Card.Text>
                          <Card.Text className="bolderText">
                            {address.city} - {address.pin_code}
                          </Card.Text>
                          <Card.Text>{address.state}</Card.Text>
                          <Card.Text>{address.country}</Card.Text>
                          <ButtonGroup
                            className="me-2"
                            aria-label="First group"
                          >
                            <Button variant="light">
                              {" "}
                              <a href={`/user/address/${address.id}/edit`}>
                                <BiEdit />
                              </a>
                            </Button>{" "}
                            <Button
                              variant="light"
                              onClick={() => handleDelete(address.id)}
                            >
                              {" "}
                              <MdDeleteOutline />
                            </Button>
                          </ButtonGroup>
                        </Card>
                      </Col>
                    ))}
                  {addresses.length > 0 && (
                    <button
                      className="btn btn-dark rounded-pill py-2 btn-block"
                      id="checkOut"
                      onClick={() => onCheckOut(address_id)}
                    >
                      Check out
                    </button>
                  )}
                </Row>
              </Container>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Address;
