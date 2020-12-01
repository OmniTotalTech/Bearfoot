import React, { Component } from "react";
import { ScrollView } from "react-native";
import DeliveryAccept from "../../Components/DeliveryAccept";
import DeliveryAddress from "../../Components/DeliveryAddress";
import DeliveryChecklist from "../../Components/DeliveryChecklist";

export default class DeliveryReview extends Component {
  render() {
    return (
      <ScrollView>
        <div>
          <DeliveryAddress />
          <DeliveryChecklist />
          <DeliveryAccept />
        </div>
      </ScrollView>
    );
  }
}
