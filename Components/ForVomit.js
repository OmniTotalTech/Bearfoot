import React, { Component } from "react";

export default class ForVomit extends Component {
  componentDidMount() {
    const data = [
      {
        name: "Time Noticed",
        formValue: "timeNoticed",
      },
      {
        name: "Time Cleaned",
        formValue: "timeCleaned",
      },
      {
        name: "pH",
        formValue: "ph",
      },
      {
        name: "Chlorine",
        formValue: "chlorine",
      },
    ];
    for (var i = 0; i < data.length; i++) {
      this.setState({ [data[i].formValue]: "" });
      this.props.updateState("", data[i].formValue);
    }
  }
  state = {};
  render() {
    const data = [
      {
        name: "Time Noticed",
        formValue: "timeNoticed",
      },
      {
        name: "Time Cleaned",
        formValue: "timeCleaned",
      },
      {
        name: "pH",
        formValue: "ph",
      },
      {
        name: "Chlorine",
        formValue: "chlorine",
      },
    ];
    const updateStateAndProps = (e, name) => {
      this.setState({ [name]: e });
      console.log(this.state);
      this.props.updateState(e, name);
    };
    return (
      <div className="container mx-auto bg-white">
        <div className="bg-red-500 text-white text-xl font-bold p-4">
          For Vomit / Fecal
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
      </div>
    );
  }
}
