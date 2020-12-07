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
const user = [
  {
    icon: <QueryBuilderIcon className="text-2xl" />,
    status: "Pools",
    subtext: "Check pools assinged to you",
    location: "extras",
  },
  
];
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
 
];

function Home(props) {
  return (
    <ScrollView>
      <View style={{ backgroundColor: " #718096" }}>
        <div className="h-screen ">
                  {/* Employee Area */}
                  <div className="mt-8">

              <div className="container mx-auto mt-4">
            <div className="text-xl mx-4 "><span className="bg-white p-4 m-0">Employee</span></div>
          </div>
        <div
            className="container w-full bg-white  rounded-lg shadow-lg mx-auto px-2"
            style={{
              width: "90%",
            }}
          >
            <FlatList
              horizontal
              data={user}
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
          {/* // Admin area */}
          <div className="mt-8">
          <div className="container mx-auto mt-4">
            <div className="text-xl mx-4 "><span className="bg-white p-4 m-0">Admin</span></div>
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
                    onPress={() => props.navigation.navigate(deliveryTypeIcon.location)}
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

          
        </div>
      </View>
    </ScrollView>
  );
}

export default Home;
