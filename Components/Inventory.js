import React, { Component } from "react";

export default class Inventory extends Component {
  render() {
    return (
      <div className="mx-auto container max-w-2xl md:w-3/4 shadow-md mx-4">
        <div className="bg-white space-y-6 mt-4">
          <div className="md:inline-flex space-y-4 md:space-y-0 w-full p-4 text-black items-center">
            <h2 className="md:w-1/3 max-w-sm mx-auto">Item</h2>
            <div className="md:w-2/3 max-w-sm mx-auto">
              <label className="text-sm text-gray-700">Name</label>
              <div className="w-full inline-flex border">
                <input
                  className="w-11/12 focus:outline-none focus:text-gray-700 p-2"
                  placeholder="Item Name"
                />
              </div>
            </div>
            <div className="md:w-2/3 max-w-sm mx-auto">
              <label className="text-sm text-gray-700">Description</label>
              <div className="w-full inline-flex border">
                <input
                  className="w-11/12 focus:outline-none focus:text-gray-700 p-2"
                  placeholder="Item Description"
                />
              </div>
            </div>
            <div className="md:w-2/3 max-w-sm mx-auto">
              <label className="text-sm text-gray-700">Unit Type</label>
              <div className="w-full inline-flex border">
                <input
                  className="w-11/12 focus:outline-none focus:text-gray-700 p-2"
                  placeholder="ex: box, individual, unit"
                />
              </div>
            </div>
            <div className="md:w-2/3 max-w-sm mx-auto">
              <label className="text-sm text-gray-700">Low Point Amount</label>
              <div className="w-full inline-flex border">
                <input
                  className="w-11/12 focus:outline-none focus:text-gray-700 p-2"
                  placeholder="Low Point Amount"
                />
              </div>
            </div>
            <div className="w-full p-4 text-right text-gray-500">
              <button
                className="inline-flex text bg-red-700 p-2 rounded text-white"
                type="submit"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
