import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import React, {FC} from 'react';
import {LoginScreen} from '../screens';
import SignupScreen from '../screens/signupComponent/SignupScreen';
const Stack = createNativeStackNavigator();

const RootNavigator: FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="LoginScreen">
        <Stack.Screen name={'LoginScreen'} component={LoginScreen} />
        <Stack.Screen name={'SignupScreen'} component={SignupScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
