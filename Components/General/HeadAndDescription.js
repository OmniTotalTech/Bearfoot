import React, { Component } from "react";

class HeadAndDescription extends Component {
  render() {
    return (
      <div className="container mx-auto px-4 my-4">
        <div className="my-4">
          <div className="text-lg">{this.props.headText}</div>
          <div className="text-md">{this.props.bodyText}</div>
        </div>
      </div>
    );
  }
}

export default HeadAndDescription;
