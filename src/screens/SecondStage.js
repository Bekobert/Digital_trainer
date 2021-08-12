/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FlipCard from 'react-native-flip-card';
import Entypo from 'react-native-vector-icons/Entypo';

const colorblue = ['#192f6a', '#4c669f', '#3b5998'];
const colorpurp = ['#1d0a28', '#390d4f', '#6b1e72'];

const SecondStage = ({navigation}) => {
  const [checked, setChecked] = React.useState('first');

  const [s1color, sets1color] = useState({borderColor: '#008000'});
  const [s2color, sets2color] = useState({borderColor: '#cfbc22'});
  const [s3color, sets3color] = useState({borderColor: '#cfbc22'});
  const [s4color, sets4color] = useState({borderColor: '#cfbc22'});

  const [count, setcount] = useState(0);
  const [button, setbutton] = useState(0);

  const [b1select, setb1select] = useState({});
  const [b2select, setb2select] = useState({});
  const [b3select, setb3select] = useState({});
  const [b4select, setb4select] = useState({});
  const [b5select, setb5select] = useState({});

  function ats(count) {
    switch (count) {
      case 0:
        sets1color({borderColor: '#008000'});
        break;
      case 1:
        sets2color({borderColor: '#008000'});
        break;
      case 2:
        sets3color({borderColor: '#008000'});
        break;
      case 3:
        sets4color({borderColor: '#008000'});
        break;
      default:
        sets1color({borderColor: '#cfbc22'});
        sets2color({borderColor: '#cfbc22'});
        sets3color({borderColor: '#cfbc22'});
        sets4color({borderColor: '#cfbc22'});
        break;
    }
  }

  const [b1, setb1] = useState(false);
  const [b2, setb2] = useState(false);
  const [b3, setb3] = useState(false);
  const [b4, setb4] = useState(false);
  const [b5, setb5] = useState(false);

  function atsb(button) {
    switch (button) {
      case 1:
        b1
          ? setb1select({backgroundColor: 'green'})
          : setb1select({backgroundColor: 'white'});
        setb1(!b1);
        break;
      case 2:
        b2
          ? setb2select({borderWidth: 5, borderColor: 'green'})
          : setb2select({borderWidth: 0, borderColor: 'green'});
        setb2(!b2);
        break;
      case 3:
        b3
          ? setb3select({borderWidth: 5, borderColor: 'green'})
          : setb3select({borderWidth: 0, borderColor: 'green'});
        setb3(!b3);
        break;
      case 4:
        b4
          ? setb4select({borderWidth: 5, borderColor: 'green'})
          : setb4select({borderWidth: 0, borderColor: 'green'});
        setb4(!b4);
        break;
      case 5:
        b5
          ? setb5select({borderWidth: 5, borderColor: 'green'})
          : setb5select({borderWidth: 0, borderColor: 'green'});
        setb5(!b5);
        break;

      default:
        break;
    }
  }

  return (
    <LinearGradient colors={colorpurp} style={styles.linearGradient}>
      <View style={styles.stager} onPress={() => navigation.navigate('Stage1')}>
        <View style={[styles.stages, s1color]} />
        <View style={[styles.stages, s2color]} />
        <View style={[styles.stages, s3color]} />
        <View style={[styles.stages, s4color]} />
      </View>
      <FlipCard
        friction={6}
        perspective={1000}
        flipHorizontal={true}
        flipVertical={false}
        flip={false}
        clickable={true}
        onFlipEnd={isFlipEnd => {
          console.log('isFlipEnd', isFlipEnd);
        }}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#d8801d',
          padding: 10,
          margin: 5,
          borderRadius: 50,
          shadowColor: 'white',
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.53,
          shadowRadius: 13.97,

          elevation: 21,
        }}
        onPress={() => {
          ats(count);
          setcount((count + 1) % 5);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            maxWidth: 350,
          }}>
          <Image
            source={require('../images/Stage22.png')}
            resizeMode="contain"
            style={{flex: 4}}
          />

          <Text
            style={{
              marginTop: 2,
              fontSize: 20,
              fontWeight: 'bold',
              color: 'black',
            }}>
            {' '}
            İki sayı aralarında asal ise tek ortak bölenleri 1 olmalıdır. Buna
            göre şekilde soru işareti yerine ne gelmelidir?{' '}
          </Text>
        </View>

        <View
          style={{
            flex: 1,
            maxWidth: 350,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('../images/Soru1.png')}
            resizeMode="contain"
            style={{flex: 1}}
          />
          <Text
            style={{
              fontSize: 16,
              color: 'black',
            }}>
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
      </FlipCard>
      <View
        style={{
          flex: 0.8,
          flexDirection: 'column',
          padding: 10,
        }}>
        <TouchableOpacity
          style={[styles.buttons, b1select]}
          onPress={() => {
            atsb(1);
            navigation.navigate('Stage3');
          }}>
          <View style={[styles.buttonsS, b1select]}>
            <Text style={{fontSize: 20}}>1</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttons, b2select]}
          onPress={() => {
            atsb(2);
          }}>
          <View style={styles.buttonsS}>
            <Text style={{fontSize: 20}}>2</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttons, b3select]}
          onPress={() => {
            atsb(3);
          }}>
          <View style={styles.buttonsS}>
            <Text style={{fontSize: 20}}>3</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttons, b4select]}
          onPress={() => {
            atsb(4);
          }}>
          <View style={styles.buttonsS}>
            <Text style={{fontSize: 20}}>5</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttons, b5select]}
          onPress={() => {
            atsb(5);
          }}>
          <View style={styles.buttonsS}>
            <Text style={{fontSize: 20}}>7</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 0.16,
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        <Entypo name="forward" size={16}></Entypo>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  stages: {
    flex: 1,
    padding: 10,
    margin: 4,
    //backgroundColor: '#4ab562',
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#cfbc22',
  },
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
  stager: {
    flex: 0.1,
    flexDirection: 'row',
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

export default SecondStage;
