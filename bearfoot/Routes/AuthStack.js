import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";

import Home from "../Screens/Home";
import DeliveryHome from "../Screens/DeliveryInformation/DeliveryHome";
import DeliveryAssignedPage from "../Screens/DeliveryInformation/DeliveryAssignedPage";
const Stack = createStackNavigator();

export const AuthStack = () => (
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
    </Stack.Navigator>
  </NavigationContainer>
);
