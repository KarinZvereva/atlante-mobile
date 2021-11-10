import React, {useContext, useState, useRef} from 'react';
import {View, TextInput, Text, Image, Alert, ScrollView, Platform} from 'react-native';
import {Header} from '../../common/components/Header/Header';
import {icons} from '../../common/constants';
import {AuthContext, ITokenData, AuthTokenManager, IUserSettings} from '../../common/modules/auth';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from './Profile.styles';
import {SafeAreaView} from 'react-native';
import Recaptcha, {RecaptchaHandles} from 'react-native-recaptcha-that-works';
import {User, UserSettings} from '../../common/interfaces/web-api';
import {ProfileDal} from './Profile.dal';
import {webCaptchaUrl, captchaSiteKey} from '../../common/constants';
import {UserAuthenticationMode} from '../../common/modules/auth/auth.constants';
import { useTranslation } from 'react-i18next';
import {Picker, PickerProps} from '@react-native-picker/picker';

export function Profile(props: any) {
  const actionsProvider = useContext(AuthContext);
  const userInfo = AuthTokenManager.decodeToken(actionsProvider.data.userToken) as ITokenData
  const userSettings = actionsProvider.data.settings as IUserSettings;
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
  const {t, i18n} = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(userSettings != null ? userSettings.language : 'it');


  /**
   * 
   * @returns 
   */
  const Modify = () => {
    if (!firstName || !lastName || !password || !passwordConfirm) {
      setError(t('error.profile.0001'));
      setIsError(true);
      return;
    } else if (password != passwordConfirm) {
      setError(t('error.profile.0002'));
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
        Alert.alert(t('profile.update_message'));
        setShowEdit(false)
        setLoading(false);
        setShowEdit(false);
        props.navigation.navigate('Logout');
      } else if (result && !result.success) {
        setError(t('error.profile.0003'));
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
        Alert.alert(t('profile.delete_message'));
        setShowEdit(false)
        setLoading(false);
        setShowEdit(false);
        props.navigation.navigate('Logout');
      } else if (result && !result.success) {
        setError(t('error.profile.0004'));
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

  const showAlert = () =>
    Alert.alert(
    t('profile.confirm_title'),
    t('profile.confirm_message'),
    [
      {
        text: t('button.delete'),
        onPress: () => Delete(),
        style: "cancel",
      },
      {
        text: t('button.undo'),
        style: "cancel",
      },
    ],
    {
      cancelable: true,
      onDismiss: () => {}
    }
  );


  /**
     *
     * @param language
     */
  const saveSettings = (language: string) => {
    setError('');
    setIsError(false);
    setLoading(true);

    console.log("Lingua sel ", language);

    const token = actionsProvider.data.userToken != null ? actionsProvider.data.userToken : ""; 
    ProfileDal.saveSettings({language}, token)
    .then((result) => {
      if (result && result.success) {
        console.log("Settings saved");
        setSelectedLanguage(language)
        i18n.changeLanguage(language);
        setLoading(false);
      } else if (result && !result.success) {
        setError(t('error.profile.0005'));
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

  return (
    <SafeAreaView style={styles.page}>
      <Header {...props} showName={t('menu.profile')} />
      <ScrollView contentContainerStyle={{flexGrow: 1}} style={styles.scroll_container}>
        <View style={styles.profile_container}>
          <Image source={icons.profilo_big} style={styles.logo}/>
          <Text style={styles.title_text}>{firstName} {lastName}</Text>
          <Text style={styles.mail_text}>{email}</Text>
          <View style={Platform.OS == 'android' ?  styles.vertical_divider : styles.vertical_divider_ios} />
          <View style={Platform.OS == 'android' ?  styles.form_item_container_with_label_inline : styles.form_item_container_with_label_inline_ios}>
            <Text style={ Platform.OS == 'android' ? styles.option_text_label : styles.option_text_label_ios}>{t('profile.language')}</Text>
            <View style={Platform.OS == 'android' ? styles.input_view_text : styles.input_view_text_ios}>
              <Picker
                style={Platform.OS == 'android' ?  styles.pickers_style : styles.pickers_style_ios}
                selectedValue={selectedLanguage}
                onValueChange={(itemValue, itemIndex) => {
                    saveSettings(itemValue);
                  }
                }>
                <Picker.Item label={t('switchLanguage', {lng: 'it'})} value="it" />
                <Picker.Item label={t('switchLanguage', {lng: 'en'})} value="en" />
              </Picker>
            </View>
          </View>
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
                  <Text style={styles.buttonText}>{t('button.modify')}</Text>
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
                  <Text style={styles.buttonText}>{t('button.delete')}</Text>
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
                  <Text style={styles.buttonText}>{t('button.delete')}</Text>
                </View>
              </TouchableOpacity>
            </LinearGradient>
          </View>
          <View style={styles.divider}></View>
          <Text style={styles.facebook_text}>{t('profile.delete_summary_1')}</Text>
          <View style={styles.divider}></View>
          <Text style={styles.facebook_text}>{t('profile.delete_summary_2')} {isFacebookAutenticated ? 'Facebook' : isAppleAutenticated ? 'Apple' : 'Google'}</Text>
        </View>
        }   
        { showEdit && 
        <View style={styles.modify_profile_container}>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder={t('person.name')}
              placeholderTextColor="#ffffff"
              onChangeText={(value) => setFirstname(value)}
              value= {firstName}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder={t('person.surname')}
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
              placeholder={t('profile.confirm_password')}
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
                  <Text style={styles.buttonText}>{t('button.update')}</Text>
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
                  <Text style={styles.buttonText}>{t('button.undo')}</Text>
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