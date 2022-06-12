import React from "react";
import { Component } from "react";
import Icons from "react-native-vector-icons/MaterialIcons";

export default class BackNavigationTestComponent extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  handleBackButtonClick() {
    this.props.navigation.goBack(null);
    return true;
  }
  render() {
    return (
      <div onClick={this.handleBackButtonClick}>
        <Icons
          backgroundColor={"red"}
          name={"arrow-back"}
          size={30}
          color="black"
          style={{ marginLeft: "3%" }}
        />
      </div>
    );
  }
}
