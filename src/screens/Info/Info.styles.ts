import {StyleSheet} from 'react-native';
import {markerDefaultGreen} from '../../common/constants';

export const styles = StyleSheet.create({
  page: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFF',
  },
  scroll_container: {
    flex: 1,
    marginHorizontal: 10,
  },
  centered_container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  summary_container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  scrollview: {
    flexGrow: 1,
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
  infoText: {
    fontSize: 16,
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'Novecentosanswide-Normal',
  },
  summaryTitleText: {
    fontSize: 16,
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'Novecentosanswide-Normal',
  },
  summaryLabelText: {
    fontSize: 16,
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'Novecentosanswide-Normal',
  },
  summaryCountText: {
    fontSize: 16,
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'Novecentosanswide-Normal',
  },
  option_container: {
    width: '100%',
    flexDirection: 'column',
    padding: 15,
  },
  option_title_text: {
    fontSize: 21,
    fontFamily: 'Novecentosanswide-Bold',
  },
  vertical_divider: {
    paddingTop: 20,
    paddingBottom: 20,
  },
  vertical_divider_ios: {
    paddingTop: 10,
    paddingBottom: 10,
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
    width: '60%',
    alignItems: 'center',
    position: 'absolute',
    right: 42,
  },
  input_view_text_ios: {
    width: '90%',
  },
  pickers_style: {
    width: '95%',
    marginLeft: 10,
    color: 'white',
  },
  pickers_style_ios: {
    width: '65%',
    marginLeft: 10,
    color: 'white',
    left: 75,
  },
  pickers_item_style: {
    fontSize: 16,
    fontFamily: 'Novecentosanswide-Normal',
    height: 130,
  },
  count_text_label: {
    fontSize: 19,
    fontFamily: 'Novecentosanswide-Bold',
    textAlignVertical: 'center',
    position: 'absolute',
    right: 5,
  },
});
