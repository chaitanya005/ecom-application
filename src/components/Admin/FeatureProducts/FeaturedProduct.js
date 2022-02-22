import React from "react";
import { useEffect, useState } from "react";
import axios from "../../../utils/ajax-helper";
import "./featuredProduct.css";
import { Typeahead } from "react-bootstrap-typeahead";
import GetFeaturedProducts from "./GetFeaturedProduct";

const FeaturedProduct = () => {
  let [products, setProducts] = useState([]);
  let [featuredProducts, setfeaturedProducts] = useState([]);
  const [currPage, setCurrPage] = useState(null);
  const [lastPage, setLastPage] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [message, setMessage] = useState(null);
  const [input, setInput] = useState([]);
  const [inputArray, setinputArray] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleFunction = () => {
    console.log("inputs :::::", input);
    axios
      .post("/admin/products", {
        name: input,
      })
      .then((res) => {
        getFeaturedProducts();
        setIsOpen(false);
        setMessage(res.data.message);
        setTimeout(() => {
          setMessage(null);
        }, 4000);
      })
      .catch((err) => {
        setMessage("oops !! something went wrong");
        setTimeout(() => {
          setMessage(null);
        }, 4000);
      });
  };

  const handlePagination = (page) => {
    axios
      .get(`/featured_products?page=${page}`)
      .then((res) => {
        setfeaturedProducts(res.data.featuredProducts);
        setCurrPage(res.data.currPage);
      })
      .catch((err) => {
        setErrorMsg("Sorry! Something went wrong. Please Try again", err);
        setTimeout(() => {
          setErrorMsg(null);
        }, 6000);
      });
  };

  useEffect(async () => {
    // *******************products***********//
    axios
      .get("/admin/products")
      .then((res) => {
        setCurrPage(res.data.currPage);
        setLastPage(res.data.lastPage);
        setTotalPages(res.data.totalPages);
        let inputArray = [];
        for (let i = 0; i < res.data.products.length; i++) {
          inputArray.push(res.data.products[i].name);
        }
        console.log("inputArray : ", inputArray);
        setinputArray(inputArray);
        setProducts(res.data.products);
      })
      .catch((err) => {
        setMessage("Sorry! Something went wrong. Please Try again", err);
        setTimeout(() => {
          setMessage(null);
        }, 4000);
      });
    // ****************************featured Products**************//
    getFeaturedProducts();
  }, []);

  function getFeaturedProducts() {
    axios
      .get("/featured_products")
      .then((res) => {
        setCurrPage(res.data.currPage);
        setLastPage(res.data.lastPage);
        setTotalPages(res.data.totalPages);
        if (res.data.featuredProducts.length == 0) {
          setErrorMsg("no featured products");
          setTimeout(() => {
            setErrorMsg(null);
          }, 6000);
        } else {
          setfeaturedProducts(res.data.featuredProducts);
        }
      })
      .catch((err) => {
        setErrorMsg("Sorry! Something went wrong. Please Try again", err);
        setTimeout(() => {
          setErrorMsg(null);
        }, 6000);
      });
  }

  return (
    <React.Fragment>
      <div className="main-panel">
        <div className="content-wrapper">
          <div className="container">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "1%",
                alignItems: "center",
              }}
            >
              <h3>Featured Products</h3>
              <button
                type="button"
                className="btn btn-primary btn-icon-text"
                style={{ height: "fit-content" }}
                onClick={() => setIsOpen(true)}
              >
                Add to featured products
              </button>
            </div>
            {isOpen && (
              <form className="forms-sample">
                <div className="form-group">
                  <table className="table table-hover">
                    {message && (
                      <thead className="messageHead">{message}</thead>
                    )}
                    <tbody>
                      <tr>
                        <td style={{ border: 0 }}>
                          <div class="form-group">
                            <label for="products">Products</label>
                            <Typeahead
                              id="basic-typeahead-multiple"
                              labelKey="name"
                              multiple
                              onChange={setInput}
                              options={inputArray}
                              placeholder="Choose several Products..."
                              selected={input}
                            />
                          </div>
                        </td>
                        <td style={{ border: 0 }}>
                          <button
                            type="button"
                            className="btn btn-primary btn-icon-text mt-1 "
                            onClick={handleFunction}
                          >
                            Submit
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </form>
            )}
            {featuredProducts.length > 0 && (
              <GetFeaturedProducts
                featuredProducts={featuredProducts}
                currPage={currPage}
                lastPage={lastPage}
                totalPages={totalPages}
                handlePagination={handlePagination}
                setfeaturedProducts={setfeaturedProducts}
                setCurrPage={setCurrPage}
                setErrorMsg={setErrorMsg}
              />
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default FeaturedProduct;
