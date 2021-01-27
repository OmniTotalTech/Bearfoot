import React, { Component } from "react";
import DailyChecklist from "../../Components/DailyChecklist";

export default class OpeningChecklist extends Component {
  render() {
    return (
      <div className="container mx-auto">
        <div className="text-3xl">Opening Checklist : </div>
        <DailyChecklist />
      </div>
    );
  }
}
