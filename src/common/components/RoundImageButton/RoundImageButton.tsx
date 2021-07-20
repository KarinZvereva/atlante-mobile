import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {IRoundImageButtonProps} from './RoundImageButton.interfaces';

export const RoundImageButton = React.memo((props: IRoundImageButtonProps) => {
  const {onPress, image, borderRadius, style} = props;
  const dimension = borderRadius * 2;

  return (
    <TouchableOpacity
      style={[
        {
          height: dimension,
          width: dimension,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius,
        },
        style,
      ]}
      onPress={onPress}>
      <Image
        source={image}
        style={{
          height: dimension,
          width: dimension,
          resizeMode: 'center',
        }}
      />
    </TouchableOpacity>
  );
});
