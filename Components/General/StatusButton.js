import React, { Component } from "react";

export default status = (props) => {
  console.log(props);
  return props.status === 0 ? (
    <div>Not Accepted</div>
  ) : props.status == 1 ? (
    <div>Accepted, Inventory Stage</div>
  ) : props.status == 2 ? (
    <div>Accepted, En Route to Pool </div>
  ) : (
    <div>Complete</div>
  );
};
