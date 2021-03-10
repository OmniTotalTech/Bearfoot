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
// import PlusImage from "../assets/images/plus-1.jpg";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import DeliveryStatusIcon from "../Components/DeliveryStatusIcon";
import UpdateEmployeeInfoForm from "../Components/Employee/UpdateEmployeeInfoForm";
import { connect } from "react-redux";
import BackButton from "../Components/BackButton";
import Navbar from "../Components/Navbar";
import HoaHomeContainer from "./HOA-Related/hoa-home-container";

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
    status: "Deliveries",
    subtext: "Check pools assinged to you",
    location: "DeliveryHome",
    level: 1,
  },
  {
    icon: <QueryBuilderIcon className="text-2xl" />,
    status: "Pools",
    subtext: "Check pools assinged to you",
    location: "PoolEmployee",
    level: 1,
  },
];
const admin = [
  {
    icon: <QueryBuilderIcon className="text-2xl" />,
    status: "Delivery Management",
    subtext: "Manage Delivieries for Your Area",
    location: "AdminDeliveriesHome",
    level: 3,
  },
  {
    icon: <QueryBuilderIcon className="text-2xl" />,
    status: "Employee Management",
    subtext: "Check your tasks related",
    location: "AdminEmployeeManagement",
    level: 3,
  },
  {
    icon: <QueryBuilderIcon className="text-2xl" />,
    status: "Area Management",
    subtext: "Check your tasks related",
    location: "AdminAreaHome",
    level: 4,
  },
  // {
  //   icon: <QueryBuilderIcon className="text-2xl" />,
  //   status: "Pool Management",
  //   subtext: "Check your tasks related",
  //   location: "AdminPoolsHome",
  // },
  // {
  //   icon: <QueryBuilderIcon className="text-2xl" />,
  //   status: "Inventory Management",
  //   subtext: "Check your tasks related",
  //   location: "AdminPoolsHome",
  // },
];

class Home extends Component {
  render() {
    return (
      <ScrollView>
        {this.props.user ? (
          this.props.user.isHOA ? (
            <>
              <View>
                <div className="h-screen">
                  <HoaHomeContainer navigation={this.props.navigation} />
                </div>
              </View>
            </>
          ) : this.props.user.hasSignedInBefore ? (
            <View style={{ backgroundColor: " #718096" }}>
              <div className="h-screen ">
                {/* Employee Area */}
                <div className="mt-8">
                  <div className="container max-w-4xl w-full bg-white  rounded-lg shadow-lg mx-auto px-2">
                    <div className="text-3xl mx-4 ">
                      <span className="bg-white mb-4 m-0">Employee</span>
                    </div>
                    <FlatList
                      horizontal
                      data={user}
                      renderItem={({ item: deliveryTypeIcon }) => {
                        return (
                          <TouchableOpacity
                            onPress={() =>
                              this.props.navigation.navigate(
                                deliveryTypeIcon.location
                              )
                            }
                            style={{ margin: "10px" }}
                          >
                            <DeliveryStatusIcon
                              level={this.props.user.role}
                              icon={deliveryTypeIcon.icon}
                              status={deliveryTypeIcon.status}
                              subtext={deliveryTypeIcon.subtext}
                              compareLevel={deliveryTypeIcon.level}
                            />
                          </TouchableOpacity>
                        );
                      }}
                      keyExtractor={(item, index) => index}
                    />
                  </div>
                </div>
                {/* // Admin area */}
                {this.props.user.role >= 3 ? (
                  <div className="mt-8">
                    <div className="container max-w-4xl w-full bg-white  rounded-lg shadow-lg mx-auto px-2">
                      <div className="text-3xl mx-4 ">
                        <span className="bg-white mb-4 m-0">Management</span>
                      </div>
                      <div className="container  max-w-4xl w-full bg-white  rounded-lg  px-2">
                        <FlatList
                          horizontal
                          data={admin}
                          renderItem={({ item: deliveryTypeIcon }) => {
                            return (
                              <TouchableOpacity
                                onPress={() =>
                                  this.props.navigation.navigate(
                                    deliveryTypeIcon.location
                                  )
                                }
                                style={{ margin: "10px" }}
                              >
                                <DeliveryStatusIcon
                                  level={this.props.user.role}
                                  icon={deliveryTypeIcon.icon}
                                  status={deliveryTypeIcon.status}
                                  subtext={deliveryTypeIcon.subtext}
                                  compareLevel={deliveryTypeIcon.level}
                                />
                              </TouchableOpacity>
                            );
                          }}
                          keyExtractor={(item, index) => index}
                        />
                      </div>
                      {/* // temp button //  */}
                      {/* <button
                      className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                      onClick={() =>
                        this.props.navigation.navigate("DailyOperations")
                      }
                    >
                      go to daily operations page
                    </button> */}
                      {/* // temp button // */}
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </View>
          ) : (
            <div className="container mx-auto">
              <UpdateEmployeeInfoForm
                email={this.props.user.email}
                name={this.props.user.name}
              />
            </div>
          )
        ) : (
          <div></div>
        )}
      </ScrollView>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(Home);
