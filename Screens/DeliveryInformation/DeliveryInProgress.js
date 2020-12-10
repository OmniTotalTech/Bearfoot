import React, { Component } from "react";
import { TouchableOpacity, ScrollView } from "react-native";
import DeliveryChecklist from "../../Components/DeliveryChecklist";
import Stepper from "../../Components/Stepper";
import { connect } from "react-redux";
import { updateStatus } from "../../redux/actions/updateStatus";
import { fetchIndividualOrderDetail } from "../../redux/actions/orderDetail";

class DeliveryInProgress extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.props.fetchIndividualOrder(props.route.params.item._id);
    var item = props.route.params.item;
    this.state = {
      item: props.route.params.item,
    };
    console.log(item);
  }

  loadOrder = () => {
    this.props.fetchIndividualOrder(props.route.params.item._id);
  };

  render() {
    console.log(this.props.orderDetail.individualOrderDetail.foundOrder);
    return (
      <ScrollView style={{ backgroundColor: "black" }}>
        <div
          style={{
            backgroundColor: "black",
            height: "100vh",
            maxWidth: "1000px",
          }}
          className="container mx-auto"
        >
          {this.props.orderDetail.individualOrderDetail.foundOrder != null &&
          this.props.orderDetail.individualOrderDetail.foundOrder !=
            undefined ? (
            <Stepper
              status={
                this.props.orderDetail.individualOrderDetail.foundOrder.status
              }
            />
          ) : (
            <div></div>
          )}

          {this.props.orderDetail.individualOrderDetail.foundOrder != null &&
          this.props.orderDetail.individualOrderDetail.foundOrder !=
            undefined ? (
            <DeliveryChecklist
              status={
                this.props.orderDetail.individualOrderDetail.foundOrder.status
              }
            />
          ) : (
            <div></div>
          )}

          <div className="py-4 px-4">
            {this.props.orderDetail.individualOrderDetail.foundOrder != null &&
            this.props.orderDetail.individualOrderDetail.foundOrder !=
              undefined ? (
              this.props.orderDetail.individualOrderDetail.foundOrder.status ==
              4 ? (
                <div></div>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    console.log(
                      this.props.orderDetail.individualOrderDetail.foundOrder
                        .status++
                    );
                    // console.log(
                    //   this.props.updateStatus(this.state.item._id, body)
                    // );
                    const body = {
                      status: this.props.orderDetail.individualOrderDetail
                        .foundOrder.status,
                    };
                    this.props.updateStatus(this.state.item._id, body);
                  }}
                >
                  <div>
                    <button className="bg-red-600 hover:bg-red-700 text-white text-sm py-2 px-4 rounded-full w-full">
                      CONTINUE
                    </button>
                  </div>
                </TouchableOpacity>
              )
            ) : (
              <div>*error</div>
            )}
          </div>
        </div>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    orderDetail: state.orderDetail,
    user: state.auth.user,
    item: state.updateStatus,
  };
};

const mapDisptachToProps = (dispatch) => {
  return {
    fetchIndividualOrder: (id) => dispatch(fetchIndividualOrderDetail(id)),
    updateStatus: (id, body) => dispatch(updateStatus(id, body)),
  };
};

export default connect(mapStateToProps, mapDisptachToProps)(DeliveryInProgress);
