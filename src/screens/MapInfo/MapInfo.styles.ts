import {Dimensions, StyleSheet} from 'react-native';

const {height: screenHeight} = Dimensions.get('window');

export const mapsInfoStyles = StyleSheet.create({
  page: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFF',
    padding: 15,
  },
  logo: {
    width: 40,
    height: 60,
    resizeMode: 'contain',
    position: 'absolute',
    top: 0,
  },
  scrollview: {
    flexGrow: 1,
  },
  scroll_container: {
    flex: 1,
    marginHorizontal: 10,
    width: '100%',
  },
  centered_container: {
    flex: 1,
    top: 80,
    width: '100%',
    alignContent: 'center',
    alignItems: 'center',
    minHeight: screenHeight - 80,
  },
  info_row: {
    flexDirection: 'row',
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
  horizontal_divider_5: {
    marginHorizontal: 5,
  },
  info_row_text: {
    width: '100%',
    paddingRight: 25,
    textAlignVertical: 'center',
    fontFamily: 'Novecentosanswide-Normal',
  },
  vertical_divider_10: {
    marginVertical: 10,
  },
  search_text: {
    fontSize: 13,
    fontFamily: 'Novecentosanswide-Bold',
    marginTop: 10,
    paddingRight: 25,
    alignSelf: 'center',
    textAlign: 'center',
    alignContent: 'center',
  },
});
