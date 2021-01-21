import React, { Component } from "react";
import PoolInventoryCheckList from "../../Components/PoolInventoryCheckList";
import { connect } from "react-redux";
import { fetchInventory } from "../../redux/actions/inventory";
class InventoryCheck extends Component {
  componentDidMount() {
    this.props.fetchInventory(this.props.route.params.id);
  }
  render() {
    return (
      <div className="h-full">
        <PoolInventoryCheckList
          data={this.props.inventory.data}
          type={this.props.route.params.type}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    inventory: state.inventory,
  };
};

const mapDisptachToProps = (dispatch) => {
  return {
    fetchInventory: (id) => dispatch(fetchInventory(id)),
  };
};
export default connect(mapStateToProps, mapDisptachToProps)(InventoryCheck);
