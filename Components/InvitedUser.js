import React, { Component } from "react";

export default class InvitedUser extends Component {
  render() {
    return (
      <div>
        <div>
          {/* border-red-400 */}
          <div className="bg-gray-100 p-4 border-t-2 bg-opacity-5  rounded-t -my-4">
            <div className="max-w-sm mx-auto md:w-full md:mx-0">
              <div className="inline-flex items-center space-x-4">
                {this.props.pic != "" ? (
                  <div>
                    <img
                      src={
                        "https://bearfoot-app-images.s3.us-east-2.amazonaws.com/profile-images/" +
                        this.props.pic
                      }
                      alt="..."
                      style={{ height: "50px", width: "50px" }}
                      className="shadow rounded-full float-left align-middle border-none object-contain"
                    />
                  </div>
                ) : (
                  <div>
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/a/ad/Placeholder_no_text.svg"
                      alt="..."
                      style={{ height: "50px", width: "50px" }}
                      className="shadow rounded-full float-left align-middle border-none object-contain"
                    />
                  </div>
                )}
                <h1 className="text-gray-600">{this.props.name}</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white space-y-6">
          <div className="md:inline-flex space-y-4 md:space-y-0 w-full p-4 text-gray-500 items-center">
            <div className="md:w-2/3 max-w-sm mx-auto">
              <label className="text-sm text-gray-400">Email</label>
              <div>{this.props.email}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
