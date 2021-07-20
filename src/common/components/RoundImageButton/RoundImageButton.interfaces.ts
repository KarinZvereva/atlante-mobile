import {GestureResponderEvent, StyleProp, ViewStyle} from 'react-native';

export interface IRoundImageButtonProps {
  onPress?: (event: GestureResponderEvent) => void;
  image: any;
  borderRadius: number;
  style?: StyleProp<ViewStyle>;
}
