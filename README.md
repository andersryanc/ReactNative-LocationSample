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
