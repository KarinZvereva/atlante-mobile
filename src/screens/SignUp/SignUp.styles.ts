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
    //fontFamily: 'Novecentosanswide-Normal',
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
    resizeMode: 'contain',
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
  acceptanceSwitch_ios: {
    position: 'relative',
    top: 0,
    right: 0,
    transform:  [{ scaleX: 0.8 }, { scaleY: 0.8 }] ,
    marginRight: 5,
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

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.4)'
  },
  modalView: {
    flex: 0,
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    borderColor: markerDefaultGreen,
    borderWidth: 2, 
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 8
  },
  summary_container: {
    flex: 0,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: 25,
    marginBottom: 25,
  },
  bottom_container: {
    justifyContent: "center",
    alignSelf: 'center',
    marginTop: 25,
    marginBottom: 5,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  headerModalText: {
    marginBottom: 15,
    fontSize: 12,
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'Novecentosanswide-Bold',
  },
  modalText: {
    marginBottom: 15,
    fontSize: 12,
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'Novecentosanswide-Normal',
  },
  modal_warning_text: {
    marginBottom: 15,
    fontSize: 12,
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'Novecentosanswide-Bold',
    color : 'red',
  },
  field_container: {
    flex: 0,
    flexDirection: 'row',
  },
  header_field_container: {
    flex: 1,
    alignItems: 'flex-end', 
  },
  value_field_container: {
    flex: 1,
    alignItems: 'flex-start', 
  },
  button_modal_container: {
    flex: 0,
    alignItems: 'center', 
    flexDirection: 'row',
    width: '100%',
  },
});
