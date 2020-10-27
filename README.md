# ReactNative "Background" Location Tracking

### This is an example app which demonstrates "background" location tracking in both iOS and Android.

> I put "background" in quotes, because on Android it's actually using a "Foreground Service".

This project contains an [Android Native Module](https://reactnative.dev/docs/native-modules-android) so you'll have to have your project "ejected" (if you started with Expo). If you started with the React Native CLI (via `react-native init`) you should be good to go.

### iOS Features

- Uses [React Native Location](https://github.com/timfpark/react-native-location)

### Android Features

- Uses APIs provided by Android (like: [FusedLocationProviderClient](https://developers.google.com/android/reference/com/google/android/gms/location/FusedLocationProviderClient) and [Foreground Service](https://developer.android.com/guide/components/services#Types-of-services))
- Android Location query interval is customisable down to 1s (maybe faster? I haven't tested that yet...)
- Display's "Ongoing" notification to the user while the app is requesting location updates
- Communicates location to your ReactNative JS code while the app is closed and/or the phone screen is off for processing
- Ready to do work on the native side if you'd prefer to save the data directly to the device instead

### References

This project was based on the combination of two other demo apps:

- https://github.com/comoser/rn-background-location (Uses "Background Service" for better power efficiency but is limited to locations updates down to 1 minute... I needed something faster)
- Android's [LocationUpdatesForegroundService Example](https://github.com/android/location-samples/tree/432d3b72b8c058f220416958b444274ddd186abd/LocationUpdatesForegroundService) found in their [Request Location Updates](https://developer.android.com/training/location/request-updates#addt-resources) page.

### WARNING

I'm very much new to Android development so I had to stumble through parts of this... During development I was testing on device and in simulators using Android API 28 + 29. I have not done exaustive testing, nor know enough about Android to say with confidence how far back this code will support.

### Notes about Android Specific changes

As listed above in the feature sections, iOS is taken care of by [React Native Location](https://github.com/timfpark/react-native-location). The core of this sample project is in the Android specific code. Most of the changes are rolled up into an [Android Native Module](https://reactnative.dev/docs/native-modules-android), located here:

[./android/app/src/main/java/com/mranderson/locationsample/location](./android/app/src/main/java/com/mranderson/locationsample/location)

However, a number of other changes also need to be made to the main React Native project:

- [MainApplication.java](./android/app/src/main/java/com/mranderson/locationsample/MainApplication.java) (to include the location package in the project)
- [MainActivity.java](./android/app/src/main/java/com/mranderson/locationsample/MainActivity.java) (to bind the MainActivity to the location forground service provided by the package mentioned above)
- [AndroidManifest.xml](./android/app/src/main/AndroidManifest.xml) (added the forground location service `<service>` and `<uses-permission>` for `ACCESS_FINE_LOCATION` and `FOREGROUND_SERVICE`)
- [strings.xml](./android/app/src/main/res/values/strings.xml) (added a number of text values used by the location service)
- multiple `ic_notify_icon.png` files found in the `drawable-...` folders inside [res](./android/app/src/main/res) (used as the icon that shows in the system notification try while the forground service is active)

Hopefully that covers pretty much all of it. If I've missed any changes, I'll come back in here and update this list. I also tried to add comments to those files to indicate which changes or additions need to be made.

### Notes about the React Native app code

First and foremost, this sample project uses [React Native Location](https://github.com/timfpark/react-native-location). So, if you plan on trying to copy my changes into your own project, you may want to look over the docs for `RNLocation` first.

On the iOS side of things, `RNLocation` provides everything you need. It also works on the Android side, just not while the app is "in the background". On both platforms, `RNLocation` is used to prompt the user for location access permission. To do this, you use `RNLocation.requestPermission()` which, in this project, can be found in the [&lt;LocationAccessButton&gt; component](./app/components/LocationAccessButton.js#L21-L35) (or just read more about how it in the `RNLocation` docs).

For iOS, you also need to initialize `RNLocation` by calling `RNLocation.configure()` which, in this project, can be found in the [index.js](./index.js#L15-L33). In this case, you'll see that I left in the "Android Only" configuration options, even though this sample project actually uses it's own [Android Native Module](https://reactnative.dev/docs/native-modules-android) mentioned above. Any options within the `RNLocation.configure()` call will only effect iOS at this point. If you want to adjust the interval or anything on the Android side, you would need to make changes directly to the Android specific native module files.

Lastly, for this project, I chose to create a [reducer](./app/reducer.js) and a couple of [custom hooks](./app/hooks.js) to handle the location data and starting/stopping of the location tracking subscription. On iOS, the `useLocationTracking()` hook is used to start and stop `RNLocation.subscribeToLocationUpdates()`. On Android, the `useNativeLocationTracking()` hook is used to start and stop background tracking as well as creates a native event listener which listens for location events that are emitted by the Android Native Module. Both of these hooks then fire an `UpdatePosition` action to the reducer to handle the data provided by each and normalize them into a single usable format in the app.
