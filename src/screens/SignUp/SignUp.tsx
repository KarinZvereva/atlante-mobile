import React, {useRef, useContext, useState, useEffect} from 'react';
import {Text, View, TextInput, ActivityIndicator, Image } from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {markerDefaultGreen} from '../../common/constants';
import {AuthContext, AuthDal} from '../../common/modules/auth';
import {styles} from './SignUp.styles';
import {images} from '../../common/constants';
import Recaptcha, { RecaptchaHandles } from "react-native-recaptcha-that-works";
import {User} from '../../common/interfaces/web-api';
import {useCallback} from 'react';

  
export function SignUp(props: any) {
  const [userName, setUserName] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [passwordConfirm, setPasswordConfirm] = useState<string>();
  const [mail, setMail] = useState<string>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const {actionsProvider} = useContext(AuthContext);
  const recaptcha = useRef<RecaptchaHandles>();

  /**
   * 
   * @returns 
   */

   const signUp = () => {
    if (!userName || !password || !passwordConfirm || !mail) {
      setError('Username, password o mail non inseriti');
      setIsError(true);
      return;
    }

    if (password != passwordConfirm ) {
      setError('Le password non sono identiche');
      setIsError(true);
      return;
    }
    
    setError('');
    setIsError(false);
    
    console.log('Call captcha send!');
    recaptcha.current?.open();
  };

  /**
   * 
   * @param captcha 
   */
  const sendData = (captcha: string) => {
    const userData = {userName:userName,  password:password, email:mail} as User;
    
    console.log("start reg start"); 

    setError('');
    setIsError(false);
    setLoading(true);

    AuthDal.register({userData, captcha})
    .then((result) => {

      console.log("reg finish", JSON.stringify(result));

      if (result && result.success) {
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
      console.log("Error", err);
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
    console.log('success!', token);
    sendData(token);
  };

  /**
   * 
   */
  const onExpire = () => {
    console.warn('expired!');
    console.log("Captcha verified expire");
    setError("Non è stato possibile verificare l'identità");
    setIsError(true);
    setLoading(false);
  }

  /**
   * 
   */
  const onLoad = () => {
    console.log("Recaptcha onLoad...");
  }

  /**
   * 
   * @param error 
   */
  const onError = (error: string) => {
    console.log("Recaptcha onError...", error);
  }

  /**
   * 
   */
  const onClose = () => {
    console.log("Recaptcha onClose...");
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
                placeholder="Username"
                placeholderTextColor="#ffffff"
                onChangeText={(value) => setUserName(value)}
              />
            </View>
            <View style={styles.inputView}>
              <TextInput
                style={styles.TextInput}
                placeholder="Mail"
                placeholderTextColor="#ffffff"
                onChangeText={(value) => setMail(value)}
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
          </View>

          <View>
            <Recaptcha 
                ref={recaptcha}
                siteKey="6LfjS1kaAAAAAMchCu1PIhNfO0OeuSEdz8oUgBJt" //client key
                baseUrl="https://www.natourwine.org"
                onVerify={onVerify}
                onExpire={onExpire}
                onLoad={onLoad}
                onError={onError}
                onClose={onClose}
                size="invisible"
                style={styles.recaptcha_container}
            />
            
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
                onPress={() => props.navigation.navigate('SignIn')} //SignIn
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
  );
}
