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
<<<<<<< HEAD
=======
          <PoolClosure updateState={this.props.updateState} />
>>>>>>> a8ccdac77f8b7a47ef2a0db5e9b084921f0b02be
        </div>
      </div>
    );
  }
}
