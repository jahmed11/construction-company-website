import React from "react";
//import { Label } from "../styled-component/styledComponnets";
const textarea = (props) => {
  return (
    <div>
      <label htmlFor={props.name}>{props.name}</label>
      <textarea
        className="form-control"
        placeholder={props.placeholder}
        name={props.name}
        value={props.value}
        onChange={props.changed}
        rows="4"
        cols="37"
      />
    </div>
  );
};

export default React.memo(textarea);
