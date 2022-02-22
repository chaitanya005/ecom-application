import axios from "../../utils/ajax-helper";
import React from "react";
import { useParams } from "react-router-dom";
import { getJWT } from "../../utils/jwt";
export default function Add() {
  // add product to cart in server and redirect to cart component
  const id = useParams().id;
  const [errorMsg, setErrorMsg] = React.useState(null);
  console.log("id", id);
  axios
    .get(`/cart/add/${id}`, {
      headers: {
        authorization: `Bearer ${getJWT()}`,
      },
    })
    .then((res) => {
      console.log(res);
      window.location.href = "/cart";
    })
    .catch((err) => {
      console.log(err);
      setErrorMsg("Sorry! Something went wrong. Please Try again");
    });
  return (
    <div>
      {errorMsg ? (
        <div>{errorMsg}</div>
      ) : (
        <div>
          <h1>Adding........</h1>
        </div>
      )}
    </div>
  );
}
