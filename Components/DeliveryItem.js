import React, { Component } from "react";
import { TouchableOpacity } from "react-native";

export default function DeliveryItem(props) {
  return (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate("DeliveryReview", { item: props.item })
      }
    >
      <div className="py-1">
        <div className="bg-white px-3 py-2 rounded">
          <div>
            <div className="mb-2">{props.item.date}</div>
            <div className="text-gray-700 text-sm">Assigned:</div>
          </div>
          <div className="flex flex-wrap">
            <div className="w-1/2 text-gray-700 text-sm">
              <div>{props.item.date}</div>
            </div>
            <div className="w-1/2 text-right text-sm">
              <button className="bg-red-200 hover:bg-red-300 rounded border-solid border-2 border-red-700 text-red-700 px-1 text-sm">
                {props.item.status == 0 ? (<div>Not Accepted</div>): (props.item.status == 1 ? <div>Accepted, Inventory Stage</div>: (props.item.status == 2 ? <div>Accepted, En Route to Pool </div>: <div>Complete</div>))}
              </button>
            </div>
          </div>
          <div className="text-gray-700 text-sm">12:40 PM</div>
        </div>
      </div>
    </TouchableOpacity>
  );
}
