import React, {useRef, useEffect, useState} from 'react';
import {View, Text, Animated, Easing} from 'react-native';
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
  const moveVal = useState(new Animated.Value(0))[0];

  function moveY() {
    Animated.timing(moveVal, {
      toValue: -40,
      duration: 1000,
      //easing: Easing.bounce,
      useNativeDriver: true,
    }).start(() =>
      Animated.timing(moveVal, {
        toValue: 0,
        duration: 2000,
        easing: Easing.bounce,
        useNativeDriver: true,
      }).start(),
    );
  }
  moveY();
  return (
    <View
      style={{
        flex: 0.4,
        backgroundColor: '#e0e0e0',
        justifyContent: 'center',
        //alignItems: 'center',

        borderRadius: 50,
      }}>
      <View style={{flex: 1, backgroundColor: 'transparent'}}></View>
      <FadeInView
        style={{
          flex: 5,
          backgroundColor: '#228B22',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Animated.View style={[{transform: [{translateY: moveVal}]}]}>
          <Fontisto
            name="like"
            size={60}
            color="white"
            style={{margin: 20}}></Fontisto>
        </Animated.View>
        <Text style={{fontSize: 40, color: 'white', fontWeight: 'bold'}}>
          DOĞRU
        </Text>
      </FadeInView>
      <View style={{flex: 1, backgroundColor: 'transparent'}}></View>
    </View>
  );
}

export default RightModal;
