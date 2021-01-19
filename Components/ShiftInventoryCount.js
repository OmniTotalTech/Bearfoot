import React, { Component } from "react";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import { FlatList, TouchableOpacity } from "react-native";
import ShiftTab from "../Components/ShiftTab";

const shift = [
  {
    icon: <QueryBuilderIcon className="text-2xl" />,
    status: "Morning",
    subtext: "Inventory count",
    location: "InventoryCheck",
  },
  {
    icon: <QueryBuilderIcon className="text-2xl" />,
    status: "Evening",
    subtext: "Inventory count",
    location: "InventoryCheck",
  },
];

export default class ShiftInventoryCount extends Component {
  render() {
    return (
      <div>
        <div className="mt-8">
          <div className="container max-w-4xl w-full bg-white  rounded-lg shadow-lg mx-auto px-2">
            <div className="text-3xl mx-4 ">
              <span className="bg-white mb-4 m-0">Shift</span>
            </div>
            <FlatList
              horizontal
              data={shift}
              renderItem={({ item: deliveryTypeIcon }) => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate(
                        deliveryTypeIcon.location,
                        { type: deliveryTypeIcon.status, id: this.props.id }
                      )
                    }
                    style={{ margin: "10px" }}
                  >
                    <ShiftTab
                      icon={deliveryTypeIcon.icon}
                      status={deliveryTypeIcon.status}
                      subtext={deliveryTypeIcon.subtext}
                    />
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item, index) => index}
            />
          </div>
        </div>
      </div>
    );
  }
}
