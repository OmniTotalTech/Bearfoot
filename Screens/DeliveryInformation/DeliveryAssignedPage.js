import React, { Component } from "react";
import { connect } from "react-redux";
import DeliveryItem from "../../Components/DeliveryItem";
import { ScrollView, TouchableOpacity } from "react-native";
import DeliveryListContainer from "../../Components/DeliveryListContainer";

class DeliveryAssignedPage extends Component {
  componentDidMount() {
    console.log(this.props.orderDetail.data.primary);
  }
  render() {
    return (
      <ScrollView>
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

export default connect(mapStateToProps)(DeliveryAssignedPage);
