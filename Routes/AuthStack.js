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
import AdminAreaHome from "../Screens/AdminPool/AdminAreaHome";
import AdminEmployeeManagement from "../Screens/AdminUser/AdminEmployeeManagement";
import AdminAreaDetail from "../Screens/AdminPool/AdminAreaDetail";
import PoolEmployee from "../Screens/Pools/PoolEmployee";
import PoolDetail from "../Screens/Pools/PoolDetail";
import EditPool from "../Screens/Pools/EditPool";
import EditSelf from "../Screens/EditSelf";
import EditUser from "../Screens/AdminUser/EditUser";
import InventoryCheck from "../Screens/Pools/InventoryCheck";
import OpeningChecklist from "../Screens/Pools/OpeningChecklist";
import ClosingChecklist from "../Screens/Pools/ClosingChecklist";
import ChemicalLog from "../Screens/Pools/ChemicalLog";

import DailyOperations from "../Screens/DailyOperations";
import DeliveryDetail from "../Screens/DeliveryInformation/DeliveryDetail";
import PoolRecordsPage from "../Screens/AdminPool/PoolRecords/PoolRecordsPage";
import SuccessScreen from "../Screens/SuccessScreen";
import ManageHOAs from "../Screens/AdminUser/ManageHOAs";
import PatientCare from "../Screens/Pools/PatientCare";
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
        <Stack.Screen name="AdminAreaHome" component={AdminAreaHome} />
        <Stack.Screen
          name="AdminEmployeeManagement"
          component={AdminEmployeeManagement}
        />
        <Stack.Screen name="AdminAreaDetail" component={AdminAreaDetail} />
        <Stack.Screen name="PoolEmployee" component={PoolEmployee} />
        <Stack.Screen name="PoolDetail" component={PoolDetail} />
        <Stack.Screen name="EditPool" component={EditPool} />
        <Stack.Screen name="EditSelf" component={EditSelf} />
        <Stack.Screen name="EditUser" component={EditUser} />
        <Stack.Screen name="InventoryCheck" component={InventoryCheck} />
        <Stack.Screen name="DeliveryDetails" component={DeliveryDetail} />
        <Stack.Screen name="OpeningChecklist" component={OpeningChecklist} />
        <Stack.Screen name="ClosingChecklist" component={ClosingChecklist} />
        <Stack.Screen name="ChemicalLog" component={ChemicalLog} />
        <Stack.Screen name="DailyOperations" component={DailyOperations} />
        <Stack.Screen name="PoolRecords" component={PoolRecordsPage} />
        <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
        <Stack.Screen name="ManageHOAs" component={ManageHOAs} />
        <Stack.Screen name="PatientCare" component={PatientCare} />
      </Stack.Navigator>
    </NavigationContainer>

    <Footer />
  </>
);
