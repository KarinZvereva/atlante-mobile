import {StyleSheet} from 'react-native';

export const homeStyles = StyleSheet.create({
  page: {
    flex: 1,
    flexDirection: 'column',
  },
  centered_container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 210,
    width: 210,
    resizeMode: 'center',
    position: 'absolute',
    top: 10,
  },
  title: {
    fontSize: 21,
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'Novecentosanswide-Normal',
  },
  goToWineriesText: {
    fontSize: 18,
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'Novecentosanswide-Normal',
    margin: 10,
  },
  keepInTouchText: {
    fontSize: 18,
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'Novecentosanswide-Normal',
    position: 'absolute',
    bottom: 70,
  },
  socialIcons: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
  },
});
