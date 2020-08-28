/**
 * @format
 * @flow
 */

import type { TimingState, TimingDispatch } from '../../types';

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  state: TimingState,
  dispatch: TimingDispatch,
};

const Stats = ({ state, dispatch }: Props) => {
  return (
    <View style={styles.container}>
      <Text>Running: {state.running ? 'Yes' : 'No'}</Text>
      <Text>Granted: {state.granted ? 'Yes' : 'No'}</Text>
      <Text>
        Current Location:{' '}
        {state.position ? JSON.stringify(state.position) : 'None'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
});

export default Stats;
