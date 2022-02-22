import { AsyncTypeahead } from "react-bootstrap-typeahead";

const TypeAhead = ({
  options,
  handleSearch,
  setSearchItem,
  searchItem,
  isLoading,
  placeholder,
  setSearchInput,
  searchInput,
  handleSearchFilter,
  onEnterSearchItems
}) => {
  return (
    <AsyncTypeahead
      filterBy={() => true}
      id="async-example"
      isLoading={isLoading}
      minLength={3}
      options={options}
      onInputChange={(text, e) => {
        onEnterSearchItems && setSearchInput(text);
        handleSearch(text); 
      }}
      onChange={setSearchItem}
      placeholder={placeholder}
      selected={searchItem}
      onKeyDown={(e) =>
        onEnterSearchItems && e.key === "Enter" ? handleSearchFilter(searchInput) : ""
      }
    />
  );
};

export default TypeAhead;
