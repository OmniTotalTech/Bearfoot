import React, { Component } from "react";
import ListIcon from "@material-ui/icons/List";

export default class DeliveryAccept extends Component {
  render() {
    return (
      <div>
        <div className="px-4 ">
          <div className="rounded-t-lg bg-white pt-4 pb-24 my-2 text-center">
            <div className="mb-8">
              <div className="font-bold">0.5 mi</div>
              <div>Requested By Savannah</div>
            </div>
            <div>
              <div className="mb-3">
                <ListIcon
                  className="text-4xl mr-2"
                  style={{
                    color: "white",
                    backgroundColor: "black",
                    borderRadius: "50%",
                  }}
                />
                View Delivery Items List
              </div>
              <button className="bg-red-600 hover:bg-red-700 text-white text-sm py-2 px-4 rounded-full w-11/12">
                ACCEPT
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
