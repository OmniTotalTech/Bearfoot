import React, { Component } from "react";
import { ScrollView, TouchableOpacity } from "react-native";
// import DeliveryAccept from "../../Components/DeliveryAccept";
import DeliveryAddress from "../../Components/DeliveryAddress";
import DeliveryChecklist from "../../Components/DeliveryChecklist";
import { connect } from "react-redux";
import { updateStatus } from "../../redux/actions/updateStatus";
import { fetchPoolById } from "../../redux/actions/pool";
import ListIcon from "@material-ui/icons/List";

class DeliveryReview extends Component {
  constructor(props) {
    super(props);
    var item = props.route.params.item;
    this.state = {
      item: props.route.params.item,
    };
    this.props.fetchPoolById(props.route.params.item.pool_id);
  }

  setUpdateStatus() {
    const body = { status: 1, accepted_by: this.props.user._id };
    this.props.updateStatus(this.state.item._id, body);
  }

  componentDidUpdate() {
    // console.log(this.props.navigation.getParam("item"));
  }

  render() {
    const deliveryListMap = this.props.orderDetail.primary.starting_list.map(
      (listItem) => {
        return (
          <DeliveryChecklist
            name={listItem.name}
            lowAmt={listItem.lowAmt}
            inStockAmt={listItem.inStockAmt}
          />
        );
      }
    );

    return (
      <ScrollView>
        <div
          style={{
            backgroundColor: "black",
            height: "100vh",
          }}
        >
          <div className="max-w-2xl mx-auto">
            <DeliveryAddress pool={this.props.pool} />
            <DeliveryChecklist />
            {/* <DeliveryAccept /> */}
            <div className="px-4 ">
              <div className="rounded-t-lg bg-white pt-4 pb-24 my-2 text-center">
                <div className="mb-8">
                  {/* <div className="font-bold">0.5 mi</div> */}
                  <div>
                    Requested By
                    <span className="font-bold">
                      {this.props.pool.pool_name}
                    </span>
                  </div>
                  <div></div>
                </div>
                <div>
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
                    <TouchableOpacity
                      onPress={() => {
                        this.props.navigation.navigate("DeliveryInProgress", {
                          item: this.state.item,
                        });
                      }}
                    >
                      <div className="py-4 px-4">
                        <button className="bg-red-600 hover:bg-red-700 text-white text-sm py-2 px-4 rounded-full w-full">
                          Continue?
                        </button>
                      </div>
                    </TouchableOpacity>
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
    pool: state.pool.individualPool,
  };
};

const mapDisptachToProps = (dispatch) => {
  return {
    updateStatus: (id, body) => dispatch(updateStatus(id, body)),
    fetchPoolById: (id) => dispatch(fetchPoolById(id)),
  };
};

export default connect(mapStateToProps, mapDisptachToProps)(DeliveryReview);
