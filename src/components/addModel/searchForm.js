import React from "react";
import Input from "../../shared/input";

const searchForm = (props) => {
  return (
    <div className="col-lg-6 col-sm-12">
      <Input
        type="text"
        name="Short Address"
        placeholder="Short Address"
        value={props.shortAddress}
        changed={props.changed}
      />
      <Input
        type="text"
        name="City"
        placeholder="city"
        value={props.city}
        changed={props.changed}
      />
      <Input
        type="text"
        name="State"
        placeholder="State"
        value={props.state}
        changed={props.changed}
      />
      <Input
        type="text"
        name="ZipCode"
        placeholder="Zipcode"
        value={props.zipCode}
        changed={props.changed}
      />
      <Input
        style={{ display: "inline-block" }}
        type="text"
        name="Latitude"
        placeholder="Latitude"
        value={props.lat}
        changed={props.changed}
      />
      <Input
        type="text"
        name="longitude"
        placeholder="longitude"
        value={props.lng}
        changed={props.changed}
      />
    </div>
  );
};

export default searchForm;
