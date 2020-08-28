/**
 * @format
 * @flow
 */

import type { TimingState, TimingDispatch } from '../../types';

import React from 'react';
import { useLocationTracking } from '../../hooks';
import Stats from './Stats';

type Props = {
  state: TimingState,
  dispatch: TimingDispatch,
};

const CurrentLocation = ({ state, dispatch }: Props) => {
  useLocationTracking(state, dispatch);
  return <Stats state={state} />;
};

export default CurrentLocation;
