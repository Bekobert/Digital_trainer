import React, {useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';

//const errors = ['a', 'b', 'c', 'd'];
import {useSelector} from 'react-redux';

const errorImage = [
  require('../images/9lukKesir.png'),
  require('../images/16lıkKesir.png'),
  require('../images/KesirGösterim.png'),
  require('../images/Soru2Image.png'),
];

const ErrorPanel = ({navigation}) => {
  const information = useSelector(state => state.information);

  const renderInfo = (info, index) => {
    const {_id, text, optionsType, dropdownOptions, error} = info;

    return (
      <View
        key={_id}
        style={{
          //flex: 1,
          alignItems: 'center',
          width: '90%',
          justifyContent: 'center',
          marginVertical: 15,
          borderRadius: 15,
          backgroundColor: 'white',
          shadowColor: 'black',
          shadowOffset: {
            width: 0,
            height: 10,
          },
          shadowOpacity: 0.3,
          shadowRadius: 16.0,
          elevation: 10,
        }}>
        <View style={{margin: 20}}>
          <Text style={{fontWeight: 'bold'}}>{text}</Text>
        </View>
        <Image
          source={errorImage[index]}
          resizeMode="contain"
          style={{
            width: 250,
            height: 250,
          }}
        />
        <Text
          style={{
            padding: 8,
            borderRadius: 5,
          }}>
          {error.text}
        </Text>
      </View>
    );
  };

  return (
    <ScrollView
      contentContainerStyle={{
        justifyContent: 'center',
      }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          margin: 10,
          backgroundColor: 'transparent',
          borderRadius: 10,
        }}>
        {information.map(renderInfo)}
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Stage3')}
        style={{
          justifyContent: 'flex-end',
          alignItems: 'center',
          backgroundColor: '#d8801d',
          padding: 10,
          margin: 10,
          borderRadius: 5,
          marginLeft: 300,
        }}>
        <Text>Tamam</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ErrorPanel;
