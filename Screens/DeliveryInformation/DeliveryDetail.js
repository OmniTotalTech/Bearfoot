import React, { Component } from "react";
import api from "../../utils/api";

class DeliveryDetail extends Component {
  componentDidMount() {
    console.log(this.props.route.params.item);
  }

  render() {
    return (
      <>
        <div className="container bg-white p-4">
          {this.props.route.params.item.accepted_by != null ? (
            <>
              <div className="text-xl ">Currently Assigned:</div>
              <div className="text-lg">
                {this.props.route.params.item.accepted_by.name}
              </div>
              <div className="text-lg select-all">
                {this.props.route.params.item.accepted_by.phone}
              </div>
              <div className="text-lg select-all">
                {this.props.route.params.item.accepted_by.email}
              </div>
            </>
          ) : (
            <div>None Currently Assigned</div>
          )}
        </div>
      </>
    );
  }
}

export default DeliveryDetail;
