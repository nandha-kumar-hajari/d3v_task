import {ParamListBase} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {FC, useState} from 'react';
import {Text, SafeAreaView} from 'react-native';
import Style from './SignupStyles';
import {TextInputPaper, ButtonPaper} from '../../components';
import {RFValue} from 'react-native-responsive-fontsize';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Validation from '../../utils/Validation';
import Toast from 'react-native-toast-message';

import * as Webservices from '../../network/Webservices';
import * as getendPoint from '../../network/endPoints';
const LottieView = require('lottie-react-native');

interface SignupScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
}
const SignupScreen: FC<SignupScreenProps> = ({
  navigation,
}: SignupScreenProps) => {
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [buttonLoading, setButtonLoading] = useState(false);

  //For Manual validation
  const [nameErrorText, setNameErrorText] = useState<string>('');
  const [passwordErrorText, setPasswordErrorText] = useState<string>('');

  //Triggering Validation based on input fields onBlur and Focus states
  const onFormValidation = (fieldName: string, isFocus: boolean) => {
    let errorFields = [];

    if (fieldName === '' || fieldName === 'name') {
      if (!isFocus) {
        if (!userName || userName == '' || !Validation.isValidName(userName)) {
          setNameErrorText('Enter Valid Name');
          errorFields.push('name');
        }
      } else {
        setNameErrorText('');
      }
    }

    if (fieldName === '' || fieldName === 'password') {
      if (!isFocus) {
        if (
          !password ||
          password == '' ||
          !Validation.isValidPassword(password)
        ) {
          setPasswordErrorText('Enter Valid Password');
          errorFields.push('password');
        }
      } else {
        setPasswordErrorText('');
      }
    }

    return !(errorFields.length > 0);
  };

  //Checking validation status, only if the fields are valid, we trigger the signup api
  const onPressSignup = () => {
    if (onFormValidation('', false)) {
      setButtonLoading(true);
      Webservices.callPostApi(
        getendPoint.default.SIGNUP,
        {
          username: userName,
          password: password,
        },
        '',
      )
        .then(res => {
          console.log('Signup Api response', res);

          Toast.show({
            type: 'success',
            text1: 'Signup successful!',
            text2: 'Please login to continue using the app',
          });
          navigation.goBack();
          setButtonLoading(false);
        })
        .catch(err => {
          console.log('Signup Api err', err.response);
          let response = err.response;
          if (response.data?.message) {
            Toast.show({
              type: 'error',
              text1: response.data.message
                ? response.data.message
                : 'Some error occured',
            });
          }
          setButtonLoading(false);
        });
    }
  };

  return (
    <SafeAreaView style={Style.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={Style.scrollContainer}
        showsVerticalScrollIndicator={false}>
          {/* Lottieview for animations */}
        <LottieView
          source={require('../../assets/animations/welcome.json')}
          style={Style.animationStyle}
          autoPlay
          loop
        />
        <Text style={Style.titleStyle}>Hello!</Text>

        <Text style={Style.subTitleStyle}>
          Please Signup to make most out of this app.
        </Text>
        <TextInputPaper
          testID="username input"
          value={userName}
          label="Username"
          onChangeText={(val: string) => setUserName(val)}
          containerStyle={{marginVertical: RFValue(5)}}
          handleBlur={() => {
            onFormValidation('name', false);
          }}
          handleFocus={() => {
            onFormValidation('name', true);
          }}
          error={nameErrorText}
        />

        <TextInputPaper
          testID="password input"
          value={password}
          label="Password"
          secureTextEntry={true}
          onChangeText={(val: string) => setPassword(val)}
          containerStyle={{marginVertical: RFValue(5)}}
          handleBlur={() => {
            onFormValidation('password', false);
          }}
          handleFocus={() => {
            onFormValidation('password', true);
          }}
          error={passwordErrorText}
        />
        <ButtonPaper
          testID="signup button"
          onPress={onPressSignup}
          loading={buttonLoading}
          text="Signup"
          containerViewStyle={{marginVertical: RFValue(15)}}
        />

        <Text style={Style.signupTextStyle}>Already have an account?</Text>
        <Text onPress={()=>navigation.goBack()} style={Style.SignupClickTextStyle}>{'<'} Back to Login </Text>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SignupScreen;
