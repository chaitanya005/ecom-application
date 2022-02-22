//  create a react cart component
//  create a react cart item component

import React, { useEffect } from "react";
import "./cart-style.css";
import axios from "../../utils/ajax-helper";
import { getJWT } from "../../utils/jwt";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export default function Cart() {
  // get items for the server and store in state and update in cart component
  const [cartItems, setCartItems] = React.useState([]);
  const [errorMsg, setErrorMsg] = React.useState(null);
  const [total, setTotal] = React.useState(0);

  const getCartItems = () => {
    axios
      .get("/cart", {
        headers: {
          Authorization: `Bearer ${getJWT()}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setCartItems(res.data);
      })
      .catch((err) => {
        setErrorMsg("Sorry! Something went wrong. Please Try again " + err);
      });
  };

  useEffect(() => {
    getCartItems();
  }, []);
  // delete item from cart
  const deleteItem = (id) => {
    axios
      .delete(`/cart/remove/${id}`, {
        headers: {
          Authorization: `Bearer ${getJWT()}`,
        },
      })
      .then((res) => {
        console.log(res);
        getCartItems();
      })
      .catch((err) => {
        setErrorMsg("Sorry! Something went wrong. Please Try again " + err);
      });
  };
  // update item in cart
  const updateItem = (id, quantity) => {
    axios
      .put(`/cart/update/${id}`, {
        quantity: quantity,
      })
      .then((res) => {
        console.log(res);
        getCartItems();
      })
      .catch((err) => {
        setErrorMsg("Sorry! Something went wrong. Please Try again " + err);
      });
  };
  return (
    <>
      <div className="px-4 px-lg-0">
        <div className="pb-5">
          <div className="container">
            {cartItems ? (
              cartItems.length > 0 ? (
                <div className="row">
                  <div className="col-lg-12 p-5 bg-white rounded shadow-sm mb-5">
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col" className="border-0 bg-light">
                              <div className="p-2 px-3 text-uppercase">
                                Product
                              </div>
                            </th>
                            <th scope="col" className="border-0 bg-light">
                              <div className="py-2 text-uppercase">Price</div>
                            </th>
                            <th scope="col" className="border-0 bg-light">
                              <div className="py-2 text-uppercase">
                                Quantity
                              </div>
                            </th>
                            <th scope="col" className="border-0 bg-light">
                              <div className="py-2 text-uppercase">Remove</div>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartItems.map((cart) => (
                            <tr key={cart.cart_id}>
                              <th scope="row" className="border-0">
                                <div className="p-2">
                                  <img
                                    src={BASE_URL + "/" + cart.image_url}
                                    alt="product"
                                    width="70"
                                    className="img-fluid rounded shadow-sm"
                                  />
                                  <div className="ml-3 d-inline-block align-middle">
                                    <h5 className="mb-0">
                                      <a
                                        href={`/product/view/${cart.id}`}
                                        className="text-dark d-inline-block align-middle"
                                      >
                                        {cart.name}
                                      </a>
                                    </h5>
                                  </div>
                                </div>
                              </th>
                              <td className="border-0 align-middle">
                                <strong>${cart.price}</strong>
                              </td>
                              <td className="border-0 align-middle input-quantity">
                                <input
                                  type="number"
                                  className="form-control"
                                  value={cart.quantity}
                                  onChange={(e) =>
                                    updateItem(cart.cart_id, e.target.value)
                                  }
                                />
                              </td>
                              {/* <strong>{cart.quantity}</strong>
                              </td> */}
                              <td className="border-0 align-middle">
                                <button
                                  type="button"
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={() => deleteItem(cart.cart_id)}
                                >
                                  Remove
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ) : (
                // show no products in cart
                <h1>No products in cart</h1>
              )
            ) : (
              // show loading
              <h1>No products in cart</h1>
            )}

            <div className="row py-5 p-4 bg-white rounded shadow-sm">
              <div className="col-lg-6">
                <div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">
                  Coupon code
                </div>
                <div className="p-4">
                  <p className="font-italic mb-4">
                    If you have a coupon code, please enter it in the box below
                  </p>
                  <div className="input-group mb-4 border rounded-pill p-2">
                    <input
                      type="text"
                      placeholder="Apply coupon"
                      aria-describedby="button-addon3"
                      className="form-control border-0"
                    />
                    <div className="input-group-append border-0">
                      <button
                        id="button-addon3"
                        type="button"
                        className="btn btn-dark px-4 rounded-pill"
                      >
                        <i className="fa fa-gift mr-2"></i>Apply coupon
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="bg-light rounded-pill px-4 py-3 text-uppercase font-weight-bold">
                  Order summary{" "}
                </div>
                <div className="p-4">
                  <p className="font-italic mb-4">
                    Shipping and additional costs are calculated based on values
                    you have entered.
                  </p>
                  <ul className="list-unstyled mb-4">
                    <li className="d-flex justify-content-between py-3 border-bottom">
                      <strong className="text-muted">Order Subtotal </strong>
                      <strong>${cartItems[0]?.total || "0.00"}</strong>
                    </li>

                    <li className="d-flex justify-content-between py-3 border-bottom">
                      <strong className="text-muted">Tax</strong>
                      <strong>$0.00</strong>
                    </li>
                    <li className="d-flex justify-content-between py-3 border-bottom">
                      <strong className="text-muted">Total</strong>
                      <h5 className="font-weight-bold">$0.00</h5>
                    </li>
                  </ul>
                  <a
                    href="/user/address"
                    className="btn btn-dark rounded-pill py-2 btn-block"
                  >
                    Procceed
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
