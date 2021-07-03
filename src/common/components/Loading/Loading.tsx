import React from 'react';
import {ActivityIndicator, ActivityIndicatorProps} from 'react-native';
import {markerDefaultGreen} from '../../constants';

export function Loading(props: ActivityIndicatorProps) {
  const {size, color} = props;
  return (
    <ActivityIndicator
      {...props}
      size={size || 'large'}
      color={color || markerDefaultGreen}
    />
  );
}
