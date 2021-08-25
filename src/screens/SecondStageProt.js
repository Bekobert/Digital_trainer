import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  useWindowDimensions,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import Modal from 'react-native-modal';
// import RNMultiSelect, {
//   IMultiSelectDataTypes,
// } from '@freakycoder/react-native-multiple-select';
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import {useSelector} from 'react-redux';
import MultiSelect from 'react-native-multiple-select';

// const isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

const colorpurp = ['#1d0a28', '#390d4f', '#6b1e72'];

// const QuestionImage = '../images/Kat.png';

// const Questions = [
//   'Arif ile Berk arasındaki kat sayısı',
//   'Berk ile Can arasındaki kat sayısı',
//   'Her kattaki basamak sayısı',
//   'Arif ile Berk arasındaki yaşlar farkı',
// ];

// const quest: Array<IMultiSelectDataTypes> = [
//   [
//     {
//       id: 0,
//       set: 0,
//       value: 'Tektir',
//       isChecked: false,
//     },
//     {
//       id: 1,
//       set: 1,
//       value: 'Çifttir',
//       isChecked: false,
//     },
//   ],
//   [
//     {
//       id: 2,
//       set: 0,
//       value: 'Tektir',
//       isChecked: false,
//     },
//     {
//       id: 3,
//       set: 1,
//       value: 'Çifttir',
//       isChecked: false,
//     },
//   ],
//   [
//     {
//       id: 4,
//       set: 0,
//       value: '25',
//       isChecked: false,
//     },
//     {
//       id: 5,
//       set: 1,
//       value: '27',
//       isChecked: false,
//     },
//     {
//       id: 6,
//       set: 2,
//       value: '28',
//       isChecked: false,
//     },
//     {
//       id: 7,
//       set: 3,
//       value: 'Böyle bir bilgi yok!',
//       isChecked: false,
//     },
//   ],
//   [
//     {
//       id: 8,
//       set: 0,
//       value: '5',
//       isChecked: false,
//     },
//     {
//       id: 9,
//       set: 1,
//       value: '6',
//       isChecked: false,
//     },
//     {
//       id: 10,
//       set: 2,
//       value: 'Böyle bir bilgi yok!',
//       isChecked: false,
//     },
//   ],
// ];

/*const Wrongs = [
  'Dikkatli okuyun! Arif ile Berk arasında kat sayısı tek olmalıdır.',
  'Soruyu bir daha gözden geçirin! Berk ile Can arasındaki kat sayısı çift olmalıdır.',
  'Her kattaki basamak sayısı ile ilgili bir bilgi soruda geçmemektedir!',
  'Soruda Arif, Berk ve Can ile ilgili yaş bilgisi yoktur!',
];*/
// const Wrongs = [
//   {
//     image: '../src/images/9lukKesir.png',
//     text: 'Boyalı 9 tane kare görülmektedir.',
//   },
//   {
//     image: '../src/images/16lıkKesir.png',
//     text: 'Toplam 16 tane kare vardır.',
//   },
//   {
//     image: '../src/images/KesirGösterim.png',
//     text: 'Boyalı karelerin tüm karelerin sayısına bölümü 9/16 kesrini verir.',
//   },
//   {
//     image: '',
//     text: '',
//   },
// ];
// const corrects = [0, 1, 3, 2];

