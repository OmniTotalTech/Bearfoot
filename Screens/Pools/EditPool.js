import React, { Component } from "react";
import BasicInformation from "../../Components/BasicInformation";
import EmployeeAssignment from "../../Components/EmployeeAssignment";
import InventoryForm from "../../Components/Inventory";
import { FloatingAction } from "react-native-floating-action";
import PoolInventoryList from "../../Components/PoolInventoryList";
import { ScrollView } from "react-native-gesture-handler";
import { connect } from "react-redux";
import { fetchInventory } from "../../redux/actions/inventory";
import EditPoolDropDown from "./EditPoolDropDown";
class EditPool extends Component {
  componentDidMount() {
    console.log(this.props.route.params.id);
    this.props.fetchInventory(this.props.route.params.id);
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

  render() {
    function addInventoryItem(itemid) {
      // this.props.addItem(listId, itemid);
      console.log(this.props.state);
    }
    function setItem(key) {
      console.log(key);
    }
    const actions = [
      {
        text: "Basic Information",
        name: "BasicInfo",
        position: 2,
        title: "BasicInfo",
      },
      {
        text: "Inventory",
        name: "Inventory",
        position: 1,
        title: "Inventory",
      },
      {
        text: "Employee Assignment",
        name: "EmpAssignment",
        position: 1,
        title: "EmpAssignment",
      },
    ];
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
                  <BasicInformation />
                </>
              ) : this.state.inventoryView != true ? (
                <div>
                  {/* <Inventory /> */}
                  <EmployeeAssignment pool={this.props.pool} />
                </div>
              ) : (
                <div>
                  <InventoryForm addInventoryItem={addInventoryItem} />
                  <PoolInventoryList
                    inventory={this.props.inventory.data.inventoryList}
                    setItem={(key) => setItem(key)}
                  />
                </div>
              )}
              {/* <FloatingAction
                color={"#FF0000"}
                actions={actions}
                position="right"
                onPressItem={(title) => {
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
              /> */}
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
  };
};

const mapDisptachToProps = (dispatch) => {
  return {
    fetchInventory: (id) => dispatch(fetchInventory(id)),
  };
};

export default connect(mapStateToProps, mapDisptachToProps)(EditPool);
