import React, { Component } from "react";
import PoolTableEmployee from "../../Components/Employee/PoolTableEmployee";
import { connect } from "react-redux";
import { fetchPool, fetchPoolById } from "../../redux/actions/pool";
import { ScrollView } from "react-native";
import PoolPublicContainer from "../../Components/General/PoolPublicContainer";
class PoolDetail extends Component {
  state = { isEmployee: false, isManager: false, didLoad: false };

  componentDidMount() {
    this.props.fetchPoolById(this.props.route.params);
  }

  render() {
    const userId = this.props.auth.user._id;
    const poolEmployeeIds = this.props.pool.individualPool.pool_employees;
    const poolManagerIds = this.props.pool.individualPool.pool_managers;

    const checkArray = (userId, array) => {
      let result = array.includes(userId);
      return result;
    };

    return (
      <ScrollView>
        <div className="container mx-auto">
          <div className="flex justify-center pt-4">
            <button
              className="bg-red-700 hover:bg-red-600 text-white font-semibold py-2 px-4 border border-red-400 rounded shadow"
              onClick={() =>
                this.props.navigation.navigate("EditPool", {
                  id: this.props.pool.individualPool._id,
                })
              }
            >
              Edit pool
            </button>
          </div>
          {/* inner div start */}
          <PoolPublicContainer userId={userId} pool={this.props.pool} />
          {/* inner div end */}
          {/* inner div start */}
          {checkArray(userId, poolEmployeeIds) ? (
            <PoolPublicContainer userId={userId} pool={this.props.pool} />
          ) : (
            <div></div>
          )}
          {checkArray(userId, poolManagerIds) ? (
            <div>
              <div className="bg-white shadow-lg rounded m-8 p-8 flex md:bg-orange">
                <h3 className="text-orange text-xl font-semibold md:text-white">
                  {this.props.pool.individualPool.pool_name}
                </h3>
                <h4 className="text-orange text-lg font-semibold md:text-white">
                  {this.props.pool.individualPool.pool_address}
                </h4>
                <h4 className="text-orange text-lg font-semibold md:text-white">
                  {this.props.pool.individualPool.pool_zip}
                </h4>
                <h4 className="text-orange text-lg font-semibold md:text-white">
                  {this.props.pool.individualPool.pool_state}
                </h4>

                <p className="text-grey-dark font-thin text-sm leading-normal md:text-white">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Voluptatibus quia, nulla! Maiores et perferendis eaque,
                  exercitationem praesentium nihil.
                </p>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </ScrollView>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    pool: state.pool,
    auth: state.auth,
  };
};

const mapDisptachToProps = (dispatch) => {
  return {
    fetchPoolById: (id) => dispatch(fetchPoolById(id)),
  };
};

export default connect(mapStateToProps, mapDisptachToProps)(PoolDetail);
