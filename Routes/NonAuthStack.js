import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";

import Login from "../Screens/Authentication/Login";
const Stack = createStackNavigator();

export const NonAuthStack = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  </NavigationContainer>
);
