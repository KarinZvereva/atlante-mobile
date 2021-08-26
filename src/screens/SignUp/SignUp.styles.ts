import {StyleSheet} from 'react-native';
import {markerDefaultGreen} from '../../common/constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
    fontFamily: 'Novecentosanswide-Normal',
  },
  signUpBtn: {
    width: '40%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
    marginRight : 5,
  },
  undoBtn: {
    width: '40%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 0,
    marginLeft: 5,
  },
  loginText: {
    color: 'white',
    width: '100%',
    fontSize: 18,
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'Novecentosanswide-Normal',
  },
  loginBtnSubView:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  logo: {
    height: 80,
    width: 80,
    resizeMode: 'center',
    position: 'relative',
    marginBottom: 0,
  },
  image_container: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center',
  },
  input_container: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center',
    width: '100%',
    marginBottom : 80,
  },
  button_container: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  recaptcha_container: {
  },
});
