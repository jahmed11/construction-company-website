import React, { useState, useEffect } from "react";
import "../../App.css";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../../graphql/custom-queries";
import { useSelector } from "react-redux";
import Header from "../../shared/header";
import MapWithAMarker from "../../shared/multiple-marker";
import Footer from "../../shared/footer";
import Video from "../../shared/video";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { Spin } from "antd";
import {
  AllModelsDiv,
  StyledContainer,
  ModelInHomeDiv,
  InfoSpan,
  MapWrapper,
  SpinDiv,
} from "../../styled-components/styled-components";
const Wrapper = styled.div`
  margin-top: 100px;
`;
const Home = (props) => {
  const [spin, setSpin] = useState(false);
  const elements = useSelector((state) => state.websiteElements);
  const [models, setModels] = useState();
  useEffect(() => {
    getBuildingModels();
  }, []);
  const getBuildingModels = async () => {
    setSpin(true);
    try {
      const getModels = await API.graphql(
        graphqlOperation(queries.listBuildings)
      );
      setModels(getModels.data.listBuildings.items);
    } catch (err) {
      console.log("get model", err);
    }
    setSpin(false);
  };
  const modelClickHandler = (model) => {
    props.history.push(
      `/model/${model.shortAddress}-${model.city}-${model.state}-${model.zipCode}/${model.id}`
    );
  };

  return (
    <div className="App">
      <>
        {spin ? (
          <SpinDiv>
            <Spin />
          </SpinDiv>
        ) : (
          <div>
            <Header />
            <Wrapper>
              <Video source={elements.videoUrl} />
              <MapWithAMarker
                markers={models}
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyB1UHH8V-XrEEGMRo47-FzNwdeSdyyS2rA&libraries=places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<MapWrapper />}
                mapElement={<div style={{ height: `100%`, width: "100%" }} />}
              />
              <StyledContainer>
                <AllModelsDiv>
                  {models &&
                    models.map((model) => {
                      return (
                        <ModelInHomeDiv key={model.id}>
                          <p>{`${model.shortAddress} ${model.city}, ${model.state} ${model.zipCode}`}</p>
                          <img
                            style={{ width: "354px", height: "200px" }}
                            src={`http://localhost:20005/public/${model.frontViewImage}`}
                            onClick={(id) => modelClickHandler(model)}
                            alt="model"
                          />
                          <div className="row margin:0 10px">
                            <div className="col-lg-4 col-sm-12">
                              <InfoSpan>beds</InfoSpan>
                              <InfoSpan>{model.beds}</InfoSpan>
                            </div>
                            <div className="col-lg-4 col-sm-12">
                              <InfoSpan>baths</InfoSpan>
                              <InfoSpan>{model.bath}</InfoSpan>
                            </div>
                            <div className="col-lg-4 col-sm-12">
                              <InfoSpan>price</InfoSpan>
                              <InfoSpan>${model.price}</InfoSpan>
                            </div>
                          </div>
                        </ModelInHomeDiv>
                      );
                    })}
                </AllModelsDiv>
              </StyledContainer>
              <Footer />
            </Wrapper>
          </div>
        )}
      </>
    </div>
  );
};

export default withRouter(Home);
