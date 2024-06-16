import TableRow from "./TableRow";
import { PropTypes } from "prop-types";

function Table({
  onDelete,
  onEditId,
  isEditId,
  onEditBlur,
  filteredDataAndSliced,
  currentPage,
  onPaginate,
}) {
  //   const nullish = null;
  //   console.log(nullish === isEditId);
  return (
    <table className="border-collapse">
      <thead>
        <tr>
          <th>Name</th>
          <th>Gender</th>
          <th>Age</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {filteredDataAndSliced.map((oneData) => (
          <TableRow
            key={oneData?.id}
            oneData={oneData}
            onDelete={onDelete}
            onEditId={onEditId}
            isEditId={isEditId}
            onEditBlur={onEditBlur}
            filteredDataAndSliced={filteredDataAndSliced}
            currentPage={currentPage}
            onPaginate={onPaginate}
          />
        ))}
      </tbody>
    </table>
  );
}

Table.propTypes = {
  filteredDataAndSliced: PropTypes.array,
  onDelete: PropTypes.func,
  onEditId: PropTypes.func,
  onEditBlur: PropTypes.func,
  isEditId: PropTypes.oneOfType([
    PropTypes.number, // Allow isEditId to be a number
    PropTypes.oneOf([null]), // Allow isEditId to be null
  ]),
  currentPage: PropTypes.number,
  onPaginate: PropTypes.func,
};

export default Table;
