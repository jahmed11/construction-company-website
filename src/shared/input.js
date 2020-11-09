import React from "react";

const input = (props) => {
  return (
    <div className="form-group">
      <label htmlFor={props.name}>{props.name}</label>
      <input
        className="form-control"
        type={props.type}
        placeholder={props.placeholder}
        name={props.name}
        value={props.value}
        onChange={props.changed}
        readOnly={props.readOnly}
      />
    </div>
  );
};

export default React.memo(input);
