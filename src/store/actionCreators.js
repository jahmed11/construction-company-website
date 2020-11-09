import * as actionTypes from "./actions";

export const setElements = (data) => {
  return {
    type: actionTypes.ELEMENTS,
    data,
  };
};

/*export const getWebsiteElements = () => {
  console.log("reached to actions");
  return async (dispatch) => {
    try {
      let elements = await API.graphql(graphqlOperation(queries.listBuildings));
      //let items = elements.data.listWebsites.items[0];
      console.log(elements);
    } catch (err) {
      console.log("error in getting selected model", err);
    }
  };
};*/
