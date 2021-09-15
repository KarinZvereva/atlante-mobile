import React from 'react';
import {useCallback} from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {
  Alert,
  ActivityIndicator,
  Image,
  Text,
  View,
  Platform,
  SafeAreaView,
} from 'react-native';
import {RoundImageButton} from '../../common/components/RoundImageButton';
import {ExtraServices, icons, markerDefaultGreen} from '../../common/constants';
import {Winery, WineryType} from '../../common/interfaces';
import {sendEmail} from '../../common/modules/email/sendEmail';
import {openLink} from '../../common/modules/linking';
import {IWineryDetailProps, linkProtocol} from './WineryDetails.interfaces';
import {wineryDetailsStyles} from './WineryDetails.styles';
import {wineryLogoDal} from './WineyDetails.dal';

const getWineryDescription = (type?: WineryType) => {
  const defaultDescription = 'Cantina';
  return type
    ? type === 1
      ? 'Cantina'
      : type === 2
      ? 'Vignaiolo Itinerante'
      : type === 3
      ? 'Progetto enologico'
      : type === 6
      ? 'Cantina'
      : defaultDescription
    : defaultDescription;
};

export const WineryDetail = React.memo((props: IWineryDetailProps) => {
  const {winery: wineryProps} = props.route.params || {};
  const [winery, setWinery] = useState<Winery>(props.route.params?.winery);
  const [logo, setLogo] = useState<string | null | undefined>(winery.logo);
  const [loading, setLoading] = useState<boolean>(true);
  const [wineryTypeDescr, setWineryTypeDescr] = useState<string>(
    getWineryDescription(winery.type),
  );

  useEffect(() => {
    if (wineryProps) setWinery(wineryProps);
  }, [wineryProps]);

  useEffect(() => {
    setWineryTypeDescr(getWineryDescription(winery.type));
  }, [winery.type]);

  useEffect(() => {
    if (winery.logo) {
      setLogo(winery.logo);
      return;
    }

    setLoading(true);
    wineryLogoDal
      .getById(winery._id)
      .then((result) => {
        if (result && result.data) {
          setLogo(result.data.logo);
          setLoading(false);
        } else if (result && result.error) {
          Alert.alert(`${JSON.stringify(result.error)}`);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error(JSON.stringify(err));
        setLoading(false);
      });
  }, [winery]);

  const openNavigatorMaps = useCallback(() => {
    const scheme = Platform.select({
      ios: 'maps:0,0?q=',
      android: 'geo:0,0?q=',
    });

    const latLng = `${winery.location?.latitude},${winery.location?.longitude}`;
    const label = `${winery.name}`;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    url && openLink(url);
  }, [winery]);

  const correctWebsiteUrl = (url: string, protocol: linkProtocol = 'https') => {
    if (url.startsWith('http') || url.startsWith('https')) return url;
    return `${protocol}://${url}`;
  };

  return (
    <SafeAreaView style={wineryDetailsStyles.page}>
      <Image
        style={{
          width: 40,
          height: 60,
          resizeMode: 'contain',
          position: 'absolute',
          top: 15,
          right: 15,
        }}
        source={icons.winery_marker_big}
      />
      {loading && (
        <View
          style={[
            wineryDetailsStyles.flex_container,
            wineryDetailsStyles.centered_container,
          ]}>
          <ActivityIndicator size="large" color={markerDefaultGreen} />
        </View>
      )}
      {!loading && winery && logo && (
        <View style={wineryDetailsStyles.flex_container}>
          <View style={wineryDetailsStyles.centered_container}>
            <View style={wineryDetailsStyles.logo}>
              <Image
                source={{uri: logo}}
                style={wineryDetailsStyles.logoImage}
              />
            </View>
            <View>
              <Text style={wineryDetailsStyles.winery_type_text}>
                {wineryTypeDescr}
              </Text>
            </View>
          </View>
          <View
            style={{
              height: 70,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <RoundImageButton
                borderRadius={30}
                image={
                  winery.telephone && winery.telephone !== ''
                    ? icons.tel_popup
                    : icons.tel_popup_bn
                }
                onPress={() =>
                  winery.telephone &&
                  winery.telephone !== '' &&
                  openLink(`tel:${winery.telephone}`)
                }
              />
              <Text style={wineryDetailsStyles.small_text}>
                {winery.telephone && winery.telephone !== '' ? 'Chiama' : '---'}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <RoundImageButton
                borderRadius={30}
                image={
                  winery.email && winery.email !== ''
                    ? icons.mail_popup
                    : icons.mail_popup_bn
                }
                onPress={() =>
                  winery.email && winery.email !== '' && sendEmail(winery.email)
                }
              />
              <Text style={wineryDetailsStyles.small_text}>
                {winery.email && winery.email !== '' ? 'Scrivi' : '---'}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <RoundImageButton
                borderRadius={30}
                image={
                  winery.webSite && winery.webSite !== ''
                    ? icons.web_popup
                    : icons.web_popup_BN
                }
                onPress={() =>
                  winery.webSite &&
                  winery.webSite !== '' &&
                  openLink(correctWebsiteUrl(winery.webSite))
                }
              />
              <Text style={wineryDetailsStyles.small_text}>
                {winery.webSite && winery.webSite !== '' ? 'Web' : '---'}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <RoundImageButton
                borderRadius={30}
                image={icons.go_to_popup}
                onPress={openNavigatorMaps}
              />
              <Text style={wineryDetailsStyles.small_text}>Indicazioni</Text>
            </View>
          </View>
          <View style={{margin: 15}}>
            <Text style={wineryDetailsStyles.title_text}>{winery.name}</Text>
            {winery.vigneron && winery.vigneron !== 'Vigneron' && (
              <Text style={wineryDetailsStyles.subtitle_text}>
                {winery.vigneron}
              </Text>
            )}
            <Text style={wineryDetailsStyles.normal_text}>
              {winery.address}
            </Text>
            <Text style={wineryDetailsStyles.normal_text}>{winery.city}</Text>
            <Text style={wineryDetailsStyles.normal_text}>
              {winery.province}
            </Text>
            <Text style={wineryDetailsStyles.normal_text}>{winery.region}</Text>
          </View>
          {winery.type === WineryType.Wrong_Position && (
            <View>
              <Text style={wineryDetailsStyles.footer_text}>
                Geolocalizzazione approssimativa
              </Text>
            </View>
          )}
          {winery.services !== undefined && (
            <View
              style={{
                flexDirection: 'row',
                position: 'absolute',
                bottom: 70,
                right: 10,
                alignContent: 'flex-start',
                alignItems: 'flex-start',
              }}>
              {(winery.services & ExtraServices.BnB) > 0 && (
                <Image
                  style={{height: 60, width: 60, resizeMode: 'contain'}}
                  source={icons.cantina_b_b}
                />
              )}
              {(winery.services & ExtraServices.Restaurant) > 0 && (
                <Image
                  style={{height: 60, width: 60, resizeMode: 'contain'}}
                  source={icons.cantina_ristoro}
                />
              )}
            </View>
          )}
          <View style={wineryDetailsStyles.footer}>
            <Text style={wineryDetailsStyles.footer_text}>
              Contatta sempre in anticipo il Vignaiolo
            </Text>
            <Text style={wineryDetailsStyles.footer_text}>
              per concordare la tua visita in cantina.
            </Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
});
