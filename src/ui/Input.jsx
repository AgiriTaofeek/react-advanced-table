import PropTypes from "prop-types";

function Input({ placeholder, name, className, value, onChange, type }) {
  return (
    <input
      className={`px-3 py-1 text-black rounded-sm ${className}`}
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
    />
  );
}

Input.propTypes = {
  name: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  type: PropTypes.string,
};
export default Input;
