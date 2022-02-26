import React, { Component } from "react";

export default class ReportFormConfirm extends Component {
  goBack() {
    this.props.prevStep();
  }
  render() {
    return (
      <div>
        <div className="mx-auto container max-w-2xl shadow-md mx-4">
          <div className="bg-white space-y-6 mt-4">
            <div className=" space-y-4 md:space-y-0 w-full p-4 text-black items-center">
              <h2 className=" max-w-sm mx-auto">Confirm and Submit</h2>
              <div className="md:w-2/3 max-w-sm mx-auto">
                <label className="text-sm text-gray-700">Input1</label>
                <div className="w-full inline-flex">
                  <div>input1 value</div>
                </div>
              </div>
              <div className="md:w-2/3 max-w-sm mx-auto">
                <label className="text-sm text-gray-700">Input2</label>
                <div className="w-full inline-flex">
                  <div>input2 value</div>
                </div>
              </div>
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
                    //   onClick={() => this.continue()}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
