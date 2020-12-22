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

class AdminAreaHome extends Component {
  componentDidMount() {
    this.props.fetchArea();
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
    ];

    const userInfoInvitedMap = userInfoInvited.map((userInfoInvited, i) => {
      return (
        <InvitedUser
          key={i}
          pic={userInfoInvited.pic}
          name={userInfoInvited.name}
          email={userInfoInvited.email}
        />
      );
    });

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

    const userInfoVerifiedMap = userInfoVerified.map((userInfoVerified, i) => {
      return (
        <VerifiedUser
          key={i}
          pic={userInfoVerified.pic}
          name={userInfoVerified.name}
          email={userInfoVerified.email}
        />
      );
    });

    return (
      <ScrollView>
        {/* bg-gray-100 */}
        <section className="py-16  bg-opacity-50 h-screen">
          <div className="mx-auto container max-w-2xl md:w-3/4 shadow-md mx-4">
            <div className="bg-gray-100 p-4 border-t-2 bg-opacity-5 border-red-400 rounded-t">
              <div className="max-w-sm mx-auto md:w-full md:mx-0">
                <div className="inline-flex items-center space-x-4">
                  <img
                    className="w-10 h-10 object-cover rounded-full"
                    alt="User avatar"
                    src="https://upload.wikimedia.org/wikipedia/commons/a/ad/Placeholder_no_text.svg"
                  />

                  <h1 className="text-gray-600">New Account</h1>
                </div>
              </div>
            </div>
            <div className="bg-white space-y-6">
              <div className="md:inline-flex space-y-4 md:space-y-0 w-full p-4 text-gray-500 items-center">
                <h2 className="md:w-1/3 max-w-sm mx-auto">Account</h2>
                <div className="md:w-2/3 max-w-sm mx-auto">
                  <label className="text-sm text-gray-400">Email</label>
                  <div className="w-full inline-flex border">
                    <div className="pt-2 w-1/12 bg-gray-100 bg-opacity-50">
                      <svg
                        fill="none"
                        className="w-6 text-gray-400 mx-auto"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <input
                      type="email"
                      className="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>
              </div>

              <hr />
              <div className="md:inline-flex  space-y-4 md:space-y-0  w-full p-4 text-gray-500 items-center">
                <h2 className="md:w-1/3 mx-auto max-w-sm">Personal info</h2>
                <div className="md:w-2/3 mx-auto max-w-sm space-y-5">
                  <div>
                    <label className="text-sm text-gray-400">Full name</label>
                    <div className="w-full inline-flex border">
                      <div className="w-1/12 pt-2 bg-gray-100">
                        <svg
                          fill="none"
                          className="w-6 text-gray-400 mx-auto"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                      <input
                        type="text"
                        className="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                        placeholder="Employee Name"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <hr />
              <div className="w-full p-4 text-right text-gray-500">
                <button className="inline-flex text bg-red-700 p-2 rounded text-white">
                  Submit
                </button>
              </div>
            </div>
          </div>
          <div className="bg-gray-100">Invited User</div>

          {userInfoInvitedMap}
          <div className="bg-gray-100">Verified User</div>
          {userInfoVerifiedMap}
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
