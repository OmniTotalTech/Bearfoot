import React, { Fragment, useEffect } from "react";
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
import { NonAuthStack } from "./Routes/NonAuthStack";

import Navbar from "./Components/Navbar";

import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reduxThunk from "redux-thunk";
import reducers from "./redux/reducers";
import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { connect } from "react-redux";

import { loadUser } from "./redux/actions/auth";
import ViewController from "./Components/General/ViewController";
import { LOGOUT } from "./redux/types/auth";
import MetaTags from "react-meta-tags";

const App = () => {
  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://cra.link/PWA

  useEffect(() => {
    // check for token in LS
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener("storage", () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);
  return (
    <Provider store={store}>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/1.8.10/tailwind.min.css"
      />
      {/* <Navbar /> */}
      <MetaTags>
        <title>Page 1</title>
        <meta name="theme_color" content="#ffffff" />
        {/* <meta property="og:title" content="MyApp" />
        <meta property="og:image" content="path/to/image.jpg" /> */}
      </MetaTags>
      <ViewController />
    </Provider>
  );
};

export default App;
