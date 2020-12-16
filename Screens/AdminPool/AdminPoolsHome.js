import React, { Component } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";

import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import DeliveryStatusIcon from "../../Components/DeliveryStatusIcon";
import PoolTable from "../../Components/Admin/PoolTable";
import { connect } from "react-redux";
import { fetchPool } from "../../redux/actions/pool";

class AdminPoolsHome extends Component {
  componentDidMount() {
    this.props.fetchPool();
  }

  render() {
    const admin = [
      {
        icon: <QueryBuilderIcon className="text-2xl" />,
        status: "Delivery Management",
        subtext: "Manage Delivieries for Your Area",
        location: "AdminDeliveriesHome",
      },
      {
        icon: <QueryBuilderIcon className="text-2xl" />,
        status: "Employee Management",
        subtext: "Check your tasks related",
        location: "users",
      },
      {
        icon: <QueryBuilderIcon className="text-2xl" />,
        status: "Pool Management",
        subtext: "Check your tasks related",
        location: "AdminPoolsHome",
      },
      {
        icon: <QueryBuilderIcon className="text-2xl" />,
        status: "Inventory Management",
        subtext: "Check your tasks related",
        location: "AdminPoolsHome",
      },
    ];
    return (
      <ScrollView>
        <div className="container mx-auto">
          {/* <FlatList
          horizontal
          data={admin}
          renderItem={({ item: deliveryTypeIcon }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate(deliveryTypeIcon.location)
                }
                style={{ margin: "10px" }}
              >
                <DeliveryStatusIcon
                  icon={deliveryTypeIcon.icon}
                  status={deliveryTypeIcon.status}
                  subtext={deliveryTypeIcon.subtext}
                />
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item, index) => index}
        /> */}
          <div className="container">
            <div className="w-full mx-auto">
              <PoolTable
              pool={this.props.pool}
              />
            </div>
          </div>
        </div>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pool: state.pool,
  };
};

const mapDisptachToProps = (dispatch) => {
  return {
    fetchPool: (id) => dispatch(fetchPool(id)),
  };
};

export default connect(mapStateToProps, mapDisptachToProps)(AdminPoolsHome);
