import React from "react";
import { Component } from "react";
import Icons from "react-native-vector-icons/MaterialIcons";

export default class BackNavigationTestComponent extends Component {
  constructor(props) {
    super(props);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }
  handleBackButtonClick() {
    this.props.handleClick(0);
    return true;
  }
  render() {
    return (
      <button onClick={this.handleBackButtonClick}>
        <Icons
          backgroundColor={"red"}
          name={"arrow-back"}
          size={30}
          color="black"
          style={{ marginLeft: "3%" }}
        />
      </button>
    );
  }
}
