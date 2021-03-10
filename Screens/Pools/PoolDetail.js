import React, { Component } from "react";
import PoolTableEmployee from "../../Components/Employee/PoolTableEmployee";
import { connect } from "react-redux";
import { fetchPool, fetchPoolById } from "../../redux/actions/pool";
import { ScrollView } from "react-native";
import PoolPublicContainer from "../../Components/General/PoolPublicContainer";
import PoolManagerContainer from "../../Components/PoolManagerContainer";
import PoolSupervisorContainer from "../../Components/PoolSupervisorContainer";
import ShiftInventoryCount from "../../Components/ShiftInventoryCount";
import SpecialForms from "./SpecialForms";
import BackButton from "../../Components/BackButton";
class PoolDetail extends Component {
  state = { isEmployee: false, isManager: false, didLoad: false };

  componentDidMount() {
    console.log(this.props.route.params);
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
        {" "}
        <BackButton navigation={this.props.navigation} />
        {this.props.user.role >= 3 ? (
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
            <button
              className="bg-red-700 hover:bg-red-600 text-white font-semibold py-2 px-4 mx-1 border border-red-400 rounded shadow"
              onClick={() =>
                this.props.navigation.navigate("PoolRecords", {
                  id: this.props.route.params,
                })
              }
            >
              Pool Records
            </button>
          </div>
        ) : (
          <div></div>
        )}{" "}
        <div className="w-full">
          <PoolPublicContainer userId={userId} pool={this.props.pool} />
        </div>
        {/* inner div start */}
        {this.props.user.isHOA ? (
          <div>
            {" "}
            <button
              className="bg-red-700 hover:bg-red-600 text-white font-semibold py-2 px-4 mx-1 border border-red-400 rounded shadow"
              onClick={() =>
                this.props.navigation.navigate("PoolRecords", {
                  id: this.props.pool.individualPool._id,
                })
              }
            >
              View Pool Records
            </button>
          </div>
        ) : (
          <>
            <ShiftInventoryCount
              id={this.props.pool.individualPool._id}
              navigation={this.props.navigation}
            />
            <SpecialForms
              id={this.props.pool.individualPool._id}
              navigation={this.props.navigation}
            />
          </>
        )}
        {/* inner div end */}
        {/* inner div start */}
        {checkArray(userId, poolEmployeeIds) ? (
          <PoolManagerContainer />
        ) : (
          <div></div>
        )}
        {checkArray(userId, poolManagerIds) ? (
          <PoolSupervisorContainer />
        ) : (
          <div></div>
        )}
      </ScrollView>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    pool: state.pool,
    auth: state.auth,
    user: state.auth.user,
  };
};

const mapDisptachToProps = (dispatch) => {
  return {
    fetchPoolById: (id) => dispatch(fetchPoolById(id)),
  };
};

export default connect(mapStateToProps, mapDisptachToProps)(PoolDetail);
