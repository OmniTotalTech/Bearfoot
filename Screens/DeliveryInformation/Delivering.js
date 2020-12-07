import React, { Component } from "react";
import DropOffChecklist from "../../Components/DropOffChecklist";
import Stepper from "../../Components/Stepper";

export default class  extends Component {
  render() {
    return (
      <div
        style={{
          backgroundColor: "black",
          height: "100vh",
        }}
      >
        <Stepper />
        <DropOffChecklist />
      </div>
    );
  }
}