const SecondStageProt = ({navigation}) => {
  const question = useSelector(state => state.question);
  const information = useSelector(state => state.information);

  const {width: deviceWidth} = useWindowDimensions();

  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const [isWModalVisible, setWModalVisible] = useState(false);
  const toggleWModal = index => {
    setWModalVisible(!isWModalVisible);
  };

  const [errorArr, seterrorArr] = useState([]);

  // const [Items, setItems] = useState([]);
  // const [fixindex, setfixindex] = useState(0);

  const defaultNumberOptionValues = information
    .filter(info => info.optionsType === 'Number')
    .map(info => ({_id: info._id, value: ''}));
  const [numberOptionValues, setNumberOptionValues] = useState(
    defaultNumberOptionValues,
  );

  const defaultDropdownOptionValues = information
    .filter(info => info.optionsType === 'Dropdown')
    .map(info => ({_id: info._id, value: []}));
  const [dropdownOptionValues, setDropdownOptionValues] = useState(
    defaultDropdownOptionValues,
  );

  const renderNumberOption = _id => {
    const onChangeText = newValue => {
      const newNumberOptions = numberOptionValues.map(el => ({...el}));
      const foundIndex = newNumberOptions.findIndex(
        numberOption => numberOption._id === _id,
      );

      newNumberOptions[foundIndex].value = newValue;
      console.log('🪲 - newNumberOptions', newNumberOptions);
      setNumberOptionValues(newNumberOptions);
    };

    return (
      <TextInput
        value={
          numberOptionValues.find(numberOption => numberOption._id === _id)
            ?.value
        }
        onChangeText={onChangeText}
        keyboardType="number-pad"
        style={{
          width: 100,
          height: '100%',
          backgroundColor: 'white',
          borderRadius: 5,
          paddingHorizontal: 8,
        }}
      />
    );
  };

  const renderDropdownOption = (dropdownOptions, _id) => {
    const items = dropdownOptions.map(option => ({_id: option, option}));

    const onSelectedItemsChange = newSelectedItems => {
      const newDropdownOptions = dropdownOptionValues.map(el => ({...el}));
      const foundIndex = newDropdownOptions.findIndex(
        dropdownOption => dropdownOption._id === _id,
      );

      newDropdownOptions[foundIndex].value = newSelectedItems;
      console.log('🪲 - newDropdownOptions', newDropdownOptions);
      setDropdownOptionValues(newDropdownOptions);
    };

    return (
      <MultiSelect
        items={items}
        scrollEnabled={false}
        uniqueKey="_id"
        displayKey="option"
        onSelectedItemsChange={onSelectedItemsChange}
        selectedItems={
          dropdownOptionValues.find(
            dropdownOption => dropdownOption._id === _id,
          ).value
        }
        hideTags
        hideSubmitButton
        iconSearch={false}
        searchInputPlaceholderText=""
        selectText=""
        styleMainWrapper={{width: 100}}
      />
    );
  };

  const renderInfo = info => {
    const {_id, text, optionsType, dropdownOptions} = info;

    return (
      <View
        key={_id}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginVertical: 8,
        }}>
        <Text
          style={{
            flexShrink: 1,
            backgroundColor: 'white',
            padding: 8,
            borderRadius: 5,
            overflow: 'hidden',
            marginRight: 12,
          }}>
          {text}
        </Text>

        {optionsType === 'Number'
          ? renderNumberOption(_id)
          : renderDropdownOption(dropdownOptions, _id)}
      </View>
    );
  };

  return (
    <LinearGradient colors={colorpurp} style={styles.linearGradient}>
      <SafeAreaView style={{flex: 1}}>
        <ScrollView contentContainerStyle={{paddingHorizontal: 20}}>
          <View style={styles.stager}>
            <ProgressSteps topOffset={0} marginBottom={0} activeStep={1}>
              <ProgressStep label="Soru Türü"></ProgressStep>
              <ProgressStep
                removeBtnRow={true}
                label="Değişkenler"></ProgressStep>
              <ProgressStep label="Kısıtlar"></ProgressStep>
              <ProgressStep label="Çözüm"></ProgressStep>
            </ProgressSteps>
          </View>

          <View
            style={{
              backgroundColor: 'white',
              borderRadius: 5,
              overflow: 'hidden',
              marginTop: 12,
              paddingVertical: 20,
            }}>
            <Image
              source={{uri: question?.image}}
              resizeMode="contain"
              style={{
                width: '100%',
                height: 250,
              }}
            />
          </View>

          <View style={{marginTop: 20}}>{information.map(renderInfo)}</View>

          {/* <View style={{marginTop: 20}}>
            {information.map((information, index) => (
              <View
                key={information?._id}
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
                    {information?.text}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View> */}

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
            onPress={() => {
              information.forEach(info => {
                errorArr.push(info.text);
              });

              navigation.navigate('ErrorPanel');
            }}>
            <Text style={{color: '#e0e0e0', fontSize: 17, fontWeight: 'bold'}}>
              Tamam
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>

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
          {/**TODO: add multi select */}
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
