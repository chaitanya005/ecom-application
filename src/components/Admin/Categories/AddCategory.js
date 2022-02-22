import React, { useEffect, useState } from "react";
// import { AsyncTypeahead } from "react-bootstrap-typeahead";
import axios from "../../../utils/ajax-helper";
import TypeAhead from "./TypeAhead";

const AddCategory = ({
  category,
  handleFunction,
  input,
  setInput,
  searchItem,
  setSearchItem,
  setIsOpen
}) => {
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (category !== undefined) {
      setInput(category.category);
      if (category.parent_category !== null) {
        setSearchItem([{ label: category.parent_category }]);
      }
    }
  }, [category]);

  const handleSearch = (query) => {
    setIsLoading(true);
    axios
      .get(`/search-categories?search=${query}`)
      .then((res) => {
        let array = res.data.map(({ id, name }) => ({
          label: name,
          value: id,
        }));
        setOptions(array);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <tr>
        <td style={{ border: 0 }}>
          <input
            type="text"
            className="form-control"
            placeholder={"Category Name"}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </td>
        <td style={{ border: 0 }}>
          <TypeAhead
            options={options}
            handleSearch={handleSearch}
            setSearchItem={setSearchItem}
            searchItem={searchItem}
            isLoading={isLoading}
            placeholder={"Choose a Parent Category..."}
          />
        </td>
        <td style={{ border: 0 }}>
          <button
            type="button"
            className={
              "btn btn-primary btn-icon-text mt-1 mr-4 " +
              `${input.length < 3 ? "disabled" : ""}`
            }
            onClick={handleFunction}
          >
            Submit
          </button>
          <button
            type="button"
            className="btn btn-primary btn-icon-text mt-1"
            onClick={() => setIsOpen(null)}
          >
            Cancel
          </button>
        </td>
      </tr>
    </>
  );
};

export default AddCategory;
