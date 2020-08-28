/**
 * @format
 * @flow
 */

import type { TimingState, TimingDispatch } from '../../types';

import React from 'react';
import { Linking } from 'react-native';
import RNLocation from 'react-native-location';
import Button from './Button';
import { Actions } from '../reducer';

type Props = {
  state: TimingState,
  dispatch: TimingDispatch,
};

const LocationAccessButton = ({ state, dispatch }: Props) => {
  const requestPermission = () => {
    RNLocation.requestPermission({
      ios: 'always', // or 'whenInUse'
      android: {
        detail: 'fine', // or 'coarse'
        rationale: {
          title: 'We need to access your location',
          message:
            'We use your location while your run to calculate your distance and pace',
          buttonPositive: 'OK',
          buttonNegative: 'Cancel',
        },
      },
    }).then(granted => {
      dispatch({ type: Actions.LocationRequested, granted });
    });
  };

  switch (state.granted) {
    case true:
      return (
        <Button
          title="Location Access Granted"
          type="Success"
          onPress={() => Linking.openSettings()}
        />
      );

    case false:
      return (
        <Button
          title="Location Access Denied"
          type="Error"
          onPress={() => Linking.openSettings()}
        />
      );

    default:
      return (
        <Button
          title="Request Location Permissions"
          onPress={requestPermission}
        />
      );
  }
};

export default LocationAccessButton;
