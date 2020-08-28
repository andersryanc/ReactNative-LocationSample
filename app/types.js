/**
 * @format
 * @flow
 */

export type AppState = 'active' | 'background' | 'inactive';

export type Location = {
  // From Geolocation
  accuracy: number,
  altitude: number,
  altitudeAccuracy: number,
  course: number,
  floor: number,
  latitude: number,
  longitude: number,
  speed: number,
  timestamp: number,
};

export type Position = {
  accuracy: number,
  lat: number,
  lng: number,
  timestamp: number,
};

export type TimingState = {
  granted?: boolean,
  position: Position,
  running: boolean,
};

export type TimingActionType =
  | 'Start'
  | 'Stop'
  | 'LocationRequested'
  | 'UpdatePosition';

export type TimingAction = {
  type: TimingActionType,
  position?: Position,
  granted?: boolean,
};

export type TimingDispatch = (action: TimingAction) => void;
