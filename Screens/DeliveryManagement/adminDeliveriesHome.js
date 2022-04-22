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
import BackButton from "../../Components/BackButton";

class adminDeliveriesHome extends Component {
  state = {
    date: moment().format("YYYY-MM-DD"),
    orders: [],
    currentPage: 1,
    ordersPerPage: 3,
    month: moment().format("M"),
    day: moment().format("D"),
    year: moment().format("YYYY"),
  };

  componentDidMount() {
    this.props.fetchAdminOrderDetail(moment().format("YYYY-MM-DD"));

  }

  render() {
    const indexOfLastPost = this.state.currentPage * this.state.ordersPerPost;
    const indexOfFirstPost = indexOfLastPost - this.state.ordersPerPage;
    const currentOrders = this.state.orders.slice(
      indexOfFirstPost,
      indexOfLastPost
    );

    const eventHandler = (date) => {
      // this.props.fetchAdminOrderDetail(date);
      this.setState({ date: date.date });
      console.log(date);
      this.props.fetchAdminOrderDetail(date.date);
    };

    const setStateValue = (value, Name) => {
      this.setState({
        [Name]: value,
      });
    };

    const searchValue = () => {
      let newMonth = "";

      let body = {
        month: this.state.month,
        day: this.state.day,
        year: this.state.year,
      };
      console.log(body);

      this.props.fetchAdminOrderDetail(
        `${body.year}` + "-" + `${body.month}` + "-" + `${body.day}`
      );
      console.log("searchValue");
    };
    return (
      <ScrollView>
        <BackButton navigation={this.props.navigation}/>

        <div className="container mx-auto px-8">
          <div>
            <p className="text-sm">Delivery Date:</p>
            {/* <DatePicker onChange={eventHandler} /> */}
            <div>
              <label>Month </label>
              <label className="text-xs">2 digits </label>

              <input
                type="tel"
                onChange={(e) => setStateValue(e.target.value, "month")}
                className="px-2 mx-2 shadow-xl my-2 w-8"
              />
            </div>
            <div>
              <label>Day </label>
              <label className="text-xs"> 2 digits </label>

              <input
                type="tel"
                onChange={(e) => setStateValue(e.target.value, "day")}
                className="px-2 mx-2 shadow-xl my-2 w-8"
              />
            </div>
            <div>
              <label>Year </label>
              <label className="text-xs"> 4 digits </label>

              <input
                type="tel"
                onChange={(e) => setStateValue(e.target.value, "year")}
                className="px-2 mx-2 shadow-xl my-2 w-16"
              />
            </div>
            <div>
              <button
                onClick={searchValue}
                className="bg-red-500 text-white rounded px-4"
              >
                Search
              </button>
            </div>
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
