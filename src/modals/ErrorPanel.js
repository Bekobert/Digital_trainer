import React from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import {URL} from 'react-native-url-polyfill';
import WebView from 'react-native-webview';

//const errors = ['a', 'b', 'c', 'd'];
import {useSelector} from 'react-redux';

const ErrorPanel = ({navigation, route}) => {
  const {errors, nextPage, variableName} = route.params;
  const variable = useSelector(state => state[variableName]);

  const renderError = err => {
    const {infoId, _id, text, image} = err;

    const info = variable.find(info => info._id === infoId);
    const {text: variableText} = info;

    const renderErrorImage = () => {
      const imageUrl = new URL(image);
      const splittedImagePath = imageUrl.pathname.split('.');
      const imageType = splittedImagePath[splittedImagePath.length - 1];

      return imageType === 'svg' ? (
        <WebView
          scalesPageToFit={false}
          originWhitelist={['*']}
          domStorageEnabled={true}
          source={{uri: image}}
          androidHardwareAccelerationDisabled
          style={{
            width: 250,
            height: 250,
          }}
        />
      ) : (
        <Image
          source={{uri: image}}
          resizeMode="contain"
          style={{
            width: 250,
            height: 250,
          }}
        />
      );
    };

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
          <Text style={{fontWeight: 'bold'}}>{variableText}</Text>
        </View>
        {image && renderErrorImage()}
        <Text
          style={{
            padding: 8,
            borderRadius: 5,
          }}>
          {text}
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
        {errors.map(renderError)}
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate(nextPage)}
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
    </ScrollView>
  );
};

export default ErrorPanel;
