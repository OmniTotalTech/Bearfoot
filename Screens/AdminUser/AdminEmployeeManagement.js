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
import Modal from "react-modal";
import EmployeeList from "../../Components/Admin/EmployeeList";
import api from "../../utils/api";
class AdminEmployeeManagement extends Component {
  componentDidMount() {
    this.props.fetchArea();
    if (this.props.user.role == 7) {
      this.props.fetchEmployeesByOrg("all", "");
    } else {
      this.props.fetchEmployeesByOrg(
        this.props.user.organizations[0].orgName,
        ""
      );
    }

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleSubmitModal = this.handleSubmitModal.bind(this);
    this.openModal = this.openModal.bind(this);
  }

  state = {
    manageView: true,
    addView: false,
    selectedValue: undefined,
    searchTerm: null,
    isModalOpen: false,
    employeeList: [],
    extraData: {},
    arrayForPicking: [],
  };
  setSelectedValue(value, array) {
    if (array != null && array.length > 0) {
      this.setState({
        arrayForPicking: array,
      });
    }
    this.setState({ selectedValue: value });
    this.props.fetchEmployeesByOrg(value, "");
  }

  setAddEmployee() {
    this.setState({ addView: true, manageView: false });
  }

  setManageEmployee() {
    this.setState({ addView: false, manageView: true });
  }

  runHOAFunc() {
    this.props.fetchEmployeesByOrg(
      this.props.user.organizations[0].orgName,
      "HOA"
    );
    this.setState({ addView: false, manageView: true });
  }

  handleSearchChange(event) {
    console.log(event.target.value);
    this.setState({ searchTerm: event.target.value });
  }
  async handleSubmitModal(e, props) {
    e.preventDefault();
    this.setState({ isModalOpen: true });

    let selectedValue;

    if (this.state.selectedValue != undefined) {
      selectedValue = this.state.selectedValue;
    } else if (this.props.user.role > 5) {
      selectedValue = this.props.user.organizations[0].orgName;
    }

    if (this.props.title == "managers") {
      await api
        .get(
          "users/orgEmployees/" + selectedValue + "/" + this.state.searchTerm
        )
        .then((response) => {
          console.log(response);
          this.setState({ employeeList: response.data.data });
        })
        .catch((error) => {
          const errorMsg = error.message;
        });
    } else {
      console.log(this.state);
      await api
        .get(
          "users/orgEmployees/" + selectedValue + "/" + this.state.searchTerm
        )
        .then((response) => {
          console.log(response);
          this.setState({ employeeList: response.data.data });
        })
        .catch((error) => {
          const errorMsg = error.message;
        });
    }
  }
  closeModal() {
    this.setState({ isModalOpen: false });
    console.log(this.props);
  }
  handleChange(e) {
    console.log(e.target.value);
    this.setState({ searchTerm: e.target.value });
  }
  openModal() {
    this.setState({ isModalOpen: true });
  }
  render() {
    const renderItem = ({ item }) => (
      <div
        onClick={() =>
          this.props.navigation.navigate("EditUser", { id: item._id })
        }
        style={{ margin: "10px" }}
      >
        <InvitedUser
          pic={item.profileImage}
          name={item.name}
          email={item.email}
        />
      </div>
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

    return (
      <ScrollView>
        {/* bg-gray-100 */}
        <section className="py-4 bg-opacity-50 h-screen">
          <div>
            <div className="flex justify-center mb-4">
              <button
                className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded mr-2"
                onClick={() =>
                  this.props.fetchEmployeesByOrg(
                    this.props.user.organizations[0].orgName,
                    "",
                    this.setManageEmployee()
                  )
                }
              >
                Manage Employee
              </button>
              <button
                className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded mr-2"
                onClick={() => this.setAddEmployee()}
              >
                Add Employee
              </button>{" "}
              <button
                className="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded mr-2"
                onClick={() => this.runHOAFunc()}
              >
                Manage HOA Accounts
              </button>
            </div>
          </div>
          {this.state.manageView != false ? (
            <div>
              <div className="container mx-auto max-w-4xl m-4 ">
                <div className="text text-3xl my-2">
                  Employees You Can Manage:
                </div>
                <button
                  onClick={this.handleSubmitModal}
                  className="bg-red-500 text-white px-4 py-2"
                >
                  Search
                </button>
                <div className="ml-2 mb-8">
                  <div className="text text-lg">Organization:</div>
                  <Picker
                    selectedValue={this.state.selectedValue}
                    style={{ height: 50, width: 150 }}
                    onValueChange={(v) =>
                      this.setSelectedValue(
                        v,
                        this.props.adminEmployeeManagement.data.extraData
                      )
                    }
                  >
                    {" "}
                    {this.props.user.role == 7 ? (
                      <>
                        <Picker.Item label={"all"} value={"all"} />

                        {this.props.adminEmployeeManagement.data.extraData
                          .length > 0 ? (
                          this.props.adminEmployeeManagement.data.extraData.map(
                            (item) => (
                              <Picker.Item
                                label={item.orgName}
                                value={item.orgName}
                              />
                            )
                          )
                        ) : (
                          <div></div>
                        )}
                      </>
                    ) : (
                      <>
                        {this.props.user.organizations.map((item, i) => (
                          <Picker.Item
                            label={this.props.user.organizations[i].orgName}
                            value={this.props.user.organizations[i].orgName}
                          />
                        ))}
                      </>
                    )}
                  </Picker>
                </div>
                <View style={{ overflow: "scroll", maxHeight: "600px" }}>
                  {userInfoEmployeeMap}
                </View>
                <Modal
                  {...this.props}
                  isOpen={this.state.isModalOpen}
                  style={{ width: "100%" }}
                >
                  <button
                    className="text bg-gray-600 p-2 rounded text-white"
                    onClick={() => {
                      this.closeModal();
                    }}
                  >
                    close
                  </button>

                  <form
                    onSubmit={() => this.handleSubmitModal(event, this.props)}
                  >
                    <div className="mx-auto container max-w-2xl shadow-md mx-4">
                      <div className="bg-white space-y-6 mt-4">
                        <input
                          onChange={(e) => this.handleChange(e)}
                          className="w-full p-2"
                          placeholder="Search By Name"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="bg-red-500 text-white p-2 rounded text-md my-2"
                    >
                      Search Name
                    </button>
                  </form>
                  <div className="h-96 overflow-scroll">
                    <EmployeeList
                      navigation={this.props.navigation}
                      assignGroup={this.props.title}
                      poolId={this.props.poolId}
                      closeModal={() => this.closeModal()}
                      employees={this.state.employeeList}
                    />
                  </div>
                </Modal>{" "}
              </div>
            </div>
          ) : (
            <div>
              <NewEmployeeModalBody
                user={this.props.user}
                selectedValue={this.state.selectedValue}
                newUser={this.props.newUser}
                auth={this.props.auth}
                adminEmployeeManagement={this.props.adminEmployeeManagement}
              />
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
    fetchEmployeesByOrg: (orgName, string) =>
      dispatch(fetchEmployeesByOrg(orgName, string)),
    newUser: (body) => dispatch(newUser(body)),
  };
};

export default connect(
  mapStateToProps,
  mapDisptachToProps
)(AdminEmployeeManagement);
