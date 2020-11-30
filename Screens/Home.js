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
const admin = [
  {
    icon: <QueryBuilderIcon className="text-2xl" />,
    status: "Extras",
    subtext: "Check your tasks related",
    location: "extras",
  },
  {
    icon: <QueryBuilderIcon className="text-2xl" />,
    status: "Extras",
    subtext: "Check your tasks related",
    location: "extras",
  },
  {
    icon: <QueryBuilderIcon className="text-2xl" />,
    status: "Extras",
    subtext: "Check your tasks related",
    location: "extras",
  },
  {
    icon: <QueryBuilderIcon className="text-2xl" />,
    status: "Extras",
    subtext: "Check your tasks related",
    location: "extras",
  },
  {
    icon: <QueryBuilderIcon className="text-2xl" />,
    status: "Extras",
    subtext: "Check your tasks related",
    location: "extras",
  },
  {
    icon: <QueryBuilderIcon className="text-2xl" />,
    status: "Extras",
    subtext: "Check your tasks related",
    location: "extras",
  },
  {
    icon: <QueryBuilderIcon className="text-2xl" />,
    status: "Extras",
    subtext: "Check your tasks related",
    location: "extras",
  },
  {
    icon: <QueryBuilderIcon className="text-2xl" />,
    status: "Extras",
    subtext: "Check your tasks related",
    location: "extras",
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

  const adminMap = admin.map((deliveryTypeIcon, i) => {
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
    <ScrollView>
      <View style={{ backgroundColor: " #718096" }}>
        {/* Employee Area */}
        <div className="h-screen ">
          <div className="w-100 h-100 "></div>
          <div className="container mx-auto my-4 ">
            <div className="text-xl">Employee Activities</div>
          </div>
          <div className="container bg-white  rounded-lg shadow-lg mx-auto px-2">
            <div className="container my-4"></div>
            <div className="mt-4 gap-2 py-4 rounded-lg  ">
              {deliveryStatusIconMap}
            </div>
          </div>
          {/* // Settings area */}
          <div className="container mx-auto my-4">
            <div className="text-xl mx-4">Admin</div>
          </div>
          <div
            className="container w-full bg-white  rounded-lg shadow-lg mx-auto px-2"
            style={{
              width: "90%",
            }}
          >
            <FlatList
              horizontal
              data={admin}
              renderItem={({ item: deliveryTypeIcon }) => {
                return (
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate("DeliveryHome")}
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
            />
          </div>

          {/* // Settings area */}
          <div className="container mx-auto my-4">
            <div className="text-xl mx-4">Settings</div>
          </div>
          <div
            className="container w-full bg-white  rounded-lg shadow-lg mx-auto px-2"
            style={{
              width: "90%",
            }}
          >
            <FlatList
              horizontal
              data={admin}
              renderItem={({ item: deliveryTypeIcon }) => {
                return (
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate("DeliveryHome")}
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
            />
          </div>
        </div>
      </View>
    </ScrollView>
  );
}

export default Home;
