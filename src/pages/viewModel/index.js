import React, { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "../../graphql/queries";
import Slider from "react-slick";
import { withRouter } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "../../shared/header";
import Footer from "../../shared/footer";
import GMaps from "../../shared/gMaps";
import ReactHtmlParser from "react-html-parser";

import { Typography, Button, Divider } from "antd";

import {
  InfoSpan,
  StyledContainer,
} from "../../styled-components/styled-components";

const { Text } = Typography;

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: true,
};

const ViewModel = (props) => {
  const [model, setModel] = useState([]);
  const [carouselImages, setCarouselImages] = useState([]);
  useEffect(() => {
    getBuildingModel();
  }, []);

  const getBuildingModel = async () => {
    try {
      let getmodel = await API.graphql(
        graphqlOperation(queries.getBuilding, { id: props.match.params.id })
      );
      setModel(getmodel.data.getBuilding);
      setCarouselImages(getmodel.data.getBuilding.images.items);
    } catch (err) {
      console.log("error in getting selected model", err);
    }
  };
  console.log(props);
  return (
    <div>
      <Header />
      <div style={{ marginTop: "100px" }}>
        <StyledContainer>
          <div style={{ textAlign: "center" }}>
            <Text
              style={{ fontSize: "38px" }}
            >{`${model.shortAddress}, ${model.city}, ${model.state} ${model.zipCode}, ${model.price}`}</Text>
            <Divider />
            <div>
              <div className="row mx-auto mb-4">
                <div className="col-xs-6 col-sm-2 col-md-2 col-md-offset-1">
                  <InfoSpan className="font-weight-bold">price</InfoSpan>
                  <InfoSpan>{model.price}</InfoSpan>
                </div>
                <div className="col-xs-6 col-sm-2 col-md-1 col-md-offset-1">
                  <InfoSpan className="font-weight-bold">Beds</InfoSpan>
                  <InfoSpan>{model.beds}</InfoSpan>
                </div>
                <div className="col-xs-6 col-sm-2 col-md-1 col-md-offset-1">
                  <InfoSpan className="font-weight-bold">Baths</InfoSpan>
                  <InfoSpan>{model.bath}</InfoSpan>
                </div>
                <div className="col-xs-6 col-sm-2 col-md-2 col-md-offset-1">
                  <InfoSpan className="font-weight-bold">Garage</InfoSpan>
                  <InfoSpan>{model.garage}</InfoSpan>
                </div>
                <div className="col-xs-6 col-sm-2 col-md-2 col-md-offset-1">
                  <InfoSpan className="font-weight-bold">Living Sq Ft</InfoSpan>
                  <InfoSpan>{model.livingSpace}</InfoSpan>
                </div>
                <div className="col-xs-6 col-sm-2 col-md-2 col-md-offset-1">
                  <InfoSpan className="font-weight-bold">Total Sq Ft</InfoSpan>
                  <InfoSpan>{model.totalSpace}</InfoSpan>
                </div>
                <div className="col-xs-6 col-sm-2 col-md-2 col-md-offset-1">
                  <InfoSpan className="font-weight-bold">Total Sq Ft</InfoSpan>
                  <InfoSpan>{model.status}</InfoSpan>
                </div>
              </div>
            </div>
          </div>
          <div>
            <Slider {...settings}>
              {carouselImages &&
                carouselImages.map((item) => {
                  return (
                    <div key={item.id}>
                      <img
                        style={{ width: "100%", height: "450px" }}
                        src={`http://localhost:20005/public/${item.image}`}
                        alt="sliderImages"
                      />
                    </div>
                  );
                })}
            </Slider>
          </div>
          <div>
            <p style={{ marginTop: "25px", color: "grey", fontWeight: "bold" }}>
              Floor Plan
            </p>
            <img
              style={{ width: "100%" }}
              src={`http://localhost:20005/public/${model.floorPlanImage}`}
              alt="floor plan"
            />
          </div>
          <div style={{ margin: "15px 0" }}>
            Features
            <br />
            {ReactHtmlParser(model.description)}
          </div>
          <div>
            <Text>Project Location</Text>
            <GMaps lat={model.lat} lng={model.lng} />
          </div>
          <div style={{ textAlign: "center" }}>
            <Button
              onClick={() => {
                props.history.push("/");
              }}
              htmlType="button"
              type="primary"
            >
              Back to Inventory
            </Button>
          </div>
        </StyledContainer>
        <Footer />
      </div>
    </div>
  );
};
export default withRouter(ViewModel);
