import React, { Component } from "react";
import DeliveryItem from "./DeliveryItem";
class DeliveryListContainer extends Component {
  componentDidMount() {
    console.log("here", this.props.orderDetail);
  }
  render() {
    const primaryMap = this.props.orderDetail.primary.map((item) => {
      return <DeliveryItem item={item} />;
    });
    const secondaryMap = this.props.orderDetail.secondary.map((item) => {
      return <DeliveryItem item={item} />;
    });
    return (
      <div className="container mx-auto px-4 my-4">
        <div className="my-4">
          <div className="text-lg">Assigned Deliveries</div>
          <div className="text-md">
            This is where you will see any deliveries that are available to you,
            but you are not the primary driver.
          </div>
          {primaryMap}
        </div>
        <div className="my-4">
          <div className="text-lg">Secondary Deliveries</div>
          <div className="text-md">
            This is where you will see any deliveries that are available to you,
            but you are not the primary driver.
          </div>
          {secondaryMap}
        </div>
      </div>
    );
  }
}

export default DeliveryListContainer;
