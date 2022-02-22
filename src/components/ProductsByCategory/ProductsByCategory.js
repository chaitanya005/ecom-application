// display products by category with get id from params
import axios from "../../utils/ajax-helper";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProductsByCategory.css";
import { FaHeart } from "react-icons/fa";
import Navbar from "../Navbar/Navbar";
import "bootstrap/dist/css/bootstrap.css";

import {
  Card,
  Button,
  Col,
  Container,
  Row,
  Carousel,
  Nav,
} from "react-bootstrap";
const BASE_URL = process.env.REACT_APP_BASE_URL;
export default function ProductsByCategory() {
  const [products, setProducts] = React.useState([]);
  const [filteredProducts, setFilteredProducts] = React.useState([]);
  const [errorMsg, setErrorMsg] = React.useState(null);
  const [searchItem, setSearchItem] = React.useState([]);
  const [options, setOptions] = React.useState([]);
  const [minPrice, setMinPrice] = React.useState(null);
  const [maxPrice, setMaxPrice] = React.useState(null);
  const [range, setRange] = React.useState(null);
  const [secondRange, setSecondRange] = React.useState(null);
  const [prices, setPrices] = React.useState([]);
  const [filterCategories, setFilterCategories] = React.useState([]);
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [searchInput, setSearchInput] = React.useState(null);
  const [showFilters, setShowFilters] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState(null);
  const categoryId = useParams().category;
  // console.log("categoryId", categoryId);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/products/category/${categoryId}`);
        getPriceRanges(data);
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        setErrorMsg("Sorry! Something went wrong. Please Try again", error);
      }
    };
    fetchData();
  }, [categoryId]);

  const getPriceRanges = (data) => {
    let minPrice = Number.POSITIVE_INFINITY;
    let maxPrice = Number.NEGATIVE_INFINITY;
    for (let item of data) {
      if (item.price < minPrice) minPrice = item.price;
      if (item.price > maxPrice) maxPrice = item.price;
    }
    setMinPrice(minPrice);
    setMaxPrice(maxPrice);
    const firstRange = data.reduce((a, b) => {
      return Math.abs(b.price - 2500) < Math.abs(a.price - 2500)
        ? b.price <= 2500
          ? b
          : a
        : a.price <= 2500
        ? a
        : b;
    });
    const secondRange = data.reduce((a, b) => {
      return Math.abs(b.price - 5000) < Math.abs(a.price - 5000)
        ? b.price <= 5000
          ? b
          : a
        : a.price <= 5000
        ? a
        : b;
    });
    setRange(firstRange.price);
    setSecondRange(secondRange.price);
  };

  const handleSearch = (value) => {
    axios
      .get(`/typeahead-items?search_keyword=${value}`)
      .then((res) => {
        let array = res.data.map(({ id, name }) => ({
          label: name,
          value: id,
        }));
        setOptions(array);
      })
      .catch((err) => console.log(err));
  };

  const handleSearchFilter = (value) => {
    getProductsBySearch(value);
  };

  const getProductsBySearch = (searchVal) => {
    setSearchValue(searchVal);
    axios
      .get(`/filter-products?search_keyword=${searchVal}`)
      .then((res) => {
        setProducts(res.data.row);
        setFilteredProducts(res.data.row);
        setShowFilters(true);
        setSelectedCategory(null);
        let filterCategories = [];
        for (let item of res.data.row) {
          filterCategories.push({ id: item.category_id, name: item.category });
        }
        let result = filterCategories.reduce((unique, item) => {
          if (
            !unique.some((obj) => obj.id === item.id && obj.name === item.name)
          ) {
            unique.push(item);
          }
          return unique;
        }, []);
        getPriceRanges(res.data.row);
        setFilterCategories(result);
      })
      .catch((err) =>
        setErrorMsg("Sorry! Something went wrong. Please Try again", err)
      );
  };

  useEffect(() => {
    if (searchItem.length > 0) {
      getProductsBySearch(searchItem[0].label);
    }
  }, [searchItem]);

  const handlePrice = (e, min, max) => {
    if (e.target.checked) {
      prices.push(min);
      prices.push(max);
    } else {
      let indexOne = prices.indexOf(min);
      prices.splice(indexOne, 1);
      let indexTwo = prices.indexOf(max);
      prices.splice(indexTwo, 1);
    }

    let priceFilteredProducts = [];
    if (prices.length > 0) {
      for (let item of products) {
        if (
          item.price >= Math.min(...prices) &&
          item.price <= Math.max(...prices)
        ) {
          priceFilteredProducts.push(item);
        }
      }
      setFilteredProducts(priceFilteredProducts);
    } else {
      setFilteredProducts(products);
    }
  };

  const handleCategoryFilter = (e) => {
    setSelectedCategory(e.target.value);
    axios
      .get(
        `/filter-products?category_id=${e.target.value}&&search_keyword=${searchValue}`
      )
      .then((res) => {
        setProducts(res.data.row);
        getPriceRanges(res.data.row);
        setFilteredProducts(res.data.row);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Navbar
        handleSearch={handleSearch}
        handleSearchFilter={handleSearchFilter}
        searchItem={searchItem}
        setSearchItem={setSearchItem}
        options={options}
        placeholder={"Search for products"}
        setSearchInput={setSearchInput}
        searchInput={searchInput}
      />
      {/* <h1>Products By Category</h1> */}

      <br />
      {errorMsg ? <div className="alert alert-danger">{errorMsg}</div> : <></>}

      <div>
        <Container>
          <h1>Products By Category</h1>
          <div className="row">
            {errorMsg ? (
              <div className="alert alert-danger">{errorMsg}</div>
            ) : (
              <></>
            )}
            {/* {products.length > 0
            ? products.map((product) => (
                <div className="col-md-4" key={product.id}>
                  <div className="card mb-4 shadow-sm card-width">
                    <img
                      src={BASE_URL + "/" + product.image_url}
                      className="card-img-top card-img"
                      alt="product"
                    />
                    <div className="card-body">
                      <p className="card-text">{product.name}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="text-muted">${product.price}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : null} */}
            {showFilters && (
              <div className="col-4">
                <aside className="ml-2">
                  <div className="card" style={{ display: "contents" }}>
                    <article className="card-group-item">
                      <header className="card-header">
                        <h6 className="title">Category Filters</h6>
                      </header>
                      <div className="filter-content">
                        <div className="card-body">
                          {filterCategories &&
                            filterCategories.map((filterCategory) => (
                              <label
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                }}
                              >
                                <input
                                  type="radio"
                                  value={filterCategory.id}
                                  style={{
                                    width: "1rem",
                                    height: "1rem",
                                    marginRight: "0.3rem",
                                  }}
                                  checked={
                                    selectedCategory == filterCategory.id
                                  }
                                  onChange={(e) => handleCategoryFilter(e)}
                                />
                                {filterCategory.name}
                              </label>
                            ))}
                        </div>
                      </div>
                    </article>

                    <article className="card-group-item">
                      <header className="card-header">
                        <h6 className="title">Price Filter</h6>
                      </header>
                      <div class="filter-content">
                        <div class="card-body">
                          {minPrice !== range ? (
                            <div class="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                class="custom-control-input"
                                id="Check1"
                                onChange={(e) =>
                                  handlePrice(e, minPrice, range)
                                }
                              />
                              <label
                                class="custom-control-label"
                                for="Check1"
                                style={{ paddingTop: "3px" }}
                              >
                                {minPrice} - {range}
                              </label>
                            </div>
                          ) : (
                            ""
                          )}

                          {range !== secondRange ? (
                            <div class="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                class="custom-control-input"
                                id="Check2"
                                onChange={(e) =>
                                  handlePrice(e, range, secondRange)
                                }
                              />
                              <label
                                class="custom-control-label"
                                for="Check2"
                                style={{ paddingTop: "3px" }}
                              >
                                {range} - {secondRange}
                              </label>
                            </div>
                          ) : (
                            " "
                          )}

                          {maxPrice > 5000 && (
                            <div class="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                class="custom-control-input"
                                id="Check3"
                                onChange={(e) => handlePrice(e, 5000, maxPrice)}
                              />
                              <label
                                class="custom-control-label"
                                for="Check3"
                                style={{ paddingTop: "3px" }}
                              >
                                5000 & above
                              </label>
                            </div>
                          )}
                        </div>
                      </div>
                    </article>
                  </div>
                </aside>
              </div>
            )}

            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Col>
                  {/* {console.log(product)} */}

                  <Card className="listCard">
                    <Card.Img
                      variant="top"
                      src={BASE_URL + "/" + product.image_url}
                      className="imgSlide"
                    />
                    <Card.Body>
                      <Card.Title className="featuredProductName">
                        {product.name}{" "}
                      </Card.Title>
                      <Card.Text className="iconText">
                        <FaHeart className="icon" />
                      </Card.Text>
                      <br />
                      <Card.Text className="featuredProductContent">
                        {product.description}
                      </Card.Text>
                      <Card.Text className="featuredProductContent">
                        Price : Rs.{product.price}
                      </Card.Text>
                      {/* onclick redict to cart/add/id */}
                      <Button
                        className="cartButton"
                        variant="primary"
                        href={`/cart/add/${product.variant_id}`}
                      >
                        Add to cart
                      </Button>
                      <br />
                      <a
                        className="viewProduct"
                        href={`/product/view/${product.id}`}
                      >
                        View Product
                      </a>
                    </Card.Body>
                  </Card>
                  <br />
                </Col>
              ))
            ) : (
              // show no products found in category
              <div className="noProducts">
                <h1>No Products Found in the category</h1>
              </div>
            )}
          </div>
        </Container>
      </div>
    </>
  );
}
