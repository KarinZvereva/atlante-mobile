import {StyleSheet} from 'react-native';
import {markerDefaultGreen} from '../../common/constants';

export const mapFiltersStyles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#FFF',
  },
  scroll_container: {
    flex: 1,
    marginHorizontal: 10,
  },
  option_container: {
    width: '100%',
    flexDirection: 'column',
    padding: 15,
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
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    height: 'auto',
  },
  vertical_divider: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  form_item_container_with_label_above: {
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
  },
  option_title_text: {
    fontSize: 21,
    fontFamily: 'Novecentosanswide-Bold',
  },
  option_text_label: {
    fontSize: 17,
    fontFamily: 'Novecentosanswide-Normal',
    textAlignVertical: 'center',
    position: 'absolute',
    left: 0,
  },
  input_view_text: {
    backgroundColor: markerDefaultGreen,
    borderRadius: 30,
    width: '70%',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
  },
  input_view_text_ios: {
    width: '90%',
  },
  input_view: {
    width: '70%',
    alignItems: 'center',
    alignContent: 'center',
    position: 'absolute',
    right: 0,
  },
  text_input: {
    color: 'white',
    textAlign: 'center',
    flex: 1,
  },
  button_container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '100%',
    height: 150,
  },
  saveBtn: {
    width: '80%',
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
  modifyBtnSubView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },
  pickers_style: {
    width: '95%',
    marginLeft: 10,
    color: 'white',
  },
  pickers_style_ios: {
    width: '75%',
    marginLeft: 10,
    color: 'white',
    left: 95,
  },
  pickers_item_style: {
    fontSize: 16,
    fontFamily: 'Novecentosanswide-Normal',
    height: 130,
  },
  logo: {
    width: 40,
    height: 60,
    resizeMode: 'contain',
    position: 'relative',
    alignSelf: 'center',
    marginTop: 15,
    marginRight: 15,
    marginBottom: 15,
  },
  service_switch_ios: {
    transform:  [{ scaleX: 0.8 }, { scaleY: 0.8 }] ,
    marginRight: 5,
  },
});
