import React from "react";
import {
  SafeAreaView,
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import "react-native-gesture-handler";
import { AuthStack } from "./Routes/AuthStack";
import Navbar from "./Components/Navbar";

///////////// for new project //////////////////////

export default function App() {
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/1.8.10/tailwind.min.css"
      />
      <Navbar />

      <AuthStack />
    </>
  );
}
