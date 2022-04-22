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
import Modal from "react-modal";
import TitleAndInput from "../../Components/TitleAndInput";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import DeliveryStatusIcon from "../../Components/DeliveryStatusIcon";
import AreaTable from "../../Components/Admin/AreaTable";
import { connect } from "react-redux";
import { fetchMyAdminAreas } from "../../redux/actions/area";
import TimeZone from "../../Components/TimeZone";
import { Picker } from "@react-native-picker/picker";
import api from "../../utils/api";
import BackButton from "../../Components/BackButton";
import { fetchEmployeesByOrg } from "../../redux/actions/adminEmployeeManagement";

class AdminAreaHome extends Component {
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
  }
  state = {
    isModalOpen: false,
    selectedTimeZone: "eastern",
    areaOrganization: this.props.user.organizations[0]?.orgName,
    option: null,
  };

  openModal() {
    this.setState({ isModalOpen: true });
  }
  closeModal() {
    this.setState({ isModalOpen: false });
  }

  handleChange(value) {
    console.log(value);

    const newSelectedTimeZone = value.target.value;
    this.setState({ selectedTimeZone: newSelectedTimeZone });
    console.log(value);
  }
  setSelectedValue(value) {
    this.setState({ areaOrganization: value });
  }
  render() {
    console.log(this.props);

    const handleSubmit = async (e) => {
      e.preventDefault();

      const body = {
        areaName: this.state.option,
        areaOrganization: this.state.areaOrganization,
        areaTimeZone: this.state.selectedTimeZone,
      };
      await api
        .post("/area/", body)
        .then((response) => {
          console.log(response);
          this.props.fetchArea();
          this.closeModal();
        })
        .catch((err) => console.log(err));
    };
    const inputs = [
      {
        placeholder: "Name",
        title: "Name",
        value: "name",
      },
    ];
    const onChange = (e, value) => {
      this.setState({ option: e });
    };

    const inputsMap = (array) => {
      console.log(array);
      return array.map((item, i) => (
        <>
          <TitleAndInput
            key={i}
            item={item}
            onChange={(value, item) => onChange(value, item)}
          />
          <br />
        </>
      ));
    };

    return (
      <ScrollView>
        <BackButton navigation={this.props.navigation} />

        <div className="container mx-auto">
          <div className="container">
            <div className="flex justify-center p-4">
              <button
                className="bg-red-700 hover:bg-red-600 text-white font-semibold py-2 px-4 border border-red-400 rounded shadow"
                onClick={() => {
                  this.openModal();
                }}
              >
                Add New Area
              </button>
              <Modal isOpen={this.state.isModalOpen}>
                <button
                  className="text bg-gray-600 p-2 rounded text-white"
                  onClick={() => {
                    this.closeModal();
                  }}
                >
                  close
                </button>

                <form onSubmit={handleSubmit}>
                  <div className="mx-auto container max-w-2xl shadow-md mx-4">
                    <div className="bg-white space-y-6 mt-4">
                      <div className=" space-y-4 md:space-y-0 w-full p-4 text-black items-center">
                        <h2 className=" max-w-sm mx-auto">Area</h2>
                        {inputsMap(inputs)}
                        <div className="md:w-2/3 max-w-sm mx-auto">
                          <label>
                            Time Zone:
                            <TimeZone
                              option={this.state.selectedTimeZone}
                              handleChange={(e) => this.handleChange(e)}
                            />
                          </label>
                          <div className="text text-lg">Organization:</div>
                          <Picker
                            selectedValue={this.state.selectedValue}
                            style={{ height: 50, width: 150 }}
                            onValueChange={(v) =>
                              this.setSelectedValue(
                                v,
                                this.props.adminEmployeeManagement.data
                                  .extraData
                              )
                            }
                          >
                            {" "}
                            {this.props.user.role == 7 ? (
                              <>
                                {this.props.adminEmployeeManagement.data
                                  .extraData.length > 0 ? (
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
                                {this.props.user.organizations.map(
                                  (item, i) => (
                                    <Picker.Item
                                      label={
                                        this.props.user.organizations[i].orgName
                                      }
                                      value={
                                        this.props.user.organizations[i].orgName
                                      }
                                    />
                                  )
                                )}
                              </>
                            )}
                          </Picker>
                        </div>

                        <div className="w-full p-4 text-right text-gray-500">
                          <button
                            className="inline-flex text bg-red-700 p-2 rounded text-white"
                            type="submit"
                          >
                            Create a New Area
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </Modal>
            </div>
            <div className="w-full mx-auto">
              <AreaTable
                navigation={this.props.navigation}
                area={this.props.area}
              />
            </div>
          </div>
        </div>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    area: state.area,
    user: state.auth.user,
    adminEmployeeManagement: state.adminEmployeeManagement,
  };
};

const mapDisptachToProps = (dispatch) => {
  return {
    fetchArea: () => dispatch(fetchMyAdminAreas()),
    fetchEmployeesByOrg: (orgName, string) =>
      dispatch(fetchEmployeesByOrg(orgName, string)),
  };
};

export default connect(mapStateToProps, mapDisptachToProps)(AdminAreaHome);
