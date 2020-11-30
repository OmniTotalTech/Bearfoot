import React, { Component } from "react";
import { connect } from "react-redux";
import DeliveryItem from "../../Components/DeliveryItem";
import { ScrollView } from "react-native";
export default function DeliveryAssignedPage() {
  return (
    <ScrollView>
      <div className="container mx-auto px-4 my-4">
        <div className="my-4">
          <div className="text-lg">Assigned Deliveries</div>
          <div className="text-md">
            This is where you will see any deliveries that are available to you,
            but you are not the primary driver.
          </div>
          <DeliveryItem />
          <DeliveryItem />
          <DeliveryItem />
        </div>
        <div className="my-4">
          <div className="text-lg">Secondary Deliveries</div>
          <div className="text-md">
            This is where you will see any deliveries that are available to you,
            but you are not the primary driver.
          </div>
          <DeliveryItem />
          <DeliveryItem />
        </div>
      </div>
    </ScrollView>
  );
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
