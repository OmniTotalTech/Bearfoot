import React, { Component } from "react";
import { ScrollView, Text } from "react-native";
import moment from "moment";
import DatePicker from "../../Components/General/DatePicker";
class adminDeliveriesHome extends Component {
  state = {
    date: moment(),
  };
  render() {
    const eventHandler = (date) => this.setState({ date: date });
    return (
      <ScrollView>
        <div className="container mx-auto px-4">
          <div>
            <p className="text-sm">Delivery Date:</p>
            <DatePicker onChange={eventHandler} />
          </div>
          <div>
            <label className="block mt-4">
              <span className="text-gray-700">Sort By:</span>
              <select className="form-select mt-1 block w-full">
                <option>Area</option>
                <option>Pool</option>
              </select>
            </label>
          </div>

          <button
            type="button"
            className="border border-black-500 bg-red-500 text-white   rounded-md px-4 py-2 my-4 transition duration-500 ease select-none hover:text-white hover:bg-red-600 "
          >
            Submit
          </button>
        </div>
      </ScrollView>
    );
  }
}

export default adminDeliveriesHome;
