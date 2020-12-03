import React, { Component } from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import WarningIcon from "@material-ui/icons/Warning";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

export default class Stepper extends Component {
  render() {
    return (
      <div
        style={{
          backgroundColor: "black",
        }}
      >
        <div className="flex flex-row justify-between justify-center px-6 py-4 ">
          <div>
            <CheckCircleIcon
              className="text-5xl"
              style={{
                color: "red",
              }}
            />
          </div>
          <div>
            <WarningIcon
              className="text-5xl"
              style={{
                color: "yellow",
              }}
            />
          </div>
          <div>
            <RemoveCircleIcon
              className="text-5xl"
              style={{
                color: "gray",
              }}
            />
          </div>
          <div>
            <RemoveCircleIcon
              className="text-5xl"
              style={{
                color: "gray",
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}
