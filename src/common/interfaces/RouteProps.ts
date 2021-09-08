import {RouteProp} from '@react-navigation/native';

export interface IRouteProps<T extends object = any> {
  route: RouteProp<Record<string, T>, 'WineryDetails'>;
  navigation: any;
}
