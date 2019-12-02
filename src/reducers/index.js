import cartReducer from "./cartReducer";
import homepageReducer from "./homepageReducer";
import { combineReducers } from "redux";

export default combineReducers({
  homepageReducer,
  cartReducer
});
