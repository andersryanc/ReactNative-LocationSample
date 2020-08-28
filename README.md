# ReactNative "Background" Location Tracking

### This is an example app which demonstrates "background" location tracking in both iOS and Android.

> I put "background" in quotes, because on Android it's actually using a "Foreground Service".

This project contains an [Android NativeModule](https://reactnative.dev/docs/native-modules-android) so you'll have to have your project "ejected" (if you started with Expo). If you started with the React Native CLI (via `react-native init`) you should be good to go.

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
