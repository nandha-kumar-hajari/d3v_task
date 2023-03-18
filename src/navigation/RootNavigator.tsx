import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import React, {FC} from 'react';
import {LoginScreen, SignupScreen, HomeScreen} from '../screens';
import Toast from 'react-native-toast-message';
import {useSelector} from 'react-redux';

const Stack = createNativeStackNavigator();

const RootNavigator: FC = () => {
  const token = useSelector(state => state.appData.token);
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            gestureEnabled: false,
          }}>
          {token ? (
            <>
              <Stack.Screen name={'HomeScreen'} component={HomeScreen} />
              <Stack.Screen name={'LoginScreen'} component={LoginScreen} />
              <Stack.Screen name={'SignupScreen'} component={SignupScreen} />
            </>
          ) : (
            <>
              <Stack.Screen name={'LoginScreen'} component={LoginScreen} />
              <Stack.Screen name={'SignupScreen'} component={SignupScreen} />
              <Stack.Screen name={'HomeScreen'} component={HomeScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
};

export default RootNavigator;
