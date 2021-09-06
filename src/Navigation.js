import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import useRedux from './hooks/useRedux';

import HomeScreen from './screens/HomeScreen';
import FirstStage from './screens/FirstStage';
import SecondStage from './screens/SecondStage';
import ThirdStage from './screens/ThirdStage';
import SecondStageProt from './screens/SecondStageProt';
import ErrorPanel from './modals/ErrorPanel';
import ErrorPanel2 from './modals/ErrorPanel2';
import LastStage from './screens/LastStage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();

export default function Navigation() {
  const [isResettingSeenQuestions, setIsResettingSeenQuestions] =
    useState(true);

  useEffect(() => {
    const resetSeenQuestionIds = async () => {
      await AsyncStorage.setItem('SEEN_QUESTION_IDS', '');
      setIsResettingSeenQuestions(false);
    };

    resetSeenQuestionIds();
  }, []);

  if (isResettingSeenQuestions) return <View />;

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
        <Stack.Screen
          name="ErrorPanel"
          component={ErrorPanel}
          options={{presentation: 'modal'}}
        />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Stage1" component={FirstStage} />
        <Stack.Screen
          name="Stage2"
          component={SecondStageProt}
          initialParams={{
            variableName: 'information',
            otherVariableName: 'constraints',
          }}
        />
        <Stack.Screen
          name="Stage3"
          component={SecondStageProt}
          initialParams={{variableName: 'constraints'}}
        />
        <Stack.Screen name="Stage4" component={LastStage} />
        <Stack.Screen
          name="ErrorPanel2"
          component={ErrorPanel2}
          options={{presentation: 'modal'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
