import React, { Component } from "react";

export default class PoolClosure extends Component {
  render() {
    return (
      <div className="container mx-auto bg-black">
        <div className="bg-gray-500 text-white text-xl font-bold p-4">
          Pool Closure
        </div>
        <div className="grid grid-cols-2 divide-x divide-white w-full border-b-2 border-white py-4">
          <div className="text-white px-2">Pool(s):</div>
          <div></div>
        </div>
        <div className="grid grid-cols-2 divide-x divide-white w-full border-b-2 border-white py-4">
          <div className="text-white px-2">Time Closed:</div>
          <div></div>
        </div>
        <div className="grid grid-cols-2 divide-x divide-white w-full border-b-2 border-white py-4">
          <div className="text-white px-2">Time Reopened:</div>
          <div></div>
        </div>
        <div className="grid grid-cols-2 divide-x divide-white w-full border-b-2 border-white py-4">
          <div className="text-white px-2">Reason:</div>
          <div></div>
        </div>
        <div className="bg-black px-4">
          <div className="flex justify-between">
            <div className="text-white text-lg py-4">Vomit:</div>
            <div className="px-2 py-4">
              <input type="checkbox"></input>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="text-white text-lg py-4">Fecal:</div>
            <div className="px-2 py-4">
              <input type="checkbox"></input>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="text-white text-lg py-4">Weather:</div>
            <div className="px-2 py-4">
              <input type="checkbox"></input>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="text-white text-lg py-4">Pool Clarity:</div>
            <div className="px-2 py-4">
              <input type="checkbox"></input>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
