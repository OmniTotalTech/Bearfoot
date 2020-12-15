import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";

import Home from "../Screens/Home";
import DeliveryHome from "../Screens/DeliveryInformation/DeliveryHome";
import DeliveryAssignedPage from "../Screens/DeliveryInformation/DeliveryAssignedPage";
import DeliveryReview from "../Screens/DeliveryInformation/DeliveryReview";
import DeliveryInProgress from "../Screens/DeliveryInformation/DeliveryInProgress";
import Delivering from "../Screens/DeliveryInformation/Delivering";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { navigationRef } from "./RootNavigation";
import adminDeliveriesHome from "../Screens/DeliveryManagement/adminDeliveriesHome";
import AdminPoolsHome from "../Screens/AdminPool/AdminPoolsHome";

const Stack = createStackNavigator();

export const AuthStack = () => (
  <>
    <Navbar />

    <NavigationContainer ref={navigationRef}>
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
        <Stack.Screen
          name="DeliveryInProgress"
          component={DeliveryInProgress}
        />
        <Stack.Screen
          name="AdminDeliveriesHome"
          component={adminDeliveriesHome}
        />
        <Stack.Screen name="AdminPoolsHome" component={AdminPoolsHome} />
      </Stack.Navigator>
    </NavigationContainer>

    <Footer />
  </>
);
