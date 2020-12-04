import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";

import Home from "../Screens/Home";
import DeliveryHome from "../Screens/DeliveryInformation/DeliveryHome";
import DeliveryAssignedPage from "../Screens/DeliveryInformation/DeliveryAssignedPage";
import DeliveryReview from "../Screens/DeliveryInformation/DeliveryReview";
import DeliveryStockUp from "../Screens/DeliveryInformation/DeliveryStockUp";
import Delivering from "../Screens/DeliveryInformation/Delivering";
import Navbar from "../Components/Navbar";
const Stack = createStackNavigator();

export const AuthStack = () => (
  <>
    <Navbar />

    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="DeliveryHome" component={DeliveryHome} />
        <Stack.Screen
          name="DeliveryAssignedPage"
          component={DeliveryAssignedPage}
        />
        <Stack.Screen name="DeliveryReview" component={DeliveryReview} />
        <Stack.Screen name="DeliveryStockUp" component={DeliveryStockUp} />
        <Stack.Screen name="Delivering" component={Delivering} />
      </Stack.Navigator>
    </NavigationContainer>

    <Navbar />
  </>
);
