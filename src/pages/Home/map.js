import React from "react";
import { Gmaps, Marker } from "react-gmaps";
import styled from "styled-components";

const MapDiv = styled.div`
  width: 550px;
  margin-top: 29px;
`;

const params = { v: "3.exp", key: "AIzaSyB1UHH8V-XrEEGMRo47" };
const gMaps = (props) => {
  const onMapCreated = (map) => {
    map.setOptions({
      disableDefaultUI: true,
    });
  };

  /* const onCloseClick = () => {
      console.log("onCloseClick");
    };
  
    const onClick = (e) => {
      console.log("onClick", e);
    };*/

  return (
    <MapDiv className="col-lg-6 col-sm-12">
      <Gmaps
        width={"100%"}
        height={"472px"}
        lat={props.lat}
        lng={props.lng}
        zoom={16}
        loadingMessage={"Be happy"}
        params={params}
        onMapCreated={onMapCreated}
      >
        <Marker
          lat={props.lat}
          lng={props.lng}
          draggable={true}
          onDragEnd={props.markerDragged}
        />

        {/*<InfoWindow lat={props.lat} lng={props.lng} onCloseClick={onCloseClick} />
      {/* <Circle
        lat={props.lat}
        lng={props.lng}
        radius={400}
        onClick={onClick}
     />*/}
      </Gmaps>
    </MapDiv>
  );
};

export default gMaps;
