import React, { Component } from "react";
import { ScrollView, Text } from "react-native";
import moment from "moment";
import DatePicker from "../../Components/General/DatePicker";
import { connect } from "react-redux";
import { fetchAdminOrderDetail } from "../../redux/actions/adminOrderDetail";

import Pagination from "../../Components/Pagination";
import OrderTableList from "../../Components/OrderTableList";
import DeliveryTable from "../../Components/Admin/DeliveryTable";
import ReportTypeOneStepper from "../../Components/ReportTypeOneStepper";

class adminDeliveriesHome extends Component {
  state = {
    date: moment().format("YYYY-MM-DD"),
    orders: [],
    currentPage: 1,
    ordersPerPage: 3,
  };

  componentDidMount() {
    this.props.fetchAdminOrderDetail(moment().format("YYYY-MM-DD"));
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
    const eventHandler = (date) => this.props.fetchAdminOrderDetail(date);
    console.log(this.props.adminOrderDetail.data);

    return (
      <ScrollView>
        <div className="container mx-auto px-4">
          <div>
            <p className="text-sm">Delivery Date:</p>
            <DatePicker onChange={eventHandler} />
          </div>
          <div></div>
          <div>
            <OrderTableList />
          </div>
          <Pagination
          // ordersPerPage={this.props.ordersPerPage}
          // totalOrders={adminOrderDetail.length}
          />
          <br />

          <DeliveryTable
            navigation={this.props.navigation}
            data={this.props.adminOrderDetail}
          />
          <ReportTypeOneStepper />
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
    fetchAdminOrderDetail: (date) => dispatch(fetchAdminOrderDetail(date)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(adminDeliveriesHome);
