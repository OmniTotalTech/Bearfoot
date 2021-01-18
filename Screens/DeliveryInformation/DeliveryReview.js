import React, { Component } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
// import DeliveryAccept from "../../Components/DeliveryAccept";
import DeliveryAddress from "../../Components/DeliveryAddress";
import DeliveryChecklist from "../../Components/DeliveryChecklist";
import { connect } from "react-redux";
import { updateStatus } from "../../redux/actions/updateStatus";

import ListIcon from "@material-ui/icons/List";

class DeliveryReview extends Component {
  constructor(props) {
    super(props);
    var item = props.route.params.item;
    this.state = {
      item: props.route.params.item,
    };
    console.log(item);
  }

  setUpdateStatus() {
    const body = { status: 1 };
    this.props.updateStatus(this.state.item._id, body);
  }

  componentDidUpdate() {
    // console.log(this.props.navigation.getParam("item"));
  }

  render() {
    return (
      <ScrollView>
        <div
          style={{
            backgroundColor: "black",
            height: "100vh",
          }}
        >
          <div className="max-w-2xl mx-auto">
            <DeliveryAddress />
            <DeliveryChecklist />
            {/* <DeliveryAccept /> */}
            <div className="px-4 ">
              <div className="rounded-t-lg bg-white pt-4 pb-24 my-2 text-center">
                <div className="mb-8">
                  <div className="font-bold">0.5 mi</div>
                  <div>Requested By Savannah</div>
                  <div></div>
                </div>
                <div>
                  {/* <div className="mb-3">
                    <ListIcon
                      className="text-4xl mr-2"
                      style={{
                        color: "white",
                        backgroundColor: "black",
                        borderRadius: "50%",
                      }}
                    />
                    View Delivery Items List
                  </div> */}
                  {this.state.item.status == 0 ? (
                    <TouchableOpacity
                      onPress={() => {
                        this.setUpdateStatus();
                        this.props.navigation.navigate("DeliveryInProgress", {
                          item: this.state.item,
                        });
                      }}
                    >
                      <div className="py-4 px-4">
                        <button className="bg-red-600 hover:bg-red-700 text-white text-sm py-2 px-4 rounded-full w-full">
                          ACCEPT
                        </button>
                      </div>
                    </TouchableOpacity>
                  ) : (
                    // <TouchableOpacity
                    //   onPress={() => {
                    //     this.props.navigation.navigate("DeliveryInProgress", {
                    //       item: this.state.item,
                    //     });
                    //   }}
                    // >
                    //   <div className="py-4 px-4">
                    //     <button className="bg-red-600 hover:bg-red-700 text-white text-sm py-2 px-4 rounded-full w-full">
                    //       Continue?
                    //     </button>
                    //   </div>
                    // </TouchableOpacity>
                    <div className="text-md">
                      Hello, {this.props.user.name}. You have already completed
                      this delivery.
                    </div>
                  )}
                </div>
              </div>
            </div>
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
  };
};

const mapDisptachToProps = (dispatch) => {
  return {
    updateStatus: (id, body) => dispatch(updateStatus(id, body)),
  };
};

export default connect(mapStateToProps, mapDisptachToProps)(DeliveryReview);
