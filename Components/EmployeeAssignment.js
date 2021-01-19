import React, { Component } from "react";
import EmployeeList from "./Admin/EmployeeList";
import ManagerList from "./Admin/ManagerList";
import SearchAndAssign from "./SearchAndAssign";
export default class EmployeeAssignment extends Component {
  render() {
    console.log(this.props);

    // test
    return (
      <div className="container mx-auto">
        <p className="text-3xl text-left bold">Employees</p>

        <EmployeeList employees={this.props.employees} />
        <SearchAndAssign
          title={"managers"}
          orgName={this.props.orgName}
          poolId={this.props.poolId}
          fetchPoolById={this.props.fetchPoolById}
        />
        {this.props.pool_primary_driver ? (
          <div className="container mx-auto max-w-3xl">
            <div className="bg-gray-100 p-4 border-t-2 bg-opacity-5 rounded-t">
              <div className="max-w-sm mx-auto md:w-full md:mx-0">
                <div className="pace-x-4">
                  <img
                    className="w-10 h-10 object-cover rounded-full"
                    alt="User avatar"
                    src="https://upload.wikimedia.org/wikipedia/commons/a/ad/Placeholder_no_text.svg"
                  />
                  <h1 className="text-gray-600">
                    Name: {this.props.pool_primary_driver.name}
                  </h1>
                </div>
              </div>
            </div>

            <div className="bg-white space-y-6 text-left">
              <div className="space-y-4 md:space-y-0 w-full  text-gray-500">
                <label className="text-md text-gray-700">
                  Email: {this.props.pool_primary_driver.email}
                </label>
                <div>
                  <button className="bg-red-500 rounded p-2  text-white m-1">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 mx-auto">
            <div className="border-dashed border-4 border-red-500 p-8 w-full">
              None Assigned
            </div>
          </div>
        )}

        <SearchAndAssign
          title={"primary"}
          orgName={this.props.orgName}
          poolId={this.props.poolId}
          fetchPoolById={this.props.fetchPoolById}
        />
        {this.props.pool_primary_driver ? (
          <div className="container mx-auto max-w-3xl">
            <div className="bg-gray-100 p-4 border-t-2 bg-opacity-5 rounded-t">
              <div className="max-w-sm mx-auto md:w-full md:mx-0">
                <div className="pace-x-4">
                  <img
                    className="w-10 h-10 object-cover rounded-full"
                    alt="User avatar"
                    src="https://upload.wikimedia.org/wikipedia/commons/a/ad/Placeholder_no_text.svg"
                  />
                  <h1 className="text-gray-600">
                    Name: {this.props.pool_primary_driver.name}
                  </h1>
                </div>
              </div>
            </div>

            <div className="bg-white space-y-6 text-left">
              <div className="space-y-4 md:space-y-0 w-full  text-gray-500">
                <label className="text-md text-gray-700">
                  Email: {this.props.pool_primary_driver.email}
                </label>
                <div>
                  <button className="bg-red-500 rounded p-2  text-white m-1">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 mx-auto">
            <div className="border-dashed border-4 border-red-500 p-8 w-full">
              None Assigned
            </div>
          </div>
        )}
        <SearchAndAssign
          title={"secondary"}
          orgName={this.props.orgName}
          poolId={this.props.poolId}
          fetchPoolById={this.props.fetchPoolById}
        />
        <div className="overflow-scroll w-full h-96">
          {this.props.pool_secondary_drivers ? (
            this.props.pool_secondary_drivers.map((item, i) => (
              <div className="container mx-auto max-w-3xl">
                <div className="bg-gray-100 p-4 border-t-2 bg-opacity-5 rounded-t">
                  <div className="max-w-sm mx-auto md:w-full md:mx-0">
                    <div className="pace-x-4">
                      <img
                        className="w-10 h-10 object-cover rounded-full"
                        alt="User avatar"
                        src="https://upload.wikimedia.org/wikipedia/commons/a/ad/Placeholder_no_text.svg"
                      />
                      <h1 className="text-gray-600">Name: {item.name}</h1>
                    </div>
                  </div>
                </div>

                <div className="bg-white space-y-6 text-left">
                  <div className="space-y-4 md:space-y-0 w-full  text-gray-500">
                    <label className="text-md text-gray-700">
                      Email: {item.email}
                    </label>
                    <div>
                      <button className="bg-red-500 rounded p-2  text-white m-1">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="grid grid-cols-1 mx-auto">
              <div className="border-dashed border-4 border-red-500 p-8 w-full">
                None Assigned
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
