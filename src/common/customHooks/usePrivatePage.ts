import {useNavigation} from '@react-navigation/core';
import {useEffect} from 'react';
import {useAuth} from '.';

export function usePrivateScreen() {
  /** Navigation */
  const navigation = useNavigation();

  /** Auth */
  const isLogged = useAuth();

  /** Effects */
  useEffect(() => {
    if (!isLogged) navigation.navigate('SignIn');
  }, [isLogged]);
}
