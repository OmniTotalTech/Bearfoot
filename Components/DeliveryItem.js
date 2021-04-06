import React, { Component } from "react";
import { TouchableOpacity } from "react-native";

export default function DeliveryItem(props) {
  return (
    <TouchableOpacity
      disabled={
        props.item.accepted_by == null
          ? false
          : props.item.accepted_by._id != props.userId
          ? true
          : false
      }
      onPress={() =>
        props.navigation.navigate("DeliveryReview", { item: props.item })
      }
    >
      <div className="py-1">
        <div
          className=" px-3 py-2 rounded"
          style={{
            backgroundColor:
              props.item.accepted_by == null && props.item.status == 0
                ? "white"
                : props.item.accepted_by._id == props.userId
                ? "white"
                : "gray",
          }}
        >
          <div>
            {/* <div className="mb-2 text-lg">{props.item.pool_id.pool_name}</div> */}
            {console.log(props.item)}
            <div className="mb-2">{props.item.date}</div>
            {props.item.accepted_by != null ? (
              <>
                <div className="text-gray-700 text-sm">
                  Assigned:{props.item.accepted_by.name}
                </div>
                <div className="text-gray-700 text-sm">
                  Contact:{props.item.accepted_by.phone}
                </div>
              </>
            ) : null}
          </div>
          <div className="flex flex-wrap">
            <div className="w-1/2 text-gray-700 text-sm">
              <div></div>
            </div>
            <div className="w-1/2 text-right text-sm">
              <button className="bg-red-200 hover:bg-red-300 rounded border-solid border-2 border-red-700 text-red-700 px-1 text-sm">
                {props.item.status == 0 ? (
                  <div>Not Accepted</div>
                ) : props.item.status == 1 ? (
                  <div>Accepted, Inventory Stage</div>
                ) : props.item.status == 2 ? (
                  <div>Accepted, En Route to Pool </div>
                ) : props.item.status == 3 ? (
                  <div>Dropped off, not complete</div>
                ) : props.item.status == 4 ? (
                  <div>Waiting on Driver Finalization</div>
                ) : (
                  <div>Complete</div>
                )}
              </button>
            </div>
          </div>
          <div className="text-gray-700 text-sm">12:40 PM</div>
        </div>
      </div>
    </TouchableOpacity>
  );
}
