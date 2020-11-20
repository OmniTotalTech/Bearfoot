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

import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reduxThunk from "redux-thunk";
import reducers from "./redux/reducers";

const store = createStore(
  reducers,
  {},
  composeWithDevTools(applyMiddleware(reduxThunk))
  // other store enhancers if any
);

export default function App() {
  return (
    <Provider store={store}>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/1.8.10/tailwind.min.css"
      />
      <Navbar />

      <AuthStack />
    </Provider>
  );
}
