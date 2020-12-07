import React, { Component } from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import WarningIcon from "@material-ui/icons/Warning";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

export default class Stepper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 0,
      loaded: false,
    };
  }
  componentDidUpdate() {
    console.log(this.props)

  }
  render() {
    return (
      <div
        className="container mx-auto"
        style={{
          backgroundColor: "black",
        }}
      >
        <div className="flex flex-row justify-between justify-center px-6 py-4 ">
          <div>
            {this.props.status != null && this.props.status != undefined ? (
            this.props.status > 1 ? (
              <CheckCircleIcon
                className="text-5xl"
                style={{
                  color: "red",
                }}
              />
            ) : this.props.status ==  1 ? (
              <WarningIcon
                className="text-5xl"
                style={{
                  color: "yellow",
                }}
              />
            ) : (
              <RemoveCircleIcon
                className="text-5xl"
                style={{
                  color: "gray",
                }}
              />
            )
          
            ): (<div></div>)}
            </div>
          <div>
            {this.props.status > 2 ? (
              <CheckCircleIcon
                className="text-5xl"
                style={{
                  color: "red",
                }}
              />
            ) : this.props.status == 2 ? (
              <WarningIcon
                className="text-5xl"
                style={{
                  color: "yellow",
                }}
              />
            ) : (
              <RemoveCircleIcon
                className="text-5xl"
                style={{
                  color: "gray",
                }}
              />
            )}
          </div>
          <div>
            {this.props.status > 3 ? (
              <CheckCircleIcon
                className="text-5xl"
                style={{
                  color: "red",
                }}
              />
            ) : this.props.status == 3 ? (
              <WarningIcon
                className="text-5xl"
                style={{
                  color: "yellow",
                }}
              />
            ) : (
              <RemoveCircleIcon
                className="text-5xl"
                style={{
                  color: "gray",
                }}
              />
            )}
          </div>
          <div>
          {this.props.status > 4 ? (
              <CheckCircleIcon
                className="text-5xl"
                style={{
                  color: "red",
                }}
              />
            ) : this.props.status == 4 ? (
              <WarningIcon
                className="text-5xl"
                style={{
                  color: "yellow",
                }}
              />
            ) : (
              <RemoveCircleIcon
                className="text-5xl"
                style={{
                  color: "gray",
                }}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}
