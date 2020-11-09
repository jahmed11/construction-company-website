import React from "react";
import { Gmaps, Marker } from "react-gmaps";

const gMaps = (props) => {
  const onMapCreated = (map) => {
    map.setOptions({
      disableDefaultUI: true,
    });
  };

  return (
    <>
      {props.lat && (
        <Gmaps
          width={"1170"}
          height={"384px"}
          lat={props.lat}
          lng={props.lng}
          zoom={15}
          loadingMessage={"Be happy"}
          onMapCreated={onMapCreated}
        >
          <Marker
            lat={props.lat}
            lng={props.lat}
            draggable={true}
            onDragEnd={props.markerDragged}
          />
        </Gmaps>
      )}
    </>
  );
};

export default gMaps;
