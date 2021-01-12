import React, { Component } from "react";
import TitleAndInput from "./TitleAndInput";

export default class ReportFormTwo extends Component {
  continue() {
    this.props.nextStep();
  }

  goBack() {
    this.props.prevStep();
  }

  render() {
    const inputs = [
      {
        placeholder: "Input 2",
        title: "Input 2",
        value: "inputTwo",
      },
    ];
    const onChange = (e, value) => {
      this.setState({ inputTwo: e });
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
        <form>
          <div className="mx-auto container max-w-2xl shadow-md mx-4">
            <div className="bg-white space-y-6 mt-4">
              <div className=" space-y-4 md:space-y-0 w-full p-4 text-black items-center">
                <h2 className=" max-w-sm mx-auto">Report Step 2</h2>
                {inputsMap(inputs)}
                <div className="flex justify-end p-4">
                  <div className="mr-4">
                    <button
                      className="bg-red-700 p-2 rounded text-white"
                      onClick={() => this.goBack()}
                    >
                      Go Back
                    </button>
                  </div>
                  <div>
                    <button
                      className="bg-red-700 p-2 rounded text-white"
                      onClick={() => this.continue()}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
