/**
 * @format
 * @flow
 */

import type { TimingState, TimingDispatch } from '../../types';

import React from 'react';
import { useNativeLocationTracking } from '../../hooks';
import Stats from './Stats';

type Props = {
  state: TimingState,
  dispatch: TimingDispatch,
};

const CurrentLocation = ({ state, dispatch }: Props) => {
  useNativeLocationTracking(state, dispatch);
  return <Stats state={state} />;
};

export default CurrentLocation;
