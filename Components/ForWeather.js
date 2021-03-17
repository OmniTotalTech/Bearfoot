import React, { Component } from "react";

export default class ForWeather extends Component {
  componentDidMount() {
    const data2 = [
      {
        name: "Lightning",
        formValue: "lightning",
      },
      {
        name: "Heavy Rain",
        formValue: "heavyRain",
      },
      {
        name: "Thunder",
        formValue: "thunder",
      },
      {
        name: "Other",
        formValue: "other",
      },
    ];
    for (var i = 0; i < data2.length; i++) {
      this.setState({ [data2[i].formValue]: false });
      console.log(this.state);
      this.props.updateState(false, data2[i].formValue);
    }
  }
  state = {};

  render() {
    const data2 = [
      {
        name: "Lightning",
        formValue: "lightning",
      },
      {
        name: "Heavy Rain",
        formValue: "heavyRain",
      },
      {
        name: "Thunder",
        formValue: "thunder",
      },
      {
        name: "Other",
        formValue: "other",
      },
    ];
    const updateStateAndProps2 = (e, name) => {
      this.setState({ [name]: e });
      this.props.updateState(e, name);
    };
    return (
      <div className="container mx-auto bg-white">
        <div className="bg-red-500 text-white text-xl font-bold p-4">
          For Weather
        </div>
        <div className="bg-white px-4">
          {" "}
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
      </div>
    );
  }
}
