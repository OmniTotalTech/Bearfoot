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
import { Picker } from "@react-native-picker/picker";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import DeliveryStatusIcon from "../../Components/DeliveryStatusIcon";
import AreaTable from "../../Components/Admin/AreaTable";
import { connect } from "react-redux";
import { fetchMyAdminAreas } from "../../redux/actions/area";
import HeadAndDescription from "../../Components/General/HeadAndDescription";
import InvitedUser from "../../Components/InvitedUser";
import VerifiedUser from "../../Components/VerifiedUser";
import NewEmployeeModalBody from "../../Components/Employee/NewEmployeeModalBody";
import { fetchEmployeesByOrg } from "../../redux/actions/adminEmployeeManagement";
import { newUser } from "../../redux/actions/auth";

class AdminAreaHome extends Component {
  componentDidMount() {
    this.props.fetchArea();
    this.props.fetchEmployeesByOrg(this.props.user.organizations[0].orgName);
  }

  state = {
    manageView: true,
    addView: false,
    selectedValue: undefined,
  };
  setSelectedValue(value) {
    this.setState({ selectedValue: value });
    this.props.fetchEmployeesByOrg(value);
  }

  setAddEmployee() {
    this.setState({ addView: true, manageView: false });
  }

  setManageEmployee() {
    this.setState({ addView: false, manageView: true });
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
    ];

    const renderItem = ({ item }) => (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate(userInfoInvited)}
        style={{ margin: "10px" }}
      >
        <InvitedUser pic={item.pic} name={item.name} email={item.email} />
      </TouchableOpacity>
    );

    const userInfoEmployeeMap = (
      <div>
        <FlatList
          data={this.props.adminEmployeeManagement.data.data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </div>
    );

    const userInfoInvitedMap = <div></div>;

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
                className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded mr-2"
                onClick={() => this.setManageEmployee()}
              >
                Manage Employee
              </button>
              <button
                className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded mr-2"
                onClick={() => this.setAddEmployee()}
              >
                Add Employee
              </button>
            </div>
          </div>
          {this.state.manageView != false ? (
            <div>
              <div className="container mx-auto max-w-4xl m-4 ">
                <div className="text text-3xl my-2">
                  Employees You Can Manage:
                </div>
                <div className="ml-2 mb-8">
                  <div className="text text-lg">Organization:</div>
                  <Picker
                    selectedValue={this.state.selectedValue}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(v) => this.setSelectedValue(v)}
                  >
                    {this.props.user.organizations.map((item, i) => (
                      <Picker.Item
                        label={this.props.user.organizations[i].orgName}
                        value={this.props.user.organizations[i].orgName}
                      />
                    ))}
                  </Picker>
                </div>
                <View style={{ overflow: "scroll", maxHeight: "600px" }}>
                  {userInfoEmployeeMap}
                </View>
              </div>
            </div>
          ) : (
            <div>
              <NewEmployeeModalBody
                user={this.props.user}
                selectedValue={this.state.selectedValue}
                newUser={this.props.newUser}
                auth={this.props.auth}
              />
              {/* <div className="container mx-auto max-w-4xl m-4 ">
                <div className="text text-3xl my-2">Invited Users</div>
                <View style={{ overflow: "scroll", maxHeight: "600px" }}>
                  {userInfoInvitedMap}
                </View>
              </div> */}
            </div>
          )}
        </section>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    area: state.area,
    user: state.auth.user,
    auth: state.auth,
    adminEmployeeManagement: state.adminEmployeeManagement,
  };
};

const mapDisptachToProps = (dispatch) => {
  return {
    fetchArea: () => dispatch(fetchMyAdminAreas()),
    fetchEmployeesByOrg: (orgName) => dispatch(fetchEmployeesByOrg(orgName)),
    newUser: (body) => dispatch(newUser(body)),
  };
};

export default connect(mapStateToProps, mapDisptachToProps)(AdminAreaHome);
