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

const isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

const colorpurp = ['#1d0a28', '#390d4f', '#6b1e72'];

const QuestionImage = '../images/Kat.png';

const Questions = [
  'Arif ile Berk arasındaki kat sayısı',
  'Berk ile Can arasındaki kat sayısı',
  'Her kattaki basamak sayısı kaçtır?',
  'Arif ile Berk arasındaki yaşlar farkı',
];

const quest: Array<IMultiSelectDataTypes> = [
  [
    {
      id: 0,
      value: 'Tektir',
      isChecked: false,
    },
    {
      id: 1,
      value: 'Çifttir',
      isChecked: false,
    },
  ],
  [
    {
      id: 2,
      value: 'Tektir',
      isChecked: false,
    },
    {
      id: 3,
      value: 'Çifttir',
      isChecked: false,
    },
  ],
  [
    {
      id: 4,
      value: '25',
      isChecked: false,
    },
    {
      id: 5,
      value: '27',
      isChecked: false,
    },
    {
      id: 6,
      value: '28',
      isChecked: false,
    },
    {
      id: 7,
      value: 'Böyle bir bilgi yok!',
      isChecked: false,
    },
  ],
  [
    {
      id: 8,
      value: '5',
      isChecked: false,
    },
    {
      id: 9,
      value: '6',
      isChecked: false,
    },
    {
      id: 10,
      value: 'Böyle bir bilgi yok!',
      isChecked: false,
    },
  ],
];

const Wrongs = [
  'Dikkatli okuyun! Arif ile Berk arasında kat sayısı tek olmalıdır.',
  'Soruyu bir daha gözden geçirin! Berk ile Can arasındaki kat sayısı çift olmalıdır.',
  'Her kattaki basamak sayısı ile ilgili bir bilgi soruda geçmemektedir!',
  'Soruda Arif, Berk ve Can ile ilgili yaş bilgisi yoktur!',
];
const corrects = [0, 1, 3, 2];

const SecondStageProt = ({navigation}) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const [isWModalVisible, setWModalVisible] = useState(false);

  const toggleWModal = index => {
    setWModalVisible(!isWModalVisible);
  };

  const [fixindex, setfixindex] = useState(0);
  return (
    <>
      <LinearGradient colors={colorpurp} style={{flex: 1}}>
        <View style={styles.stager}>
          <View style={[styles.stages, {borderColor: 'green'}]} />
          <View style={[styles.stages, {}]} />
          <View style={[styles.stages, {}]} />
          <View style={[styles.stages, {}]} />
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            padding: 15,
            margin: 15,
            borderRadius: 20,
            borderWidth: 8,
            borderColor: '#4ab562',
            //maxWidth: 150,
          }}>
          <Image
            source={require(QuestionImage)}
            resizeMode="stretch"
            style={{
              width: '95%',
              height: 250,
              borderRadius: 10,
            }}
          />
        </View>

        <ScrollView
          style={{
            flex: 6,
            marginTop: 10,

            borderColor: 'white',
          }}
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {Questions.map((question, index) => (
            <View style={{flexDirection: 'row', flex: 0.1}}>
              <TouchableOpacity
                onPress={() => {
                  setfixindex(index);
                  toggleModal();
                }}
                style={{
                  flex: 4,
                  backgroundColor: 'white',
                  borderRadius: 20,
                  margin: 10,
                  //paddingVertical: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 20}}>{question}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <View
          style={{
            flexDirection: 'row',
            flex: 0.3,
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flex: 10,
              flexDirection: 'row',
              backgroundColor: 'transparent',
              borderRadius: 20,
              margin: 10,
            }}>
            <View
              style={{
                flex: 1,
                margin: 6,
                borderRadius: 5,
                backgroundColor: 'transparent',
                borderWidth: 2,
                borderColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Entypo name="check" color="green" size={28}></Entypo>
            </View>
            <View
              style={{
                flex: 1,
                margin: 6,
                borderRadius: 5,
                backgroundColor: 'transparent',
                borderWidth: 2,
                borderColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Entypo name="check" color="green" size={28}></Entypo>
            </View>
            <View
              style={{
                flex: 1,
                margin: 6,
                borderRadius: 5,
                backgroundColor: 'transparent',
                borderWidth: 2,
                borderColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Entypo name="check" color="green" size={28}></Entypo>
            </View>
            <View
              style={{
                flex: 1,
                margin: 6,
                borderRadius: 5,
                backgroundColor: 'transparent',
                borderWidth: 2,
                borderColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Entypo name="check" color="green" size={28}></Entypo>
            </View>
          </View>

          <TouchableOpacity
            style={{
              flex: 4,
              backgroundColor: '#d8801d',

              margin: 10,
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => navigation.navigate('Stage4')}>
            <Text style={{color: '#e0e0e0', fontSize: 20, fontWeight: 'bold'}}>
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
            onSelect={selectedItems =>
              console.log('SelectedItems: ', selectedItems.value)
            }
            onDoneButtonPress={() => {
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

export default SecondStageProt;
