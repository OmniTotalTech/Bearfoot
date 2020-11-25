import { combineReducers } from "redux";
import byId from "./byId";
import auth from "./auth";
import orderDeatil from "./orderDetail";
export default combineReducers({
  auth: auth,
  byId: byId,
  orderDeatil: orderDeatil,
});
