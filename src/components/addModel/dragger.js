import React from "react";
import * as mutations from "../../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";
import { Storage } from "aws-amplify";
import { Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import uuid from "uuid/v4";

const { Dragger } = Upload;

const MultiImage = (props) => {
  console.log(props.builderId);
  const prop = {
    name: "file",
    multiple: true,
    customRequest: (info) => {
      saveImage(info);
    },
  };

  const imageDataHandler = async (key) => {
    if (props.builderId) {
      const imageID = uuid();
      const imageData = {
        id: imageID,
        image: key,
        buildingID: props.builderId,
      };
      let savedImage;
      try {
        savedImage = await API.graphql(
          graphqlOperation(mutations.createImage, { input: imageData })
        );
        console.log(savedImage);
      } catch (err) {
        console.log("error in saving image record", err);
      }
    } else {
      console.log("building id is not available, cannot save images");
    }
  };
  const saveImage = async ({ file, onSuccess }) => {
    // setImgLoading(true);
    let img = file;
    await Storage.put(`models/${img.name}`, img, {
      contentType: img.type,
    })
      .then((result) => {
        console.log(result);
        imageDataHandler(result.key);
        // setImgLoading(false);
      })
      .catch((err) => console.log(err));
    onSuccess("ok");
  };

  return (
    <Dragger {...prop}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
      <p className="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibit from uploading
        company data or other band files
      </p>
    </Dragger>
  );
};

export default MultiImage;
