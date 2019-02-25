// @flow
import firebase from "react-native-firebase";
import { AppState, AsyncStorage } from "react-native";
import type { RemoteMessage, NotificationOpen } from "react-native-firebase";
const channel = new firebase.notifications.Android.Channel(
  "test-channel",
  "Test Channel",
  firebase.notifications.Android.Importance.Max
).setDescription("My apps test channel");

firebase.notifications().android.createChannel(channel);
export default async (message: RemoteMessage) => {
  const currentAppState = AppState.currentState;

  // listen for app state change, then save the message data using AsyncStorage
  AppState.addEventListener("change", nextAppstate => {
    if (currentAppState === "active" && nextAppState === "uninitialized") {
      // I named the item key `FCM.BG_MESSAGE` but you can name it what you want.
      // Then, serialise the data to JSON, because AsyncStorage only allow strings as value
      AsyncStorage.setItem("FCM.BG_MESSAGE", JSON.stringify(message.data));
    }
  });

  const notif = new firebase.notifications.Notification()
    .setNotificationId("notificationId")
    .setTitle("My notification title")
    .setBody("My notification body")
    .android.setChannelId("test-channel")
    .setData({
      key1: "value1",
      key2: "value2"
    });
  firebase.notifications().displayNotification(notif);
  return Promise.resolve();
  // display your notification here
};
