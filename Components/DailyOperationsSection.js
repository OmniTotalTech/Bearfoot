import React, { Component } from "react";

export default class DailyOperationsSection extends Component {
  componentDidMount() {
    const data = [
      {
        name: "Facility Manager",
        formValue: "facilityManager",
      },
      {
        name: "Shift Hours",
        formValue: "shiftHours",
      },
      {
        name: "Head Guard",
        formValue: "headGuard",
      },
      {
        name: "Shift Guard Hours",
        formValue: "shiftGuardHours",
      },
      {
        name: "Weather",
        formValue: "weather",
      },
      {
        name: "Shift Notes",
        formValue: "shiftNotes",
      },
    ];
    for (var i = 0; i < data.length; i++) {
      this.setState({ [data[i].formValue]: "" });
      console.log(this.state);
      this.props.updateState("", data[i].formValue);
    }
  }

  render() {
    const data = [
      {
        name: "Facility Manager",
        formValue: "facilityManager",
      },
      {
        name: "Shift Hours",
        formValue: "shiftHours",
      },
      {
        name: "Head Guard",
        formValue: "headGuard",
      },
      {
        name: "Shift Guard Hours",
        formValue: "shiftGuardHours",
      },
      {
        name: "Weather",
        formValue: "weather",
      },
      {
        name: "Shift Notes",
        formValue: "shiftNotes",
      },
    ];
    const updateStateAndProps = (e, name) => {
      this.setState({ [name]: e });
      console.log(this.state);
      this.props.updateState(e, name);
    };
    return (
      <div className="container mx-auto bg-white">
        <div className="bg-gray-500 text-black text-xl font-bold p-4">
          Daily Operations
        </div>
        <div>
          {data.map((item) => (
            <div className="p-2">
              <label className="text-black">{item.name}</label>
              <div className="w-full inline-flex border">
                <input
                  onChange={(e) =>
                    updateStateAndProps(e.target.value, item.formValue)
                  }
                  className="w-full focus:outline-none text-black p-2 bg-white"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
