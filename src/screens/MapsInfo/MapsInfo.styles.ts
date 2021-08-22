import {StyleSheet} from 'react-native';

export const mapsInfoStyles = StyleSheet.create({
  page: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFF',
    padding: 15,
  },
  logo: {
    height: 80,
    width: 80,
    resizeMode: 'center',
    position: 'absolute',
    top: 0,
  },
  centered_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  info_row: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginHorizontal: 25,
    marginVertical: 10,
    fontSize: 13,
  },
  info_image: {
    width: 40,
    height: 40,
    borderRadius: 30,
    resizeMode: 'contain',
  },
  divider: {
    marginHorizontal: 5,
  },
  info_row_text: {
    width: '100%',
    textAlignVertical: 'center',
    fontFamily: 'Novecentosanswide-Normal',
  },
  bottom_text: {
    fontSize: 14,
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
    textAlign: 'center',
    alignContent: 'center',
    fontFamily: 'Novecentosanswide-Bold',
  },
  search_text: {
    fontSize: 14,
    fontFamily: 'Novecentosanswide-Bold',
    marginTop: 10,
    alignSelf: 'center',
    textAlign: 'center',
    alignContent: 'center',
  },
});
