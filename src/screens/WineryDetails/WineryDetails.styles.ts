import {StyleSheet} from 'react-native';

export const wineryDetailsStyles = StyleSheet.create({
  page: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFF',
  },
  flex_container: {
    flex: 1,
  },
  centered_container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 280,
    height: 280,
  },
  logoImage: {width: 280, height: 280, justifyContent: 'center'},
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
});
