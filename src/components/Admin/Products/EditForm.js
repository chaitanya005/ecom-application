import React, { useState, useEffect } from "react";
import axios from "../../../utils/ajax-helper";
import ErrorMessages from "./ErrorMessages";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export const EditForm = (props) => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [errormsg, setErrormsg] = useState(null);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [fileData, setFileData] = useState([]);
  const [description, setDescription] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [type, setType] = useState("");
  const [categoryName , setCategoryName]=useState("");
  const [categoryid, setCategory] = useState("");
  const [productId, setProductId] = useState("");
  const [variantId, setVariantId] = useState("");

  const updateProduct = (e) =>{
    e.preventDefault();
    const imageData = new FormData();
    imageData.append("file", fileData);
    imageData.append("name", name);
    imageData.append("price", price);
    imageData.append("description", description);
    imageData.append("size", size);
    imageData.append("color", color);
    imageData.append("type", type);
    imageData.append("category", categoryid);
    imageData.append("id",productId);
    imageData.append("variantId",variantId);
    if (name == "") {
      setErrormsg("Name cannot be empty");
      return;
    }
    if (price == "") {
      setErrormsg("Price cannot be empty");
      return;
    }
    if (categoryid == "") {
      setErrormsg("Please select a category");
      return;
    }
    axios
      .put("/admin/product/edit", 
        imageData,
      )
      .then((res) => {
        toast.success("Product Updated Sucessfully!");
        setTimeout(() => {
          navigate("/admin/products");
        }, 1500);
      })
      .catch((err) => {
        setErrormsg("Sorry! Couldn't update your product.Please try again");
      });
  }
  useEffect(() => {
    axios
      .get(`/admin/product/${props.id}`)
      .then((res) => {
        setName(res.data.name);
        setSize(res.data.size);
        setColor(res.data.color);
        setCategory(res.data.category);
        setType(res.data.type);
        setCategoryName(res.data.categoryname);
        setPrice(res.data.price);
        setDescription(res.data.description);
        setProduct(res.data);
        setVariantId(res.data.variant_id);
        setProductId(props.id);
      })
      .catch((err) => {
        setErrormsg("Sorry! Something went wrong. Please Try again");
      });
  }, []);
  useEffect(() => {
    axios
      .get("/admin/products/add")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        setErrormsg("Oopps! Something went wrong. Please Try again", err);
      });
  }, []);
  const fileChangeHandler = (e) => {
    setFileData(e.target.files[0]);
  };

  return (
    <div className="main-panel">
       <Toaster />
      <div className="content-wrapper">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/admin/products">Home</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Updation
            </li>
          </ol>
        </nav>
        <div className="row">
          {errormsg && <ErrorMessages msg={errormsg} />}

          <div className="col-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Add Products</h4>
                <p className="card-description">Enter product details</p>

                <form className="forms-sample">
                  <div className="form-group">
                    <label for="exampleInputName1">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputName1"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="imageupload">Upload image</label>
                    <input type="file" name="image" 
                     onChange={fileChangeHandler}/>
                  </div>

                  <div className="form-group ">
                    <label for="exampleFormControlSelect3">Select Size</label>
                    <select
                      className="form-control form-control-sm"
                      id="exampleFormControlSelect3"
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                    >
                      <option value="XS">XS</option>
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label for="Color">Color</label>
                    <input
                      type="text"
                      className="form-control"
                      id="color"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label for="category">Category</label>
                    <select
                      className="form-control form-control-sm"
                      name="category"
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="0">{categoryName}</option>
                      {categories.map((category) => {
                        return (
                          <option value={category.id}>{category.name}</option>
                        );
                      })}
                    </select>
                  </div>

                  <div className="form-group">
                    <label for="Type">Type</label>
                    <input
                      type="text"
                      className="form-control"
                      id="type"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label for="exampleInputPrice1">Price</label>
                    <input
                      type="integer"
                      className="form-control"
                      id="exampleInputPrice1"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label for="exampleTextarea1">Description</label>
                    <textarea
                      className="form-control"
                      id="exampleTextarea1"
                      rows="4"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                  <button
                    className="btn btn-primary mr-2"
                    onClick={(e) => updateProduct(e, product.id)}
                  >
                    Update
                  </button>
                  <button className="btn btn-light" onClick={(e)=> navigate('/admin/products')}>Cancel</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
