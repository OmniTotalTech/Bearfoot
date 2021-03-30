import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import DeliveryItem from "./DeliveryItem";
import BackButton from "./BackButton";
export default class DeliveryListContainer extends Component {
  componentDidMount() {
    console.log("here", this.props);
  }
  render() {
    const primaryMap = this.props.orderDetail.primary.map((item) => {
      return (
        <DeliveryItem
          item={item}
          type={"primary"}
          userId={this.props.userId}
          navigation={this.props.navigation}
        />
      );
    });

    const secondaryMap = this.props.orderDetail.secondary.map((item) => {
      return (
        <DeliveryItem
          item={item}
          type={"secondary"}
          navigation={this.props.navigation}
        />
      );
    });
    return (
      <>
        <BackButton navigation={this.props.navigation} />

        <div className="container max-w-2xl mx-auto px-4 my-4">
          <div className="my-4">
            <div className="text-md">
              This is where you will see any deliveries that are available to
              you.
            </div>
            <div className="text-lg">Assigned Deliveries</div>
            {this.props.orderDetail.primary.length > 0 ? (
              primaryMap
            ) : (
              <div>No orders assigned to you today.</div>
            )}
            Secondary:
            {this.props.orderDetail.secondary.length > 0 ? (
              secondaryMap
            ) : (
              <div>No orders assigned to you today.</div>
            )}
          </div>
        </div>
      </>
    );
  }
}
