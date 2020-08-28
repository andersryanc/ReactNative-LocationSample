/**
 * @format
 * @flow
 */

import type { TimingAction, TimingDispatch, TimingState } from './types';

import { useReducer } from 'react';

export const Actions = {
  Start: 'Start',
  Stop: 'Stop',
  LocationRequested: 'LocationRequested',
  UpdatePosition: 'UpdatePosition',
};

export const initialState: TimingState = {
  // granted: undefined,
  position: null,
  running: false,
};

export const getInitialState = (): TimingState => {
  return { ...initialState };
};

export const reducer = (
  state: TimingState,
  action: TimingAction
): TimingState => {
  switch (action.type) {
    case Actions.Start:
      return {
        ...state,
        running: true,
        position: null,
      };

    case Actions.Stop:
      return {
        ...state,
        running: false,
      };

    case Actions.LocationRequested:
      return {
        ...state,
        granted: !!action.granted,
      };

    case Actions.UpdatePosition:
      return {
        ...state,
        position: {
          accuracy: action.position.accuracy,
          lat: action.position.lat,
          lng: action.position.lng,
          timestamp: action.position.timestamp,
        },
      };

    default:
      return state;
  }
};

export const useTimingReducer = (): [TimingState, TimingDispatch] => {
  return useReducer<TimingState, TimingAction>(reducer, null, () =>
    getInitialState()
  );
};
