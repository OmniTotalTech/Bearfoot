import React, { Component } from "react";
import api from "../../utils/api";

class DeliveryDetail extends Component {
  componentDidMount() {
    console.log(this.props.route.params.item);
  }

  render() {
    return (
      <>
        <div className="container bg-white p-4 m-4 overflow-scroll mx-auto">
          {this.props.route.params.item.accepted_by != null ? (
            <>
              <div className="container mx-auto text-center rounded-br-lg">
                <div className="bg-white mt-4 rounded-br-lg rounded-bl-lg rounded-tr-lg ">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/a/ad/Placeholder_no_text.svg"
                    alt="..."
                    style={{ height: "250px", width: "250px" }}
                    className="shadow rounded-full w-full mx-auto"
                  />
                  <div className="text-xl bold  p-2">
                    {this.props.route.params.item.accepted_by.name}
                  </div>
                  <div className="text-lg  p-2">
                    {this.props.route.params.item.accepted_by.phone}
                  </div>
                  <div className="text-lg  p-2">
                    {this.props.route.params.item.accepted_by.email}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div>None Currently Assigned</div>
          )}
          <div className="container mx-auto">
            {" "}
            <div className="text-lg">Delivery Item List</div>
            {this.props.route.params.item.starting_list.map((item) => (
              <>
                <div className="flex flex-row w-full items-center border">
                  <div className="p-2  w-2/3 mr-1">{item.name}</div>
                  <div className="grid grid-cols-1 divide-x divide-gray-400 w-1/3 ">
                    <div className="text-center px-4 mx-4 text-red-500 text-sm">
                      {item.lowAmt} - low amount
                    </div>
                    <div className="text-center px-2 text-sm">
                      {item.inStockAmt} - in stock
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>

          <div className="bg-white mt-4 rounded-br-lg rounded-bl-lg rounded-tr-lg ">
            <div className="text-4xl">Final Comments:</div>

            <div className="text-lg  p-2">
              {this.props.route.params.item.final_commments}
            </div>
            <div className="text-4xl">Pool Info:</div>

            <div className="text-2xl bold  p-2">
              {this.props.route.params.item.pool_id.pool_name}
            </div>
            <div className="text-lg  p-2">
              {this.props.route.params.item.pool_id.pool_address} ,
              {this.props.route.params.item.pool_id.pool_state}
              <br />
              {this.props.route.params.item.pool_id.pool_zip}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default DeliveryDetail;
