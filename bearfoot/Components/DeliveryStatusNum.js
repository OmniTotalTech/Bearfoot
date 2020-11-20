import React, { Component } from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
export default class DeliveryStatusNum extends Component {
  render() {
    return (
      <div>
        <div className=" rounded-r-lg  rounded-l-lg w-full h-full p-4 bg-gradient-to-r from-red-500 via-red-600 to-red-700">
          <div>
            <div className="row-span-1 text-red-600 text-5xl pt-4">
              {this.props.number}
            </div>
            <div className="row-span-1">
              <div className="text-xl">{this.props.status}</div>
              <div className="text-xl">Deliveries</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
