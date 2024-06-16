import { useReducer, useState, useEffect } from "react";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Pagination from "./ui/Pagination";
import Table from "./ui/Table";
import Select from "./ui/Select";

const initialState = [];

function reducer(state, action) {
  switch (action.type) {
    case "add":
      return [
        ...state,
        {
          id: action.payload.id,
          name: action.payload.name,
          gender: action.payload.gender,
          age: action.payload.age,
        },
      ];

    case "delete":
      return state.filter((data) => data.id !== action.payload);

    case "edit":
      return state.map((data) =>
        data.id === action.payload.id
          ? { ...data, ...action.payload.updateData }
          : data
      );
    default:
      return state;
  }
}

const ITEMS_PER_PAGE = 2;
function DataTable() {
  const [formData, setFormData] = useState({ name: "", gender: "", age: "" });
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isEditId, setIsEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  //Derived state
  // string includes() method is case sensitive
  const filteredBySearchTerm = state.filter((data) =>
    data.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const zeroBasedIndexLastItemOnCurrentPage = currentPage * ITEMS_PER_PAGE;
  const zeroBasedIndexFirstItemOnCurrentPage =
    zeroBasedIndexLastItemOnCurrentPage - ITEMS_PER_PAGE;

  const filteredBySearchTermAndSliced = filteredBySearchTerm.slice(
    zeroBasedIndexFirstItemOnCurrentPage,
    zeroBasedIndexLastItemOnCurrentPage
  );

  console.log({ filteredBySearchTerm, filteredBySearchTermAndSliced });

  //Whenever i'm on page 2 or 3 and so on. If i search for something on page 1, the filteredBySearchTermSliced array becomes empty. so solve this we use the useEffect hook to automatically set the current page to the first every time we filter by name
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  function handleFormDataChange(e) {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.name === "age" ? +e.target.value : e.target.value,
    });
  }
  function handleAdd() {
    // Add formData if all input fields has a value
    if (formData.age && formData.gender && formData.age) {
      dispatch({
        type: "add",
        payload: {
          id: Date.now(),
          name: formData.name,
          gender: formData.gender,
          age: formData.age,
        },
      });
    }

    //reset input fields
    setFormData({ name: "", gender: "", age: "" });
  }

  function handleSearchTerm(e) {
    setSearchTerm(e.target.value);
  }

  return (
    <div className="flex flex-col items-center gap-3 p-3">
      <div className="flex flex-wrap justify-center gap-3">
        <Input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleFormDataChange}
        />
        <Select value={formData.gender} onChange={handleFormDataChange} />
        <Input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleFormDataChange}
        />
      </div>
      <div>
        <Button className=" text-black bg-[#73addf]" onClick={handleAdd}>
          Add
        </Button>
      </div>
      <div className="flex flex-col justify-start gap-3 mt-14">
        <Input
          type="text"
          name="search-name"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearchTerm}
          className="w-[200px]"
        />
        <Table
          filteredDataAndSliced={filteredBySearchTermAndSliced}
          onDelete={dispatch}
          onEditId={setIsEditId}
          isEditId={isEditId}
          onEditBlur={dispatch}
          currentPage={currentPage}
          onPaginate={setCurrentPage}
        />
        <Pagination
          filteredBySearchTerm={filteredBySearchTerm}
          itemsPerPage={ITEMS_PER_PAGE}
          onPaginate={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}

export default DataTable;

/*

The logic you've provided calculates indices for slicing an array to display a subset of items based on the current page and the number of items per page. However, there seems to be a misunderstanding in the calculation of `zeroIndexOfFirstItemPerPage`. Let's correct and simplify the logic:

Given:
- `currentPage`: The current page number (starting from 1).
- `ITEMS_PER_PAGE`: The number of items to show per page.

The goal is to calculate the indices for slicing the array to get the items for the current page. The corrected calculations should be:

1. **Index of the First Item on the Current Page** (`zeroBasedIndexFirstItemOnCurrentPage`): This is simply `(currentPage - 1) * ITEMS_PER_PAGE`. Subtracting 1 from `currentPage` accounts for the fact that pages are 1-indexed but arrays are 0-indexed.

2. **Index of the Last Item on the Current Page** (`zeroBasedIndexLastItemOnCurrentPage`): This is calculated as `zeroBasedIndexFirstItemOnCurrentPage + ITEMS_PER_PAGE - 1`. Adding `ITEMS_PER_PAGE - 1` gives us the index of the last item on the current page.

Here's how you can adjust your code:

```javascript
const [currentPage, setCurrentPage] = useState(1);

// Corrected calculations
const zeroBasedIndexFirstItemOnCurrentPage = (currentPage - 1) * ITEMS_PER_PAGE;
const zeroBasedIndexLastItemOnCurrentPage = zeroBasedIndexFirstItemOnCurrentPage + ITEMS_PER_PAGE - 1;

// If you still need the zero-based index for the first item on the next page
const zeroIndexOfFirstItemOnNextPage = zeroBasedIndexFirstItemOnCurrentPage + ITEMS_PER_PAGE;
```

This approach correctly calculates the indices for slicing the array to display the items for the current page, taking into account that arrays are 0-indexed while pages are 1-indexed.

*/
