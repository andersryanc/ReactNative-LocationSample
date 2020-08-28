/**
 * @format
 * @flow
 */

import type { TimingState, TimingDispatch } from '../../types';

import React from 'react';
import Button from './Button';
import { Actions } from '../reducer';

type Props = {
  state: TimingState,
  dispatch: TimingDispatch,
};

const ToggleTrackingButton = ({ state, dispatch }: Props) => {
  if (state.running) {
    return (
      <Button
        title="Stop Location Tracking"
        disabled={!state.granted}
        onPress={() => dispatch({ type: Actions.Stop })}
        type="Error"
      />
    );
  }

  return (
    <Button
      title="Start Location Tracking"
      disabled={!state.granted}
      onPress={() => dispatch({ type: Actions.Start })}
    />
  );
};

export default ToggleTrackingButton;
