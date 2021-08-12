/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const colorblue = ['#192f6a', '#4c669f', '#3b5998'];
const colorpurp = ['#1d0a28', '#390d4f', '#6b1e72'];

const HomeScreen = ({navigation}) => {
  return (
    <LinearGradient colors={colorpurp} style={styles.linearGradient}>
      <TouchableOpacity
        style={styles.hints}
        onPress={() => navigation.navigate('Stage1')}>
        <Text
          style={{
            fontFamily: 'sans-serif',
            fontSize: 18,
            fontWeight: 'bold',
            color: '#FFFAFA',
          }}>
          {' '}
          Nasıl Çözerim?{' '}
        </Text>
      </TouchableOpacity>
      <View
        style={{
          flex: 10,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#e0e0e0',
          padding: 10,
          margin: 5,
          borderRadius: 50,
        }}>
        <Image
          source={require('../images/Soru1.png')}
          resizeMode="contain"
          style={{flex: 1}}
        />
        <Text style={{fontSize: 16, color: 'black'}}>
          Yukarıdaki şekilde verilen her bir dairenin içine birbirinden
          yazılacaktır. Bu sayıların ikisi şekilde verilmiştir. Bulundukları
          dörtgenin köşelerindeki dairelerde yazan dört sayının çarpımına eşit
          olan A ve B sayıları aralarında asaldır.
        </Text>
        <Text style={{marginTop: 8, fontSize: 16, fontWeight: 'bold'}}>
          {' '}
          Buna göre A + B en az kaçtır?{' '}
        </Text>
      </View>
      <View
        style={{
          flex: 8,
          flexDirection: 'column',
          padding: 10,
        }}>
        <TouchableOpacity style={styles.buttons}>
          <View style={styles.buttonsR}>
            <Text style={styles.texts}>A</Text>
          </View>
          <View style={styles.buttonsS}>
            <Text style={{fontSize: 20}}>162</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttons}>
          <View style={styles.buttonsR}>
            <Text style={styles.texts}>B</Text>
          </View>
          <View style={styles.buttonsS}>
            <Text style={{fontSize: 20}}>191</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttons}>
          <View style={styles.buttonsR}>
            <Text style={styles.texts}>C</Text>
          </View>
          <View style={styles.buttonsS}>
            <Text style={{fontSize: 20}}>258</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttons}>
          <View style={styles.buttonsR}>
            <Text style={styles.texts}>D</Text>
          </View>
          <View style={styles.buttonsS}>
            <Text style={{fontSize: 20}}>289</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttons}>
          <View style={styles.buttonsR}>
            <Text style={styles.texts}>E</Text>
          </View>
          <View style={styles.buttonsS}>
            <Text style={{fontSize: 20}}>302</Text>
          </View>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  texts: {
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'Arial',
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5,
  },
  backside: {
    flex: 1,
    backgroundColor: '#390e50',
  },
  hints: {
    flex: 1,
    backgroundColor: '#4ab562',
    marginRight: 50,
    marginLeft: 50,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsR: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    margin: 2,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 20,
  },
  buttonsS: {
    flex: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    margin: 2,
    borderRadius: 20,
  },
  buttons: {
    flex: 2,
    flexDirection: 'row',
    margin: 5,
    borderRadius: 30,
  },
});

export default HomeScreen;
