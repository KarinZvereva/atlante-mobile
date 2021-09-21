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
    width: 210,
    height: 210,
    marginBottom: 5,
  },
  logoImage: {
    width: 210,
    height: 210,
    resizeMode: 'contain',
  },
  title_text: {
    fontSize: 24,
    fontFamily: 'Novecentosanswide-Bold',
    marginBottom: 15,
  },
  subtitle_text: {
    fontSize: 21,
    fontFamily: 'Novecentosanswide-Normal',
    marginBottom: 10,
  },
  normal_text: {
    fontSize: 16,
    fontFamily: 'Novecentosanswide-Normal',
    marginBottom: 5,
  },
  small_text: {fontSize: 11, fontFamily: 'Novecentosanswide-Normal'},
  footer: {
    width: '100%',
    position: 'absolute',
    bottom: 10,
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
  },
  footer_text: {
    fontSize: 16,
    fontFamily: 'Novecentosanswide-Bold',
  },
  wrong_position_text: {
    fontSize: 12,
    fontFamily: 'Novecentosanswide-Bold',
    color: 'white',
  },
  winery_type_text: {fontSize: 18, fontFamily: 'Novecentosanswide-Bold'},
});
