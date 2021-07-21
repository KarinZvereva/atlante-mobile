import {RouteProp} from '@react-navigation/native';

export interface IBaseRouteNavigationProps<T extends object = any> {
  route: RouteProp<Record<string, T>, 'WineryDetails'>;
  navigation: any;
}
