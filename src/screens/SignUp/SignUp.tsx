import React, {useRef, useContext, useState, useEffect} from 'react';
import {
  Text,
  View,
  TextInput,
  ActivityIndicator,
  Image,
  Alert,
  SafeAreaView,
  ScrollView,
  Switch,
  Platform,
  Modal,
  Pressable,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {markerDefaultGreen, defaultRed} from '../../common/constants';
import {AuthContext, AuthDal} from '../../common/modules/auth';
import {styles} from './SignUp.styles';
import {images, webCaptchaUrl, captchaSiteKey} from '../../common/constants';
import Recaptcha, {RecaptchaHandles} from 'react-native-recaptcha-that-works';
import {User} from '../../common/interfaces/web-api';
import { InternetDomains } from '../../common/constants';

export function SignUp(props: any) {
  const [userName, setUserName] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [passwordConfirm, setPasswordConfirm] = useState<string>();
  const [email, setEMail] = useState<string>("");
  const [firstName, setFirstname] = useState<string>();
  const [lastName, setLastname] = useState<string>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const {actionsProvider} = useContext(AuthContext);
  const recaptcha = useRef<RecaptchaHandles>(null);
  const [isAcceptance, setAcceptance] = useState<boolean>(false);
  const [isEmailAvailable, setEmaiAvailable] = useState<boolean>(true);
  const [isUserNamelAvailable, setUserNameAvailable] = useState<boolean>(true);
  const [isMailMalformed, setMailMalformed] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState(false);

  /**
   * Execute sign up
   * @returns
   */
  const signUp = () => {
    if (!userName || !password || !passwordConfirm || !email) {
      setError('Username, password o mail non inseriti');
      setIsError(true);
      return;
    } else if (password != passwordConfirm) {
      setError('Le password non sono identiche');
      setIsError(true);
      return;
    } else if (!isUserNamelAvailable || !isEmailAvailable) {
      setError('Username o mail non disponibili');
      setIsError(true);
      return;
    } else if (!isAcceptance) {
      setError("E' necessario accettare i Termini e Condizioni ");
      setIsError(true);
      return;
    } else if (!validateEmail()) {
      setMailMalformed(true);
    }

    setModalVisible(true);
  };

  /**
   * 
   */
  const openCaptcha = () => {
    setModalVisible(!modalVisible)
    setError('');
    setIsError(false);

    recaptcha.current?.open();  
  }

  /**
   * 
   */
  const validateEmail = () => {
    setMailMalformed(false);
    const domain = email.substring(email.lastIndexOf(".") + 1).toUpperCase();
    const inEnum = (Object.values(InternetDomains) as string[]).includes(domain);

    return inEnum;
  }

  /**
   *
   * @param captcha
   */
  const sendData = (captcha: string) => {
    const userData = {
      userName: userName,
      password: password,
      email: email,
      firstName: firstName,
      lastName: lastName,
    } as User;

    setError('');
    setIsError(false);
    setLoading(true);

    AuthDal.register({userData, captcha})
      .then((result) => {
        if (result && result.success) {
          Alert.alert(`Verifica la mail per attivare l'account`);
          setLoading(false);
          props.navigation.navigate('SignIn');
        } else if (result && result.errors) {
          var stringify = JSON.parse(JSON.stringify(result));
          var status = stringify.status;
          var errors = stringify.errors;
          setError(JSON.stringify(Object.values(errors)[0]));
          setIsError(true);
          setLoading(false);
          return;
        }
      })
      .catch((err) => {
        console.log('Error', err);
        console.log(JSON.stringify(err));
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
    setError(
      "Non è stato possibile verificare l'identità. Captcha verified expire",
    );
    setIsError(true);
    setLoading(false);
  };

  /**
   *
   * @param error
   */
  const onError = (error: string) => {
    console.log(
      "Non è stato possibile verificare l'identità. Recaptcha onError...",
      error,
    );
  };

  /**
   *
   */
  const onBlurUsername = () => {
    const data = userName;
    const what = 1;

    setUserNameAvailable(true);
    setError('');
    setIsError(false);

    if (userName) {
      AuthDal.checkRegister({data, what})
        .then((result) => {
          if (result && !result.available && result.is_active) {
            setUserNameAvailable(false);
            setError('Username già utilizzato');
            setIsError(true);
          } else if (result && result.error) {
            setUserNameAvailable(false);
            setError(
              'Username non verificabile, connessione con il server non disponibile',
            );
            setIsError(true);
          }
        })
        .catch((err) => {
          console.log('Error', err);
          console.log(JSON.stringify(err));
          setError(JSON.stringify(err));
          setIsError(true);
          setLoading(false);
        });
    }
  };

  /**
   *
   */
  const onBlurEmail = () => {
    const data = email;
    const what = 0;

    setEmaiAvailable(true);
    setError('');
    setIsError(false);

    if (email) {
      AuthDal.checkRegister({data, what})
        .then((result) => {
          if (result && !result.available && result.is_active) {
            setEmaiAvailable(false);
            setError('Email già utilizzata');
            setIsError(true);
          } else if (result && result.error) {
            setEmaiAvailable(false);
            setError(
              'Email non verificabile, connessione con il server non disponibile',
            );
            setIsError(true);
          }
        })
        .catch((err) => {
          console.log('Error', err);
          console.log(JSON.stringify(err));
          setError(JSON.stringify(err));
          setIsError(true);
          setLoading(false);
        });
    }
  };

  /**
   *
   */
  const goToLink = () => {
    console.log('link');
  };

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.container}>
        {!isLoading && (
          <>            
            <ScrollView style={styles.scroll_container}>
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  Alert.alert("Modal has been closed.");
                  setModalVisible(!modalVisible);
                }}
              >
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text style={styles.headerModalText}>Riepilogo dati inseriti - Conferma</Text>
                    <View style={styles.summary_container}>
                      <View style={styles.field_container}>
                        <View style={styles.header_field_container}>
                          <Text style={styles.headerModalText}>Username : </Text>
                        </View>
                        <View style={styles.value_field_container}>
                          <Text style={styles.modalText}>{userName}</Text>
                        </View>
                      </View>
                      <View style={styles.field_container}>
                        <View style={styles.header_field_container}>
                          <Text style={styles.headerModalText}>Email : </Text>
                        </View>
                        <View style={styles.value_field_container}>
                          <Text style={styles.modalText}>{email}</Text>
                        </View>
                      </View>
                      <View style={styles.field_container}>
                        <View style={styles.header_field_container}>
                          <Text style={styles.headerModalText}>Nome : </Text>
                        </View>
                        <View style={styles.value_field_container}>
                          <Text style={styles.modalText}>{firstName}</Text>
                        </View>
                      </View>
                      <View style={styles.field_container}>
                        <View style={styles.header_field_container}>
                          <Text style={styles.headerModalText}>Cognome : </Text>
                        </View>
                        <View style={styles.value_field_container}>
                          <Text style={styles.modalText}>{lastName}</Text>
                        </View>
                      </View>
                    </View>
                    {isMailMalformed && 
                      <Text style={styles.modal_warning_text}>Attenzione, la mail sembra non essere valida, ti preghiamo di verificare.</Text>
                    }
                    <View style={styles.bottom_container}>
                      <View style={styles.button_modal_container}>
                        <LinearGradient
                          colors={['#ce8a86', '#bd6665', '#a92a3f']}
                          style={styles.signUpBtn}>
                          <Pressable 
                            onPress={() => openCaptcha()}
                            >
                            <View style={styles.loginBtnSubView}>
                              <Text style={styles.loginText}>Conferma</Text>
                            </View>
                          </Pressable>
                        </LinearGradient>
                        <LinearGradient
                          colors={['#423E3F', '#605D5E', '#7F7C7D']}
                          style={styles.undoBtn}>
                          <Pressable
                            onPress={() => setModalVisible(!modalVisible)} 
                            >
                            <View style={styles.loginBtnSubView}>
                              <Text style={styles.loginText}>Annulla</Text>
                            </View>
                          </Pressable>
                        </LinearGradient>
                      </View>
                    </View>
                  </View>
                </View>
              </Modal>
              <View style={styles.image_container}>
                <Image source={images.logo_calice} style={styles.logo} />
              </View>
              <View style={styles.input_container}>
                <View style={styles.inputView}>
                  <TextInput
                    style={styles.TextInput}
                    placeholder="Username"
                    placeholderTextColor="#ffffff"
                    onChangeText={(value) => setUserName(value.trim())}
                    onBlur={() => onBlurUsername()}
                  />
                </View>
                <View style={styles.inputView}>
                  <TextInput
                    style={styles.TextInput}
                    placeholder="Mail"
                    placeholderTextColor="#ffffff"
                    onChangeText={(value) => setEMail(value.trim())}
                    onBlur={() => onBlurEmail()}
                  />
                </View>
                <View style={styles.inputView}>
                  <TextInput
                    style={styles.TextInput}
                    placeholder="Nome"
                    placeholderTextColor="#ffffff"
                    onChangeText={(value) => setFirstname(value.trim())}
                  />
                </View>
                <View style={styles.inputView}>
                  <TextInput
                    style={styles.TextInput}
                    placeholder="Cognome"
                    placeholderTextColor="#ffffff"
                    onChangeText={(value) => setLastname(value.trim())}
                  />
                </View>
                <View style={styles.inputView}>
                  <TextInput
                    style={styles.TextInput}
                    placeholder="Password"
                    placeholderTextColor="#ffffff"
                    secureTextEntry={true}
                    onChangeText={(value) => setPassword(value.trim())}
                  />
                </View>
                <View style={styles.inputView}>
                  <TextInput
                    style={styles.TextInput}
                    placeholder="Conferma Password"
                    placeholderTextColor="#ffffff"
                    secureTextEntry={true}
                    onChangeText={(value) => setPasswordConfirm(value.trim())}
                  />
                </View>
              </View>
            </ScrollView>
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
            <View style={styles.acceptance_container}>
              <Switch
                style={Platform.OS == 'ios' ? styles.acceptanceSwitch_ios : styles.acceptanceSwitch}
                trackColor={{false: '#cecece', true: '#cecece'}}
                thumbColor={isAcceptance ? markerDefaultGreen : '#a9a9a9'}
                ios_backgroundColor="#cecece"
                value={isAcceptance}
                onValueChange={() => setAcceptance((previus) => !previus)}
              />
              <View style={styles.acceptanceText_container}>
                <View>
                  <Text style={[styles.acceptanceText]}>
                    Ho letto, compreso e accettato i
                  </Text>
                  <Text
                    style={[styles.acceptanceLinkText]}
                    onPress={() => props.navigation.navigate('SignupTerms')}>
                    termini e condizioni
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.button_container}>
              <LinearGradient
                colors={['#ce8a86', '#bd6665', '#a92a3f']}
                style={styles.signUpBtn}>
                <TouchableOpacity
                  onPress={() => signUp()}
                  disabled={!actionsProvider}>
                  <View style={styles.loginBtnSubView}>
                    <Text style={styles.loginText}>Registrati</Text>
                  </View>
                </TouchableOpacity>
              </LinearGradient>
              <LinearGradient
                colors={['#423E3F', '#605D5E', '#7F7C7D']}
                style={styles.undoBtn}>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate('LoginStandard')} //SignIn
                  disabled={!actionsProvider}>
                  <View style={styles.loginBtnSubView}>
                    <Text style={styles.loginText}>Annulla</Text>
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
    </SafeAreaView>
  );
}
