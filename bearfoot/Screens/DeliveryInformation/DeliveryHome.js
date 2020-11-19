import React, { Component } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import tailwind from "tailwind-rn";
import HomeMenuItem from "../../Components/HomeMenuItem";
import PlusImage from "../../assets/images/plus-1.jpg";

import DeliveryStatusIcon from "../../Components/DeliveryStatusIcon";
import DeliveryStatusNum from "../../Components/DeliveryStatusNum";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
export default function DeliveryHome(props) {
  const deliveryTypeIcon = [
    {
      icon: <QueryBuilderIcon className="text-2xl" />,
      status: "Deliveries",
      subtext: "Check your tasks related",
    },
  ];
  const deliveryTypeNum = [
    {
      number: 5,
      status: "Active",
    },
    {
      number: 0,
      status: "Special",
    },
  ];

  const deliveryStatusNumMap = deliveryTypeNum.map((deliveryTypeNum, i) => {
    return (
      <TouchableOpacity
        onPress={() => props.navigation.navigate("DeliveryAssignedPage")}
      >
        <DeliveryStatusNum
          key={i}
          number={deliveryTypeNum.number}
          status={deliveryTypeNum.status}
        />
      </TouchableOpacity>
    );
  });

  return (
    <View style={{ backgroundColor: " #718096" }}>
      <div className="h-screen ">
        <div className="w-100 h-100 "></div>
        <div className="w-full h-100">
          <div
            className="container w-full shadow-xl  mx-auto px-2"
            style={{
              height: "70vh",
              width: "90%",
              shadow: "5px 5px 10px #000000",
              borderBottomLeftRadius: "8%",
              borderBottomRightRadius: "8%",
              borderTopRightRadius: "8%",
              borderTopLeftRadius: "8%",

              paddingBottom: "20px",
            }}
          >
            <div className="container my-4">
              <div className="text-2xl text-white">Employee Activities</div>
            </div>
            <div className="grid grid-cols-2 mt-4 gap-2 h-24  ">
              {deliveryStatusNumMap}
            </div>
          </div>
        </div>
      </div>
    </View>
  );
}
