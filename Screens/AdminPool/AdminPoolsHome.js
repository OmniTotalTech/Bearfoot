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
import AreaTable from "../../Components/Admin/AreaTable";

class AdminPoolsHome extends Component {
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
              <AreaTable />
            </div>
          </div>
        </div>
      </ScrollView>
    );
  }
}

export default AdminPoolsHome;
