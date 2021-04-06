import React, { Component } from "react";
import { ScrollView } from "react-native";
import FormPart1Container from "../Components/FormPart1Container";
import ForVomit from "../Components/ForVomit";
import { connect } from "react-redux";

import ForWeather from "../Components/ForWeather";
import moment from "moment";
import api from "../utils/api";
import BackButton from "../Components/BackButton";
class DailyOperations extends Component {
  state = {};
  render() {
    const updateState = (e, name) => {
      this.setState({ [name]: e });

      console.log(this.state);
    };

    const handleSubmit = async () => {
      let type;
      if (this.props.route.params.isAm) {
        type = "dailyOperationsAM";
      } else {
        type = "dailyOperationsPM";
      }
      var date = new Date();
      var dateObj = date;
      var momentObj = moment(dateObj);
      var momentString = momentObj.format("YYYY-MM-DD"); // 2016-07-15

      let body = {
        pool_id: this.props.route.params.id,
        recordType: type,
        date: momentString,
        data: this.state,
        user_id: this.props.user._id,
      };
      console.log(body);
      await api
        .post("/records/" + type, body)
        .then((response) => {
          console.log(response);
          this.props.navigation.navigate("SuccessScreen");
        })
        .catch((error) => {
          const errorMsg = error.message;
        });
    };

    return (
      <div className="overflow-scroll">
        {" "}
        <BackButton navigation={this.props.navigation} />
        {this.props.route.params.isNew ? (
          <div>
            {" "}
            <div className="max-w-2xl m-4 p-4 mx-auto">
              <FormPart1Container updateState={updateState} />
              <ForVomit updateState={updateState} />
              <ForWeather updateState={updateState} />
              <div className="text-center p-4">
                <button
                  onClick={handleSubmit}
                  className="bg-red-700 hover:bg-red-600 text-white font-semibold py-2 px-4 border border-red-400 rounded shadow"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

export default connect(mapStateToProps)(DailyOperations);
