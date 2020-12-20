import React, { Component } from "react";
import PoolTableEmployee from "../../Components/Employee/PoolTableEmployee";
import { connect } from "react-redux";
import { fetchPool, fetchPoolById } from "../../redux/actions/pool";
import pool from "../../redux/reducers/pool";
class PoolDetail extends Component {
  componentDidMount() {
    this.props.fetchPoolById(this.props.route.params);
  }
  render() {
    return (
      <div className="container mx-auto">
        <div className="text-xl">
          {this.props.pool.individualPool.pool_name}
        </div>
        <div className="text-lg">
          {this.props.pool.individualPool.pool_address}
        </div>
        <div className="text-lg">
          {this.props.pool.individualPool.pool_state}
        </div>
        <div className="text-lg">{this.props.pool.individualPool.pool_zip}</div>
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
    fetchPoolById: (id) => dispatch(fetchPoolById(id)),
  };
};

export default connect(mapStateToProps, mapDisptachToProps)(PoolDetail);
