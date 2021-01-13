import React, { Component } from "react";

export default class DailyOperationsSection extends Component {
  render() {
    return (
      <div className="container mx-auto bg-black">
        <div className="bg-gray-500 text-white text-xl font-bold p-4">
          Daily Operations
        </div>
        <div>
          <div className="p-2">
            <label className="text-white">Facility Manager</label>
            <div className="w-full inline-flex border">
              <input className="w-full focus:outline-none text-white p-2 bg-black" />
            </div>
          </div>
          <div className="p-2">
            <label className="text-white">Shift Hours</label>
            <div className="w-full inline-flex border">
              <input className="w-full focus:outline-none text-white p-2 bg-black" />
            </div>
          </div>
          <div className="p-2">
            <label className="text-white">Head Guard</label>
            <div className="w-full inline-flex border">
              <input className="w-full focus:outline-none text-white p-2 bg-black" />
            </div>
          </div>
          <div className="p-2">
            <label className="text-white">Shift Guard Hours</label>
            <div className="w-full inline-flex border">
              <input className="w-full focus:outline-none text-white p-2 bg-black" />
            </div>
          </div>
          <div className="p-2">
            <label className="text-white">Weather</label>
            <div className="w-full inline-flex border">
              <input className="w-full focus:outline-none text-white p-2 bg-black" />
            </div>
          </div>
          <div className="p-2">
            <label className="text-white">Shift Notes</label>
            <div className="w-full inline-flex border">
              <input className="w-full focus:outline-none text-white p-2 bg-black" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
