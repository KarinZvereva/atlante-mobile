import {StyleSheet} from 'react-native';

export const wineryDetailsStyles = StyleSheet.create({
  page: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFF',
    padding: 15,
  },
  flex_container: {
    flex: 1,
  },
  centered_container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  logoImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  title_text: {
    fontSize: 24,
    fontFamily: 'Novecentosanswide-Bold',
    marginBottom: 15,
  },
  subtitle_text: {
    fontSize: 21,
    fontFamily: 'Novecentosanswide-Bold',
    marginBottom: 10,
  },
  normal_text: {
    fontSize: 16,
    fontFamily: 'Novecentosanswide-Normal',
    marginBottom: 5,
  },
  footer_text: {
    width: '100%',
    position: 'absolute',
    bottom: 10,
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
  },
});
