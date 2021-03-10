import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchAll } from "../../redux/actions/byId";

class HoaHomeContainer extends Component {
  componentDidMount() {
    this.props.fetchAll();
  }

  render() {
    const navigateAway = (id) => {
      this.props.navigation.navigate("PoolDetail", id);
    };
    return (
      <div className="container p-4 bg-white overflow-scroll">
        {this.props.hoa.data.length > 0 ? (
          this.props.hoa.data.map((item, i) => (
            <div className="my-2">
              <h1>{i + 1})</h1>
              <p className="text-xl">{item.assignedLocation.pool_name}</p>
              <p className="text-lg">{item.assignedLocation.pool_address}</p>
              <p className="text-lg">{item.assignedLocation.pool_state}</p>{" "}
              <p className="text-lg">{item.assignedLocation.pool_zip}</p>{" "}
              <p className="text-md">Area: {item.assignedLocation.area_name}</p>{" "}
              <button
                onClick={() => navigateAway(item.assignedLocation._id)}
                className="bg-red-500 text-white px-4 py-2 "
              >
                Go to Pool
              </button>
            </div>
          ))
        ) : (
          <div className="container p-2">
            This HOA account has not yet been assigned any locations
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    area: state.area,
    user: state.auth.user,
    hoa: state.hoa.data,
  };
};

const mapDisptachToProps = (dispatch) => {
  return {
    fetchAll: () => dispatch(fetchAll()),
  };
};

export default connect(mapStateToProps, mapDisptachToProps)(HoaHomeContainer);
