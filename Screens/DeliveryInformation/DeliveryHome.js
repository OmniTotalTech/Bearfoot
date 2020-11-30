import React, { Component } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import tailwind from "tailwind-rn";
import HomeMenuItem from "../../Components/HomeMenuItem";
import PlusImage from "../../assets/images/plus-1.jpg";

import DeliveryStatusIcon from "../../Components/DeliveryStatusIcon";
import DeliveryStatusNum from "../../Components/DeliveryStatusNum";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

import { connect } from "react-redux";
import { fetchOrderDetail } from "../../redux/actions/orderDetail";
import orderDetail from "../../redux/reducers/orderDetail";

class DeliveryHome extends Component {
  componentDidMount() {
    this.props.fetchOrderDetail(this.props.user._id);
  }

  render() {
    const deliveryTypeIcon = [
      {
        icon: <QueryBuilderIcon className="text-2xl" />,
        status: "Deliveries",
        subtext: "Check your tasks related",
      },
    ];
    let deliveryTypeNum;
    deliveryTypeNum = [
      {
        number: 0,
        status: "Primary",
      },
      {
        number: 0,
        status: "Secondary",
      },
    ];

    const handleArray = (orderDetail) => {
      console.log(orderDetail.primary);
      if (orderDetail.primary != undefined) {
        deliveryTypeNum = [
          {
            number: 0,
            status: "Primary",
          },
          {
            number: 0,
            status: "Secondary",
          },
        ];
      }
      deliveryTypeNum.map((deliveryTypeNum, i) => {
        return (
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate("DeliveryAssignedPage")
            }
          >
            <DeliveryStatusNum
              key={i}
              number={deliveryTypeNum.number}
              status={deliveryTypeNum.status}
            />
          </TouchableOpacity>
        );
      });
    };
    const deliveryStatusNumMap = deliveryTypeNum.map((deliveryTypeNum, i) => {
      return (
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("DeliveryAssignedPage")}
        >
          <DeliveryStatusNum
            key={i}
            number={deliveryTypeNum.number}
            status={deliveryTypeNum.status}
          />
        </TouchableOpacity>
      );
    });
    return (
      <View style={{ backgroundColor: " #718096" }}>
        <div className="h-screen ">
          <div className="w-100 h-100 "></div>
          <div className="w-full h-100">
            <div className="container mx-auto my-4">
              <div className="text-2xl ">Employee Activities</div>
            </div>
            <div className="container w-full bg-white  rounded-lg shadow-lg mx-auto px-2">
              <div className="grid grid-cols-2 mt-4 gap-2 py-4 rounded-lg   ">
                {handleArray(this.props.byId.data)}
                {deliveryStatusNumMap}
              </div>
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
