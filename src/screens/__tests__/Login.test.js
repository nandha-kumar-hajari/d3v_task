import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import LoginScreen from '../loginComponent/LoginScreen';

jest.mock('react-native-keyboard-aware-scroll-view', () => {
  const KeyboardAwareScrollView = require('react-native').ScrollView;
  return {KeyboardAwareScrollView};
});
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');



it('renders default elements', () => {
  const {getAllByText, getByTestId} = render(<LoginScreen />);
  getByTestId('username input');
  getByTestId('password input');
  getByTestId('login button');
});

//Testing if validation messages show up if we dont give any text in inputs
it('triggers validation', () => {
  const {getByTestId, getByText} = render(<LoginScreen />);
  fireEvent.press(getByTestId('login button'));
  getByText('Enter Valid Name');
  getByText('Enter Valid Password');
});

//Testing if username validation messages show up if we give username with number
it('shows username validation', () => {
  const {getByTestId, getByText} = render(<LoginScreen />);
  fireEvent.changeText(getByTestId('username input'), 'fhfe7h');
  fireEvent.press(getByTestId('login button'));
  getByText('Enter Valid Name');
});

//Testing if password validation messages show up if we give password with special character
it('shows password validation', () => {
  const {getByTestId, getByText} = render(<LoginScreen />);
  fireEvent.changeText(getByTestId('password input'), 'fhfe7hf+==');
  fireEvent.press(getByTestId('login button'));
  getByText('Enter Valid Password');
});

//Handling valid inputs
it('Handling valid input', async () => {
  const {getByTestId, getByText} = render(<LoginScreen />);
  fireEvent.changeText(getByTestId('username input'), 'kminchelle');
  fireEvent.changeText(getByTestId('password input'), '0lelplR');
  fireEvent.press(getByTestId('login button'));
});


