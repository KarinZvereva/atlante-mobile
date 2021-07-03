import React from 'react';
import {Winery} from '../../common/interfaces';
import {View, Text} from 'react-native';

export const MarkerPopup = React.memo(({winery}: {winery: Winery}) => {
  return (
    <View>
      <Text>{winery.name}</Text>
      <Text>{winery.vigneron}</Text>
      <Text>{winery.address}</Text>
      <Text>{winery.city}</Text>
      <Text>{winery.province}</Text>
      <Text>{winery.region}</Text>
    </View>
  );
});
