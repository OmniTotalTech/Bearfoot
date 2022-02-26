import React, { Component } from "react";
import { connect } from "react-redux";
import { AuthStack } from "../../Routes/AuthStack";
import { NonAuthStack } from "../../Routes/NonAuthStack";

class ViewController extends Component {
  render() {
    return (
      <>{this.props.auth.isAuthenticated ? <AuthStack /> : <NonAuthStack />}</>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(ViewController);
