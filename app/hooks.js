/**
 * @format
 * @flow
 */

import type {
  AppState as AppStateType,
  Location,
  TimingDispatch,
  TimingState,
} from './types';

import { useEffect } from 'react';
import { AppState, DeviceEventEmitter, NativeModules } from 'react-native';
import RNLocation from 'react-native-location';
import { Actions } from './reducer';

export const useLocation = (state: TimingState, dispatch: TimingDispatch) => {
  return useEffect(() => {
    const checkPermission = () => {
      RNLocation.getCurrentPermission().then(currentPermission => {
        if (currentPermission === 'notDetermined') {
          return;
        }

        const granted =
          currentPermission !== 'denied' && currentPermission !== 'restricted';
        dispatch({ type: Actions.LocationRequested, granted });
      });
    };

    if (typeof state.granted === 'undefined') {
      checkPermission();
    }

    const handleAppStateChange = (nextAppState: AppStateType) => {
      if (nextAppState === 'active') {
        checkPermission();
      }
    };

    AppState.addEventListener('change', handleAppStateChange);

    return () => {
      AppState.removeEventListener('change', handleAppStateChange);
    };
  }, [dispatch, state.granted]);
};

type NativeLocationEvent = {
  latitude: number,
  longitude: number,
  timestamp: number,
};

export const useNativeLocationTracking = (
  state: TimingState,
  dispatch: TimingDispatch
) => {
  return useEffect(() => {
    let subscription;
    if (!state.running) {
      NativeModules.LocationManager.stopBackgroundLocation();
      typeof subscription !== 'undefined' && subscription.remove();
      return;
    }

    if (state.granted) {
      subscription = DeviceEventEmitter.addListener(
        NativeModules.LocationManager.JS_LOCATION_EVENT_NAME,
        (e: NativeLocationEvent) => {
          // console.log('Received Location Event:', e);
          dispatch({
            type: Actions.UpdatePosition,
            position: {
              accuracy: 10,
              lat: e.latitude,
              lng: e.longitude,
              timestamp: e.timestamp,
            },
          });
        }
      );

      NativeModules.LocationManager.startBackgroundLocation();
    }

    return () => {
      NativeModules.LocationManager.stopBackgroundLocation();
      typeof subscription !== 'undefined' && subscription.remove();
    };
  }, [state.granted, state.running, dispatch]);
};

export const useLocationTracking = (
  state: TimingState,
  dispatch: TimingDispatch
) => {
  return useEffect(() => {
    let unsubscribe;
    if (!state.running) {
      typeof unsubscribe !== 'undefined' && unsubscribe();
      return;
    }

    if (state.granted) {
      unsubscribe = RNLocation.subscribeToLocationUpdates(
        (locations: Location[]) => {
          locations.forEach(l => {
            // console.log('Received Location:', l);
            dispatch({
              type: Actions.UpdatePosition,
              position: {
                accuracy: l.accuracy,
                lat: l.latitude,
                lng: l.longitude,
                timestamp: l.timestamp,
              },
            });
          });
        }
      );
    }

    return () => {
      typeof unsubscribe !== 'undefined' && unsubscribe();
    };
  }, [state.granted, state.running, dispatch]);
};
