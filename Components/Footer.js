import React, { Component } from "react";
import { connect } from "react-redux";
import {TouchableOpacity} from 'react-native'
import FooterContainer from "./FooterContainer";

class Footer extends Component {
  render() {
    const { user } = this.props;
    return <FooterContainer navigation={this.props.navigation} user={user} />;
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(Footer);
