import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import {NativeBaseProvider, Box} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import Modal from 'react-native-modal';
import RNMultiSelect, {
  IMultiSelectDataTypes,
} from '@freakycoder/react-native-multiple-select';
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import {useSelector} from 'react-redux';

const isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

const colorpurp = ['#1d0a28', '#390d4f', '#6b1e72'];

const QuestionImage = '../images/Kat.png';

const Questions = [
  'Arif ile Berk arasındaki kat sayısı',
  'Berk ile Can arasındaki kat sayısı',
  'Her kattaki basamak sayısı',
  'Arif ile Berk arasındaki yaşlar farkı',
];

const quest: Array<IMultiSelectDataTypes> = [
  [
    {
      id: 0,
      set: 0,
      value: 'Tektir',
      isChecked: false,
    },
    {
      id: 1,
      set: 1,
      value: 'Çifttir',
      isChecked: false,
    },
  ],
  [
    {
      id: 2,
      set: 0,
      value: 'Tektir',
      isChecked: false,
    },
    {
      id: 3,
      set: 1,
      value: 'Çifttir',
      isChecked: false,
    },
  ],
  [
    {
      id: 4,
      set: 0,
      value: '25',
      isChecked: false,
    },
    {
      id: 5,
      set: 1,
      value: '27',
      isChecked: false,
    },
    {
      id: 6,
      set: 2,
      value: '28',
      isChecked: false,
    },
    {
      id: 7,
      set: 3,
      value: 'Böyle bir bilgi yok!',
      isChecked: false,
    },
  ],
  [
    {
      id: 8,
      set: 0,
      value: '5',
      isChecked: false,
    },
    {
      id: 9,
      set: 1,
      value: '6',
      isChecked: false,
    },
    {
      id: 10,
      set: 2,
      value: 'Böyle bir bilgi yok!',
      isChecked: false,
    },
  ],
];

const Wrongs = [
  {
    image: '../src/images/9lukKesir.png',
    text: 'Boyalı 9 tane kare görülmektedir.',
  },
  {
    image: '../src/images/16lıkKesir.png',
    text: 'Toplam 16 tane kare vardır.',
  },
];
const corrects = [0, 1, 3, 2];

const ThirdStage = ({navigation}) => {
  const question = useSelector(state => state.question);
  const constraint = useSelector(state => state.constraint);

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const [isWModalVisible, setWModalVisible] = useState(false);

  const toggleWModal = index => {
    setWModalVisible(!isWModalVisible);
  };
  const [Items, setItems] = useState([]);
  const [fixindex, setfixindex] = useState(0);
  return (
    <>
      <LinearGradient colors={colorpurp} style={styles.linearGradient}>
        <ScrollView>
          <View style={styles.stager}>
            <ProgressSteps topOffset={0} marginBottom={0} activeStep={2}>
              <ProgressStep label="Soru Türü"></ProgressStep>
              <ProgressStep label="Değişkenler"></ProgressStep>
              <ProgressStep removeBtnRow={true} label="Kısıtlar"></ProgressStep>
              <ProgressStep label="Çözüm"></ProgressStep>
            </ProgressSteps>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
              padding: 10,
              margin: 5,
              borderRadius: 40,
              //borderWidth: 8,
              //borderColor: '#4ab562',
              //maxWidth: 150,
            }}>
            <Image
              source={{uri: question?.image}}
              resizeMode="stretch"
              style={{
                width: '95%',
                height: 250,
                borderRadius: 10,
              }}
            />
          </View>
          <View style={{marginTop: 20}}>
            {Questions.map((constraint, index) => (
              <View
                key={constraint?._id}
                style={{flexDirection: 'row', flex: 0.1}}>
                <TouchableOpacity
                  onPress={() => {
                    setfixindex(index);
                    toggleModal();
                  }}
                  style={{
                    flex: 5,
                    flexDirection: 'row',
                    backgroundColor: '#e0e0e0',
                    borderRadius: 5,
                    margin: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      paddingVertical: 6,
                      flex: 0.5,
                      margin: 5,
                      backgroundColor: 'transparent',
                      borderRadius: 2,
                      borderWidth: 2,
                      borderColor: 'green',
                    }}></View>
                  <Text style={{flex: 15, fontSize: 17, marginLeft: 10}}>
                    {constraint?.text}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
        <View style={{margin: 10}}>
          <TouchableOpacity
            style={{
              alignSelf: 'flex-end',
              backgroundColor: '#d8801d',
              marginTop: 12,
              marginBottom: 10,
              paddingHorizontal: 10,
              paddingVertical: 10,
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => navigation.navigate('Stage4')}>
            <Text style={{color: '#e0e0e0', fontSize: 17, fontWeight: 'bold'}}>
              Tamam
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
      <Modal
        isVisible={isModalVisible}
        animationInTiming={600}
        animationOutTiming={1000}
        onBackdropPress={() => setModalVisible(false)}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 50,
          }}>
          <RNMultiSelect
            darkMode={false}
            doneButtonTextStyle={{
              color: '#e0e0e0',
              fontSize: 20,
              fontWeight: 'bold',
            }}
            buttonContainerStyle={{backgroundColor: '#d8801d'}}
            menuBarContainerStyle={{backgroundColor: '#e0e0e0'}}
            doneButtonContainerStyle={{backgroundColor: 'red'}}
            placeholder="Seçiniz"
            menuItemTextStyle={{fontSize: 22}}
            doneButtonText="Tamam"
            data={quest[fixindex]}
            onSelect={selectedItems => {
              //console.log('SelectedItems: ', selectedItems);
              Items.push(selectedItems);
            }}
            onDoneButtonPress={() => {
              console.log(Items),
                selectedItems.forEach(element => {
                  console.log(element.id);
                });
              /*Items.map(Item => {
                console.log(corrects[fixindex], ' ::::: ', Item[fixindex].set);
                if (isEqual(corrects[fixindex], Item[fixindex])) {
                  console.log('openmid');
                }
              });*/
              toggleModal();
            }}>
            Tamam
          </RNMultiSelect>
        </View>
      </Modal>
      <Modal
        isVisible={isWModalVisible}
        animationInTiming={600}
        animationOutTiming={1000}
        onBackdropPress={() => setWModalVisible(false)}>
        <View
          style={{
            flex: 0.3,
            backgroundColor: '#e0e0e0',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 50,
          }}>
          <View
            style={{
              backgroundColor: '#B22222',
              padding: 30,
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 30,
                fontWeight: 'bold',
                marginBottom: 20,
                color: '#e0e0e0',
              }}></Text>
          </View>
        </View>
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

export default ThirdStage;
