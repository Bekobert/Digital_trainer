import React from 'react';
import {View, Text, ScrollView} from 'react-native';

const errors = ['a', 'b', 'c', 'd'];

const ErrorPanel = ({navigation}, errors) => {
  return (
    <ScrollView
      contentContainerStyle={{
        justifyContent: 'center',
      }}>
      {errors.map(error => (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            margin: 10,
            backgroundColor: 'white',
            borderRadius: 10,
            shadowColor: 'black',
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 0.3,
            shadowRadius: 16.0,
            elevation: 10,
          }}>
          <View style={{backgroundColor: 'red'}}>
            <Text>{error}</Text>
          </View>
          <View style={{backgroundColor: 'yellow'}}>
            <Text>{error}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default ErrorPanel;
