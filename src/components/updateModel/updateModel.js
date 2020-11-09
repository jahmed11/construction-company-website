import React, { useState, useEffect } from "react";
import * as mutations from "../../graphql/mutations";
import * as queries from "../../graphql/queries";
import Input from "../../shared/input";
import Textarea from "../../shared/textarea";
import { API, graphqlOperation } from "aws-amplify";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import SearchLocation from "../../shared/searchLocation";
import Map from "../sharedComponents/map";
import SearchForm from "../addModel/searchForm";
import * as utility from "../addModel/utility";
import { InputNumber, Button, Skeleton } from "antd";
import {
  InputNumberDiv,
  InputLabel,
  ColumnDiv,
  FormCreate,
} from "../../styled-components/styled-components";

const UpdateModel = (props) => {
  const [pageLoad, setPageLoad] = useState(false);
  const [loading, setLoading] = useState(false);
  // states for search and update locations
  const [seacrhAddress, setSearchAddress] = useState("");
  const [formattedAddress, setformattedAddress] = useState("");
  const [shortAddress, setShortAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  //state for getting selected model
  //state for Input Numbers
  const [value, setValue] = useState({
    price: "",
    beds: "",
    bath: "",
    garage: "",
    livingSpace: "",
    totalSpace: "",
    description: "",

    status: "",
  });

  useEffect(() => {
    getBuildingWithId();
  }, []);

  const getBuildingWithId = async () => {
    setPageLoad(true);
    try {
      let getModel = await API.graphql(
        graphqlOperation(queries.getBuilding, { id: props.match.params.id })
      );
      let buildingData = getModel.data.getBuilding;

      console.log(getModel.data.getBuilding);
      setShortAddress(buildingData.shortAddress);
      setCity(buildingData.city);
      setState(buildingData.state);
      setLat(buildingData.lat);
      setLng(buildingData.lng);

      setValue({
        ...value,
        price: buildingData.price,
        beds: buildingData.beds,
        bath: buildingData.bath,
        garage: buildingData.garage,
        livingSpace: buildingData.livingSpace,
        totalSpace: buildingData.totalSpace,
        status: buildingData.status,
        description: buildingData.description,
      });
    } catch (err) {
      console.log("unable to get building data for upadate", err);
    }
    setPageLoad(false);
  };

  const handleChange = (address) => {
    setSearchAddress(address);
  };

  const handleSelect = async (address) => {
    geocodeByAddress(address)
      .then((results) => {
        console.log(results);
        let address = results[0].address_components;
        let formatted = results[0].formatted_address;

        let zipCode = utility.getZipCode(address);
        let shortAddress = utility.getShortAddress(formatted);
        let state = utility.getState(address);
        let city = utility.getCity(address);

        setZipCode(zipCode);
        setState(state);
        setCity(city);
        setShortAddress(shortAddress);
        let fullAddress = `${shortAddress} ${city}, ${state} ${zipCode}`;
        setformattedAddress(fullAddress);
        return getLatLng(results[0]);
      })
      .then((latLng) => {
        console.log("Success", latLng);

        setLat(latLng.lat);
        setLng(latLng.lng);
      })
      .catch((error) => console.error("Error", error));
  };
  const searchFormChangeHandler = (event) => {
    if (event.target.name && event.target.name === "Short Address") {
      setShortAddress(event.target.value);
    } else if (event.target.name && event.target.name === "City") {
      setCity(event.target.value);
    } else if (event.target.name && event.target.name === "State") {
      setState(event.target.value);
    } else if (event.target.name && event.target.name === "ZipCOde") {
      setZipCode(event.target.value);
    } else if (event.target.name && event.target.name === "Latitude") {
      setLat(event.target.value);
    } else {
      setLng(event.target.value);
    }
    let fullAddress = `${shortAddress} ${city}, ${state} ${zipCode}`;
    setformattedAddress(fullAddress);
  };
  const dragMarkerHandler = (e) => {
    console.log("event of marker", e);
    let lat = e.latLng.lat();
    setLat(lat);
    let lng = e.latLng.lng();
    setLng(lng);
    console.log("latittue", lat, "lng:", lng);
  };

  const inputChangeHandler = (event) => {
    setValue({ ...value, [event.target.name]: event.target.value });
  };
  const inputNumberChangeHandler = (type, val) => {
    setValue({ ...value, [type]: val });
  };

  const updateBuildingHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    // getting from states of input form
    const {
      price,
      beds,
      bath,
      garage,
      livingSpace,
      totalSpace,
      description,
      status,
    } = value;
    // object for mutation (createBuilding)
    const building = {
      id: props.match.params.id,
      shortAddress: shortAddress.toString(),
      city,
      state,
      zipCode,
      lat: lat.toString(),
      lng: lng.toString(),
      price,
      beds,
      bath,
      garage,
      livingSpace,
      totalSpace,
      description,
      status,
    };
    let buildingData;
    try {
      buildingData = await API.graphql(
        graphqlOperation(mutations.updateBuilding, { input: building })
      );
      console.log("building updated");
      console.log(buildingData);
    } catch (err) {
      console.log("error in updating the project information", err);
    }
    setLoading(false);
    props.history.push("/dashboard");
  };

  return (
    <>
      {pageLoad ? (
        <Skeleton />
      ) : (
        <div>
          <SearchLocation
            value={seacrhAddress}
            onChange={handleChange}
            onSelect={handleSelect}
          />
          <Input
            type="text"
            placeholder="full address"
            readOnly
            value={formattedAddress}
          />
          <div className="row">
            <SearchForm
              shortAddress={shortAddress}
              city={city}
              lat={lat}
              lng={lng}
              zipCode={zipCode}
              state={state}
              changed={searchFormChangeHandler}
            />
            <Map markerDragged={dragMarkerHandler} lat={lat} lng={lng} />
          </div>
          <FormCreate onSubmit={updateBuildingHandler}>
            <InputNumberDiv className="row">
              <ColumnDiv className="col-lg-4 col-sm-12">
                <InputLabel>Price </InputLabel>
                <InputNumber
                  name="price"
                  placeholder="price"
                  value={value.price}
                  onChange={(val) => inputNumberChangeHandler("price", val)}
                />
              </ColumnDiv>
              <ColumnDiv className="col-lg-4 col-sm-12">
                <InputLabel style={{ display: "block" }}>Beds</InputLabel>
                <InputNumber
                  name="beds"
                  placeholder="beds"
                  value={value.beds}
                  onChange={(v) => inputNumberChangeHandler("beds", v)}
                />
              </ColumnDiv>
              <ColumnDiv className="col-lg-4 col-sm-12">
                <InputLabel style={{ display: "block" }}>Bath</InputLabel>
                <InputNumber
                  name="bath"
                  placeholder="bath"
                  value={value.bath}
                  onChange={(v) => inputNumberChangeHandler("bath", v)}
                />
              </ColumnDiv>
            </InputNumberDiv>
            <InputNumberDiv className="row">
              <ColumnDiv className="col-lg-4 col-sm-12">
                <InputLabel style={{ display: "block" }}>Garage</InputLabel>
                <InputNumber
                  name="garage"
                  placeholder="garage"
                  value={value.garage}
                  onChange={(v) => inputNumberChangeHandler("garage", v)}
                />
              </ColumnDiv>
              <ColumnDiv className="col-lg-4 col-sm-12">
                <InputLabel style={{ display: "block" }}>
                  Living Space
                </InputLabel>
                <InputNumber
                  name="livingSpace"
                  placeholder="living sq ft"
                  value={value.livingSpace}
                  onChange={(v) => inputNumberChangeHandler("livingSpace", v)}
                />
              </ColumnDiv>
              <ColumnDiv className="col-lg-4 col-sm-12">
                <InputLabel style={{ display: "block" }}>
                  Totol Space
                </InputLabel>
                <InputNumber
                  name="totalSpace"
                  placeholder="total sq ft"
                  value={value.totalSpace}
                  onChange={(v) => inputNumberChangeHandler("totalSpace", v)}
                />
              </ColumnDiv>
            </InputNumberDiv>

            <Input
              type="text"
              name="status"
              placeholder="status"
              value={value.status}
              changed={inputChangeHandler}
            />
            <Textarea
              name="description"
              placeholder="description of model"
              value={value.description}
              changed={inputChangeHandler}
            />
            <div>
              <Button loading={loading} htmlType="submit" type="primary">
                Submit
              </Button>
            </div>
          </FormCreate>
        </div>
      )}
    </>
  );
};

export default UpdateModel;
