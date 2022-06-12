import React, { Component } from "react";
import { connect } from "react-redux";
import DeliveryItem from "../../Components/DeliveryItem";
import { ScrollView, TouchableOpacity } from "react-native";
import DeliveryListContainer from "../../Components/DeliveryListContainer";
import {
  fetchOrderDetail,
  fetchIndividualOrderDetail,
} from "../../redux/actions/orderDetail";
class DeliveryAssignedPage extends Component {
  componentDidMount() {
    console.log(this.props.orderDetail.data.primary);
    this.props.fetchOrderDetail();
  }
  render() {
    return (
      <ScrollView background="#000000">
        <DeliveryListContainer
          userId={this.props.user._id}
          navigation={this.props.navigation}
          orderDetail={this.props.orderDetail.data}
        />
      </ScrollView>
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
export default connect(
  mapStateToProps,
  mapDisptachToProps
)(DeliveryAssignedPage);
