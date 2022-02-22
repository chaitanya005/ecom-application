import React, { useEffect, useState } from "react";
import CategoryList from "./CategoryList";
import AddCategory from "./AddCategory";
import axios from "../../../utils/ajax-helper";
import ErrorAlert from "./ErrorAlert";

const Category = () => {
  const [input, setInput] = useState("");
  const [categories, setCategories] = useState(null);
  const [searchItem, setSearchItem] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currPage, setCurrPage] = useState(null);
  const [lastPage, setLastPage] = useState(null);
  const [totalPages, setTotalPages] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleAddCategory = () => {
    if (input.length < 3) {
      return;
    }
    let id = searchItem.length !== 0 ? searchItem[0].value : 0;
    axios
      .post("/category", {
        categoryName: input,
        searchItemId: id,
      })
      .then((res) => {
        setIsOpen(false);
        setSearchItem([]);
        setInput("");
        let newCategory = {
          id: res.data.id,
          category: res.data.name,
          parent_id: res.data.parent_id,
          parent_category: res.data.parent_category || null,
          updated_at: res.data.updated_at,
        };
        let newCategories = [...categories];
        newCategories.splice(0, 0, newCategory);
        setCategories(newCategories);
      })
      .catch((err) => {
        setErrorMsg(
          "Sorry! You can't add Category currently. Please Try again"
        );
      });
  };

  const handlePagination = (page) => {
    axios
      .get(`/categories?page=${page}`)
      .then((res) => {
        setCategories(res.data.categories);
        setCurrPage(res.data.currPage);
      })
      .catch((err) => {
        setErrorMsg("Sorry! Something went wrong. Please Try again");
      });
  };

  useEffect(() => {
    axios
      .get("/categories")
      .then((res) => {
        setCurrPage(res.data.currPage);
        setLastPage(res.data.lastPage);
        setTotalPages(res.data.totalPages);
        setCategories(res.data.categories);
      })
      .catch((err) => {
        setErrorMsg("Sorry! Something went wrong. Please Try again");
      });
  }, []);

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
              <h1>Categories</h1>
              <button
                type="button"
                className="btn btn-primary btn-icon-text"
                style={{ height: "fit-content" }}
                onClick={() => setIsOpen(true)}
              >
                Add Category
              </button>
            </div>
            {isOpen && (
              <form className="forms-sample">
                <div className="form-group">
                  <table className="table table-hover">
                    <tbody>
                      <AddCategory
                        input={input}
                        setInput={setInput}
                        handleFunction={handleAddCategory}
                        searchItem={searchItem}
                        setSearchItem={setSearchItem}
                        setIsOpen={setIsOpen}
                      />
                    </tbody>
                  </table>
                </div>
              </form>
            )}
            {errorMsg && <ErrorAlert msg={errorMsg} />}
            <CategoryList
              categories={categories}
              currPage={currPage}
              lastPage={lastPage}
              totalPages={totalPages}
              handlePagination={handlePagination}
              setCategories={setCategories}
              setCurrPage={setCurrPage}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Category;
