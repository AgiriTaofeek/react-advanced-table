import PropTypes from "prop-types";

function Button({ children, className, onClick }) {
  return (
    <button className={`${className} px-3 py-1 rounded-md`} onClick={onClick}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
