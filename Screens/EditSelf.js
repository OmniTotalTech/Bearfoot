import React, { Component } from "react";
import { connect } from "react-redux";
class EditSelf extends Component {
  render() {
    return (
      <>
        <div className="container p-4">
          <p className="text-2xl"> Hello, {this.props.user.name}</p>

          <input classname="mx-4 p-2 " defaultValue={this.props.user.name} />
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

export default connect(mapStateToProps, mapDisptachToProps)(EditSelf);
