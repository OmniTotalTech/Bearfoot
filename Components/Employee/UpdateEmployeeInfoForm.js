import React, { Component } from "react";

export default class UpdateEmployeeInfoForm extends Component {
  render() {
    const updateForm = () => {
      console.log("hello");
    };
    return (
      <div>
        <div className="mx-auto container max-w-2xl md:w-3/4 shadow-md mx-4">
          <div className="bg-gray-100 p-4 border-t-2 bg-opacity-5 rounded-t mt-4">
            <div className="max-w-sm mx-auto md:w-full md:mx-0">
              <div className="inline-flex items-center space-x-4">
                <img
                  className="w-10 h-10 object-cover rounded-full"
                  alt="User avatar"
                  src="https://upload.wikimedia.org/wikipedia/commons/a/ad/Placeholder_no_text.svg"
                />

                <h1 className="text-gray-600">Update Account</h1>
              </div>
            </div>
          </div>
          <div className="bg-white space-y-6">
            <div className="md:inline-flex space-y-4 md:space-y-0 w-full p-4 text-gray-500 items-center">
              <h2 className="md:w-1/3 max-w-sm mx-auto">Name</h2>
              <div className="md:w-2/3 max-w-sm mx-auto">
                <div className="w-full inline-flex border">
                  <input
                    type="text"
                    className="w-full focus:outline-none text-gray-600 p-2"
                    value={this.props.name}
                  />
                </div>
              </div>
            </div>

            <hr />
            <div className="md:inline-flex space-y-4 md:space-y-0 w-full p-4 text-gray-500 items-center">
              <h2 className="md:w-1/3 max-w-sm mx-auto">Email</h2>
              <div className="md:w-2/3 max-w-sm mx-auto">
                <div className="w-full inline-flex border">
                  <input
                    type="email"
                    className="w-full focus:outline-none text-gray-700 p-2"
                    value={this.props.email}
                  />
                </div>
              </div>
            </div>
            <hr />
            <div className="md:inline-flex space-y-4 md:space-y-0 w-full p-4 text-gray-500 items-center">
              <h2 className="md:w-1/3 max-w-sm mx-auto">Phone Number</h2>
              <div className="md:w-2/3 max-w-sm mx-auto">
                <div className="w-full inline-flex border">
                  <input
                    type="text"
                    className="w-full focus:outline-none focus:text-gray-600 p-2"
                    placeholder="(123) 456 - 7890"
                  />
                </div>
              </div>
            </div>
            <hr />
            <div className="md:inline-flex space-y-4 md:space-y-0 w-full p-4 text-gray-500 items-center">
              <h2 className="md:w-1/3 max-w-sm mx-auto">Password</h2>
              <div className="md:w-2/3 max-w-sm mx-auto">
                <div className="w-full inline-flex border mb-4">
                  <input
                    type="text"
                    className="w-full focus:outline-none focus:text-gray-600 p-2"
                    placeholder="Enter new password"
                  />
                </div>
                <div className="w-full inline-flex border">
                  <input
                    type="text"
                    className="w-full focus:outline-none focus:text-gray-600 p-2"
                    placeholder="Retype password"
                  />
                </div>
              </div>
            </div>
            <hr />
            <div className="w-full p-4 text-right text-gray-500">
              <button
                onClick={() => {
                  updateForm();
                }}
                className="inline-flex text bg-red-700 p-2 rounded text-white"
                type="submit"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
