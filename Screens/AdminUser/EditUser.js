import React, { Component } from "react";
import { connect } from "react-redux";
class EditUser extends Component {
  render() {
    console.log(this.props.route.params);
    return (
      <>
        <div className="container p-4">
          <p className="">You are now managing </p>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

const mapDisptachToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDisptachToProps)(EditUser);
