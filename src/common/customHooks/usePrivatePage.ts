import {useNavigation} from '@react-navigation/core';
import {useEffect} from 'react';
import {useAuth} from '.';

/**
 * usePrivatePage custom hook
 * When insert inside a component, automatically navigate to
 * login page when the user token is expired and not more
 * re-generable
 */
export function usePrivatePage() {
  /** Navigation */
  const navigation = useNavigation();

  /** Auth */
  const isLogged = useAuth();

  /** Effects */
  useEffect(() => {
    if (!isLogged) navigation.navigate('SignIn');
  }, [isLogged]);
}
