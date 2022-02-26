import React, { Component } from "react";

export default class DeliveryAddress extends Component {
  render() {
    console.log(this.props.pool);
    return (
      <div>
        <div className="px-4">
          <div className="rounded-t-lg bg-white p-8 my-2">
            <div>
              {" "}
              <span className="text-bold font-bold">Pool:</span>{" "}
              {this.props.pool.pool_name}
            </div>
            <div>
              <span className="text-bold font-bold">Area: </span>
              {this.props.pool.area_name}
            </div>
            <div>
              <span className="text-bold font-bold">Address:</span>
            </div>

            <div>{this.props.pool.pool_address}</div>
            <div>{this.props.pool.pool_state}</div>
            <div>{this.props.pool.pool_zip}</div>
          </div>
        </div>
      </div>
    );
  }
}
