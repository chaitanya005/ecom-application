import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "../../../utils/ajax-helper";
import ErrorMessages from "./ErrorMessages";
import Pagination from "../Categories/Pagination";
import "../css/pagination.css"
  const DisplayProducts = ({}) => {
  const [display, setdisplay] = useState([]);
  const[Errormsg, setErrormsg]= useState(null);
  const [currPage, setCurrPage] = useState(null);
  const [lastPage, setLastPage] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  useEffect(() => {
    axios
      .get("/admin/products")
      .then((res) => {
        setdisplay(res.data.products);
        setCurrPage(res.data.currPage);
        setLastPage(res.data.lastPage);
        setTotalPages(res.data.totalPages);
      })
      .catch((err) => {
        setErrormsg("Sorry! Something went wrong. Please Try again");
      });
  }, []);
  const handlePagination = (page) => {
    axios
      .get(`/admin/products?page=${page}`)
      .then((res) => {
        setdisplay(res.data.products);
        setCurrPage(res.data.currPage);
      })
      .catch((err) => {
        setErrormsg("Sorry! Something went wrong. Please Try again");
      });
  };
  const deleteProduct = (id,variantid,name) => { //delproduct
    if (window.confirm(`Are you sure! Delete ${name} Product?`)) {
      axios
        .delete("/delete_product", { params: { id }})
        .then((res) => {
          console.log("ooo",{params: {variantid}})
          let newProducts = [...display];
          newProducts = newProducts.filter(
            (product) => product.id !== id
          );
          setdisplay(newProducts);
        })
        .catch((err) => {
          setErrormsg(`Sorry! Couldn't delete product ${name}`);
        });
    }
  };
 
  return (
    <div className="main-panel">
   <div className="content-wrapper">
    <div className="contanier">
    <div class="col-lg-12 grid-margin stretch-card">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">Products </h4>
          <p class="card-description">Listed Products</p>
          <div class="table-responsive">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {display.map(display=>(
                 <tr>
                   <td className="py1">
                     {display.name}
                   </td>
                   <td>
                     {display.description}
                   </td>
                   <td>
                     {display.price}
                   </td>
                   <td>
                   <a href={`/admin/products/${display.id}/view`} type="button" class="btn btn-info btn-small mr-2"><i class="fas fa-eye"></i> View</a>
                   <a href={`/admin/product/${display.id}/update`} type="button" class="btn btn-light btn-small mr-2"><i class="fas fa-edit"></i> Edit</a>
                   <a  type="button" onClick={()=>deleteProduct(display.id ,display.variantid, display.name)} class="btn btn-danger btn-small"><i class="fas fa-trash"></i> Delete</a>
                   </td>
                 </tr> 
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>     
    </div>
    <Pagination
        currPage={currPage}
        lastPage={lastPage}
        totalPages={totalPages}
        handlePagination={handlePagination}
      />
    </div>
    </div>
    </div>
  );
};
export default DisplayProducts;
