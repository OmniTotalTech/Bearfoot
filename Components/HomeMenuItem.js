import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Text,
  TouchableHighlight,
  Image,
} from "react-native";

export default class SimpleCircleButton extends React.Component {
  render() {
    let localStyles = styles(this.props); //need to load styles with props because the styles rely on prop values

    return (
      <TouchableOpacity>
        <div>
          <div className="border border-gray-600 shadow-lg w-100 h-24 w-24 mx-auto bg-red-500 flex items-center justify-center my-2 text-center">
            <Image
              style={styles.tinyLogo}
              // source={require("../assets/images/Red_Black_Glow_Paw.svg")}
            />
            <br />
            <div className="w-full text-center text-lg">
              <h2>Delivery</h2>
            </div>
          </div>
        </div>
      </TouchableOpacity>
    );
  }
}

const styles = (props) =>
  StyleSheet.create({
    button: {
      backgroundColor: "rgba(20,174,255,0.51)",
      justifyContent: "center",
      alignContent: "center",
      borderWidth: 3,
      borderRadius: props.circleDiameter / 2,
      width: props.circleDiameter,
      height: props.circleDiameter,
    },
    container: {
      paddingTop: 50,
      position: "relative",
      zIndex: 0,
      backgroundColor: "rgba(255,95,28,0.42)", //add a background to highlight the touchable area
    },
    tinyLogo: {
      width: 50,
      height: 50,
      margin: 0,
    },
    logo: {
      width: 66,
      height: 58,
    },
  });
