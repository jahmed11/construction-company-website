import React, { useEffect } from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { Router } from "react-router-dom";
import Routes from "./navigation/RouterConfig";
import history from "./services/history";
import { Helmet } from "react-helmet";
import * as actionCreator from "./store/actionCreators";
import { API, graphqlOperation } from "aws-amplify";
import * as queries from "./graphql/queries";
const App = () => {
  const elements = useSelector((state) => state.websiteElements);
  const dispatch = useDispatch();
  useEffect(() => {
    getElements();
  }, []);

  const getElements = async () => {
    try {
      let elements = await API.graphql(graphqlOperation(queries.listWebsites));
      let items = elements.data.listWebsites.items[0];
      dispatch(actionCreator.setElements(items));
    } catch (err) {
      console.log("error in getting selected model", err);
    }
  };

  return (
    <div>
      <Helmet>
        <title>{elements.title}</title>
      </Helmet>
      <Router history={history}>
        <Routes />
      </Router>
    </div>
  );
};

export default App;
