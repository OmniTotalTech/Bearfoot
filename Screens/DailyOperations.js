import React, { Component } from "react";
import { ScrollView } from "react-native";
import FormPart1Container from "../Components/FormPart1Container";
import ForVomit from "../Components/ForVomit";
import ForWeather from "../Components/ForWeather";

export default class DailyOperations extends Component {
  render() {
    return (
      <ScrollView>
        <div>
          <FormPart1Container />
          <ForVomit />
          <ForWeather />
          <div className="text-center p-4">
            <button className="bg-red-700 hover:bg-red-600 text-white font-semibold py-2 px-4 border border-red-400 rounded shadow">
              Submit
            </button>
          </div>
        </div>
      </ScrollView>
    );
  }
}
