import React, { Component } from "react";
import OrderTable from "./OrderTable";

export default class OrderTableList extends Component {
  //   componentDidMount() {
  //     console.log(this.props.adminOrderDetail);
  //   }

  render() {
    // const adminOrderDetailMap = this.props.adminOrderDetail.map(
    //   (adminOrderDetail, i) => {
    //     return <OrderTable key={i} status={adminOrderDetail.status} />;
    //   }
    // );

    return (
      <div>
        {/* {this.props.adminOrderDetail != null &&
        this.props.adminOrderDetail != undefined ? (
          { adminOrderDetailMap }
        ) : (
          <div></div>
        )} */}
      </div>
    );
  }
}
