import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../../utils/ajax-helper";
import ErrorMessages from "./ErrorMessages";
import toast, { Toaster } from "react-hot-toast";
import "../css/admin-style.css";

const AddForm = () => {
  const navigate = useNavigate();
  const[details , setDetails]= useState({});
  const [categories , setCategories] = useState([]);
  const [fileData, setFileData] = useState([]);
  const [errormsg, setErrormsg] = useState(null);
  const [categoryid, setCategory] = useState('');

  //sending data after usestate dec part
  const submitHandler = async (e) => {
    e.preventDefault();
    const imageData = new FormData();
    imageData.append("file", fileData);
    imageData.append("name", details.name);
    imageData.append("price",  details.price);
    imageData.append("description",  details.description);
    imageData.append("size",  details.size);
    imageData.append("color",  details.color);
    imageData.append("type",  details.type);
    imageData.append("category",  categoryid);
    
    if(Object.keys(details).length == 0){
      setErrormsg("Please Fill The Form First");
      return;
    }
    if (!Object.keys(details).includes("name") || details.name  === "") {
      setErrormsg("Name cannot be empty");
      return;
    }else
    if (categoryid  === "") {
      setErrormsg("Category cannot be empty");
      return;
    }else
    if (!Object.keys(details).includes("price") || details.price  === "") {
      setErrormsg("Price cannot be empty");
      return;
    }
   
    axios
      .post("/admin/products/add", 
        imageData
      )
      .then((res) => {
        toast.success("Product Created Sucessfully!");
        setTimeout(() => {
          navigate("/admin/products");
        }, 1500);
      })
      .catch((err) => {
        setErrormsg("Oppsie! Something went wrong. Please try entering valid data's.");
      });
  };

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
        <div className="row">
          {errormsg && <ErrorMessages msg={errormsg} />}

          <div className="col-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Add Products</h4>
                <p className="card-description">Enter product details</p>

                <form className="forms-sample" onSubmit={submitHandler}>
                  <div className="form-group-name">
                    <label for="exampleInputName1">Name*</label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputName1"
                      placeholder="Name"
                      value={details.name}
                      onChange={(e) => setDetails({...details, name:e.target.value})}
                    />
                  </div>
                  <div className="form-group-img ">
                    <label htmlFor="imageupload">Upload image</label>
                    <input
                      type="file"
                      name="image"
                      onChange={fileChangeHandler}
                    />
                  </div>

                  <div class="form-group ">
                    <label for="exampleFormControlSelect3">Select Size</label>
                    <select className="form-control form-control-sm" id="exampleFormControlSelect3"
                        onChange={(e) => setDetails({...details,size:e.target.value})}>
                      <option value="0">Select product size</option>
                      <option value="XS">XS</option>
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                    </select>
                  </div>
                 
                  <div class="form-group">
                      <label for="Color">Color</label>
                      <input type="text" class="form-control" id="color" placeholder="make it vibrant"
                      value={details.color}
                      onChange={(e) => setDetails({...details,color:e.target.value})}
                      />
                    </div>

                    <div class="form-group-cat">
                      <label for="Category">Category*</label>
                        <select value={categoryid} className='form-control form-control-sm' name='Category' 
                        onChange={(e) => setCategory(e.target.value)}>
                            <option value="0">Select From The Following</option>
                            {categories.map((Category) => {
                                return (
                                    <option  
                                    value={Category.id}>{Category.name}</option>
                                )
                            })}
                        </select>
                    </div>

                    <div class="form-group mt-3">
                      <label for="Type">Type</label>
                      <input type="text" class="form-control" id="type" placeholder="List the type of your product"
                      value={details.type}
                      onChange={(e) => setDetails({...details,type:e.target.value})}
                      />
                    </div>

                  <div className="form-group-pr">
                    <label for="exampleInputPrice1">Price*</label>
                    <input
                      type="integer"
                      className="form-control"
                      id="exampleInputPrice1"
                      placeholder="0"
                      value={details.price}
                      onChange={(e) => setDetails({...details,price:e.target.value})}
                    />
                  </div>
                  <div className="form-group mt-3">
                    <label for="exampleTextarea1">Description</label>
                    <textarea
                      className="form-control"
                      id="exampleTextarea1"
                      rows="4"
                      value={details.description}
                      onChange={(e) => setDetails({...details,description:e.target.value})}
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary mr-2">
                    Submit
                  </button>
                  <button className="btn btn-light">Cancel</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="d-sm-flex justify-content-center justify-content-sm-between">
          <span className="text-muted text-center text-sm-left d-block d-sm-inline-block">
            Copyright © 2021. Premium{" "}
            <a href="https://www.bootstrapdash.com/" target="_blank">
              Bootstrap admin template
            </a>{" "}
            from BootstrapDash. All rights reserved.
          </span>
          <span className="float-none float-sm-right d-block mt-1 mt-sm-0 text-center">
            Hand-crafted & made with{" "}
            <i className="ti-heart text-danger ml-1"></i>
          </span>
        </div>
      </footer>
    </div>
  );
};

export default AddForm;
