import React, { Component } from "react";
import { connect } from "react-redux";
import DeliveryItem from "../../Components/DeliveryItem";
import { fetchOrderDetail } from "../../redux/actions/orderDetail";

class DeliveryAssignedPage extends Component {
  render() {
    return (
      <div className="container px-4 ">
        <div className="text-lg">Assigned Deliveries</div>
        <DeliveryItem />
        <DeliveryItem />
        <DeliveryItem />
        <div className="text-lg">Assigned Deliveries</div>
        <DeliveryItem />
        <DeliveryItem />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    orderDetail: state.orderDetail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrderDetail: (id) => dispatch(fetchOrderDetail(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeliveryAssignedPage);
