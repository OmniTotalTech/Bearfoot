import React, { Component } from "react";
import PoolTableEmployee from "../../Components/Employee/PoolTableEmployee";
import { connect } from "react-redux";
import { fetchPool } from "../../redux/actions/pool";
import BackButton from "../../Components/BackButton";

import { ScrollView } from "react-native";

class PoolEmployee extends Component {

  state = {}

  componentDidMount() {
    this.props.fetchPool();
  }

  handleRefresh(){
    this.props.fetchPool();
  }

  render() {
    return (
      <ScrollView>
        {" "}
        <BackButton navigation={this.props.navigation} />
        <div className="container mx-auto max-w-4xl my-4">
          <PoolTableEmployee
            navigation={this.props.navigation}
            data={this.props.pool}
            user={this.props.user}
          />
        </div>
      </ScrollView>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    pool: state.pool,
    user: state.auth.user
  };
};

const mapDisptachToProps = (dispatch) => {
  return {
    fetchPool: () => dispatch(fetchPool()),
  };
};

export default connect(mapStateToProps, mapDisptachToProps)(PoolEmployee);
