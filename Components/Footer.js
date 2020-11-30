import React, { Component } from "react";
import { connect } from "react-redux";
import NavbarContainer from "./NavbarContainer";

class Footer extends Component {
  render() {
    const { user } = this.props;
    return <NavbarContainer user={user} />;
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(Footer);
