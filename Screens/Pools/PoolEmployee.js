import React, { Component } from "react";
import PoolTableEmployee from "../../Components/Employee/PoolTableEmployee";
import { connect } from "react-redux";
import { fetchPool } from "../../redux/actions/pool";

import { ScrollView } from "react-native";

class PoolEmployee extends Component {
  componentDidMount() {
    this.props.fetchPool();
  }

  render() {
    return (
      <ScrollView>
        <div className="container mx-auto max-w-4xl">
          <PoolTableEmployee
            navigation={this.props.navigation}
            data={this.props.pool}
          />
        </div>
      </ScrollView>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    pool: state.pool,
  };
};

const mapDisptachToProps = (dispatch) => {
  return {
    fetchPool: () => dispatch(fetchPool()),
  };
};

export default connect(mapStateToProps, mapDisptachToProps)(PoolEmployee);
