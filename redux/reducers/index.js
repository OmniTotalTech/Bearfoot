import { combineReducers } from "redux";
import byId from "./byId";
import auth from "./auth";
import orderDetail from "./orderDetail";
import updateStatus from "./updateStatus";
export default combineReducers({
  auth: auth,
  // byId: byId,
  orderDetail: orderDetail,
  updateStatus: updateStatus,
});
