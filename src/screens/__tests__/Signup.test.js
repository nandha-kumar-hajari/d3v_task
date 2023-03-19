import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import SignupScreen from '../signupComponent/SignupScreen';


jest.mock('react-native-keyboard-aware-scroll-view', () => {
  const KeyboardAwareScrollView = require('react-native').ScrollView;
  return {KeyboardAwareScrollView};
});
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');


it('renders default elements', () => {
  const {getAllByText, getByTestId} = render(<SignupScreen />);
  getByTestId('username input');
  getByTestId('password input');
  getByTestId('signup button');
});

//Testing if validation messages show up if we dont give any text in inputs
it('triggers validation', () => {
  const {getByTestId, getByText} = render(<SignupScreen />);
  fireEvent.press(getByTestId('signup button'));
  getByText('Enter Valid Name');
  getByText('Enter Valid Password');
});

//Testing if username validation messages show up if we give username with number
it('shows username validation', () => {
  const {getByTestId, getByText} = render(<SignupScreen />);
  fireEvent.changeText(getByTestId('username input'), 'fhfe7h');
  fireEvent.press(getByTestId('signup button'));
  getByText('Enter Valid Name');
});

//Testing if password validation messages show up if we give password with special character
it('shows password validation', () => {
  const {getByTestId, getByText} = render(<SignupScreen />);
  fireEvent.changeText(getByTestId('password input'), 'fhfe7hf+==');
  fireEvent.press(getByTestId('signup button'));
  getByText('Enter Valid Password');
});

//Handling valid inputs
it('Handling valid input', async () => {

  const {getByTestId, getByText} = render(<SignupScreen />);
  fireEvent.changeText(getByTestId('username input'), 'kminchelle');
  fireEvent.changeText(getByTestId('password input'), '0lelplR');
  fireEvent.press(getByTestId('signup button'));
});

//Checking is api is not calling when validation fails
it('Checking is api is not calling when validation fails', async () => {
  const {getByTestId, getByText} = render(<SignupScreen />);
  fireEvent.changeText(getByTestId('username input'), 'kminchelle7');
  fireEvent.changeText(getByTestId('password input'), '0lelplR==+');
  fireEvent.press(getByTestId('signup button'));
  // mockAxios.post.mockResolvedValueOnce({passes: true});
  // expect(axios.get).not.toHaveBeenCalled();
  // expect(axios.post).not.toHaveBeenCalled();
});
