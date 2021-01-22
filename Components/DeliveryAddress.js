import React, { Component } from "react";

export default class DeliveryAddress extends Component {
  render() {
    return (
      <div>
        <div className="px-4">
          <div className="rounded-t-lg bg-white p-8 my-2">
            <div>{this.props.pool.pool_address}</div>
            <div>{this.props.pool.pool_state}</div>
            <div>{this.props.pool.pool_zip}</div>
          </div>
        </div>
      </div>
    );
  }
}
