import React, { Component } from "react";
import Logo from "../assets/images/Red_Black_Glow_Paw.svg";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import * as RootNavigation from "../Routes/RootNavigation";

function FooterContainer({ props }) {
  return (
    <div
      className=" w-full shadow-xl  mx-auto p-2"
      style={{
        backgroundImage: "linear-gradient(to bottom right,#333333,#222222)",
        backgroundColor: "black",
        shadow: "5px 5px 10px #000000",
      }}
    >
      <div className="container mx-auto">
        <TouchableOpacity onPress={() => RootNavigation.navigate("Home")}>
          <img
            src={Logo}
            style={{ height: "50px", width: "50px" }}
            className="mx-auto"
          />
        </TouchableOpacity>
      </div>
    </div>
  );
}

export default FooterContainer;
