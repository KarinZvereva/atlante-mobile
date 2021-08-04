import React from 'react';
import {View, StyleSheet, Text, Image, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import {Header} from '../../common/components/Header/Header';
import {images} from '../../common/constants';

const styles = StyleSheet.create({
  page: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFF',
  },  
  scroll_container: {
    flex: 1,
    marginHorizontal: 10,
  },
  centered_container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    top: 10,
  },
  scrollview: {
    flexGrow: 1,
  },
  logo: {
    height: 80,
    width: 80,
    resizeMode: 'center',
    position: 'relative',
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    justifyContent: 'center',
    textAlign: 'center',
    fontFamily: 'Novecentosanswide-Normal',
  },
});

export function Info(props: any) {
  return (
    <SafeAreaView style={styles.page}>
      <Header {...props} showName="Info" />
      <ScrollView style={styles.scroll_container}> 
        <View style={styles.centered_container}>
          <Image source={images.logo_calice} style={styles.logo} />
          <Text style={[styles.infoText]}>
            Il contenuto di questa app è frutto
          </Text>
          <Text style={[styles.infoText]}>
            del lavoro di bevitori appassionati
          </Text>
          <Text style={[styles.infoText, { marginBottom: 10 }]}>
            di Vino Naturale.
          </Text>
          <Text style={[styles.infoText]}>
            La lista delle cantine è stata in larga parte
          </Text>
          <Text style={[styles.infoText]}>
            ottenuta grazie al contributo degli utenti
          </Text>
          <Text style={[styles.infoText, { marginBottom: 10 }]}>
            del gruppo Facebook Be.Vi.Amo Naturale.
          </Text>
          <Text style={[styles.infoText]}>
            Abbiamo utilizzato un metodo di selezione
          </Text>
          <Text style={[styles.infoText]}>
            inclusivo, che tenesse conto dei diversi
          </Text>
          <Text style={[styles.infoText, { marginBottom: 10 }]}>
            disciplinari delle Associazioni esistenti.
          </Text>
          <Text style={[styles.infoText]}>
            In vigna: no pesticidi e prodotti di sintesi
          </Text>
          <Text style={[styles.infoText]}>
            raccolta manuale delle uve.
          </Text>
          <Text style={[styles.infoText]}>
            In cantina: no lieviti selezionati, no chiarifica,
          </Text>
          <Text style={[styles.infoText]}>
            no filtrazione sterile, no coadiuvanti e additivi,
          </Text>
          <Text style={[styles.infoText]}>
            no trattamenti fisici e termici invasivi,
          </Text>
          <Text style={[styles.infoText, { marginBottom: 10 }]}>
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
          <Text style={[styles.infoText, { marginBottom: 10 }]}>
            è il benvenuto, ci contatti.
          </Text>
          <Text style={[styles.infoText]}>
            Per la sua stessa genesi ed a causa della
          </Text>
          <Text style={[styles.infoText]}>
            grande vitalità del settore, la app sarà in
          </Text>
          <Text style={[styles.infoText, { marginBottom: 10 }]}>
            in continua evoluzione.
          </Text>
          <Text style={[styles.infoText]}>
            Se anche tu, Bevitore Errante,
          </Text>
          <Text style={[styles.infoText]}>
            desideri contribuire, condividi le
          </Text>
          <Text style={[styles.infoText]}>
            tue conoscenze con lo
          </Text>
          <Text style={[styles.infoText, { marginBottom: 10 }]}>
            staff di NaTourWine.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}