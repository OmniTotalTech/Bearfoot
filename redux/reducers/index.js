import { combineReducers } from "redux";
import byId from "./byId";
import auth from "./auth";
export default combineReducers({
  auth: auth,
  byId: byId,
});
