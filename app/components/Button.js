/**
 * @format
 * @flow
 */

import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type ButtonType = 'Primary' | 'Secondary' | 'Error' | 'Success' | 'Info';

type Props = {
  title: string,
  type: ButtonType,
  onPress?: () => void | Promise<void>,
  disabled?: boolean,
};

const validType = type =>
  ['Primary', 'Secondary', 'Error', 'Success', 'Info'].indexOf(type) > -1;

const Button = ({ title, type, onPress, disabled }: Props) => (
  <TouchableOpacity
    style={[
      styles.button,
      validType(type) ? styles[`button${type}`] : undefined,
      disabled ? styles.buttonDisabled : null,
    ]}
    onPress={onPress}
    disabled={disabled}
  >
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const Colors = {
  primary: '#FF5E3A',
  secondary: '#6D819C',
  red: '#f00',
  green: '#599e37',
  blue: '#0079c1',
  white: '#FFF',
};

const styles = StyleSheet.create({
  button: {
    height: 40,
    marginTop: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: Colors.primary,
  },
  buttonPrimary: {
    backgroundColor: Colors.primary,
  },
  buttonSecondary: {
    backgroundColor: Colors.secondary,
  },
  buttonError: {
    backgroundColor: Colors.red,
  },
  buttonSuccess: {
    backgroundColor: Colors.green,
  },
  buttonInfo: {
    backgroundColor: Colors.blue,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: Colors.white,
    fontWeight: '700',
  },
});

Button.defaultProps = {
  type: 'Primary',
};

export default Button;
