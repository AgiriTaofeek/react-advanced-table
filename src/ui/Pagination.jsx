import { PropTypes } from "prop-types";
import Button from "./Button";

function Pagination({
  filteredBySearchTerm,
  itemsPerPage,
  onPaginate,
  currentPage,
}) {
  // Ensure we get an integer number of pages
  const pageCount = Math.ceil(filteredBySearchTerm.length / itemsPerPage);

  // Generate an array of page indices
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  function paginate(page) {
    onPaginate(page);
  }
  return (
    <div className="flex items-center justify-center gap-1">
      {pages.map((page) => (
        <Button
          key={page}
          className={`text-black uppercase bg-orange-200 ${
            currentPage === page ? "bg-orange-400" : ""
          }`}
          onClick={() => paginate(page)}
        >
          {page}
        </Button>
      ))}
    </div>
  );
}

Pagination.propTypes = {
  filteredBySearchTerm: PropTypes.array.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  onPaginate: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Pagination;
