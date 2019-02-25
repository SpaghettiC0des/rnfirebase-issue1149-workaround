# rnfirebase-issue1149-workaround
This is a hacky workaround on firebase.notifications().onNotificationOpened

## WARNING! This is only tested on Android device

# How to run this?
1. Update the `sdk` location on `android/local.properties`.
1. You need to whitelist this test app from your respected battery optimizer, this is a known issue in android devices specially on chinese manufacturers. [More info here](https://medium.freecodecamp.org/why-your-push-notifications-never-see-the-light-of-day-3fa297520793) 
1. Test the notification using postman.
`https://fcm.googleapis.com/fcm/send`
```
Content-Type:application/json
Authorization:key=AAAARS_b_M8:APA91bGz_3AH9XbewIwopKvd6WEn7MiyX43-gRUrQZ_VeHihs5TFewGKpLvxotwDmgJziS5vYrAFvoEMO1IuUzgNUX3QyvLOa7jBjEv7Zg_CUMJlRjV88tpY--afivzn_nG_rbkmyCgJb6wcUoQ6DUKRi4_fHf6jcg

```

```
{
	"to": "<paste_the_device_token_here>",
	"data": {
		"foo": "bar",
		"baz": "wo"
	}
}
```


## Additional tip

You may need to install `react-native-queue` to wake the app even it's killed by an aggressive battery optimizer. I'll leave the setup to you.
A sample process may be to create a recursive background task using `react-native-queue`, that will respawn itself after the worker callback is called. 
