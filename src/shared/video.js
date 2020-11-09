import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Overlay = styled.div`

  position: relative; 
&:before{
  content:"";
  background:rgb(0 0 0/31%);
  position:absolute;
  top:0;
  left:0;
  width:100%;
  height:550px;
} 
}
`;

const Video = () => {
  const elements = useSelector((state) => state.websiteElements);

  return (
    <Overlay>
      {elements && (
        <iframe
          style={{ width: "100%", height: "550px" }}
          title="video"
          src={`https://www.youtube.com/embed/${elements.videoUrl}?autoplay=1&loop=1&mute=1&modestbranding=1&fs=0&controls=0&disablekb=1`}
          frameBorder="0"
        ></iframe>
      )}
    </Overlay>
  );
};

export default Video;
