import React, {useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import useRedux from './hooks/useRedux';

import HomeScreen from './screens/HomeScreen';
import FirstStage from './screens/FirstStage';
import SecondStage from './screens/SecondStage';
import ThirdStage from './screens/ThirdStage';
import SecondStageProt from './screens/SecondStageProt';
import LastStage from './screens/LastStage';
import {useSelector} from 'react-redux';

const Stack = createStackNavigator();

export default function Navigation() {
  const {dispatchAction, $} = useRedux();

  const questionLoading = useSelector(state => state.questionLoading);

  useEffect(() => {
    dispatchAction($.getRandomQuestion());
  }, []);

  if (questionLoading)
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <ActivityIndicator size="large" />
      </View>
    );

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          headerMode: 'screen',
          headerTintColor: 'white',
          headerStyle: {backgroundColor: 'tomato'},
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Stage1" component={FirstStage} />
        <Stack.Screen name="Stage2" component={SecondStageProt} />
        <Stack.Screen name="Stage3" component={ThirdStage} />
        <Stack.Screen name="Stage4" component={LastStage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}