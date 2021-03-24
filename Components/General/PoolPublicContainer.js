import { Pool } from "@material-ui/icons";
import React, { Component } from "react";

class PoolPublicContainer extends Component {
  render() {
    return (
      <>
        {" "}
        <div className="bg-white max-w-2xl mx-auto shadow-lg rounded my-4 py-8 px-8 text-2xl">
          Pool Information
          <h3 className="text-orange text-xl font-semibold ">
            {this.props.pool.individualPool.pool_name}
          </h3>
          <h4 className="text-orange text-lg font-semibold ">
            {this.props.pool.individualPool.pool_address}
          </h4>
          <h4 className="text-orange text-lg font-semibold ">
            {this.props.pool.individualPool.pool_zip}
          </h4>
          <h4 className="text-orange text-lg font-semibold ">
            {this.props.pool.individualPool.pool_props}
          </h4>
          <p className="text-grey-dark font-thin text-sm leading-normal ">
            {this.props.pool.individualPool.pool_desc}
          </p>
        </div>
      </>
    );
  }
}

export default PoolPublicContainer;
