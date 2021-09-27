import {StyleSheet} from 'react-native';
import {markerDefaultGreen} from '../../common/constants';

export const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#FFF',
  },
  scroll_container: {
    flex : 1,
    marginHorizontal: 10,
    width: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    marginBottom: 80,
    height: 280,
    width: 280,
    resizeMode: 'contain',
  },
  inputView: {
    backgroundColor: markerDefaultGreen,
    borderRadius: 30,
    width: '70%',
    height: 45,
    marginBottom: 20,
    alignItems: 'center',
  },
  loginBtn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
  },
  loginText: {
    color: 'white',
    width: '100%',
    fontSize: 18,
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'Novecentosanswide-Normal',
  },
  loginBtnSubView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },
  loginFbBtn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
  },
  separatorText: {
    color: 'black',
    width: '100%',
    fontSize: 14,
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'Novecentosanswide-Normal',
    marginTop: 20,
    marginBottom: 20,
  },
});
