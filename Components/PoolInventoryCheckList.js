import React, { Component } from "react";

export default class PoolInventoryCheckList extends Component {
  render() {
    return (
      <div className="container mx-auto">
        <div className="w-full border-b-2 py-4 flex">
          <div className="px-2 w-3/4">Item</div>
          <div className="w-full">
            <input className="text-right mx-2" />
          </div>
        </div>
      </div>
    );
  }
}
