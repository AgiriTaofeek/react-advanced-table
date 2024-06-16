import PropTypes from "prop-types";

function Select({ value, onChange }) {
  return (
    <select
      className="text-black"
      name="gender"
      id="gender"
      value={value}
      onChange={onChange}
    >
      <option value="">Choose Gender</option>
      <option value="male">Male</option>
      <option value="female">Female</option>
    </select>
  );
}

Select.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default Select;
