import {StyleSheet} from 'react-native';
import {markerDefaultGreen} from '../../common/constants';

export const styles = StyleSheet.create({
  page: {
    flex: 1,
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
    resizeMode: 'contain',
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
    marginTop: 20,
    color: '#4169e1',
  },
  facebook_text: {
    fontSize: 16,
    fontFamily: 'Novecentosanswide-Normal',
    textAlign: 'center',
    marginLeft: 20,
    marginRight: 20,
  },
  deleteFbBtn: {
    width: '60%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modifyBtn: {
    width: '40%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginRight : 5,
  },
  deleteBtn: {
    width: '40%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginLeft: 5,
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
  divider: {
    marginVertical: 10,
  },
  vertical_divider: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  vertical_divider_ios: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  pickers_style: {
    width: '90%',
    marginLeft: 10,
    color: 'white',
  },
  pickers_style_ios: {
    width: 150,
    color: 'white',
  },
  form_item_container_with_label_inline: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    height: 'auto',
    marginTop: 20,
    marginBottom: 20,
  },
  form_item_container_with_label_inline_ios: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    height: 150,
    marginTop: 20,
  },
  option_text_label: {
    fontSize: 17,
    fontFamily: 'Novecentosanswide-Normal',
    textAlignVertical: 'center',
  },
  option_text_label_ios: {
    fontSize: 17,
    fontFamily: 'Novecentosanswide-Normal',
    textAlignVertical: 'center',
    marginRight: 5, 
    marginLeft:0, 
    flex:0,
  },
  input_view_text: {
    backgroundColor: markerDefaultGreen,
    borderRadius: 30,
    width: '45%',
    alignItems: 'center',
    marginLeft: 22,
  },
  input_view_text_ios: {
    flex: 0,
    width: 150,
    marginLeft: 5,
  },
});