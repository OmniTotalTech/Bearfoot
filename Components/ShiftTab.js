import React, { Component } from "react";

export default class ShiftTab extends Component {
  render() {
    return (
      <div>
        <div className=" rounded-r-lg max-w-xs rounded-l-lg w-48 h-48 p-4 bg-gradient-to-r from-red-500 via-red-600 to-red-700">
          <div>
            <div className="row-span-1  text-white py-4">{this.props.icon}</div>
            <div className="row-span-1">
              <div className=" text-lg text-white pb-2">
                {this.props.status}
              </div>
              <div className=" text-xs text-white">{this.props.subtext}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
