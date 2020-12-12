import { combineReducers } from "redux";
import byId from "./byId";
import auth from "./auth";
import orderDetail from "./orderDetail";
import updateStatus from "./updateStatus";
import adminOrderDetail from "./adminOrderDetail";

export default combineReducers({
  auth: auth,
  // byId: byId,
  orderDetail: orderDetail,
  updateStatus: updateStatus,
  adminOrderDetail: adminOrderDetail,
});
