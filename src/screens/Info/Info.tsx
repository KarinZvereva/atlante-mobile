import React from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {Header} from '../../common/components/Header/Header';
import {images, markerDefaultGreen} from '../../common/constants';
import {styles} from './Info.styles';
import {useState, useEffect} from 'react';
import {infoCountCall} from './Info.dal';
import {remotePickerBuilder} from '../../common/hoc/pickerFactory/pickerFactory';
import {provinceDal, regionDal} from '../MapFilters/MapFilters.dal';
import {getVersion, getBuildNumber} from 'react-native-device-info';

const ProvincePicker = remotePickerBuilder(provinceDal);
const RegionPicker = remotePickerBuilder(regionDal);

export function Info(props: any) {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [countGlobal, setGlobalCount] = useState<number>();
  const [countRegion, setRegionCount] = useState<number>();
  const [countProvince, setProvinceCount] = useState<number>();
  const [version, setVersion] = useState<string>();
  const [buildNumber, setBuildNumber] = useState<string>();

  // State
  const [_province, setProvince] = useState<string>();
  const [_region, setRegion] = useState<string>();
  const [regionDisabled, setRegionDisabled] = useState(false);

  enum CountType {
    Global = 1,
    Region,
    Province,
  }

  const loadCount = (countType: CountType, data: string | undefined) => {
    setError('');
    setIsError(false);

    var region = undefined;
    var province = undefined;

    switch (countType) {
      case CountType.Region:
        region = data;
        break;
      case CountType.Province:
        province = data;
        break;
      default:
        break;
    }

    infoCountCall
      .count({region, province})
      .then((result) => {
        if (result) {
          switch (countType) {
            case CountType.Region:
              setRegionCount(result?.value);
              setProvinceCount(undefined);
              break;
            case CountType.Province:
              setProvinceCount(result?.value);
              break;
            default:
              setGlobalCount(result?.value);
              break;
          }
        }
      })
      .catch((err) => {
        console.log(JSON.stringify(err));
        setError(JSON.stringify(err));
        setIsError(true);
      });
  };

  // Effects
  useEffect(() => {
    loadCount(CountType.Global, undefined);
  });

  useEffect(() => {
    setVersion(getVersion());
    setBuildNumber(getBuildNumber());
  }, []);

  return (
    <SafeAreaView style={styles.page}>
      {!isLoading && (
        <>
          <Header {...props} showName="Il Progetto NaTourWine" />
          <ScrollView style={styles.scroll_container}>
            <View style={styles.centered_container}>
              <Image source={images.logo_calice} style={styles.logo} />
              <Text style={[styles.infoText]}>
                Il contenuto di questa app è frutto
              </Text>
              <Text style={[styles.infoText]}>
                del lavoro di bevitori appassionati
              </Text>
              <Text style={[styles.infoText, {marginBottom: 10}]}>
                di Vino Naturale.
              </Text>
              <Text style={[styles.infoText]}>
                La lista delle cantine è stata in larga parte
              </Text>
              <Text style={[styles.infoText]}>
                ottenuta grazie al contributo degli utenti
              </Text>
              <Text style={[styles.infoText, {marginBottom: 10}]}>
                del gruppo Facebook Be.Vi.Amo Naturale.
              </Text>
              <Text style={[styles.infoText]}>
                Abbiamo utilizzato un metodo di selezione
              </Text>
              <Text style={[styles.infoText]}>
                inclusivo, che tenesse conto dei diversi
              </Text>
              <Text style={[styles.infoText, {marginBottom: 10}]}>
                disciplinari delle Associazioni esistenti.
              </Text>
              <Text style={[styles.infoText]}>
                In vigna: no pesticidi e prodotti di sintesi
              </Text>
              <Text style={[styles.infoText]}>raccolta manuale delle uve.</Text>
              <Text style={[styles.infoText]}>
                In cantina: no lieviti selezionati, no chiarifica,
              </Text>
              <Text style={[styles.infoText]}>
                no filtrazione sterile, no coadiuvanti e additivi,
              </Text>
              <Text style={[styles.infoText]}>
                no trattamenti fisici e termici invasivi,
              </Text>
              <Text style={[styles.infoText, {marginBottom: 10}]}>
                no alti livelli di solforosa.
              </Text>
              <Text style={[styles.infoText]}>
                Non abbiamo la pretesa che tutti i dati
              </Text>
              <Text style={[styles.infoText]}>
                siano corretti e aggiornati, per questo
              </Text>
              <Text style={[styles.infoText]}>
                motivo chiunque avesse informazioni
              </Text>
              <Text style={[styles.infoText]}>
                utili a migliorare la nostra selezione
              </Text>
              <Text style={[styles.infoText, {marginBottom: 10}]}>
                è il benvenuto, ci contatti.
              </Text>
              <Text style={[styles.infoText]}>
                Per la sua stessa genesi ed a causa della
              </Text>
              <Text style={[styles.infoText]}>
                grande vitalità del settore, la app sarà
              </Text>
              <Text style={[styles.infoText, {marginBottom: 10}]}>
                in continua evoluzione.
              </Text>
              <Text style={[styles.infoText]}>
                Se anche tu, Bevitore Errante,
              </Text>
              <Text style={[styles.infoText]}>
                desideri contribuire, condividi le
              </Text>
              <Text style={[styles.infoText]}>tue conoscenze con lo</Text>
              <Text style={[styles.infoText, {marginBottom: 10}]}>
                staff di NaTourWine.
              </Text>
            </View>
            <View style={styles.option_container}>
              <View>
                <Text style={styles.option_title_text}>
                  Cantine totali : {countGlobal}
                </Text>
              </View>
              <View style={styles.vertical_divider} />
              <View>
                <Text style={styles.option_title_text}>
                  Numero di cantine per regione e provincia:
                </Text>
              </View>
              <View style={Platform.OS == 'android' ?  styles.vertical_divider : styles.vertical_divider_ios} />
              <View style={Platform.OS == 'android' ?  styles.form_item_container_with_label_inline : styles.form_item_container_with_label_inline_ios}>
                <Text style={styles.option_text_label}>Regione</Text>
                <View style={Platform.OS == 'android' ? styles.input_view_text : styles.input_view_text_ios}>
                  <RegionPicker
                    style={Platform.OS == 'android' ?  styles.pickers_style : styles.pickers_style_ios}
                    itemStyle={styles.pickers_item_style}
                    selectedValue={_region}
                    onValueChange={(itemValue, _itemIndex) => {
                      setRegion(itemValue as string);
                      setProvince(undefined);
                      loadCount(CountType.Region, itemValue as string);
                    }}
                    enabled={!regionDisabled}
                  />
                </View>
                <Text style={styles.count_text_label}>{countRegion}</Text>
              </View>
              {Platform.OS == 'android' && <View style={styles.vertical_divider} />}
              <View style={Platform.OS == 'android' ?  styles.form_item_container_with_label_inline : styles.form_item_container_with_label_inline_ios}>
                <Text style={styles.option_text_label}>Provincia</Text>
                <View style={Platform.OS == 'android' ? styles.input_view_text : styles.input_view_text_ios}>
                  <ProvincePicker
                    style={Platform.OS == 'android' ?  styles.pickers_style : styles.pickers_style_ios}
                    itemStyle={styles.pickers_item_style}
                    selectedValue={_province}
                    onValueChange={(itemValue, _itemIndex) => {
                      setProvince(itemValue as string);
                      loadCount(CountType.Province, itemValue as string);
                    }}
                    remoteFilter={_region ? {region: _region} : undefined}
                  />
                </View>
                <Text style={styles.count_text_label}>{countProvince}</Text>
              </View>
            </View>
            <View style={{marginLeft: 10}}>
              <View style={{marginTop: 10, marginBottom: 10}}>
                <Text style={styles.option_title_text}>Info App</Text>
              </View>
              <View style={styles.option_container}>
                <Text style={styles.option_text_label}>
                  versione: {version || 0.0}
                </Text>
              </View>
              <View style={styles.option_container}>
                <Text style={styles.option_text_label}>
                  build number:{buildNumber || 0}
                </Text>
              </View>
            </View>
          </ScrollView>
        </>
      )}
      {isLoading && (
        <View>
          <ActivityIndicator size="large" color={markerDefaultGreen} />
        </View>
      )}
      {isError && (
        <View>
          <Text style={{paddingTop: 5, color: 'red'}}>{error}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}
