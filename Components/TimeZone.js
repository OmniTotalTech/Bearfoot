import React, { Component } from "react";

export default class TimeZone extends Component {
  handleChange = (event) => {
    console.log(event.target.value);
    this.props.handleChange(event);
  };
  render() {
    return (
      <div>
        <div
          className="border"
          style={{
            width: "150px",
          }}
        >
          <select
            value={this.props.option}
            onChange={(e) => this.handleChange(e)}
          >
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
