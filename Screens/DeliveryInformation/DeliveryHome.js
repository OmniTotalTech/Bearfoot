import React, { Component } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";

import DeliveryStatusNum from "../../Components/DeliveryStatusNum";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import DeliveryStatusIcon from "../../Components/DeliveryStatusIcon";

import { connect } from "react-redux";
import {
  fetchOrderDetail,
  fetchIndividualOrderDetail,
} from "../../redux/actions/orderDetail";
import BackButton from "../../Components/BackButton";
class DeliveryHome extends Component {
  componentDidMount() {
    this.props.fetchOrderDetail();
  }

  render() {
    const user = [
      {
        icon: <QueryBuilderIcon className="text-2xl" />,
        status: "Deliveries",
        subtext: "Check pools assinged to you",
        location: "DeliveryHome",
      },
      {
        icon: <QueryBuilderIcon className="text-2xl" />,
        status: "Pools",
        subtext: "Check pools assinged to you",
        location: "pools",
      },
    ];

    return (
      <View style={{ backgroundColor: " #718096" }}>
        <BackButton navigation={this.props.navigation} />

        <div className="container mx-auto">
          {/* Employee Area */}
          <div className="mt-8">
            <div className="container mx-auto mt-4">
              <div className="text-xl mx-4 ">
                <span className="bg-white p-4 m-0">Your Deliveries</span>
              </div>
            </div>
            <div
              className="container w-full bg-white  rounded-lg shadow-lg mx-auto px-2 py-4"
              style={{
                width: "90%",
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("DeliveryAssignedPage")
                }
                style={{ margin: "10px" }}
              >
                <DeliveryStatusNum
                  icon={
                    this.props.orderDetail.data.primary
                      ? this.props.orderDetail.data.primary.length
                      : 0
                  }
                  status={"Assigned To You Today"}
                  subtext={"Check Status for each inside"}
                />
              </TouchableOpacity>
            </div>
          </div>
        </div>
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    orderDetail: state.orderDetail,
    user: state.auth.user,
  };
};

const mapDisptachToProps = (dispatch) => {
  return {
    fetchOrderDetail: (id) => dispatch(fetchOrderDetail(id)),
  };
};

export default connect(mapStateToProps, mapDisptachToProps)(DeliveryHome);
