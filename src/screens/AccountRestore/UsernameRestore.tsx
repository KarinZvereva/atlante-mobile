import React, {useRef, useState} from 'react';
import {Text, View, TextInput, ActivityIndicator, 
  Image, Alert, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {markerDefaultGreen, defaultRed} from '../../common/constants';
import {AuthDal} from '../../common/modules/auth';
import {RestoreDal} from './AccountRestore.dal';
import {images, webCaptchaUrl, captchaSiteKey} from '../../common/constants';
import Recaptcha, {RecaptchaHandles} from 'react-native-recaptcha-that-works';
import {User} from '../../common/interfaces/web-api';
import { useTranslation } from 'react-i18next';

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#FFF',
  },
  scroll_container: {
    flex : 1,
    marginHorizontal: 10,
    width: '100%',
  },
  option_container: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    padding: 15,
  },  
  inputView: {
    backgroundColor: markerDefaultGreen,
    borderRadius: 30,
    width: '70%',
    height: 45,
    alignItems: 'center',
  },
  TextInput: {
    color: 'white',
    textAlign: 'center',
    flex: 1,
    fontFamily: 'Novecentosanswide-Normal',
    width: '100%',
  },
  restoreBtn: {
    width: '70%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  restoreBtnSubView:{
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
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center',
  },
  input_container: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center',
  },
  button_container: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'flex-end',
    bottom: 40,
  },
  recaptcha_container: {
  },
  restoreText: {
    color: 'white',
    width: '100%',
    fontSize: 18,
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'Novecentosanswide-Normal',
  },
});

export function UsernameRestore(props: any) {
  const [email, setEMail] = useState<string>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const recaptcha = useRef<RecaptchaHandles>(null);
  const [isEmailAvailable, setEmaiAvailable] = useState<boolean>(true);
  const [isUserActive, setUserActive] = useState<boolean>(true);
  const { t } = useTranslation();

  const restore = () => {
    if (!email) {
      setError(t('error.account_restore.0001'));
      setIsError(true);
      return;
    } else if ( !isEmailAvailable) {
      setError(t('error.account_restore.0002'));
      setIsError(true);
      return;
    } else if ( !isUserActive) {
      setError(t('error.account_restore.0003'));
      setIsError(true);
      return;
    }
    setError('');
    setIsError(false);

    recaptcha.current?.open();
  }

  /**
   *
   * @param captcha
   */
   const sendData = (captcha: string) => {
    const userData = {
      email: email,
    } as User;

    setError('');
    setIsError(false);
    setLoading(true);

    RestoreDal.restore({email, captcha})
    .then((result) => {
      if (result && result.success) {
        Alert.alert(t('account_restore.mail_message'));
        setLoading(false);
        props.navigation.navigate('SignIn');
      } else if (result && !result.success) {
        setError(t('error.account_restore.0004'));
        setIsError(true);
        setLoading(false);
        return;
      }
    })
    .catch((err) => {
      setError(JSON.stringify(err));
      setIsError(true);
      setLoading(false);
    });
  };

  /**
   *
   * @param token
   */
  const onVerify = (token: string) => {
    const captcha = token;
    sendData(token);
  };

  /**
   *
   */
  const onExpire = () => {
    setError(t('error.captcha.expire'));
    setIsError(true);
    setLoading(false);
  };

  /**
   *
   * @param error
   */
  const onError = (error: string) => {
    setError(t('error.captcha.error'));
    setIsError(true);
    setLoading(false);
  };

   /**
   * 
   */
    const onBlurEmail = () =>{
      const data = email;
      const what = 0;
  
      setEmaiAvailable(true);
      setError('');
      setIsError(false);

      setEmaiAvailable(true);
      setUserActive(true);

      if (email) {
        AuthDal.checkRegister({data, what})
        .then((result: any) => {
          console.log(result)
          if (result && result.available && (result.is_active == null) ) {
            setEmaiAvailable(false);
            setError(t('error.account_restore.0002'));
            setIsError(true);
          } else if (result && !result.available && !result.is_active) {
            setUserActive(false);
            setError(t('error.account_restore.0003'));
            setIsError(true);
          } else if (result && result.error) {
            setEmaiAvailable(false);
            setError(t('error.server.connection'));
            setIsError(true);
          }
        })
        .catch((err) => {
          console.log(JSON.stringify(err));
          setError(JSON.stringify(err));
          setIsError(true);
          setLoading(false);
        });
      }
   }


  return (
    <SafeAreaView style={styles.page}>
      {!isLoading && (
      <ScrollView contentContainerStyle={{flexGrow: 1}} style={styles.scroll_container}>
        <>
        <View style={styles.option_container}>
          <View style={styles.image_container}>
            <Image source={images.logo_calice} style={styles.logo} />
          </View>
          <View style={styles.input_container}>
            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder="Mail"
                placeholderTextColor="#ffffff"
                onChangeText={(value) => setEMail(value)}
                onBlur= {() => onBlurEmail()}
              />
            </View>
          </View> 
        </View>
        <View style={styles.button_container}>
        <LinearGradient
          colors={['#ce8a86', '#bd6665', '#a92a3f']}
          style={styles.restoreBtn}>
          <TouchableOpacity
            onPress={() => restore()}>
            <View style={styles.restoreBtnSubView}>
              <Text style={styles.restoreText}>{t('button.restore')}</Text>
            </View>
          </TouchableOpacity>
        </LinearGradient>
      </View>
        </>
      </ScrollView>
      )}
      
      <View>
        <Recaptcha
          ref={recaptcha}
          siteKey={captchaSiteKey}
          baseUrl={webCaptchaUrl}
          onVerify={onVerify}
          onExpire={onExpire}
          onError={onError}
          size="invisible"
          style={styles.recaptcha_container}
        />
      </View>
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
