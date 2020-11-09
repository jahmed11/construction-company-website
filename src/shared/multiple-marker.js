import React from "react";
import { compose } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow,
} from "react-google-maps";

const MapWithAMarker = compose(
  withScriptjs,
  withGoogleMap
)((props) => {
  return (
    <GoogleMap
      defaultZoom={5}
      defaultCenter={{ lat: 33.92040773568172, lng: -118.35300456931152 }}
    >
      {props.markers &&
        props.markers.map((marker) => {
          return (
            <Marker
              key={marker.id}
              position={{ lat: Number(marker.lat), lng: Number(marker.lng) }}
            >
              {props.selectedMarker === marker && (
                <InfoWindow>
                  <div>{marker.shelter}</div>
                </InfoWindow>
              )}
            </Marker>
          );
        })}
    </GoogleMap>
  );
});

export default MapWithAMarker;
