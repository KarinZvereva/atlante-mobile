import React from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {defaultRed, icons, markerDefaultGreen} from '../../common/constants';

/**
 * 
 * @returns 
 */
export function SignupTerms(){

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',      
      borderColor: markerDefaultGreen,
      borderWidth: 3,
      borderStyle: 'solid',
      borderRadius: 6,
      minWidth: 150,
    },
    image: {
      flex: 1,
      justifyContent: 'center',
    },
    internal_container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      //borderColor: defaultRed,
      //borderWidth: 2,
      //borderStyle: 'solid',
      margin: 2,
      paddingTop: 10,
      paddingRight: 10,
      paddingLeft: 10,
      paddingBottom: 5,
      borderRadius: 6,
      width : '100%',
    },
    popup_name_text: {
      paddingTop: 18,
      fontSize: 18,
      justifyContent: 'center',
      textAlign: 'center',
      fontFamily: 'Novecentosanswide-Normal',
    },
    marker_image: {
      width: 100,
      height: 45,
      resizeMode: 'contain',
    },
    page: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: '#FFF',
    },
    scroll_container: {
      flex: 1,
      marginHorizontal: 5,
      width: '100%'
    },
  });

  
    return (

      <SafeAreaView style={styles.page}>
        <View style={styles.container}>

          <ScrollView style={styles.scroll_container}>
            <View style={styles.internal_container}>
              <Image
                    style={styles.marker_image}
                    source={icons.natourwine_popup}/>
              <Text style={styles.popup_name_text}>
                Termini.....
              </Text>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  
}