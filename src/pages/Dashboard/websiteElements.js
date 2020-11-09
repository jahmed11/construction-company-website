import React, { useState, useEffect } from "react";
import { Button, Skeleton } from "antd";
import { withRouter, Redirect } from "react-router-dom";
import Input from "../../shared/input";
import * as queries from "../../graphql/queries";
import * as mutations from "../../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";

const WebsiteElements = () => {
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [pageLoad, setPageLoad] = useState(false);
  const [id, setID] = useState(null);
  const [value, setValue] = useState({
    title: "",
    email: "",
    number: "",
    footerTitle: "",
    videoUrl: "",
  });

  useEffect(() => {
    getElements();
  }, []);

  const getElements = async () => {
    setPageLoad(true);
    try {
      let elements = await API.graphql(graphqlOperation(queries.listWebsites));
      let items = elements.data.listWebsites.items[0];
      console.log("items", items);
      setID(items.id);
      setValue({
        ...value,
        title: items.title,
        email: items.email,
        number: items.number,
        footerTitle: items.footerTitle,
        videoUrl: items.videoUrl,
      });
    } catch (err) {
      console.log("unable to get values", err);
    }
    setPageLoad(false);
  };

  const changeHandler = (event) => {
    setValue({ ...value, [event.target.name]: event.target.value });
    console.log(event.target);
    console.log(event.target.value);
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);
    console.log("hello");
    console.log(value);
    const updateObject = {
      id: id,
      title: value.title,
      email: value.email,
      number: value.number,
      footerTitle: value.footerTitle,
      videoUrl: value.videoUrl.split("=")[1],
    };
    try {
      await API.graphql(
        graphqlOperation(mutations.updateWebsite, { input: updateObject })
      );
      console.log("updated");
    } catch (err) {
      console.log("unable to update website elements", err);
    }
    setLoading(false);
    setRedirect(true);
  };
  return (
    <>
      {redirect && <Redirect to="/dashboard" />}
      {pageLoad ? (
        <Skeleton />
      ) : (
        <form onSubmit={submitHandler}>
          <Input
            placeholer="title"
            name="title"
            value={value.title}
            changed={changeHandler}
          />
          <Input name="email" value={value.email} changed={changeHandler} />
          <Input name="number" value={value.number} changed={changeHandler} />
          <Input
            name="footerTitle"
            value={value.footerTitle}
            changed={changeHandler}
          />
          <Input
            name="videoUrl"
            value={value.videoUrl}
            changed={changeHandler}
          />
          <div style={{ textAlign: "center" }}>
            <Button loading={loading} htmlType="submit" type="primary">
              Update
            </Button>
          </div>
        </form>
      )}
    </>
  );
};

export default withRouter(WebsiteElements);

/* */
