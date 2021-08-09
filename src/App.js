import React from 'react';
import store from './redux/configureStore';
import {Provider} from 'react-redux';

export default function App() {
  return <Provider store={store}></Provider>;
}
