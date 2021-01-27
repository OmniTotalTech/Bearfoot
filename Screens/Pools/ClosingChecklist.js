import React, { Component } from "react";
import DailyChecklist from "../../Components/DailyChecklist";

export default class ClosingChecklist extends Component {
  render() {
    return (
      <div className="container mx-auto">
        <div className="text-3xl">Closing Checklist : </div>
        <DailyChecklist />
      </div>
    );
  }
}
