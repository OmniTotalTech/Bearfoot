import React, { Component } from "react";
import BasicInformation from "../../Components/BasicInformation";
import EmployeeAssignment from "../../Components/EmployeeAssignment";
import InventoryModal from "../../Components/InventoryModal";
import { FloatingAction } from "react-native-floating-action";
import PoolInventoryList from "../../Components/PoolInventoryList";
import { ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";
import {
  fetchInventory,
  addInventoryItem,
} from "../../redux/actions/inventory";
import { fetchPool, fetchPoolById } from "../../redux/actions/pool";
import { fetchDailyChecklist } from "../../redux/actions/dailyChecklist";

import EditPoolDropDown from "./EditPoolDropDown";
import AddInventoryModal from "../../Components/AddInventoryModal";

class EditPool extends Component {
  componentDidMount() {
    console.log(this.props.route.params.id);
    this.props.fetchInventory(this.props.route.params.id);
    this.props.fetchDailyChecklist(this.props.route.params.id);
  }
  state = {
    basicInfoView: false,
    inventoryView: true,
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

  async updateInventory(id, body) {
    await this.props.addInventoryItem(id, body);
    await this.props.fetchInventory(this.props.route.params.id);
  }

  render() {
    return (
      <ScrollView>
        <div className="container mx-auto text-center">
          <EditPoolDropDown
            handleClick={(title) => {
              console.log(title);
              switch (title) {
                case "BasicInfo":
                  this.setBasicInfoView();
                  break;
                case "Inventory":
                  this.setInventoryView();
                  break;
                case "EmpAssignment":
                  this.setEmpAssignmentView();
                  break;
              }
            }}
          />

          <div className="flex pt-2">
            <div className="w-full">
              {this.state.basicInfoView != false ? (
                <>
                  <BasicInformation
                    pool={this.props.pool.individualPool}
                    dailyChecklist={this.props.dailyChecklist}
                  />
                </>
              ) : this.state.inventoryView != true ? (
                <div>
                  <EmployeeAssignment
                    pool_primary_driver={
                      this.props.pool.individualPool.pool_primary_driver
                    }
                    pool_secondary_drivers={
                      this.props.pool.individualPool.pool_secondary_drivers
                    }
                    pool_managers={this.props.pool.individualPool.pool_managers}
                    pool_employees={
                      this.props.pool.individualPool.pool_employees
                    }
                    fetchPoolById={this.props.fetchPoolById}
                    orgName={this.props.pool.individualPool.pool_organization}
                    poolId={this.props.pool.individualPool._id}
                    employees={this.props.pool.individualPool.pool_employees}
                    managers={this.props.pool.individualPool.pool_managers}
                  />
                </div>
              ) : (
                <div>
                  {/* <InventoryModal addItem={addItem} /> */}
                  <AddInventoryModal
                    pool={this.props.pool.individualPool}
                    addItem={(id, body) => this.updateInventory(id, body)}
                    inventory={this.props.inventory}
                    fetchPoolById={() =>
                      this.props.fetchInventory(this.props.route.params.id)
                    }
                  />
                  <PoolInventoryList
                    poolId={
                      this.props.inventory.data
                        ? this.props.inventory.data._id
                        : ""
                    }
                    inventory={
                      this.props.inventory.data
                        ? this.props.inventory.data.inventoryList
                        : []
                    }
                    setItem={(key) => setItem(key)}
                    fetchPoolById={() =>
                      this.props.fetchInventory(this.props.route.params.id)
                    }
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    inventory: state.inventory,
    pool: state.pool,
    dailyChecklist: state.dailyChecklist,
  };
};

const mapDisptachToProps = (dispatch) => {
  return {
    fetchInventory: (id) => dispatch(fetchInventory(id)),
    addInventoryItem: (id1, body) => dispatch(addInventoryItem(id1, body)),
    fetchPoolById: (id) => dispatch(fetchPoolById(id)),
    fetchDailyChecklist: (id) => dispatch(fetchDailyChecklist(id)),
  };
};

export default connect(mapStateToProps, mapDisptachToProps)(EditPool);
