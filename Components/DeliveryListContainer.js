import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import DeliveryItem from "./DeliveryItem";
import BackButton from "./BackButton";
export default class DeliveryListContainer extends Component {
  componentDidMount() {
    console.log("here", this.props.orderDetail);
  }
  render() {
    const primaryMap = this.props.orderDetail.primary.map((item) => {
      return <DeliveryItem item={item} navigation={this.props.navigation} />;
    });

    const secondaryMap = this.props.orderDetail.secondary.map((item) => {
      return <DeliveryItem item={item} navigation={this.props.navigation} />;
    });
    return (
      <>
        <BackButton navigation={this.props.navigation} />

        <div className="container max-w-2xl mx-auto px-4 my-4">
          <div className="my-4">
            <div className="text-lg">Assigned Deliveries</div>
            <div className="text-md">
              This is where you will see any deliveries that are available to
              you.
            </div>
            {primaryMap}
            Secondary:
            {secondaryMap}
          </div>
        </div>
      </>
    );
  }
}
