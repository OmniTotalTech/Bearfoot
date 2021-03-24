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
import api from "../../utils/api";
import PoolPrivateContainer from "../../Components/General/PoolPrivateContainer";
import moment from "moment";
import Modal from "react-modal";

class PoolDetail extends Component {
  state = {
    isEmployee: false,
    isManager: false,
    didLoad: false,
    accordionData: [],
    amtLoaded: 0,
    isModalOpen: false,
  };
  constructor(props) {
    super(props);
    this.runLoadAccordionData = this.runLoadAccordionData.bind(this);
    this.runLoadAdminData = this.runLoadAdminData.bind(this);
  }

  componentDidMount() {
    console.log(this.props.route.params);
    this.props.fetchPoolById(this.props.route.params);
    this.runLoadAccordionData();
    this.runLoadAdminData();
  }

  runLoadAccordionData = async () => {
    await api
      .get("/poolDetails/" + this.props.route.params)
      .then((response) => {
        console.log(response.data);
        this.setState({ accordionData: response.data });
      })
      .catch((error) => {
        const errorMsg = error.message;
      });
    console.log("loaded");
  };

  runLoadAdminData = async () => {
    var date = new Date();
    var dateObj = date;
    var momentObj = moment(dateObj);
    var momentString = momentObj.format("YYYY-MM-DD"); // 2016-07-15
    await api
      .get(
        "/records/lastSubmitted/" + this.props.route.params + "/" + momentString
      )
      .then((response) => {
        console.log(response);
        if (response.data.length > 0) {
          for (var i = 0; i < response.data.length; i++) {
            switch (response.data[i].recordType) {
              case "MorningChecklist":
                this.setState({ foundMorningChecklist: true });
                break;
              case "EveningChecklist":
                this.setState({ foundEveningChecklist: true });
                break;
              case "OpeningTaskChecklist":
                this.setState({ foundOpeningTaskChecklist: true });
                break;
              case "ClosingTaskChecklist":
                this.setState({ foundEveningTaskChecklist: true });
                break;
              case "dailyOperationsAM":
                this.setState({ dailyOperationsAm: true });
                break;
              case "dailyOperationsPM":
                this.setState({ dailyOperationsPm: true });
                break;
              case "ChemicalLog":
                this.setState({ chemLog: true });
                break;
            }
          }
        }
      })
      .catch((error) => {
        const errorMsg = error.message;
      });
    console.log("loaded");
  };

  render() {
    const userId = this.props.auth.user._id;
    const poolEmployeeIds = this.props.pool.individualPool.pool_employees;
    const poolManagerIds = this.props.pool.individualPool.pool_managers;

    const checkArray = (userId, array) => {
      let result = array.includes(userId);
      return result;
    };

    return (
      <>
        <ScrollView>
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
              <button
                className="bg-red-700 hover:bg-red-600 text-white font-semibold py-2 px-4 mx-1 border border-red-400 rounded shadow"
                onClick={() => this.setState({ isModalOpen: true })}
              >
                Today's Forms
              </button>
            </div>
          ) : (
            <div></div>
          )}{" "}
          <div className="w-full">
            <PoolPublicContainer
              accordionData={this.state.accordionData}
              userId={userId}
              pool={this.props.pool}
            />
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
              <Modal
                {...this.props}
                isOpen={this.state.isModalOpen}
                style={{ width: "100%" }}
              >
                <button
                  onClick={() => this.setState({ isModalOpen: false })}
                  className="bg-red-500 text-white rounded px-4 py-2"
                >
                  Close
                </button>
                <PoolPrivateContainer {...this.state} />
              </Modal>
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
      </>
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
