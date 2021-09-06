import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import {URL} from 'react-native-url-polyfill';
import WebView from 'react-native-webview';
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
  const {error} = route.params;

  const answer = useSelector(state => state.information);
  const [index, setindex] = useState(-1);

  /*useEffect(() => {
    if (name === '1') setindex(0);
    else if (name === '2') setindex(1);
    else if (name === '3') setindex(2);
    else if (name === '4') setindex(3);
    else if (name === '5') setindex(4);
  });*/

  const renderError = err => {
    const {infoId, _id, text, image} = err;

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
        <View style={{margin: 20}}></View>
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
    <View
      style={{
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {renderError(error)}
      <TouchableOpacity
        onPress={() =>
          navigation.reset({
            index: 0,
            routes: [{name: 'Home'}],
          })
        }
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
