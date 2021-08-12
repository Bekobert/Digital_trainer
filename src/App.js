import React from 'react';
import store from './redux/configureStore';
import {Provider} from 'react-redux';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import FirstStage from './screens/FirstStage';
import SecondStage from './screens/SecondStage';
import ThirdStage from './screens/ThirdStage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
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
          <Stack.Screen name="Stage2" component={SecondStage} />
          <Stack.Screen name="Stage3" component={ThirdStage} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
