import { AppState } from "react-native";
import BackgroundTask from "react-native-background-task";
import queueFactory from "react-native-queue";
import messagingNotification from "./messagingNotification";

export const FCM_WORKAROUND_TASK_NAME = "fcm-bg-notification-workaround";

export default function() {
  BackgroundTask.define(async () => {
    // Init queue
    let queue = await queueFactory();

    // Register worker
    queue.addWorker(FCM_WORKAROUND_TASK_NAME, async (id, payload) => {
      queue.createJob(FCM_WORKAROUND_TASK_NAME);
      firebase.messaging().onMessage(message => {
        const currentAppState = AppState.currentState;
        AppState.addEventListener("change", nextAppState => {
          if (
            currentAppState === "active" &&
            nextAppState === "uninitialized"
          ) {
            AsyncStorage.setItem(
              "FCM.BG_MESSAGE",
              JSON.stringify(message.data)
            );
          }
        });
        messagingNotification(message.data);
      });
    });

    // Start the queue with a lifespan
    // IMPORTANT: OS background tasks are limited to 30 seconds or less.
    // NOTE: Queue lifespan logic will attempt to stop queue processing 500ms less than passed lifespan for a healthy shutdown buffer.
    // IMPORTANT: Queue processing started with a lifespan will ONLY process jobs that have a defined timeout set.
    // Additionally, lifespan processing will only process next job if job.timeout < (remainingLifespan - 500).
    await queue.start(25000); // Run queue for at most 25 seconds.

    // finish() must be called before OS hits timeout.
    BackgroundTask.finish();
  });
}
