import React, { Component } from "react";
import WarningIcon from "@material-ui/icons/Warning";
import { ScrollView } from "react-native";

export default class DeliveryChecklist extends Component {
  render() {
    const switchStatus = (status) => {
      switch (status) {
        case 1:
          return (
            <div>
              <span className="text-xl">Heading to pick up refill...</span>
              <br />
              Now that you've accepted the order, head to the fulfillment
              location.
              <br /> Go on to the next step once you arrive at your location.
            </div>
          );
        case 2:
          return (
            <div>
              <span className="text-xl">Refilling now!</span>
              <br />
              You should now be at the fufillment location. Gather all items you
              require, and proceed to the next step when you are ready to go to
              the drop off location.
            </div>
          );
        case 3:
          return (
            <div>
              <span className="text-xl">Going to the Pool</span>
              <br />
              You should be on your way to the pool location. Please check the
              address to verify you are heading to the right location.
            </div>
          );
        case 4:
          return (
            <div>
              <span className="text-xl">Gone Swimming...</span>
              <br />
              Everything should be dropped off now. Finalize your delivery form
              now please.
            </div>
          );
      }
    };
    return (
      <ScrollView>
        <div className="px-4 py-2">
          <div className="bg-white px-5 pt-4">
            <div className="divide-y divide-gray-400 mb-4">
              <div>{switchStatus(this.props.status)}</div>
              <div className="text-center py-2">Delivery Checklist</div>
              <div className="flex flex-row w-full items-center">
                <div>
                  <WarningIcon
                    className="text-2xl p-1"
                    style={{
                      color: "red",
                    }}
                  />
                </div>
                <div className="p-2  w-2/3 mr-1 text-sm">
                  Needed Items (Out)
                </div>
                <div className="grid grid-cols-2 divide-x divide-gray-400 w-1/3 ">
                  <div className="text-center px-4 mx-4 text-sm">
                    Minimum Needed
                  </div>
                  <div className="text-center px-2 text-sm">Amount Bought</div>
                </div>
              </div>
              <div className="flex flex-row w-full items-center">
                <div className="p-2 w-5/6 mr-1">Paper Towels</div>
                <div className="grid grid-cols-2 divide-x divide-gray-400 w-1/3 ">
                  <div className="text-center px-1 text-sm text-red-500">3</div>
                  <div className="text-center px-1 text-sm">8</div>
                </div>
              </div>
              <div className="flex flex-row w-full items-center">
                <div className="p-2 w-5/6 mr-1">Bandages(long)</div>
                <div className="grid grid-cols-2 divide-x divide-gray-400 w-1/3 ">
                  <div className="text-center px-1 text-sm text-red-500">1</div>
                  <div className="text-center px-1 text-sm">2</div>
                </div>
              </div>
            </div>
            <div className="divide-y divide-gray-400">
              <div className="flex flex-row w-full items-center">
                <div>
                  <WarningIcon
                    className="text-4xl p-1"
                    style={{
                      color: "yellow",
                    }}
                  />
                </div>
                <div className="p-1 mr-1">Warning Items (Low)</div>
                <div className="grid grid-cols-2 divide-x divide-gray-400 w-1/3 ">
                  <div className="text-center px-1 text-xs">In Stock Amt</div>
                  <div className="text-center px-1 text-xs">Amount Bought</div>
                </div>
              </div>
              <div className="flex flex-row w-full items-center">
                <div className="p-2 w-5/6 mr-1">Bandages(long)</div>
                <div className="grid grid-cols-2 divide-x divide-gray-400 w-1/3 ">
                  <div className="text-center px-1 text-sm text-red-500">1</div>
                  <div className="text-center px-1 text-sm">2</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollView>
    );
  }
}
