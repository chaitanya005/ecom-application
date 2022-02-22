import React from "react";
import "../../Home/pagination-style.css";
import Pagination from "../../Home/Pagination";
import axios from "../../../utils/ajax-helper";

const GetFeaturedProducts = ({
  featuredProducts,
  currPage,
  lastPage,
  totalPages,
  handlePagination,
  setfeaturedProducts,
  setErrorMsg,
}) => {
  const handleDelete = (id, name) => {
    if (
      window.confirm(`Are you sure! Delete ${name} from Featured Product list?`)
    ) {
      axios
        .delete(`/admin/featured_products/${id}/delete`)
        .then((res) => {
          let newFeaturedProduct = [...featuredProducts];
          newFeaturedProduct = newFeaturedProduct.filter(
            (featuredProduct) => featuredProduct.id !== id
          );
          setfeaturedProducts(newFeaturedProduct);
          setErrorMsg("Delete successfull!!!!!!!");
          setTimeout(() => {
            setErrorMsg(null);
          }, 6000);
        })
        .catch((err) => {
          setErrorMsg("Sorry! You can't delete this featured product");
          setTimeout(() => {
            setErrorMsg(null);
          }, 6000);
        });
    }
  };

  return (
    <>
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Featured Products</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {featuredProducts &&
                    featuredProducts.map((featuredProduct) => (
                      <React.Fragment key={featuredProduct.id}>
                        <tr key={featuredProduct.id}>
                          <td>{featuredProduct.name}</td>
                          <td>
                            <button
                              className="btn btn-danger"
                              onClick={() =>
                                handleDelete(
                                  featuredProduct.id,
                                  featuredProduct.name
                                )
                              }
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      </React.Fragment>
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
    </>
  );
};

export default GetFeaturedProducts;
