import React, { Component } from "react";
export default class PoolInventoryCheckList extends Component {
  render() {
    return (
      <div className="container mx-auto overflow-scroll mt-4 max-w-2xl bg-gray-100">
        {" "}
        <div className="w-full shadow-lg border-b-2 py-4">
          <p className="text-3xl text-center my-4">
            Currently performing a {this.props.type} Checklist count.
          </p>
          {/* <p className="text-2xl px-4">Last submitted report:</p> */}
          <p></p>
          {this.props.data ? (
            this.props.data.inventoryList.map((item, i) => (
              <>
                <div key={i} className="px-6 w-3/4 text-md">
                  {i + 1}. {item.name}
                </div>
                <div className="px-6 text-sm">{item.desc}</div>
                <div className="px-6 text-sm">
                  {item.unitType != "" ? (
                    "( " + item.unitType + " )"
                  ) : (
                    <div></div>
                  )}
                </div>
                <p className="text-sm px-6">Actual Count:</p>
                <p className="text-md px-6 m-2"></p>
                <div className="w-full">
                  <input
                    onChange={(e, value) =>
                      this.props.handleChange(e, item._id, item.name, item.desc)
                    }
                    className="text-right mx-6 mb-4 px-4 py-2 border-solid border-2 "
                    type="number"
                  />
                </div>
                <hr />
              </>
            ))
          ) : (
            <div></div>
          )}
          <div className="text-center pt-4">
            <button
              onClick={this.props.onSubmit}
              className="bg-red-700 hover:bg-red-600 text-white font-semibold py-2 px-4 border border-red-400 rounded shadow"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
}
