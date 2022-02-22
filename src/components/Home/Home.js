import React from "react";
import "../ResetPassword/resetPassword.css";
import { useEffect, useState } from "react";
import axios from "../../utils/ajax-helper";
import Navbar from "../Navbar/Navbar";
import ProductList from "./ProductList";
import ErrorAlert from "../Common/ErrorAlert";
import { Carousel, Card } from "react-bootstrap";

const Home = () => {
  let [featuredProducts, setfeaturedProducts] = useState([]);
  const [currPage, setCurrPage] = useState(null);
  const [lastPage, setLastPage] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [message, setMessage] = useState(null);
  const [imgArray, setimgArray] = useState([]);

  const handlePagination = (page) => {
    axios
      .get(`/featured_products?page=${page}`)
      .then((res) => {
        setfeaturedProducts(res.data.featuredProducts);
        setimgArray(res.data.imgArray);
        setCurrPage(res.data.currPage);
      })
      .catch((err) => {
        setErrorMsg("Sorry! Something went wrong. Please Try again", err);
      });
  };
  useEffect(async () => {
    axios
      .get("/featured_products")
      .then((res) => {
        setCurrPage(res.data.currPage);
        setLastPage(res.data.lastPage);
        setTotalPages(res.data.totalPages);
        if (res.data.featuredProducts.length == 0) {
          setMessage(
            "Sorry !! We don't have any products show ,Please ask admin to add products"
          );
        }
        setfeaturedProducts(res.data.featuredProducts);
        setimgArray(res.data.imgArray);
      })
      .catch((err) => {
        setErrorMsg("Sorry! Something went wrong. Please Try again", err);
      });
  }, []);

  return (
    <div>
      {message && (
        <Card className="messageCard">
          <h1>{message}</h1>
        </Card>
      )}
      <div>
        <Navbar />
        {errorMsg && <ErrorAlert msg={errorMsg} />}
        {featuredProducts && (
          <div>
            <Carousel>
              {imgArray &&
                imgArray.map((imageUrl) => {
                  return (
                    <Carousel.Item interval={1000}>
                      <img
                        className="d-block w-100"
                        src={imageUrl}
                        className="imageSlide"
                      />
                    </Carousel.Item>
                  );
                })}
            </Carousel>

            <div className="mainContainer">
              <ProductList
                featuredProducts={featuredProducts}
                currPage={currPage}
                lastPage={lastPage}
                totalPages={totalPages}
                handlePagination={handlePagination}
                setfeaturedProducts={setfeaturedProducts}
                setCurrPage={setCurrPage}
                imgArray={imgArray}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
