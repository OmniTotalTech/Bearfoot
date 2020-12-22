import React, { Component } from "react";
import PoolTableEmployee from "../../Components/Employee/PoolTableEmployee";
import { connect } from "react-redux";
import { fetchPool } from "../../redux/actions/pool";
class PoolEmployee extends Component {
  componentDidMount() {
    this.props.fetchPool();
  }
  render() {
    return (
      <div className="container mx-auto max-w-4xl">
        <PoolTableEmployee
          navigation={this.props.navigation}
          data={this.props.pool.data.foundPool}
        />
      </div>
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
