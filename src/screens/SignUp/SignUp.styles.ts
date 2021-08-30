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
    marginBottom: 10,
    alignItems: 'center',
  },
  TextInput: {
    color: 'white',
    textAlign: 'center',
    flex: 1,
    fontFamily: 'Novecentosanswide-Normal',
    width: '100%',
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
    flex: 0,
    alignItems: 'center', 
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  input_container: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center',
    width: '100%',
    marginBottom : 80,
  },
  button_container: {
    flex: 0,
    alignItems: 'center', 
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
    marginBottom: 40,
  },
  recaptcha_container: {
  },
  page: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFF',
  },
  scroll_container: {
    flex: 1,
    marginHorizontal: 5,
    width: '100%'
  },
  acceptance_container: {
    flex: 0,
    alignItems: 'center', 
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
    marginBottom: 20,
    marginStart: 0,
  },
  acceptanceText_container: {
    flex: 0,
    alignItems: 'center', 
    justifyContent: 'center',
    flexDirection: 'row',
    marginStart: 10,
  },
  acceptanceSwitch: {
    position: 'relative',
    top: 0,
    right: 0,
  },
  acceptanceText: {
    fontSize: 10,
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'Novecentosanswide-Normal',
  },
  acceptanceLinkText: {
    fontSize: 10,
    color: '#2980b9',
    textDecorationLine: 'underline',
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'Novecentosanswide-Normal',
  },
});
