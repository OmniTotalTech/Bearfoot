import React, { Component } from "react";
import { TouchableOpacity, ScrollView } from "react-native";
import DeliveryChecklist from "../../Components/DeliveryChecklist";
import Stepper from "../../Components/Stepper";
import { connect } from "react-redux";
import { updateStatus } from "../../redux/actions/updateStatus";
import { fetchIndividualOrderDetail } from "../../redux/actions/orderDetail";
import Modal from "react-modal";

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

  handleChange = (e) => {
    this.setState({ comment: e.target.value });
  };

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
              pool={this.props.orderDetail.individualOrderDetail.foundOrder}
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
              5 ? (
                <div></div>
              ) : this.props.orderDetail.individualOrderDetail.foundOrder
                  .status == 4 ? (
                <div>
                  <span className="text-lg text-white">Final Comments:</span>
                  <br />
                  <textarea
                    class="resize border rounded-md w-full"
                    onChange={(e) => this.handleChange(e)}
                  ></textarea>

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
                        final_commments: this.state.comment,
                      };
                      this.props.updateStatus(this.state.item._id, body);
                    }}
                  >
                    <div>
                      <button className="bg-red-600 hover:bg-red-700 text-white text-sm py-2 px-4 rounded-full w-full">
                        ADD TEXT
                      </button>
                    </div>
                  </TouchableOpacity>
                </div>
              ) : (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({ isDoubleCheck: true });
                    }}
                  >
                    <div>
                      <button className="bg-red-600 hover:bg-red-700 text-white text-sm py-2 px-4 rounded-full w-full">
                        CONTINUE
                      </button>
                    </div>
                  </TouchableOpacity>
                  <Modal
                    {...this.props}
                    isOpen={this.state.isDoubleCheck}
                    style={{ width: "100%" }}
                  >
                    <div className="w-full h-full m-auto text-center">
                      <div className="text-2xl">Confirm Next Step</div>{" "}
                      <div className="text-lg max-w-md mx-auto">
                        Only go on to the next stage if you are absolutely sure
                        about progressing. There is no way to go back.
                      </div>
                      <button
                        onClick={() => this.setState({ isDoubleCheck: false })}
                        className="bg-red-500 text-white rounded px-4 py-2 mx-2"
                      >
                        Close
                      </button>
                      <button
                        onClick={() => {
                          console.log(
                            this.props.orderDetail.individualOrderDetail
                              .foundOrder.status++
                          );
                          // console.log(
                          //   this.props.updateStatus(this.state.item._id, body)
                          // );
                          const body = {
                            status: this.props.orderDetail.individualOrderDetail
                              .foundOrder.status,
                          };
                          this.props.updateStatus(this.state.item._id, body);
                          this.setState({ isDoubleCheck: false });
                        }}
                        className="bg-green-500 text-white rounded px-4 py-2 mx-2"
                      >
                        Confirm
                      </button>
                    </div>
                  </Modal>
                </>
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
