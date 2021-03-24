import React, { Component } from "react";
import { ScrollView } from "react-native";
import FormPart1Container from "../Components/FormPart1Container";
import ForVomit from "../Components/ForVomit";
import ForWeather from "../Components/ForWeather";
import moment from "moment";
import api from "../utils/api";
import BackButton from "../Components/BackButton";
export default class DailyOperationsEdit extends Component {
  state = { prepopulatedData: null };

  componentDidMount() {
    console.log(this.props.route.params.itemd.data[0]);
    var updateObj = this.props.route.params.itemd.data[0];
    console.log(updateObj);
    this.setState(updateObj);
    console.log(this.state);
  }
  render() {
    const updateState = (e, name) => {
      this.setState({ [name]: e });

      console.log(this.state);
    };
    const updateStateAndProps2 = (e, name) => {
      this.setState({ [name]: e });
    };

    console.log(this.state);

    const data = [
      {
        name: "Facility Manager",
        formValue: "facilityManager",
      },
      {
        name: "Shift Hours",
        formValue: "shiftHours",
      },
      {
        name: "Head Guard",
        formValue: "headGuard",
      },
      {
        name: "Shift Guard Hours",
        formValue: "shiftGuardHours",
      },
      {
        name: "Weather",
        formValue: "weather",
      },
      {
        name: "Shift Notes",
        formValue: "shiftNotes",
      },
    ];
    const data3 = [
      {
        name: "Pool(s)",
        formValue: "pools",
      },
      {
        name: "Time Closed",
        formValue: "timeClosed",
      },
      {
        name: "timeReoped",
        formValue: "timeReopened",
      },
      {
        name: "reason",
        formValue: "reason",
      },
    ];
    const data2 = [
      {
        name: "Vomit",
        formValue: "vomit",
      },
      {
        name: "fecal",
        formValue: "fecal",
      },
      {
        name: "weather",
        formValue: "weather",
      },
      {
        name: "Pool Clarity",
        formValue: "poolClarity",
      },
    ];

    const data4 = [
      {
        name: "Time Noticed",
        formValue: "timeNoticed",
      },
      {
        name: "Time Cleaned",
        formValue: "timeCleaned",
      },
      {
        name: "pH",
        formValue: "ph",
      },
      {
        name: "Chlorine",
        formValue: "chlorine",
      },
    ];
    const data5 = [
      {
        name: "Lightning",
        formValue: "lightning",
      },
      {
        name: "Heavy Rain",
        formValue: "heavyRain",
      },
      {
        name: "Thunder",
        formValue: "thunder",
      },
      {
        name: "Other",
        formValue: "other",
      },
    ];
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
            <div>
              {data.map((item) => (
                <div className="p-2">
                  <label className="text-black">{item.name}</label>
                  <div className="w-full inline-flex border">
                    <input
                      value={this.state[item.formValue]}
                      onChange={(e) =>
                        updateState(e.target.value, item.formValue)
                      }
                      className="w-full focus:outline-none text-black p-2 bg-white"
                    />
                  </div>
                </div>
              ))}
              <div className="bg-red-500 text-white text-xl font-bold p-4">
                Pool Closure
              </div>
              {data3.map((item) => (
                <div className="grid grid-cols-2 divide-x divide-white w-full border-b-2  py-4">
                  <div className="text-black px-2">{item.name}:</div>
                  <div className="p-2">
                    <div className="w-full inline-flex border">
                      <input
                        value={this.state[item.formValue]}
                        onChange={(e) =>
                          updateStateAndProps(e.target.value, item.formValue)
                        }
                        className="w-full focus:outline-none text-black p-2 bg-white"
                      />
                    </div>
                  </div>
                </div>
              ))}
              {data2.map((item) => (
                <div className="flex justify-between">
                  <div className="text-black text-lg py-4">{item.name}</div>
                  <div className="px-2 py-4">
                    <input
                      checked={this.state[item.formValue]}
                      onChange={(e) =>
                        updateStateAndProps2(e.target.checked, item.formValue)
                      }
                      type="checkbox"
                    ></input>
                  </div>
                </div>
              ))}
              {data4.map((item) => (
                <div className="grid grid-cols-2 divide-x divide-white w-full border-b-2  py-4">
                  <div className="text-black px-2">{item.name}:</div>
                  <div className="p-2">
                    <div className="w-full inline-flex border">
                      <input
                        value={this.state[item.formValue]}
                        onChange={(e) =>
                          updateStateAndProps(e.target.value, item.formValue)
                        }
                        className="w-full focus:outline-none text-black p-2 bg-white"
                      />
                    </div>
                  </div>
                </div>
              ))}
              {data5.map((item) => (
                <div className="flex justify-between">
                  <div className="text-black text-lg py-4">{item.name}</div>
                  <div className="px-2 py-4">
                    <input
                      checked={this.state[item.formValue]}
                      onChange={(e) =>
                        updateStateAndProps2(e.target.checked, item.formValue)
                      }
                      type="checkbox"
                    ></input>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
