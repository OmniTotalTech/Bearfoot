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

import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import DeliveryStatusIcon from "../../Components/DeliveryStatusIcon";
import AreaTable from "../../Components/Admin/AreaTable";
import { connect } from "react-redux";
import { fetchMyAdminAreas } from "../../redux/actions/area";
import HeadAndDescription from "../../Components/General/HeadAndDescription";
import InvitedUser from "../../Components/InvitedUser";
import VerifiedUser from "../../Components/VerifiedUser";
import NewEmployeeModalBody from "../../Components/Employee/NewEmployeeModalBody";

class AdminAreaHome extends Component {
  componentDidMount() {
    this.props.fetchArea();
  }

  showAddEmployee() {
    {
      userInfoInvitedMap;
    }
  }
  render() {
    const headText = "Create a new user Section";
    const bodyText =
      "This is where an admin will be able to create a new user. Permissions apply here, and restrictions will be included based on user level and group association";

    const userInfoInvited = [
      {
        pic: "pic",
        name: "John",
        email: "john123@gmail.com",
      },
      {
        pic: "pic",
        name: "Jane",
        email: "jane@gmail.com",
      },
      {
        pic: "pic",
        name: "John",
        email: "john123@gmail.com",
      },
      {
        pic: "pic",
        name: "Jane",
        email: "jane@gmail.com",
      },
      {
        pic: "pic",
        name: "John",
        email: "john123@gmail.com",
      },
      {
        pic: "pic",
        name: "Jane",
        email: "jane@gmail.com",
      },
      {
        pic: "pic",
        name: "John",
        email: "john123@gmail.com",
      },
      {
        pic: "pic",
        name: "Jane",
        email: "jane@gmail.com",
      },
    ];

    const renderItem = ({ item }) => (
      <TouchableOpacity
        onPress={() => props.navigation.navigate(userInfoInvited)}
        style={{ margin: "10px" }}
      >
        <InvitedUser pic={item.pic} name={item.name} email={item.email} />
      </TouchableOpacity>
    );

    const userInfoInvitedMap = (
      <div>
        <FlatList
          data={userInfoInvited}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </div>
    );

    const userInfoVerified = [
      {
        pic: "pic",
        name: "David",
        email: "david123@gmail.com",
      },
      {
        pic: "pic",
        name: "Diana",
        email: "diana@gmail.com",
      },
    ];

    // const userInfoVerifiedMap = userInfoVerified.map((userInfoVerified, i) => {
    //   return (
    //     <VerifiedUser
    //       key={i}
    //       pic={userInfoVerified.pic}
    //       name={userInfoVerified.name}
    //       email={userInfoVerified.email}
    //     />
    //   );
    // });

    const userInfoVerifiedMap = (
      <FlatList
        horizontal
        data={userInfoVerified}
        renderItem={({ item: deliveryTypeIcon }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate(deliveryTypeIcon.location)
              }
              style={{ margin: "10px" }}
            >
              <VerifiedUser
                pic={userInfoVerified.pic}
                name={userInfoVerified.name}
                email={userInfoVerified.email}
              />
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item, index) => index}
      />
    );

    return (
      <ScrollView>
        {/* bg-gray-100 */}
        <section className="py-4 bg-opacity-50 h-screen">
          <div>
            <div className="flex justify-center mb-4">
              <button
                class="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded mr-2"
                onClick
              >
                Manage Employee
              </button>
              <button class="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded mr-2">
                Add Employee
              </button>
            </div>
          </div>

          <NewEmployeeModalBody />

          {/* <div className="container mx-auto max-w-4xl m-4 grid grid-cols-2"> */}
          <div className="container mx-auto max-w-4xl m-4 ">
            <div className="text text-3xl my-2">Invited Users</div>
            <View style={{ overflow: "scroll", maxHeight: "600px" }}>
              {userInfoInvitedMap}
            </View>
          </div>
          {/* <div>
              <div className="text text-3xl my-2">Manageable Employees:</div>
              <View style={{ overflow: "scroll", maxHeight: "600px" }}>
                {userInfoInvitedMap}
              </View>
            </div> */}
          {/* </div> */}
        </section>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    area: state.area,
  };
};

const mapDisptachToProps = (dispatch) => {
  return {
    fetchArea: () => dispatch(fetchMyAdminAreas()),
  };
};

export default connect(mapStateToProps, mapDisptachToProps)(AdminAreaHome);
