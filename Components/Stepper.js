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
    console.log(this.props.item);
  }
  componentDidUpdate() {
    console.log(this.props.item);
    if (
      this.props.item.status != undefined &&
      this.props.item.status != null &&
      !this.state.loaded
    ) {
      switch (this.props.item.status) {
        case 0:
          this.setState({ status: this.props.item.status, loaded: true });
        case 1:
          this.setState({ status: this.props.item.status, loaded: true });
      }
    }
  }
  render() {
    return (
      <div
        style={{
          backgroundColor: "black",
        }}
      >
        <div className="flex flex-row justify-between justify-center px-6 py-4 ">
          <div>
            {this.state.status > 0 ? (
              <CheckCircleIcon
                className="text-5xl"
                style={{
                  color: "red",
                }}
              />
            ) : this.state.status === 0 ? (
              <WarningIcon
                className="text-5xl"
                style={{
                  color: "yellow",
                }}
              />
            ) : (
              <div>
                <RemoveCircleIcon
                  className="text-5xl"
                  style={{
                    color: "gray",
                  }}
                />
              </div>
            )}
          </div>
          <div>
            {this.state.status > 1 ? (
              <CheckCircleIcon
                className="text-5xl"
                style={{
                  color: "red",
                }}
              />
            ) : this.state.status === 1 ? (
              <WarningIcon
                className="text-5xl"
                style={{
                  color: "yellow",
                }}
              />
            ) : (
              <div>
                <RemoveCircleIcon
                  className="text-5xl"
                  style={{
                    color: "gray",
                  }}
                />
              </div>
            )}
          </div>
          <div>
            {this.state.status > 2 ? (
              <CheckCircleIcon
                className="text-5xl"
                style={{
                  color: "red",
                }}
              />
            ) : this.state.status === 2 ? (
              <WarningIcon
                className="text-5xl"
                style={{
                  color: "yellow",
                }}
              />
            ) : (
              <div>
                <RemoveCircleIcon
                  className="text-5xl"
                  style={{
                    color: "gray",
                  }}
                />
              </div>
            )}
          </div>
          <div>
            {this.state.status > 3 ? (
              <CheckCircleIcon
                className="text-5xl"
                style={{
                  color: "red",
                }}
              />
            ) : this.state.status === 3 ? (
              <WarningIcon
                className="text-5xl"
                style={{
                  color: "yellow",
                }}
              />
            ) : (
              <div>
                <RemoveCircleIcon
                  className="text-5xl"
                  style={{
                    color: "gray",
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
