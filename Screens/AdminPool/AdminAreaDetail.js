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
import { fetchAreaPools } from "../../redux/actions/area";
import PoolTable from "../../Components/Admin/PoolTable";

class AdminAreaDetail extends Component {
  componentDidMount() {
    this.props.fetchAreaPools(this.props.route.params);
  }

  state = {
    isModalOpen: false,
  };

  openModal() {
    this.setState({ isModalOpen: true });
  }
  closeModal() {
    this.setState({ isModalOpen: false });
  }

  render() {
    console.log(this.props.route.params);
    const inputs = [
      {
        placeholder: "Name",
        title: "Name",
        value: "name",
      },
      {
        placeholder: "Address",
        title: "Address",
        value: "address",
      },
      {
        placeholder: "State",
        title: "State",
        value: "state",
      },
      {
        placeholder: "Zip code",
        title: "Zip code",
        value: "zip code",
      },
      {
        placeholder: "Organization",
        title: "Organization",
        value: "organization",
      },
    ];
    const onChange = (e, value) => {
      // this.setState({ name: e });
      console.log(value, e);
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
                onClick={
                  () => {
                    this.openModal();
                  }
                  // this.props.navigation.navigate("EditPool", {
                  //   id: this.props.pool.individualPool._id,
                  // })
                }
              >
                Add New Pool
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
                        <h2 className=" max-w-sm mx-auto">Pool</h2>
                        {inputsMap(inputs)}
                        <div className="w-full p-4 text-right text-gray-500">
                          <button
                            className="inline-flex text bg-red-700 p-2 rounded text-white"
                            type="button"
                            onClick={() => console.log("clicked")}

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
              <PoolTable
                navigation={this.props.navigation}
                data={this.props.area.pools}
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
    fetchAreaPools: (id) => dispatch(fetchAreaPools(id)),
  };
};

export default connect(mapStateToProps, mapDisptachToProps)(AdminAreaDetail);
