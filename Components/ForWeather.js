import React, { Component } from "react";

export default class ForWeather extends Component {
  render() {
    return (
      <div className="container mx-auto bg-black">
        <div className="bg-gray-500 text-white text-xl font-bold p-4">
          For Weather
        </div>
        <div className="bg-black px-4">
          <div className="flex justify-between">
            <div className="text-white text-lg py-4">Lighting:</div>
            <div className="px-2 py-4">
              <input type="checkbox"></input>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="text-white text-lg py-4">Heavy Rain:</div>
            <div className="px-2 py-4">
              <input type="checkbox"></input>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="text-white text-lg py-4">Thunder:</div>
            <div className="px-2 py-4">
              <input type="checkbox"></input>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="text-white text-lg py-4">Other:</div>
            <div className="px-2 py-4">
              <input type="checkbox"></input>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
