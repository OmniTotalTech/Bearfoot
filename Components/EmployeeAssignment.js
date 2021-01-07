import React, { Component } from "react";

export default class EmployeeAssignment extends Component {
  render() {
    return (
      <div>
        <div className="container mx-auto">
          <div className="bg-gray-100 p-4 border-t-2 bg-opacity-5 rounded-t">
            <div className="max-w-sm mx-auto md:w-full md:mx-0">
              <div className="inline-flex items-center space-x-4">
                <img
                  className="w-10 h-10 object-cover rounded-full"
                  alt="User avatar"
                  src="https://upload.wikimedia.org/wikipedia/commons/a/ad/Placeholder_no_text.svg"
                />
                <h1 className="text-gray-600">
                  {this.props.pool.individualPool.pool_employees}
                </h1>
              </div>
            </div>
          </div>

          <div className="bg-white space-y-6">
            <div className="md:inline-flex space-y-4 md:space-y-0 w-full p-4 text-gray-500 items-center">
              <div className="md:w-2/3 max-w-sm mx-auto">
                <label className="text-sm text-gray-400">Email</label>
                <div>user email</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
