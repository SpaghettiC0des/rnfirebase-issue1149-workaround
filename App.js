/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { AsyncStorage, Platform, StyleSheet, Text, View } from "react-native";
import firebase from "react-native-firebase";
const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

type Props = {};

function logDeviceToken(token: string) {
  console.log("Your devices token is", token);
}

firebase.messaging().onTokenRefresh(logDeviceToken);

export default class App extends Component<Props> {
  async componentDidMount() {
    firebase
      .messaging()
      .getToken()
      .then(logDeviceToken);

    try {
      const dataFromBGTask = await AsyncStorage.getItem("FCM.BG_MESSAGE").then(
        jsonData => (jsonData ? JSON.parse(jsonData) : null)
      );

      console.log("This data is set from your BG Task handler", dataFromBGTask);
      // clear the stored FCM.BG_MESSAGE
      AsyncStorage.setItem("FCM.BG_MESSAGE", "");
    } catch (e) {
      console.log(e);
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>RN Firebase issue #1149 Workaround</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
