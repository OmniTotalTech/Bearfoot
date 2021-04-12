import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import moment from "moment";

export default function DeliveryItem(props) {
  const renderDateAndTime = (date) => {
    let today = moment(date).format("LT");

    return today;
  };
  return (
    <TouchableOpacity
      disabled={
        props.item.accepted_by == null
          ? false
          : props.item.assigned_driver._id != props.userId
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
            <div className="mb-2 text-lg">
              Location : {props.item.pool_id.pool_name}
            </div>
            <div>Pool Address:</div>
            <div className="">{props.item.pool_id.pool_address}</div>
            <div className="">{props.item.pool_id.pool_state}</div>
            <div className="">{props.item.pool_id.pool_zip}</div>

            <div className="mb-2">
              <span className="text-red-500"> Assigned To: </span>
              {props.item.assigned_driver.name}
            </div>
            <div className="mb-2">
              {" "}
              <span className="text-red-500">Phone:</span>{" "}
              {props.item.assigned_driver.phone}
            </div>
            <div className="mb-2">Backup Drivers:</div>
            <div className="mb-2">
              {props.item.assigned_backup.map((item) => (
                <>
                  <div className="border-0.5 m-1 p-1">
                    <div>{item.name}</div>
                    <div>{item.phone}</div>
                  </div>
                </>
              ))}
            </div>

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
          <div className="text-gray-700 text-sm">
            {renderDateAndTime(props.item.jsDate)}
          </div>
        </div>
      </div>
    </TouchableOpacity>
  );
}
