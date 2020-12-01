import React, { Component } from "react";

export default function DeliveryItem(props) {
  return (
    <div className="py-1">
      <div className="bg-white px-3 py-2 rounded">
        <div>
          <div className="mb-2">Savannah</div>
          <div className="text-gray-700 text-sm">Assigned:</div>
        </div>
        <div className="flex flex-wrap">
          <div className="w-1/2 text-gray-700 text-sm">
            <div>{props.date}</div>
          </div>
          <div className="w-1/2 text-right text-sm">
            <button className="bg-red-200 hover:bg-red-300 rounded border-solid border-2 border-red-700 text-red-700 px-1 text-sm">
              Not Accepted
            </button>
          </div>
        </div>
        <div className="text-gray-700 text-sm">12:40 PM</div>
      </div>
    </div>
  );
}
