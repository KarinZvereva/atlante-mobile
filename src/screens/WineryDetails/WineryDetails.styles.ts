import {StyleSheet} from 'react-native';

export const wineryDetailsStyles = StyleSheet.create({
  page: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFF',
    padding: 15,
  },
  scroll_container: {
    flex: 1,
    width: '100%',
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
  logo_marker: {
    width: 40,
    height: 60,
    resizeMode: 'contain',
    position: 'absolute',
    top: 15,
    right: 15,
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
    marginTop: 60,
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
  wrong_position_container: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'flex-start',
    borderRadius: 20,
    backgroundColor: '#981731',
    padding: 8,
    marginLeft: 10,
    width: '50%',
  },
  extra_service_container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 10,
  },
});
