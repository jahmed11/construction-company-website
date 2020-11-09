import * as actionTypes from "./actions";

const initialState = {
  websiteElements: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ELEMENTS:
      return {
        ...state,
        websiteElements: action.data,
      };
    default:
      return state;
  }
};

export default reducer;
