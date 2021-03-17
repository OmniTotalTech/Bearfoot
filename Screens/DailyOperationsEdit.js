import React, { Component } from "react";
import { ScrollView } from "react-native";
import FormPart1Container from "../Components/FormPart1Container";
import ForVomit from "../Components/ForVomit";
import ForWeather from "../Components/ForWeather";
import moment from "moment";
import api from "../utils/api";
import BackButton from "../Components/BackButton";
export default class DailyOperationsEdit extends Component {
  state = { preloadedData: null };

  componentWillMount() {
    this.setState({ preloadedData: [] });
    console.log(this.props.route.params.itemd.data[0]);
    this.setState(this.props.route.params.itemd.data[0]);
  }
  render() {
    const updateState = (e, name) => {
      this.setState({ [name]: e });
      console.log(this.props);
      console.log(this.state);
    };

    const firstPartMap = () => {
      <div className="text-red-500 bold">
        {" "}
        Server communication error. Please try again later.
      </div>;
      this.props.route.params.itemd.data[0] ? (
        <div>
          {/* <div className="p-2">
            <label className="text-black">Facility Manager</label>
            <div className="w-full inline-flex border">
              <input
                defaultValue={
                  this.props.route.params.itemd.data[0].facilityManager
                }
                onChange={(e) =>
                  updateState(
                    e.target.value,
                    this.props.route.params.itemd.data[0].facilityManager
                  )
                }
                className="w-full focus:outline-none text-black p-2 bg-white"
              />
            </div>
          </div>{" "}
          <div className="p-2">
            <label className="text-black">Shift Hours</label>
            <div className="w-full inline-flex border">
              <input
                defaultValue={this.state.data.shiftHours}
                onChange={(e) =>
                  updateState(e.target.value, this.state.data.shiftHours)
                }
                className="w-full focus:outline-none text-black p-2 bg-white"
              />
            </div>
          </div> */}
        </div>
      ) : (
        <div>
          <div className="text-red-500 bold">
            {" "}
            Server communication error. Please try again later.
          </div>
          ;
        </div>
      );
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
        <BackButton navigation={this.props.navigation} />

        <div className="max-w-2xl m-4 p-4 mx-auto">
          <div className="container mx-auto bg-white">
            <div className="bg-red-500 text-white text-xl font-bold p-4">
              Daily Operations
            </div>
            <div>{firstPartMap()}</div>
          </div>

          {/* <FormPart1Container updateState={updateState} />
          <ForVomit updateState={updateState} />
          <ForWeather updateState={updateState} />
          <div className="text-center p-4">
            <button
              onClick={handleSubmit}
              className="bg-red-700 hover:bg-red-600 text-white font-semibold py-2 px-4 border border-red-400 rounded shadow"
            >
              Submit
            </button>
          </div> */}
        </div>
      </div>
    );
  }
}
