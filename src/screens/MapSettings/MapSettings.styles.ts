import {StyleSheet} from 'react-native';

export const mapSettingsStyles = StyleSheet.create({
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
  },
  form_item_container_with_label_above: {
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
  },
  option_title_text: {
    marginBottom: 10,
    fontSize: 21,
    fontFamily: 'Novecentosanswide-Bold',
  },
  option_text_label: {
    fontSize: 17,
    fontFamily: 'Novecentosanswide-Normal',
    textAlignVertical: 'center',
    marginRight: 15,
  },
});
