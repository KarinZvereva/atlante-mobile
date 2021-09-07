import {StyleSheet} from 'react-native';
import {markerDefaultGreen} from '../../common/constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFF',
  },
  profile_container: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  logo: {
    height: 80,
    width: 80,
    resizeMode: 'center',
    position: 'relative',
    marginTop: 40,
    marginBottom: 40,
  },
  title_text: {
    fontSize: 30,
    fontFamily: 'Novecentosanswide-Bold',
    marginTop: 0,
  },
  mail_text: {
    fontSize: 18,
    fontFamily: 'Novecentosanswide-Normal',
    marginTop: 40,
    color: '#4169e1',
  },
  facebook_text: {
    fontSize: 16,
    fontFamily: 'Novecentosanswide-Normal',
    textAlign: 'center',
    margin: 10,
  },
  modifyBtn: {
    width: '60%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    width: '100%',
    fontSize: 18,
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'Novecentosanswide-Normal',
  },
  modifyBtnSubView:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      height: '100%',
  },
  modify_profile_container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 20,
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
  button_container: {
    flex: 0,
    alignItems: 'center', 
    justifyContent: 'center',
    flexDirection: 'row',
  },
  saveBtn: {
    width: '40%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginRight : 5,
  },
  undoBtn: {
    width: '40%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginLeft: 5,
  },
  recaptcha_container: {
  },
});