import { Pool } from "@material-ui/icons";
import React, { Component } from "react";

class PoolPublicContainer extends Component {
  render() {
    return (
      <div className="bg-white shadow-lg rounded m-8 p-8 flex md:bg-orange">
        <div className="w-1/3 hidden sm:block">
          <img
            className="rounded-full md:border-white md:border-solid md:border-4"
            src="https://randomuser.me/api/portraits/men/44.jpg"
          />
        </div>
        <div className="sm:w-2/3 ">
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
            {this.props.pool.individualPool.pool_state}
          </h4>

          <p className="text-grey-dark font-thin text-sm leading-normal ">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Voluptatibus quia, nulla! Maiores et perferendis eaque,
            exercitationem praesentium nihil.
          </p>
        </div>
      </div>
    );
  }
}

export default PoolPublicContainer;
