import {StyleSheet} from 'react-native';
import {markerDefaultGreen} from '../../common/constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 135,
    width: 135,
    resizeMode: 'contain',
    marginBottom: 75,
  },
  inputView: {
    backgroundColor: markerDefaultGreen,
    borderRadius: 30,
    width: '70%',
    height: 45,
    marginBottom: 20,
    alignItems: 'center',
  },
  TextInput: {
    color: 'white',
    textAlign: 'center',
    flex: 1,
    //fontFamily: 'Novecentosanswide-Normal',
  },
  forgot_button: {
    height: 35,
    borderRadius: 30,
    width: '70%',
    alignItems: 'center',
    fontFamily: 'Novecentosanswide-Normal',
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
  linkText: {
    flex: 1,
    textAlign: 'center',
    color: '#2191b0',
    fontFamily: 'Novecentosanswide-Normal',
    fontSize: 12,
  },
  loginBtnSubView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },
  remember_container: {
    flex: 0,
    alignItems: 'center', 
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
    marginBottom: 20,
    marginStart: 0,
  },
  rememberSwitch: {
    position: 'relative',
    top: 0,
    right: 0,
  },
  rememberText: {
    fontSize: 12,
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'Novecentosanswide-Normal',
  },

});
