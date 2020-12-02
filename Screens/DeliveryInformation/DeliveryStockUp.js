import React, { Component } from "react";
import DeliveryChecklist from "../../Components/DeliveryChecklist";
import Stepper from "../../Components/Stepper";

export default class DeliveryStockUp extends Component {
  render() {
    return (
      <div>
        <Stepper />
        <DeliveryChecklist />
      </div>
    );
  }
}
