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
} from 'react-native';
import {RoundImageButton} from '../../common/components/RoundImageButton';
import {icons, markerDefaultGreen} from '../../common/constants';
import {Winery, WineryType} from '../../common/interfaces';
import {sendEmail} from '../../common/modules/email/sendEmail';
import {openLink} from '../../common/modules/linking';
import {IWineryDetailProps, linkProtocol} from './WineryDetails.interfaces';
import {wineryDetailsStyles} from './WineryDetails.styles';
import {wineryLogoDal} from './WineyDetails.dal';

const getWineryDescription = (type?: WineryType) => {
  return type
    ? type === 1
      ? 'Cantina'
      : type === 2
      ? 'Vignaiolo Itinerante'
      : type === 3
      ? 'Progetto enologico'
      : type === 6
      ? 'Cantina con posizione approssimativa'
      : 'Cantina'
    : 'Cantina';
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
    <View style={wineryDetailsStyles.page}>
      <Image
        style={{
          width: 30,
          height: 50,
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
            {wineryTypeDescr && (
              <Text style={{fontSize: 14}}>{wineryTypeDescr}</Text>
            )}
          </View>
          <View
            style={{
              height: 70,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <RoundImageButton
              borderRadius={30}
              image={icons.tel_popup}
              onPress={() =>
                winery.telephone && openLink(`tel:${winery.telephone}`)
              }
            />
            <RoundImageButton
              borderRadius={30}
              image={icons.mail_popup}
              onPress={() => winery.email && sendEmail(winery.email)}
            />
            <RoundImageButton
              borderRadius={30}
              image={icons.web_popup}
              onPress={() =>
                winery.webSite && openLink(correctWebsiteUrl(winery.webSite))
              }
            />
            <RoundImageButton
              borderRadius={30}
              image={icons.go_to_popup}
              onPress={openNavigatorMaps}
            />
          </View>
          <View style={{margin: 15}}>
            <Text style={wineryDetailsStyles.title_text}>{winery.name}</Text>
            {winery.vigneron && (
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
          <View style={wineryDetailsStyles.footer_text}>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>
              Contatta sempre in anticipo il Vignaiolo
            </Text>
            <Text style={{fontWeight: 'bold', fontSize: 16}}>
              per concordare la tua visita in cantina.
            </Text>
          </View>
        </View>
      )}
    </View>
  );
});
