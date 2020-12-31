import React, { Component } from "react";
import BasicInformation from "../../Components/BasicInformation";
import EmployeeAssignment from "../../Components/EmployeeAssignment";
import Inventory from "../../Components/Inventory";
import PoolInventoryList from "../../Components/PoolInventoryList";

export default class EditPool extends Component {
  state = {
    basicInfoView: true,
    inventoryView: false,
    empAssignmentView: false,
  };

  setBasicInfoView() {
    this.setState({
      basicInfoView: true,
      inventoryView: false,
      empAssignmentView: false,
    });
  }

  setInventoryView() {
    this.setState({
      inventoryView: true,
      empAssignmentView: false,
      basicInfoView: false,
    });
  }

  setEmpAssignmentView() {
    this.setState({
      empAssignmentView: true,
      basicInfoView: false,
      inventoryView: false,
    });
  }

  render() {
    return (
      <div className="container mx-auto">
        <div className="flex justify-center pt-2">
          <button
            className="bg-red-500 hover:bg-red-400 text-white text-sm font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded mr-2 ml-2"
            onClick={() => this.setBasicInfoView()}
          >
            Basic information
          </button>
          <button
            className="bg-red-500 hover:bg-red-400 text-white text-sm font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded mr-2"
            onClick={() => this.setInventoryView()}
          >
            Inventory
          </button>
          <button
            className="bg-red-500 hover:bg-red-400 text-white text-sm font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded mr-2"
            onClick={() => this.setEmpAssignmentView()}
          >
            Employee assignment
          </button>
        </div>
        {this.state.basicInfoView != false ? (
          <div>
            <BasicInformation />
          </div>
        ) : this.state.inventoryView != true ? (
          <div>
            <EmployeeAssignment />
          </div>
        ) : (
          <div>
            <Inventory />
            <PoolInventoryList />
          </div>
        )}
      </div>
    );
  }
}
