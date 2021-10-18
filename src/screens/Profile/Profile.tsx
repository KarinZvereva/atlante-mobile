import React, {useContext, useState, useRef} from 'react';
import {View, TextInput, Text, Image, Alert, ScrollView} from 'react-native';
import {Header} from '../../common/components/Header/Header';
import {icons} from '../../common/constants';
import {AuthContext, ITokenData, AuthTokenManager} from '../../common/modules/auth';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from './Profile.styles';
import {SafeAreaView} from 'react-native';
import Recaptcha, {RecaptchaHandles} from 'react-native-recaptcha-that-works';
import {User} from '../../common/interfaces/web-api';
import {ProfileDal} from './Profile.dal';
import {webCaptchaUrl, captchaSiteKey} from '../../common/constants';
import {UserAuthenticationMode} from '../../common/modules/auth/auth.constants';


export function Profile(props: any) {
  const actionsProvider = useContext(AuthContext);
  const userInfo = AuthTokenManager.decodeToken(actionsProvider.data.userToken) as ITokenData
  const isFacebookAutenticated = userInfo != null ? userInfo.authentication == UserAuthenticationMode.FACEBOOK : false;
  const isAppleAutenticated = userInfo != null ? userInfo.authentication == UserAuthenticationMode.APPLE : false;
  const isGoogleAutenticated = userInfo != null ? userInfo.authentication == UserAuthenticationMode.GOOGLE : false;
  const [password, setPassword] = useState<string>();
  const [passwordConfirm, setPasswordConfirm] = useState<string>();
  const [email, setEMail] = useState<string>(userInfo != null ? userInfo.email : "");
  const [firstName, setFirstname] = useState<string>(userInfo != null ? userInfo.unique_name : "");
  const [lastName, setLastname] = useState<string>(userInfo != null ? userInfo.family_name : "");
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const recaptcha = useRef<RecaptchaHandles>(null);
  const [isDelete, setDelete] = useState<boolean>(false);

  console.log(userInfo)

  /**
   * 
   * @returns 
   */
  const Modify = () => {
    if (!firstName || !lastName || !password || !passwordConfirm) {
      setError('Nome, Cognome o password non inseriti');
      setIsError(true);
      return;
    } else if (password != passwordConfirm) {
      setError('Le password non sono identiche');
      setIsError(true);
      return;
    }
    setError('');
    setIsError(false);
    setLoading(true);

    recaptcha.current?.open();
  };

  /**
   *
   * @param captcha
   */
   const sendUpdateData = (captcha: string) => {
    const userData = {      
      password: password,
      firstName: firstName,
      lastName: lastName, 
    } as User;

    setError('');
    setIsError(false);
    setLoading(true);

    const token = actionsProvider.data.userToken != null ? actionsProvider.data.userToken : ""; 
    ProfileDal.update({userData, captcha}, token)
    .then((result) => {
      if (result && result.success) {
        Alert.alert("Profilo aggiornato, effettua nuovamente la login.");
        setShowEdit(false)
        setLoading(false);
        setShowEdit(false);
        props.navigation.navigate('Logout');
      } else if (result && !result.success) {
        setError("Impossibile aggiornare l'account");
        setIsError(true);
        setLoading(false);
        return;
      }
    })
    .catch((err) => {
      console.log(JSON.stringify(err));
      setError(JSON.stringify(err));
      setIsError(true);
      setLoading(false);
    });
  };

  /**
   * 
   * @returns 
   */
  const Delete = () => {
    setDelete(true);
    recaptcha.current?.open();
  };

/**
   *
   * @param captcha
   */
  const sendDeleteData = (captcha: string) => {
    setError('');
    setIsError(false);
    setLoading(true);

    const token = actionsProvider.data.userToken != null ? actionsProvider.data.userToken : ""; 
    ProfileDal.delete({captcha}, token)
    .then((result) => {
      if (result && result.success) {
        Alert.alert("Account eliminato");
        setShowEdit(false)
        setLoading(false);
        setShowEdit(false);
        props.navigation.navigate('Logout');
      } else if (result && !result.success) {
        setError("Impossibile eliminare l'account");
        setIsError(true);
        setLoading(false);
        return;
      }
    })
    .catch((err) => {
      console.log(JSON.stringify(err));
      setError(JSON.stringify(err));
      setIsError(true);
      setLoading(false);
    });
  };


  /**+
   *
   * @param token
   */
   const onVerifyUpdate = (token: string) => {
    sendUpdateData(token);
  };

  /**+
   *
   * @param token
   */
   const onVerifyDelete = (token: string) => {
    sendDeleteData(token);
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

  const showAlert = () =>
    Alert.alert(
    "Eliminazione account",
    "Confermi l'eliminazione dell'account?",
    [
      {
        text: "Elimina",
        onPress: () => Delete(),
        style: "cancel",
      },
      {
        text: "Annulla",
        style: "cancel",
      },
    ],
    {
      cancelable: true,
      onDismiss: () => {}
    }
  );


  return (
    <SafeAreaView style={styles.page}>
      <Header {...props} showName="Profilo Utente" />

      <ScrollView contentContainerStyle={{flexGrow: 1}} style={styles.scroll_container}>

        <View style={styles.profile_container}>
          <Image source={icons.profilo_big} style={styles.logo} />
          <Text style={styles.title_text}>{firstName}</Text>
          <Text style={styles.title_text}>{lastName}</Text>
          <Text style={styles.mail_text}>{email}</Text>
        </View>
        { (!showEdit && !isFacebookAutenticated && !isAppleAutenticated && !isGoogleAutenticated) &&
        <View style={styles.modify_profile_container}>
          <View style={styles.button_container}>
            <LinearGradient
              colors={['#ce8a86', '#bd6665', '#a92a3f']}
              style={styles.modifyBtn}>
              <TouchableOpacity
                onPress={() => setShowEdit(true)}
                disabled={!actionsProvider}>
                <View style={styles.modifyBtnSubView}>
                  <Text style={styles.buttonText}>Modifica</Text>
                </View>
              </TouchableOpacity>
            </LinearGradient>
            <LinearGradient
              colors={['#423E3F', '#605D5E', '#7F7C7D']}
              style={styles.deleteBtn}>
              <TouchableOpacity
                onPress={() => showAlert()}
                disabled={!actionsProvider}>
                <View style={styles.modifyBtnSubView}>
                  <Text style={styles.buttonText}>Elimina</Text>
                </View>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
        }
        {(isFacebookAutenticated || isAppleAutenticated || isGoogleAutenticated) &&
        <View style={styles.modify_profile_container}>
          <View style={styles.button_container}>
            <LinearGradient
              colors={['#423E3F', '#605D5E', '#7F7C7D']}
              style={styles.deleteFbBtn}>
              <TouchableOpacity
                onPress={() => showAlert()}
                disabled={!actionsProvider}>
                <View style={styles.modifyBtnSubView}>
                  <Text style={styles.buttonText}>Elimina</Text>
                </View>
              </TouchableOpacity>
            </LinearGradient>
          </View>
          <View style={styles.divider}></View>
          <Text style={styles.facebook_text}>Non è possibile modificare il profilo</Text>
          <View style={styles.divider}></View>
          <Text style={styles.facebook_text}>Le informazioi sopra riportate provengono da {isFacebookAutenticated ? 'Facebook' : isAppleAutenticated ? 'Apple' : 'Google'}</Text>
        </View>
        }   
        { showEdit && 
        <View style={styles.modify_profile_container}>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Nome"
              placeholderTextColor="#ffffff"
              onChangeText={(value) => setFirstname(value)}
              value= {firstName}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Cognome"
              placeholderTextColor="#ffffff"
              onChangeText={(value) => setLastname(value)}
              value= {lastName}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Password"
              placeholderTextColor="#ffffff"
              secureTextEntry={true}
              onChangeText={(value) => setPassword(value)}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Conferma Password"
              placeholderTextColor="#ffffff"
              secureTextEntry={true}
              onChangeText={(value) => setPasswordConfirm(value)}
            />
          </View>        
          <View style={styles.button_container}>
            <LinearGradient
              colors={['#ce8a86', '#bd6665', '#a92a3f']}
              style={styles.saveBtn}>
              <TouchableOpacity
                onPress={() => Modify()}
                disabled={!actionsProvider}>
                <View style={styles.modifyBtnSubView}>
                  <Text style={styles.buttonText}>Aggiorna</Text>
                </View>
              </TouchableOpacity>
            </LinearGradient>
            <LinearGradient
              colors={['#423E3F', '#605D5E', '#7F7C7D']}
              style={styles.undoBtn}>
              <TouchableOpacity
                onPress={() => {
                    setShowEdit(false);
                    setError("");
                    setIsError(false);
                  }}
                disabled={!actionsProvider}>
                <View style={styles.modifyBtnSubView}>
                  <Text style={styles.buttonText}>Annulla</Text>
                </View>
              </TouchableOpacity>
            </LinearGradient>
          </View>            
        </View>
        }
        {isError && (
          <View style={{alignItems:'center'}}>
            <Text style={{paddingTop: 5, color: 'red'}}>{error}</Text>
          </View>
        )}  
        <View>
          <Recaptcha
            ref={recaptcha}
            siteKey={captchaSiteKey}
            baseUrl={webCaptchaUrl}
            onVerify={isDelete ? onVerifyDelete : onVerifyUpdate}
            onExpire={onExpire}
            onError={onError}
            size="invisible"
            style={styles.recaptcha_container}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}