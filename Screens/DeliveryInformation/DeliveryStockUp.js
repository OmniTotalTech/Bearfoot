import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import DeliveryChecklist from "../../Components/DeliveryChecklist";
import Stepper from "../../Components/Stepper";
import { connect } from "react-redux";

class DeliveryStockUp extends Component {
  // constructor(props) {
  //   super(props);
  //   var item = props.route.params.item;
  //   this.state = {
  //     item: props.route.params.item,
  //   };
  //   console.log(item);
  // }

  // setUpdateStatus() {
  //   const body = { status: 2 };
  //   this.props.updateStatus(this.state.item._id, body);
  // }

  // componentDidUpdate() {
  //   console.log(this.props.navigation.getParam("item"));
  // }

  render() {
    const { item } = this.props;
    console.log(item);
    return (
      <div
        style={{
          backgroundColor: "black",
          height: "100vh",
        }}
      >
        <Stepper item={item.data.foundOrderDetail} />
        <DeliveryChecklist />
        <TouchableOpacity
          onPress={() => {
            // this.setUpdateStatus();
            this.props.navigation.navigate("Delivering");
          }}
        >
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
    item: state.updateStatus,
  };
};

const mapDisptachToProps = (dispatch) => {
  return {
    updateStatus: (id, body) => dispatch(updateStatus(id, body)),
  };
};

export default connect(mapStateToProps, mapDisptachToProps)(DeliveryStockUp);
