/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FlipCard from 'react-native-flip-card';
import Modal from 'react-native-modal';
import RModal from '../modals/RightModal';
import WModal from '../modals/WrongModal';
//import SquareRoot from '../svg/SquareRoot.svg';

import {SvgUri} from 'react-native-svg';
import {WebView} from 'react-native-webview';

const colorblue = ['#192f6a', '#4c669f', '#3b5998'];
const colorpurp = ['#1d0a28', '#390d4f', '#6b1e72'];

const isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

const Questions = [
  'Bu şekilde boyalı kaç parça vardır?',
  'Bu şekilde toplam kaç parça vardır?',
  'O zaman bu kesir nedir?',
  'Bu kesrin karekökü nedir?',
];
const Answers = [
  ['1', '4', '5', '9', '16'],
  ['9', '12', '16', '18', '20'],
  ['4/9', '9/36', '9/16', '49/64'],
  ['2/3', '3/6', '3/4', '7/8'],
];
const correct = [3, 2, 2, 2];

const SecondStage = ({navigation}) => {
  const [isRModalVisible, setRModalVisible] = useState(false);

  const toggleRModal = () => {
    setRModalVisible(!isRModalVisible);
  };

  const [isWModalVisible, setWModalVisible] = useState(false);

  const toggleWModal = () => {
    setWModalVisible(!isWModalVisible);
  };
  const [count, setcount] = useState(0);

  return (
    <>
      <LinearGradient colors={colorpurp} style={styles.linearGradient}>
        <View style={styles.stager}>
          <ProgressSteps topOffset={0} marginBottom={0}>
            <ProgressStep label="Soru Türü"></ProgressStep>
            <ProgressStep label="Değişkenler"></ProgressStep>
            <ProgressStep label="Kısıtlar"></ProgressStep>
            <ProgressStep label="Çözüm"></ProgressStep>
          </ProgressSteps>
        </View>
        <TouchableOpacity
          onPress={() => {}}
          style={{
            flex: 8,
            margin: 20,
            borderRadius: 20,
            backgroundColor: '#d8801d',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 20}}>{Questions[count]}</Text>
        </TouchableOpacity>
        <View style={{flex: 8, flexDirection: 'column', padding: 10}}>
          {Answers[count].map((answer, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.buttons,
                {
                  borderWidth: 5,
                  borderColor: 'transparent',
                },
              ]}
              onPress={() => {
                console.log(correct[count], '  :  ', index);
                if (isEqual(correct[count], index)) {
                  toggleRModal();

                  console.log(count, ': count');
                } else {
                  toggleWModal();
                }
              }}>
              <View style={styles.buttonsS}>
                <Text style={{fontSize: 20}}>{answer}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <View style={{flex: 2, backgroundColor: 'transparent'}}></View>
      </LinearGradient>
      <Modal
        isVisible={isWModalVisible}
        animationInTiming={600}
        animationOutTiming={1000}
        onBackdropPress={() => {
          setWModalVisible(false);
        }}>
        <WModal></WModal>
      </Modal>
      <Modal
        isVisible={isRModalVisible}
        animationInTiming={600}
        animationOutTiming={1000}
        onBackdropPress={() => {
          setRModalVisible(false);
          setcount(count + 1);
        }}>
        <RModal></RModal>
      </Modal>
    </>
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
    //justifyContent: 'flex-start',
    //alignItems: 'center',
  },
  stager: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
    marginRight: 50,
    marginLeft: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsS: {
    flex: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
  },
  buttons: {
    flex: 1,
    flexDirection: 'row',
    margin: 5,
    borderRadius: 30,
  },
});

export default SecondStage;
