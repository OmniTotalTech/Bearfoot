import React, { Component } from "react";

export default class TimeZone extends Component {
  render() {
    return (
      <div>
        <div
          className="border"
          style={{
            width: "150px",
          }}
        >
          <select>
            <option value="eastern">Eastern (ET)</option>
            <option value="central">Central (CT)</option>
            <option value="mountain">Mountain (MT)</option>
            <option value="pacific">Pacific (PT)</option>
            <option value="alaska">Alaska</option>
            <option value="hawaii">Hawaii</option>
          </select>
        </div>
      </div>
    );
  }
}
