/** @format */

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import FirebaseBacgkroundTask from "./FirebaseBacgkroundTask";
AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerHeadlessTask(
  "RNFirebaseBackgroundMessage",
  () => FirebaseBacgkroundTask
);
