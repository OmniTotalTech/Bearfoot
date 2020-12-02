import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import DeliveryItem from "./DeliveryItem";
class DeliveryListContainer extends Component {
  componentDidMount() {
    console.log("here", this.props.orderDetail);
  }
  render() {
    const primaryMap = this.props.orderDetail.primary.map((item) => {
      return <DeliveryItem item={item} navigation={this.props.navigation} />;
    });
    const secondaryMap = this.props.orderDetail.secondary.map((item) => {
      return (
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("DeliveryReview")}
        >
          <DeliveryItem item={item} />
        </TouchableOpacity>
      );
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
