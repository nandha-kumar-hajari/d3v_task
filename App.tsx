import {Text, View} from 'react-native';
import React from 'react';
import RootNavigator from './src/navigation/RootNavigator';
import {Provider} from 'react-redux';
import {Store,persistor} from './src/redux';
import {PersistGate} from 'redux-persist/integration/react';
export default function App() {
  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
        <RootNavigator />
      </PersistGate>
    </Provider>
  );
}
