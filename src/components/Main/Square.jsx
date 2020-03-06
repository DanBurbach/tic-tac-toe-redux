import React from "react";
import PropTypes from "prop-types";
import "../../assets/css/styles.css";

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

Square.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func
};

export default Square;
