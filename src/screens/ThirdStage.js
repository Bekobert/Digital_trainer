import React, {useState} from 'react';
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
import {NativeBaseProvider, Box} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import Modal from 'react-native-modal';
import RNMultiSelect, {
  IMultiSelectDataTypes,
} from '@freakycoder/react-native-multiple-select';
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import MultiSelect from 'react-native-multiple-select';
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
  const [constraint, setconstraint] = useState(
    constraint === undefined ? {} : useSelector(state => state.constraint),
  );

  const defaultNumberOptionValues = constraint
    .filter(ctr => ctr.optionsType === 'Number')
    .map(ctr => ({_id: ctr._id, value: ''}));
  const [numberOptionValues, setNumberOptionValues] = useState(
    defaultNumberOptionValues,
  );

  const defaultDropdownOptionValues = constraint
    .filter(ctr => ctr.optionsType === 'Dropdown')
    .map(ctr => ({_id: ctr._id, value: []}));
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

  const renderCtr = ctr => {
    const {_id, text, optionsType, dropdownOptions} = ctr;

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

  const onPressOkey = () => {
    const errors = [];

    numberOptionValues.map(numberOption => {
      const foundConstraint = constraint.find(
        ctr => ctr._id === numberOption._id,
      );
      if (foundInformation?.correctAnswer !== numberOption.value)
        errors.push({infoId: numberOption._id, ...foundConstraint?.error});
    });

    dropdownOptionValues.map(dropdownOption => {
      const foundConstraint = constraint.find(
        ctr => ctr._id === dropdownOption._id,
      );
      console.log(foundConstraint?.correctAnswer);
      const parsedCorrectAnswer = JSON.parse(
        foundConstraint?.correctAnswer || '[]',
      );

      if (parsedCorrectAnswer.length !== dropdownOption.value.length) {
        errors.push({infoId: dropdownOption._id, ...foundConstraint?.error});
        return;
      }

      let isCorrect = true;
      parsedCorrectAnswer.forEach(oneCorrectAnswer => {
        if (!dropdownOption.value.includes(oneCorrectAnswer)) isCorrect = false;
      });

      if (!isCorrect)
        errors.push({infoId: dropdownOption._id, ...foundConstraint?.error});
    });

    if (errors.length > 0) navigation.navigate('ErrorPanel', {errors});
    // navigation.navigate('ErrorPanel', {errors});
  };

  return (
    <LinearGradient colors={colorpurp} style={styles.linearGradient}>
      <SafeAreaView style={{flex: 1}}>
        <ScrollView contentContainerStyle={{paddingHorizontal: 20}}>
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

          <View style={{marginTop: 20}}>{information.map(renderCtr)}</View>

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

export default ThirdStage;
