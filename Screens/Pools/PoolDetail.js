import React, { Component } from "react";
import PoolTableEmployee from "../../Components/Employee/PoolTableEmployee";
import { connect } from "react-redux";
import { fetchPool, fetchPoolById } from "../../redux/actions/pool";
import pool from "../../redux/reducers/pool";
import { ScrollView } from "react-native";
class PoolDetail extends Component {
  componentDidMount() {
    this.props.fetchPoolById(this.props.route.params);
  }
  render() {
    console.log(this.props.pool.individualPool.pool_employees);
    console.log(this.props.auth.user);

    const userId = this.props.auth.user;
    const poolEmployeeIds = this.props.pool.individualPool.pool_employees;
    const poolManagerIds = this.props.pool.individualPool.pool_managers;

    return (
      <ScrollView>
        <div className="container mx-auto">
          <div className="bg-white shadow-lg rounded m-8 p-8 flex md:bg-orange">
            <div className="w-1/3 hidden sm:block">
              <img
                className="rounded-full md:border-white md:border-solid md:border-4"
                src="https://randomuser.me/api/portraits/men/44.jpg"
              />
            </div>
            <div className="sm:w-2/3 ">
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
          {this.props.pool.individualPool.pool_employees ? (
            <div>
              <div className="bg-white shadow-lg rounded m-8 p-8 flex md:bg-orange">
                <div className="w-1/3 hidden sm:block">
                  <img
                    className="rounded-full md:border-white md:border-solid md:border-4"
                    src="https://randomuser.me/api/portraits/men/44.jpg"
                  />
                </div>
                <div className="sm:w-2/3 ">
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
            </div>
          ) : (
            <div></div>
          )}
          {this.props.pool.individualPool.pool_managers ? (
            <div>
              <div className="bg-white shadow-lg rounded m-8 p-8 flex md:bg-orange">
                <div className="w-1/3 hidden sm:block">
                  <img
                    className="rounded-full md:border-white md:border-solid md:border-4"
                    src="https://randomuser.me/api/portraits/men/44.jpg"
                  />
                </div>
                <div className="sm:w-2/3 ">
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
