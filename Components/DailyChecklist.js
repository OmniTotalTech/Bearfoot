import React, { Component } from "react";

export default class DailyChecklist extends Component {
  render() {
    return (
      <div>
        <div className="container mx-auto h-full overflow-scroll bg-gray-100">
          <div className="w-full shadow-lg border-b-2 py-4">
            <div className="flex justify-between">
              <div className="text-xl p-2">Clean</div>
              <div className="p-2">
                <input type="checkbox"></input>
              </div>
            </div>
            <div className="p-2 border-b-2">clean this</div>
            <div className="flex justify-between">
              <div className="text-xl px-2 py-2">Wipedown</div>
              <div className="px-2 py-2">
                <input type="checkbox"></input>
              </div>
            </div>
            <div className="p-2 border-b-2">wipedown all areas</div>
            <div className="flex justify-between">
              <div className="text-xl px-2 py-2">Sweep</div>
              <div className="px-2 py-2">
                <input type="checkbox"></input>
              </div>
            </div>
            <div className="p-2 border-b-2">sweep all areas</div>
            <div className="flex justify-between">
              <div className="text-xl px-2 py-2">Mop</div>
              <div className="px-2 py-2">
                <input type="checkbox"></input>
              </div>
            </div>
            <div className="p-2 border-b-2">mop all areas</div>
            <div className="text-center pt-4">
              <button className="bg-red-700 hover:bg-red-600 text-white font-semibold py-2 px-4 border border-red-400 rounded shadow">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
