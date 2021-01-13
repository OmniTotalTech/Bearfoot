import React, { Component } from "react";

export default class ForVomit extends Component {
  render() {
    return (
      <div className="container mx-auto bg-black">
        <div className="bg-gray-500 text-white text-xl font-bold p-4">
          For Vomit / Fecal
        </div>
        <div className="grid grid-cols-2 divide-x divide-white w-full border-b-2 border-white py-4">
          <div className="text-white px-2">Time Noticed:</div>
          <div></div>
        </div>
        <div className="grid grid-cols-2 divide-x divide-white w-full border-b-2 border-white py-4">
          <div className="text-white px-2">Time Cleaned:</div>
          <div></div>
        </div>
        <div className="grid grid-cols-2 divide-x divide-white w-full border-b-2 border-white py-4">
          <div className="text-white px-2">pH:</div>
          <div></div>
        </div>
        <div className="grid grid-cols-2 divide-x divide-white w-full border-b-2 border-white py-4">
          <div className="text-white px-2">Chlorine:</div>
          <div></div>
        </div>
      </div>
    );
  }
}
