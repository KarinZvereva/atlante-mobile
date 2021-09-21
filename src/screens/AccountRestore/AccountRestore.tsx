import React, {useRef, useState} from 'react';
import {Text, View, TextInput, ActivityIndicator, 
  Image, Alert, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {markerDefaultGreen, defaultRed} from '../../common/constants';
import {AuthDal} from '../../common/modules/auth';
import {RestoreDal} from './AccountRestore.dal';
import {images, webCaptchaUrl, captchaSiteKey} from '../../common/constants';
import Recaptcha, {RecaptchaHandles} from 'react-native-recaptcha-that-works';
import {User} from '../../common/interfaces/web-api';

const styles = StyleSheet.create({
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
    width: '40%',
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
    resizeMode: 'center',
    position: 'relative',
    marginBottom: 0,
  },
  image_container: {
    flex: 0,
    alignItems: 'center', 
    justifyContent: 'center',
    marginTop: 40,
  },
  input_container: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center',
    width: '100%',
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
  restoreText: {
    color: 'white',
    width: '100%',
    fontSize: 18,
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'Novecentosanswide-Normal',
  },
});

export function AccountRestore(props: any) {
  const [email, setEMail] = useState<string>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const recaptcha = useRef<RecaptchaHandles>(null);
  const [isEmailAvailable, setEmaiAvailable] = useState<boolean>(true);
  const [isUserActive, setUserActive] = useState<boolean>(true);
  
  const restore = () => {
    if (!email) {
      setError('Mail non inserita');
      setIsError(true);
      return;
    } else if ( !isEmailAvailable) {
      setError('Email non presente');
      setIsError(true);
      return;
    } else if ( !isUserActive) {
      setError('Email associata ad un account non attivo');
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
        Alert.alert(`Verifica la mail per ripristinare l'account`);
        setLoading(false);
        props.navigation.navigate('SignIn');
      } else if (result && !result.success) {
        setError("Impossibile recuperare l'account");
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
    setError("Non è stato possibile verificare l'identità. Captcha verified expire");
    setIsError(true);
    setLoading(false);
  };

  /**
   *
   * @param error
   */
  const onError = (error: string) => {
    setError("Non è stato possibile verificare l'identità. Captcha error");
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
        .then((result) => {
          console.log(result)
          if (result && result.available && (result.is_active == null) ) {
            setEmaiAvailable(false);
            setError('Email non presente');
            setIsError(true);
          } else if (result && !result.available && !result.is_active) {
            setUserActive(false);
            setError('Email associata ad un account non attivo');
            setIsError(true);
          } else if (result && result.error) {
            setEmaiAvailable(false);
            setError('Email non verificabile, connessione con il server non disponibile');
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
    
      <View style={styles.container}>
        {!isLoading && (
          <>
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

          <View style={styles.button_container}>
            <LinearGradient
              colors={['#ce8a86', '#bd6665', '#a92a3f']}
              style={styles.restoreBtn}>
              <TouchableOpacity
                onPress={() => restore()}>
                <View style={styles.restoreBtnSubView}>
                  <Text style={styles.restoreText}>Recupera</Text>
                </View>
              </TouchableOpacity>
            </LinearGradient>
            
          </View>
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
      </View>
  );
}
