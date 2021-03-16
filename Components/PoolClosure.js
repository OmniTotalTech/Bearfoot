import React, { Component } from "react";

export default class PoolClosure extends Component {
  componentDidMount() {
    const data = [
      {
        name: "Pool(s)",
        formValue: "pools",
      },
      {
        name: "Time Closed",
        formValue: "timeClosed",
      },
      {
        name: "timeReoped",
        formValue: "timeReopened",
      },
      {
        name: "reason",
        formValue: "reason",
      },
    ];
    const data2 = [
      {
        name: "Vomit",
        formValue: "vomit",
      },
      {
        name: "fecal",
        formValue: "fecal",
      },
      {
        name: "weather",
        formValue: "weather",
      },
      {
        name: "Pool Clarity",
        formValue: "poolClarity",
      },
    ];
    for (var i = 0; i < data.length; i++) {
      this.setState({ [data[i].formValue]: "" });
      console.log(this.state);
      this.props.updateState("", data[i].formValue);
    }
    for (var i = 0; i < data2.length; i++) {
      this.setState({ [data2[i].formValue]: false });
      console.log(this.state);
      this.props.updateState(false, data2[i].formValue);
    }
  }
  state = {};
  render() {
    const data = [
      {
        name: "Pool(s)",
        formValue: "pools",
      },
      {
        name: "Time Closed",
        formValue: "timeClosed",
      },
      {
        name: "timeReoped",
        formValue: "timeReopened",
      },
      {
        name: "reason",
        formValue: "reason",
      },
    ];
    const data2 = [
      {
        name: "Vomit",
        formValue: "vomit",
      },
      {
        name: "fecal",
        formValue: "fecal",
      },
      {
        name: "weather",
        formValue: "weather",
      },
      {
        name: "Pool Clarity",
        formValue: "poolClarity",
      },
    ];
    const updateStateAndProps = (e, name) => {
      this.setState({ [name]: e });
      console.log(this.state);
      this.props.updateState(e, name);
    };
    const updateStateAndProps2 = (e, name) => {
      this.setState({ [name]: e });
      this.props.updateState(e, name);
    };
    return (
      <div className="container mx-auto bg-white">
        <div className="bg-gray-500 text-black text-xl font-bold p-4">
          Pool Closure
        </div>
        {data.map((item) => (
          <div className="grid grid-cols-2 divide-x divide-white w-full border-b-2  py-4">
            <div className="text-black px-2">{item.name}:</div>
            <div className="p-2">
              <div className="w-full inline-flex border">
                <input
                  onChange={(e) =>
                    updateStateAndProps(e.target.value, item.formValue)
                  }
                  className="w-full focus:outline-none text-black p-2 bg-white"
                />
              </div>
            </div>
          </div>
        ))}
        {data2.map((item) => (
          <div className="flex justify-between">
            <div className="text-black text-lg py-4">{item.name}</div>
            <div className="px-2 py-4">
              <input
                onChange={(e) =>
                  updateStateAndProps2(e.target.checked, item.formValue)
                }
                type="checkbox"
              ></input>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
