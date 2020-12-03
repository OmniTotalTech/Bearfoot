import React, { Component } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import DeliveryChecklist from "../../Components/DeliveryChecklist";
import Stepper from "../../Components/Stepper";
import { connect } from "react-redux";

class DeliveryStockUp extends Component {
  render() {
    return (
      <div
        style={{
          backgroundColor: "black",
          height: "100vh",
        }}
      >
        <Stepper />
        <DeliveryChecklist />
        <TouchableOpacity>
          <div className="py-4 px-4">
            <button className="bg-red-600 hover:bg-red-700 text-white text-sm py-2 px-4 rounded-full w-full">
              CONTINUE
            </button>
          </div>
        </TouchableOpacity>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    orderDetail: state.orderDetail,
    user: state.auth.user,
  };
};

const mapDisptachToProps = (dispatch) => {
  return {
    updateStatus: (id, body) => dispatch(updateStatus(id, body)),
  };
};

export default connect(mapStateToProps, mapDisptachToProps)(DeliveryStockUp);
