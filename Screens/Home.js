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
import HomeMenuItem from "../Components/HomeMenuItem";
import PlusImage from "../assets/images/plus-1.jpg";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import DeliveryStatusIcon from "../Components/DeliveryStatusIcon";

import Navbar from "../Components/Navbar";

const deliveryTypeIcon = [
  {
    icon: <QueryBuilderIcon className="text-2xl" />,
    status: "Deliveries",
    subtext: "Check your tasks related",
  },
];

function Home(props) {
  const deliveryStatusIconMap = deliveryTypeIcon.map((deliveryTypeIcon, i) => {
    return (
      <TouchableOpacity
        onPress={() => props.navigation.navigate("DeliveryHome")}
      >
        <DeliveryStatusIcon
          key={i}
          icon={deliveryTypeIcon.icon}
          status={deliveryTypeIcon.status}
          subtext={deliveryTypeIcon.subtext}
        />
      </TouchableOpacity>
    );
  });

  return (
    <View style={{ backgroundColor: " #718096" }}>
      <div className="h-screen ">
        <div className="w-100 h-100 "></div>
        <div className="w-full h-100">
          <div className="text-2xl px-4">Employee Activities</div>

          <div
            className="container w-full bg-white  rounded-lg shadow-lg mx-auto px-2"
            style={{
              width: "90%",
            }}
          >
            <div className="container my-4"></div>
            <div className="grid grid-cols-2 mt-4 gap-2 py-4 rounded-lg  ">
              {deliveryStatusIconMap}
            </div>
          </div>
        </div>
      </div>
    </View>
  );
}

export default Home;
