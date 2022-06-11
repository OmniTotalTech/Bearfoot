import React, { Component } from "react";
import WarningIcon from "@material-ui/icons/Warning";
import { ScrollView } from "react-native";

export default class DropOffChecklist extends Component {
  render() {
    return (
      <ScrollView>
        <div className="px-4 py-2">
          <div className="bg-white px-5 pt-4">
            <div className="divide-y divide-gray-400 mb-4">
              <div className="text-center py-2">Drop Off Checklist</div>
            </div>
            <div className="divide-y divide-gray-400">
              <div className="flex flex-row w-full items-center"></div>
              <div className=" py-2">Paper Towels</div>
              <div className=" py-2">Paper Towels</div>
              <div className=" py-2">Paper Towels</div>
            </div>
          </div>
        </div>
      </ScrollView>
    );
  }
}
