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

class AdminAreaHome extends Component {
  componentDidMount() {
    this.props.fetchArea();
  }

  state = {
    isModalOpen: false,
    // selectedTimeZone: "",
  };

  openModal() {
    this.setState({ isModalOpen: true });
  }
  closeModal() {
    this.setState({ isModalOpen: false });
  }

  // handleChnage(e) {
  //   const newSelectedTimeZone = e.target.value;
  //   this.setState({ selectedTimeZone: newSelectedTimeZone });
  // }

  render() {
    console.log(this.props.area.data);
    // const { selectedTimeZone } = this.state;
    // const values = { selectedTimeZone };
    // console.log(this.state.selectedTimeZone);

    const inputs = [
      {
        placeholder: "Name",
        title: "Name",
        value: "name",
      },
    ];
    const onChange = (e, value) => {
      this.setState({ name: e });
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

                <form>
                  <div className="mx-auto container max-w-2xl shadow-md mx-4">
                    <div className="bg-white space-y-6 mt-4">
                      <div className=" space-y-4 md:space-y-0 w-full p-4 text-black items-center">
                        <h2 className=" max-w-sm mx-auto">Area</h2>
                        {inputsMap(inputs)}
                        <div className="md:w-2/3 max-w-sm mx-auto">
                          <label>
                            Time Zone:
                            <TimeZone
                            // value={values}
                            // handleChange={this.handleChnage}
                            />
                          </label>
                        </div>

                        <div className="w-full p-4 text-right text-gray-500">
                          <button
                            className="inline-flex text bg-red-700 p-2 rounded text-white"
                            type="submit"
                            // onClick={() => this.props.addItem()}
                          >
                            Submit
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
  };
};

const mapDisptachToProps = (dispatch) => {
  return {
    fetchArea: () => dispatch(fetchMyAdminAreas()),
  };
};

export default connect(mapStateToProps, mapDisptachToProps)(AdminAreaHome);
