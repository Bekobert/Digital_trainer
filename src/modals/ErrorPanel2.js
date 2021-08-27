import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';

//const errors = ['a', 'b', 'c', 'd'];
import {useSelector} from 'react-redux';

const isEqual = (a, b) => JSON.stringify(a) === JSON.stringify(b);

const errorImage = [
  require('../images/SoruA.png'),
  require('../images/SoruB.png'),
  require('../images/SoruC.png'),
  require('../images/SoruD.png'),
  require('../images/SoruE.png'),
];

const errorText = [
  'Bu durumda yeni kesir 10/16 olur.',
  'Bu durumda yeni kesir 11/16 olur.',
  'Doğru Bildiniz. Bu durumda yeni kesir 12/16 olur. Yani 3/4 demektir.',
  'Bu durumda yeni kesir 13/16 olur.',
  'Bu durumda yeni kesir 14/16 olur.',
];

const ErrorPanel2 = ({route, navigation}) => {
  const answer = useSelector(state => state.information);
  const {name} = route.params;
  const [index, setindex] = useState(-1);
  console.log('name = ', name);
  useEffect(() => {
    if (name === '1') setindex(0);
    else if (name === '2') setindex(1);
    else if (name === '3') setindex(2);
    else if (name === '4') setindex(3);
    else if (name === '5') setindex(4);
  });

  console.log('index = ', index);
  return (
    <View
      style={{
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image
          source={errorImage[index]}
          resizeMode="contain"
          style={{
            width: 250,
            height: 250,
          }}
        />
      </View>
      <Text style={{fontSize: 20, marginVertical: 50, marginHorizontal: 20}}>
        {errorText[index]}
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Stage4')}
        style={{
          alignSelf: 'flex-end',
          backgroundColor: '#d8801d',
          marginTop: 12,
          marginBottom: 10,
          marginHorizontal: 10,
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderRadius: 5,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>Tamam</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ErrorPanel2;
