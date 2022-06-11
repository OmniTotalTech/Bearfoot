import React, { Component } from "react";

export default class Pagination extends Component {
  render() {
    const { ordersPerPage, totalOrders } = this.props;
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalOrders / ordersPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <div>
        <div>
          <ul>
            {pageNumbers.map((number) => (
              <li key={number}>{number}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
