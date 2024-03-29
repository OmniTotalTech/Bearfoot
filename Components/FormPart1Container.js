import React, { Component } from "react";
import DailyOperationsSection from "./DailyOperationsSection";
import PoolClosure from "./PoolClosure";

export default class FormPart1Container extends Component {
  render() {
    return (
      <div>
        <div>
          <DailyOperationsSection
            propsPreLoaded={this.props.propsPreLoaded}
            updateState={this.props.updateState}
          />
        </div>
      </div>
    );
  }
}
