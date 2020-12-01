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
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("DeliveryReview")}
        >
          <DeliveryListContainer orderDetail={this.props.orderDetail.data} />
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    orderDetail: state.orderDetail,
  };
};

export default connect(mapStateToProps)(DeliveryAssignedPage);
