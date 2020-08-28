/**
 * @format
 */

import React from 'react';
import { AppRegistry, StatusBar, StyleSheet, View } from 'react-native';
import RNLocation from 'react-native-location';
import { name as appName } from './app.json';
import CurrentLocation from './app/components/CurrentLocation';
import LocationAccessButton from './app/components/LocationAccessButton';
import ToggleTrackingButton from './app/components/ToggleTrackingButton';
import { useLocation } from './app/hooks';
import { useTimingReducer } from './app/reducer';

RNLocation.configure({
  distanceFilter: 10, // Meters
  desiredAccuracy: {
    ios: 'best',
    android: 'highAccuracy',
  },
  // Android only
  // androidProvider: 'auto',
  interval: 1000, // Milliseconds
  fastestInterval: 3000, // Milliseconds
  maxWaitTime: 1000, // Milliseconds
  // iOS Only
  activityType: 'fitness',
  allowsBackgroundLocationUpdates: true,
  headingFilter: 0, // Degrees
  headingOrientation: 'portrait',
  pausesLocationUpdatesAutomatically: false,
  showsBackgroundLocationIndicator: true,
});

const App = () => {
  const [state, dispatch] = useTimingReducer();
  useLocation(state, dispatch);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <LocationAccessButton state={state} dispatch={dispatch} />
      <ToggleTrackingButton state={state} dispatch={dispatch} />

      <CurrentLocation state={state} dispatch={dispatch} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
});

AppRegistry.registerComponent(appName, () => App);
