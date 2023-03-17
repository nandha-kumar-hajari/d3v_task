import {Text, View} from 'react-native';
import React from 'react';
import RootNavigator from './src/navigation/RootNavigator';
import {Provider} from 'react-redux';
import {Store} from './src/redux';
export default function App() {
  return (
    <Provider store={Store}>
      <RootNavigator />
    </Provider>
  );
}
