import React, { Component } from "react";
import PoolInventoryCheckList from "../../Components/PoolInventoryCheckList";
import { connect } from "react-redux";
import { fetchInventory } from "../../redux/actions/inventory";
import api from "../../utils/api";

import AlertPopUp from "../../Components/AlertPopUp";

class InventoryCheck extends Component {
  componentDidMount() {
    this.props.fetchInventory(this.props.route.params.id);
  }
  state = { showAlert: false };

  render() {
    const handleChange = (e, value, name, desc) => {
      console.log(e.target.value);
      this.setState({ [name]: parseInt(e.target.value) });
      console.log(this.state);
    };

    const setOpen = () => {
      this.setState({ showAlert: false });
    };
    function isNumeric(value) {
      return /^-?\d+$/.test(value);
    }
    const onSubmit = () => {
      for (var item in this.state) {
        var count = 0;
        var finalObjectArray = [];
        console.log(this.state);
        for (const [key, value] of Object.entries(this.state)) {
          if (isNumeric(value)) {
            console.log(`${key}: ${value}`);
            finalObjectArray.push({ _id: `${key}`, inStockAmt: `${value}` });
          }
        }
      }

      let body = {
        pool_id: this.props.pool._id,
        recordType: this.props.route.params.type + "Checklist",
        user_id: this.props.auth.user._id,
        data: finalObjectArray,
      };
      console.log(finalObjectArray);
      submitInventory(body);
    };

    const submitInventory = async (body) => {
      let url = "/records/inventory";
      console.log(url);
      await api
        .post(url, body)
        .then((response) => {
          const data = response.data;
          console.log(data);
          this.props.navigation.navigate("SuccessScreen");
        })
        .catch((error) => {
          const errorMsg = error.message;
          console.log(errorMsg);
        });
      // await this.props.fetchPoolById(this.props.poolId);
    };

    return (
      <div className="h-full overflow-scroll">
        <PoolInventoryCheckList
          handleChange={handleChange}
          data={this.props.inventory.data}
          type={this.props.route.params.type}
          onSubmit={onSubmit}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    inventory: state.inventory,
    pool: state.pool.individualPool,
    auth: state.auth,
  };
};

const mapDisptachToProps = (dispatch) => {
  return {
    fetchInventory: (id) => dispatch(fetchInventory(id)),
  };
};
export default connect(mapStateToProps, mapDisptachToProps)(InventoryCheck);
