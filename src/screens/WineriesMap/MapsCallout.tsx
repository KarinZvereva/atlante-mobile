import React from 'react';
import {FC} from 'react';
import {StyleSheet, View} from 'react-native';

const MapsCalloutStyles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
  },
  bubble: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    backgroundColor: '#fefefe',
    paddingHorizontal: 2,
    paddingVertical: 2,
    borderRadius: 6,
    borderColor: '#000000',
    borderWidth: 0.5,
  },
  amount: {
    flex: 1,
  },
  arrow: {
    backgroundColor: 'transparent',
    borderWidth: 8,
    borderColor: 'transparent',
    borderTopColor: '#fefefe',
    alignSelf: 'center',
  },
});

export const MapsCallout: FC<any> = (props: any) => {
  return (
    <View style={[MapsCalloutStyles.container, props.style]}>
      <View style={MapsCalloutStyles.bubble}>
        <View style={MapsCalloutStyles.amount}>{props.children}</View>
      </View>
      <View style={MapsCalloutStyles.arrow} />
    </View>
  );
};
