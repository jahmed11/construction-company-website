import React, { useState } from "react";
import { Storage } from "aws-amplify";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import * as mutations from "../../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";
import Input from "../../shared/input";
import Textarea from "../../shared/textarea";
import TextEditor from "../sharedComponents/editor";
import SearchLocation from "../../shared/searchLocation";
import SearchForm from "./searchForm";
import Map from "../sharedComponents/map";
import MultiImage from "./dragger";
import uuid from "uuid/v4";
import * as utility from "./utility";
import { InputNumber, Upload, Button, notification, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  InputNumberDiv,
  InputLabel,
  ColumnDiv,
  FormCreate,
} from "../../styled-components/styled-components";
import "./adModel.css";

const ID = uuid();

const AddModel = (props) => {
  const [loading, setLoading] = useState(false);
  const [builderId, setBuilderId] = useState();
  const [draggerToggle, setDraggerToggle] = useState(false);
  const [value, setValue] = useState({
    price: "",
    beds: "",
    bath: "",
    garage: "",
    livingSpace: "",
    totalSpace: "",
    description: "",
    frontImage: "",
    floorImage: "",
    status: "",
  });
  const [address, setAddress] = useState("");
  //auto complete search states
  const [formattedAddress, setformattedAddress] = useState("");

  const [shortAddress, setShortAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const handleChange = (address) => {
    setAddress(address);
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

  const singleImageprops = {
    name: "file",
    customRequest: (info) => {
      floorPlanImage(info);
    },
  };
  const prop = {
    name: "file",
    customRequest: (info) => {
      frontViewImage(info);
    },
  };

  const frontViewImageHandler = (key) => {
    setValue({ ...value, frontImage: key });
  };
  const frontViewImage = async ({ file, onSuccess }) => {
    let img = file;
    await Storage.put(`models/${img.name}`, img, {
      contentType: img.type,
    })
      .then((result) => {
        console.log("uploaded", result);
        frontViewImageHandler(result.key);
        // setImgLoading(false);
      })
      .catch((err) => console.log(err));
    onSuccess("ok");
  };

  const inputChangeHandler = (event) => {
    setValue({ ...value, [event.target.name]: event.target.value });
  };
  const inputNumberChangeHandler = (type, val) => {
    setValue({ ...value, [type]: val });
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

  const createBuildingHandler = async (event) => {
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
      floorImage,
      frontImage,
    } = value;
    // object for mutation (createBuilding)
    const building = {
      id: ID,
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
      frontViewImage: frontImage,
      floorPlanImage: floorImage,
    };
    setBuilderId(building.id);
    let buildingData;
    try {
      buildingData = await API.graphql(
        graphqlOperation(mutations.createBuilding, { input: building })
      );
      console.log("building created");
      notification.open({
        message: "Submitted Successfully",
        description: "Pleae upload images of the projects",
      });
      console.log(buildingData);
    } catch (err) {
      message.info("Unable to add new project");
      console.log("error in adding a new building", err);
    }
    setLoading(false);
  };
  //floor plan image starts

  const floorPlanImageHandler = (key) => {
    setValue({ ...value, floorImage: key });
  };
  const floorPlanImage = async ({ file, onSuccess }) => {
    let img = file;
    await Storage.put(`models/${img.name}`, img, {
      contentType: img.type,
    })
      .then((result) => {
        console.log("uploaded", result);
        floorPlanImageHandler(result.key);
        // setImgLoading(false);
      })
      .catch((err) => console.log(err));
    onSuccess("ok");
  };
  // floor plan ends

  const draggerToggleHanlder = () => {
    setDraggerToggle(!draggerToggle);
  };

  const dragMarkerHandler = (e) => {
    console.log("event of marker", e);
    let lat = e.latLng.lat();
    setLat(lat);
    let lng = e.latLng.lng();
    setLng(lng);
    console.log("latittue", lat, "lng:", lng);
  };
  const dashBoardRoute = () => {
    props.history.push("/dashboard");
  };
  const handleEditorChange = (e) => {
    console.log(e);
    setValue({ ...value, description: e.toString() });
  };

  return (
    <>
      <SearchLocation
        value={address}
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

      <FormCreate onSubmit={createBuildingHandler}>
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
            <InputLabel style={{ display: "block" }}>Living Space</InputLabel>
            <InputNumber
              name="livingSpace"
              placeholder="living sq ft"
              value={value.livingSpace}
              onChange={(v) => inputNumberChangeHandler("livingSpace", v)}
            />
          </ColumnDiv>
          <ColumnDiv className="col-lg-4 col-sm-12">
            <InputLabel style={{ display: "block" }}>Totol Space</InputLabel>
            <InputNumber
              name="totalSpace"
              placeholder="total sq ft"
              value={value.totalSpace}
              onChange={(v) => inputNumberChangeHandler("totalSpace", v)}
            />
          </ColumnDiv>
        </InputNumberDiv>
        <Upload style={{ width: "450px" }} {...prop}>
          <Button icon={<UploadOutlined />}>Front View Image of House</Button>
        </Upload>
        <Upload style={{ width: "450px" }} {...singleImageprops}>
          <Button icon={<UploadOutlined />}>Upload Floor Plan Image</Button>
        </Upload>
        <Input
          type="text"
          name="status"
          placeholder="status"
          value={value.status}
          changed={inputChangeHandler}
        />
        <TextEditor editorChange={handleEditorChange} />
        <div>
          <Button loading={loading} htmlType="submit" type="primary">
            submit
          </Button>
        </div>
      </FormCreate>
      <div style={{ width: "450px", margin: "0 auto" }}>
        <Button type="ghost" onClick={draggerToggleHanlder}>
          Add Image of Model
        </Button>
        {draggerToggle && <MultiImage builderId={builderId} />}
        <Button onClick={dashBoardRoute}>Create</Button>
      </div>
    </>
  );
};

export default AddModel;
