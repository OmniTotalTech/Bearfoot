import React, { Component } from "react";
import TitleAndInput from "./TitleAndInput";

export default class BasicInformation extends Component {
  state = { address: "", poolName: "", other: "" };

  render() {
    const inputs = [
      {
        placeholder: "address",
        title: "Address",
        value: "address",
      },
      {
        placeholder: "poolName",
        title: "PoolName",
        value: "poolName",
      },
      {
        placeholder: "other",
        title: "other",
        value: "other",
      },
    ];

    const onChange = (e, value) => {
      this.setState({ address: e });
    };

    const inputsMap = (array) => {
      console.log(array);
      return array.map((item, i) => (
        <>
          <TitleAndInput
            key={i}
            item={item}
            onChange={(value, item) => onChange(value, item)}
          />
          <br />
        </>
      ));
    };

    return (
      <div>
        <div className="mx-auto container max-w-2xl shadow-md mx-4">
          <div className="bg-white space-y-6 mt-4">
            <div className=" space-y-4 md:space-y-0 w-full p-4 text-black items-center">
              <h2 className=" max-w-sm mx-auto">Basic Info</h2>
              {inputsMap(inputs)}
              <div className="w-full p-4 text-right text-gray-500">
                <button
                  className="inline-flex text bg-red-700 p-2 rounded text-white"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
