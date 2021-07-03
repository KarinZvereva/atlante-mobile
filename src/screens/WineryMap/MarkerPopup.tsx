import React, {useState, useEffect} from 'react';
import {Winery} from '../../common/interfaces';
import {View, Text, Image} from 'react-native';
import {Loading} from '../../common/components/Loading';

export const MarkerPopup = React.memo(({winery}: {winery: Winery}) => {
  const [logo, setLogo] = useState<string>();

  useEffect(() => {}, []);

  return (
    <View style={{flexDirection: 'column'}}>
      <View style={{flexDirection: 'row'}}>
        <View style={{width: '50%'}}>
          {!logo && <Text>NO LOGO</Text>}
          {logo && (
            <Image
              source={{uri: logo}}
              style={{width: 120, height: 120, resizeMode: 'center'}}
            />
          )}
        </View>
        <View style={{width: '50%', flexDirection: 'column'}}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={require('../../assets/icon/tel_popup.png')}
              style={{width: 10, height: 10, margin: 20, resizeMode: 'center'}}
            />
            <Image
              source={require('../../assets/icon/mail_popup.png')}
              style={{width: 40, height: 40, margin: 20, resizeMode: 'center'}}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={require('../../assets/icon/web_popup.png')}
              style={{width: 40, height: 40, margin: 20, resizeMode: 'center'}}
            />
            <Image
              source={require('../../assets/icon/go_to_popup.png')}
              style={{width: 40, height: 40, margin: 20, resizeMode: 'center'}}
            />
          </View>
        </View>
      </View>
      <Text>{winery.name}</Text>
      <Text>{winery.vigneron}</Text>
      <Text>{winery.address}</Text>
      <Text>{winery.city}</Text>
      <Text>{winery.province}</Text>
      <Text>{winery.region}</Text>
    </View>
  );
});
