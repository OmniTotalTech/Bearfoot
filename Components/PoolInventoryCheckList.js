import React, { Component } from "react";

export default class PoolInventoryCheckList extends Component {
  render() {
    const handleChange = (e, value) => {
      console.log(e.target.value);
      this.setState({ [value]: e.target.value });
      console.log(this.state);
    };
    return (
      <div className="container mx-auto h-full overflow-scroll">
        <div className="w-full border-b-2 py-4">
          <p className="text-3xl text-center my-4">
            Currently performing a {this.props.type} Checklist count.
          </p>
          <p className="text-2xl">Last submitted report:</p>
          <p></p>
          {this.props.data.inventoryList ? (
            this.props.data.inventoryList.map((item, i) => (
              <>
                <div key={i} className="px-2 w-3/4 text-md">
                  {i + 1}. {item.name}
                </div>
                <div className="px-2 text-sm">{item.desc}</div>
                <div className="px-2 text-sm">
                  {item.unitType != "" ? (
                    "( " + item.unitType + " )"
                  ) : (
                    <div></div>
                  )}
                </div>
                <p className="text-sm px-2 m-2">Actual Count:</p>
                <p className="text-md px-2 m-2"></p>
                <div className="w-full">
                  <input
                    onChange={(e, value) => handleChange(e, item.name)}
                    className="text-right mx-2 p-2"
                    type="number"
                  />
                </div>
                <hr />
              </>
            ))
          ) : (
            <div></div>
          )}
        </div>
      </div>
    );
  }
}
