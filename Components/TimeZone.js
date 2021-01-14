import React, { Component } from "react";

export default class TimeZone extends Component {
  render() {
    const { values, handleChange } = this.props;

    return (
      <div>
        <div
          className="border"
          style={{
            width: "150px",
          }}
        >
          <select onChange={(e) => handleChange(e.target.value)}>
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
