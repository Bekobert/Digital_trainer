import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  useWindowDimensions,
  Dimensions,
  TextInput,
  ActivityIndicator,
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

const SecondStageProt = ({navigation, route}) => {
  const {variableName, otherVariableName} = route.params;

  const [errs, seterrs] = useState([]);
  const [isFirstEntry, setIsFirstEntry] = useState(true);

  const [isRModalVisible, setRModalVisible] = useState(false);

  const question = useSelector(state => state.question);
  const variable = useSelector(state => state[variableName]);
  const otherVariable = otherVariableName
    ? useSelector(state => state[otherVariableName])
    : [];

  const defaultNumberOptionValues = variable
    .filter(info => info.optionsType === 'Number')
    .map(info => ({_id: info._id, value: ''}));
  const [numberOptionValues, setNumberOptionValues] = useState(
    defaultNumberOptionValues,
  );

  const defaultDropdownOptionValues = variable
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
          color: 'black',
          width: 100,
          height: '77%',
          backgroundColor: 'white',
          borderRadius: 10,
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
        styleDropdownMenu={{borderRadius: 10}}
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
        <View
          style={{
            borderWidth: 2,
            borderColor: 'white',
            borderRadius: 10,
            width: 15,
            height: 15,
            padding: 6,
            marginRight: 5,
            backgroundColor: isFirstEntry
              ? 'transparent'
              : errs.includes(_id)
              ? 'red'
              : 'green',
          }}
        />
        <Text
          style={{
            flex: 1,
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

  const onPressOkey = () => {
    const errors = [];

    numberOptionValues.map(numberOption => {
      const foundInformation = variable.find(
        info => info._id === numberOption._id,
      );
      if (foundInformation?.correctAnswer !== numberOption.value)
        errors.push({infoId: numberOption._id, ...foundInformation?.error});
    });

    dropdownOptionValues.map(dropdownOption => {
      const foundInformation = variable.find(
        info => info._id === dropdownOption._id,
      );
      console.log(foundInformation?.correctAnswer);
      const parsedCorrectAnswer = JSON.parse(
        foundInformation?.correctAnswer || '[]',
      );

      if (parsedCorrectAnswer.length !== dropdownOption.value.length) {
        errors.push({infoId: dropdownOption._id, ...foundInformation?.error});
        return;
      }

      let isCorrect = true;
      parsedCorrectAnswer.forEach(oneCorrectAnswer => {
        if (!dropdownOption.value.includes(oneCorrectAnswer)) isCorrect = false;
      });

      if (!isCorrect)
        errors.push({infoId: dropdownOption._id, ...foundInformation?.error});
    });

    seterrs(errors.map(err => err.infoId));
    setIsFirstEntry(false);

    const nextPageN = otherVariable.length > 0 ? 'Stage3' : 'Stage4';
    const nextPage = variableName === 'information' ? 'Stage2' : 'Stage3';
    if (errors.length > 0)
      navigation.navigate('ErrorPanel', {errors, nextPage, variableName});
    else {
      setRModalVisible(true);
      setTimeout(() => {
        setRModalVisible(false);
        navigation.navigate(nextPageN);
      }, 2000);
    }
  };

  const [imageHeight, setImageHeight] = useState(0);

  const {width: deviceWidth} = Dimensions.get('window');
  const ImageWidth = (deviceWidth - 20) * 0.9;
  useEffect(() => {
    Image.getSize(question?.image, (imgWidth, imgHeight) => {
      setImageHeight(ImageWidth * (imgHeight / imgWidth));
    });
  }, [question?.image, deviceWidth]);

  return (
    <LinearGradient colors={colorpurp} style={styles.linearGradient}>
      <SafeAreaView style={{flex: 1}}>
        <ScrollView contentContainerStyle={{paddingHorizontal: 20}}>
          <View style={styles.stager}>
            <ProgressSteps
              topOffset={0}
              marginBottom={0}
              activeStep={variableName === 'information' ? 1 : 2}>
              <ProgressStep label="Soru Türü" removeBtnRow></ProgressStep>
              <ProgressStep removeBtnRow label="Değişkenler"></ProgressStep>
              <ProgressStep label="Kısıtlar" removeBtnRow></ProgressStep>
              <ProgressStep label="Çözüm" removeBtnRow></ProgressStep>
            </ProgressSteps>
          </View>

          <View
            style={{
              flex: 10,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
              padding: 10,
              //margin: 10,
              marginTop: 20,
              borderRadius: 10,
              shadowColor: 'white',
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.27,
              shadowRadius: 4.65,

              elevation: 6,
            }}>
            {imageHeight > 0 ? (
              <Image
                source={{uri: question?.image}}
                resizeMode="contain"
                style={{
                  width: ImageWidth,
                  height: imageHeight,
                  borderRadius: 10,
                }}
              />
            ) : (
              <ActivityIndicator size="large" color="#318CE7" />
            )}
          </View>

          <View style={{marginTop: 20}}>{variable.map(renderInfo)}</View>

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
            onPress={onPressOkey}>
            <Text style={{color: '#e0e0e0', fontSize: 17, fontWeight: 'bold'}}>
              Tamam
            </Text>
          </TouchableOpacity>
        </ScrollView>
        <Modal
          isVisible={isRModalVisible}
          animationInTiming={600}
          animationOutTiming={1000}>
          <View
            style={{
              //backgroundColor: '#e0e0e0',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}>
            <View
              style={{
                backgroundColor: '#228B22',
                padding: 60,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden',
              }}>
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: 'bold',
                  //marginBottom: 20,
                  color: '#e0e0e0',
                }}>
                Doğru Cevap!
              </Text>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
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
