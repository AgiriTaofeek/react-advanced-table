import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Button from "./Button";

function TableRow({
  oneData,
  onDelete,
  onEditId,
  isEditId,
  onEditBlur,
  filteredDataAndSliced,
  currentPage,
  onPaginate,
}) {
  const trRef = useRef(null); // Ref for table row

  function handleDelete(id) {
    //When you delete all items from a page other than the first page, automatically go back to the previous page
    if (filteredDataAndSliced.length === 1 && currentPage !== 1) {
      onPaginate((prev) => prev - 1);
    }
    onDelete({
      type: "delete",
      payload: id,
    });
  }

  function handleEdit(id) {
    onEditId(id);
  }

  function handleEditBlur(id, data) {
    //return if isEditId is an empty string or if isEditId is not equal to the id of the td element
    if (!isEditId || isEditId !== id) return;

    onEditBlur({
      type: "edit",
      payload: {
        id,
        updateData: data,
      },
    });
  }

  useEffect(() => {
    if (!isEditId) return;

    let selectedItem = document.querySelectorAll(`[id='${isEditId}']`);
    console.log(selectedItem);
    if (selectedItem.length > 0) selectedItem[0].focus();
  }, [isEditId]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (trRef.current && !trRef.current.contains(e.target)) {
        onEditId(null);
      }
    }

    // A mousedown event is fired when the mouse button is pressed but before it is released while the click event is fired after the mousedown and mouseup events.
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [onEditId]);

  return (
    <tr ref={trRef}>
      {/* id added for edit functionality by selecting DOM element*/}
      <td
        id={oneData?.id}
        contentEditable={isEditId === oneData?.id}
        suppressContentEditableWarning={true}
        onBlur={(e) =>
          handleEditBlur(oneData?.id, { name: e.target.innerText })
        }
      >
        {oneData?.name}
      </td>
      <td
        id={oneData?.id}
        contentEditable={isEditId === oneData?.id}
        suppressContentEditableWarning={true}
        onBlur={(e) =>
          handleEditBlur(oneData?.id, { gender: e.target.innerText })
        }
      >
        {oneData?.gender}
      </td>
      <td
        id={oneData?.id}
        contentEditable={isEditId === oneData?.id}
        suppressContentEditableWarning={true}
        onBlur={(e) =>
          handleEditBlur(oneData?.id, { age: +e.target.innerText })
        }
      >
        {oneData?.age}
      </td>
      <td className="flex flex-wrap items-center justify-center gap-2 sm:flex-nowrap">
        <Button
          className="text-white uppercase bg-[#73aadf]"
          onClick={() => handleEdit(oneData?.id)}
        >
          Edit
        </Button>
        <Button
          className="text-white uppercase bg-red-400"
          onClick={() => handleDelete(oneData?.id)}
        >
          Delete
        </Button>
      </td>
    </tr>
  );
}

TableRow.propTypes = {
  oneData: PropTypes.object,
  onDelete: PropTypes.func,
  onEditId: PropTypes.func,
  onEditBlur: PropTypes.func,
  isEditId: PropTypes.oneOfType([PropTypes.number, PropTypes.oneOf([null])]),
  filteredDataAndSliced: PropTypes.array,
  currentPage: PropTypes.number,
  onPaginate: PropTypes.func,
};

export default TableRow;

/*
 Reasons why i didn't use useRef for focus functionality but used it for clickOutside functionality

 Ah, I see what you're asking now. Let's clarify the distinction between needing `useRef` for the `handleClickOutside` functionality versus not needing it explicitly for focusing on an element.

### Focusing on an Element

For focusing on an element, you indeed didn't need to use `useRef` directly in the way you might think. The confusion might stem from the nature of focusing and how it relates to DOM manipulation and React's philosophy.

1. **Direct DOM Manipulation**: Focusing on an element involves directly interacting with the DOM, which is something React tries to abstract away through its virtual DOM. However, in scenarios where direct DOM manipulation is necessary (like focusing on an input field or setting focus elsewhere), React provides APIs like `useRef` to safely bridge this gap.

2. **Why Not Need `useRef` Explicitly?**: When you're focusing on an element, you're essentially performing a direct DOM operation. While you could technically use `useRef` to get a reference to the element you want to focus on, in many cases, you might already have a reference to the element (for example, if it's a controlled component or if you've otherwise kept a reference to it). Alternatively, you might be selecting the element based on its attributes (as in your example with `document.querySelectorAll`). In such cases, `useRef` isn't strictly necessary for the focusing operation itself.

### Handling Clicks Outside of an Element

For the `handleClickOutside` functionality, the necessity of `useRef` becomes clearer:

1. **Detecting External Clicks**: The goal here is to determine if a click happened outside a specific element. To do this efficiently and accurately, you need a stable reference to the boundary element (the table row, in your case). This is because you want to check if the click event's target is contained within this boundary element. Without a stable reference, you'd have to traverse the DOM from the root to find your specific element each time, which is inefficient and error-prone.

2. **Why `useRef` Is Needed**: `useRef` provides a way to persistently refer to the boundary element across renders without causing re-renders itself. This is crucial for the `handleClickOutside` functionality because it needs to perform a comparison (`contains`) between the clicked element and the boundary element on every click event. Having a ref to the boundary element simplifies and optimizes this process.

In summary, for focusing on an element, you might not need `useRef` explicitly if you already have another way to reference the element you want to focus on. For handling clicks outside of an element, `useRef` is essential because it provides a stable, efficient way to reference the boundary element for comparison with the clicked element.


 */
