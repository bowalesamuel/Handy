import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import AppNav from "./components/AppNav";
import Home from "./components/Home";
import * as Font from "expo-font";
import { createStore } from "redux";
import rootReducer from "./utilities";
import { Provider } from "react-redux";
import AppLogin from "./Auth/AppLogin";
import AppTest from "./components/constants/AppTest";

const store = createStore(rootReducer);
//remove this in production || after demo
console.disableYellowBox = true;

export default function App() {
  // async componentDidMount() {
  //   await Font.loadAsync({
  //     Roboto: require("native-base/Fonts/Roboto.ttf"),
  //     Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
  //   });
  // }
  useEffect(() => {
    Font.loadAsync({
      Feather: require("native-base/Fonts/Feather.ttf"),
      FontAwesome: require("native-base/Fonts/FontAwesome.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    });
  }, []);

  return (
    <Provider store={store}>
      {/* <AppTest /> */}
      {/* <AppLogin /> */}
      <AppNav>
        <StatusBar backgroundColor="black" />
      </AppNav>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
