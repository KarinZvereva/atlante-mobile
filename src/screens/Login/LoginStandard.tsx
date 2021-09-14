import React, {useContext, useState} from 'react';
import {
  Text,
  View,
  TextInput,
  ActivityIndicator,
  Image,
  Switch,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import {markerDefaultGreen, images} from '../../common/constants';
import {AuthContext, AuthDal} from '../../common/modules/auth';
import {styles} from './LoginStandard.styles';

export function LoginStandard(props: any) {
  const [userName, setUserName] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const {actionsProvider} = useContext(AuthContext);
  const [isRemember, setRemember] = useState<boolean>(false);

  const Login = () => {
    if (!userName || !password) {
      setError('Username o password non inseriti');
      setIsError(true);
      return;
    }

    setError('');
    setIsError(false);
    setLoading(true);
    AuthDal.login({userName, password})
      .then((res) => {
        console.log(res)
        if (!res.token || !res.refreshToken) {
          setError('Dati errati');
          setIsError(true);
          setLoading(false);
          return;
        }

        if (isRemember) {
          actionsProvider?.credentialIn({userName, password});
        }

        if (actionsProvider) {
          actionsProvider.signIn(res);
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
    <View style={styles.container}>
      {!isLoading && (
        <>
          <Image source={images.logo_calice} style={styles.logo} />
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
              placeholder="Password"
              placeholderTextColor="#ffffff"
              secureTextEntry={true}
              onChangeText={(value) => setPassword(value)}
            />
          </View>
          <View style={styles.forgot_button}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('AccountRestore')}>
              <Text style={styles.linkText}>Password dimenticata?</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.forgot_button}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('SignUp')}>
              <Text style={styles.linkText}>
                Non hai un utente? Registrati!
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.remember_container}>
            <Switch
              style={styles.rememberSwitch}
              trackColor={{false: '#cecece', true: '#cecece'}}
              thumbColor={isRemember ? markerDefaultGreen : '#a9a9a9'}
              ios_backgroundColor="#3e3e3e"
              value={isRemember}
              onValueChange={() => setRemember((previus) => !previus)}
            />
            <Text style={[styles.rememberText]}>Ricordami</Text>
          </View>
          <LinearGradient
            colors={['#ce8a86', '#bd6665', '#a92a3f']}
            style={styles.loginBtn}>
            <TouchableOpacity
              onPress={() => Login()}
              disabled={!actionsProvider}>
              <View style={styles.loginBtnSubView}>
                <Text style={styles.loginText}>Login</Text>
              </View>
            </TouchableOpacity>
          </LinearGradient>
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
