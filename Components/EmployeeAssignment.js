import React, { Component } from "react";
import EmployeeList from "./Admin/EmployeeList";
import ManagerList from "./Admin/ManagerList";

export default class EmployeeAssignment extends Component {
  render() {
    // test
    return (
      <div className="container max-w-2xl mx-auto">
        <p className="text-3xl text-left bold">Employees</p>

        <EmployeeList employees={this.props.employees} />
        <p className="text-3xl text-left bold">Managers</p>
        <ManagerList employees={this.props.managers} />

        <p className="text-3xl text-left bold">Supervisors</p>
        {/* <EmployeeList employees={this.props.employees} /> */}
      </div>
    );
  }
}
