import React, { Component } from "react";
import { ScrollView, Text } from "react-native";
import moment from "moment";
import DatePicker from "../../Components/General/DatePicker";
import { connect } from "react-redux";
import { fetchAdminOrderDetail } from "../../redux/actions/adminOrderDetail";

import Pagination from "../../Components/Pagination";
import OrderTableList from "../../Components/OrderTableList";

class adminDeliveriesHome extends Component {
  state = {
    date: moment(),
    orders: [],
    currentPage: 1,
    ordersPerPage: 3,
  };

  componentDidMount() {
    this.props.fetchAdminOrderDetail();
  }

  render() {
    console.log(this.state.currentPage);
    const indexOfLastPost = this.state.currentPage * this.state.ordersPerPost;
    const indexOfFirstPost = indexOfLastPost - this.state.ordersPerPage;
    const currentOrders = this.state.orders.slice(
      indexOfFirstPost,
      indexOfLastPost
    );

    console.log(fetchAdminOrderDetail);
    const eventHandler = (date) => this.setState({ date: date });
    console.log(this.props.adminOrderDetail.data);

    return (
      <ScrollView>
        <div className="container mx-auto px-4">
          <div>
            <p className="text-sm">Delivery Date:</p>
            <DatePicker onChange={eventHandler} />
          </div>
          <div>
            <label className="block mt-4">
              <span className="text-gray-700">Sort By:</span>
              <select className="form-select mt-1 block w-full">
                <option>Area</option>
                <option>Pool</option>
              </select>
            </label>
          </div>
          <div>
            <OrderTableList />
          </div>
          <Pagination
          // ordersPerPage={this.props.ordersPerPage}
          // totalOrders={adminOrderDetail.length}
          />
          <button
            type="button"
            className="border border-black-500 bg-red-500 text-white   rounded-md px-4 py-2 my-4 transition duration-500 ease select-none hover:text-white hover:bg-red-600 "
          >
            Submit
          </button>
        </div>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    adminOrderDetail: state.adminOrderDetail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAdminOrderDetail: () => dispatch(fetchAdminOrderDetail()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(adminDeliveriesHome);
