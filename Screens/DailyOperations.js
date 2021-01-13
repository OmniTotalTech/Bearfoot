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
        </div>
      </ScrollView>
    );
  }
}
