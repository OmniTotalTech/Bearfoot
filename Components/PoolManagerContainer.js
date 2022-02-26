import React, { Component } from "react";

export default class PoolManagerContainer extends Component {
  render() {
    return (
      <div>
        <div className="bg-white max-w-2xl mx-auto shadow-lg rounded m-8 p-8 md:bg-orange">
          <h3 className="text-orange text-xl font-semibold ">Manager</h3>
          <p className="text-grey-dark font-thin text-sm leading-normal ">
            Manager section
          </p>
        </div>
      </div>
    );
  }
}
