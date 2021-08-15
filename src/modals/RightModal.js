import React, {useRef, useEffect} from 'react';
import {View, Text, Animated} from 'react-native';
import Modal from 'react-native-modal';
import Fontisto from 'react-native-vector-icons/Fontisto';

const FadeInView = props => {
  const move = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(move, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, [move]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: move, // Bind opacity to animated value
      }}>
      {props.children}
    </Animated.View>
  );
};

function RightModal() {
  return (
    <View
      style={{
        flex: 0.5,
        backgroundColor: 'white',
        justifyContent: 'center',
        //alignItems: 'center',

        borderRadius: 50,
      }}>
      <View style={{flex: 1, backgroundColor: 'transparent'}}></View>
      <FadeInView
        style={{
          flex: 5,
          backgroundColor: 'green',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Fontisto
          name="like"
          size={60}
          color="white"
          style={{margin: 20}}></Fontisto>
        <Text style={{fontSize: 40, color: 'white', fontWeight: 'bold'}}>
          DOĞRU
        </Text>
      </FadeInView>
      <View style={{flex: 1, backgroundColor: 'transparent'}}></View>
    </View>
  );
}

export default RightModal;
