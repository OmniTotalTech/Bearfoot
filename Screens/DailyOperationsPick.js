import React, { Component } from "react";
import api from "../utils/api";
import moment from "moment";
import BackButton from "../Components/BackButton";
export default class DailyOperationsPick extends Component {
  state = { isAm: false, isPm: false, isFound: false, preLoadedData: {} };

  render() {
    const goToSave = async (item) => {
      this.props.navigation.navigate("DailyOperationsEdit", {
        id: this.props.route.params.id,
        isAm: this.state.isAm,
        isPm: this.state.isPm,
        itemd: item,
      });
    };
    const handleSetTime = async (text) => {
      var date = new Date();
      var dateObj = date;
      var momentObj = moment(dateObj);
      var momentString = momentObj.format("YYYY-MM-DD"); // 2016-07-15

      if (text == "am") {
        this.setState({ isAm: true, isPm: false });

        await api
          .get(
            "/records/search/" +
              this.props.route.params.id +
              "/" +
              "dailyOperationsAM/" +
              momentString
          )
          .then((response) => {
            console.log(response);
            if (response.data.length > 0) {
              this.setState({
                isFound: true,
                searched: true,
                resData: response.data,
                preLoadedData: response.data,
              });
            } else {
              this.setState({
                isFound: false,
                searched: true,
                resData: null,
                preLoadedData: null,
              });
            }
          })
          .catch((error) => {
            const errorMsg = error.message;
          });
      } else {
        await api
          .get(
            "/records/search/" +
              this.props.route.params.id +
              "/" +
              "dailyOperationsPM/" +
              momentString
          )
          .then((response) => {
            console.log(response);
            if (response.data.length > 0) {
              this.setState({
                isFound: true,
                searched: true,
                resData: response.data,
                preLoadedData: response.data,
              });
            } else {
              this.setState({
                isFound: false,
                searched: true,
                resData: null,
                preLoadedData: null,
              });
            }
          })
          .catch((error) => {
            const errorMsg = error.message;
          });
      }
    };
    return (
      <div>
        <BackButton navigation={this.props.navigation} />

        <p className="text-lg mx-auto text-center mt-4">
          Select Time Slot for Today to Complete a Report:
        </p>
        <div className="w-full mx-auto grid grid-cols-2 spacing-1 my-2 text-center">
          <div>
            <button
              className="bg-red-500 text-white w-2/3 rounded "
              onClick={() => handleSetTime("am")}
            >
              Am
            </button>
          </div>
          <div>
            <button
              className="bg-red-500 text-white px-4  rounded w-2/3 "
              onClick={() => handleSetTime("pm")}
            >
              Pm
            </button>
          </div>
          {this.state.isFound ? (
            <div className="w-screen">
              <div className="container mx-auto p-4 text-center w-full">
                Found Records
              </div>
              <div className="container mx-auto p-4 text-center w-full">
                {this.state.resData ? (
                  this.state.resData.map((item) => (
                    <>
                      <div>{item.date}</div>
                      <button
                        className="bg-red-500 text-white rounded px-4 p-2"
                        onClick={() => goToSave(item)}
                      >
                        Edit
                      </button>
                    </>
                  ))
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          ) : this.state.searched ? (
            <div className="w-screen">
              <div className="container mx-auto p-4 text-center w-full">
                No records were found for today. Start a new Daily Operation?
                <br />
                <button
                  onClick={() =>
                    this.props.navigation.navigate("DailyOperations", {
                      id: this.props.route.params.id,
                      isNew: true,
                      isAm: this.state.isAm,
                      isPm: this.state.isPm,
                    })
                  }
                  className="bg-red-500 text-white rounded px-4 py-2"
                >
                  Create New
                </button>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    );
  }
}
