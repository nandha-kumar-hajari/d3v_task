import {ParamListBase} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {FC, useState} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import Style from './LoginStyles';
import {TextInputPaper, ButtonPaper} from '../../components';
import {RFValue} from 'react-native-responsive-fontsize';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import * as Webservices from '../../network/Webservices';
import * as getendPoint from '../../network/endPoints';
import Validation from '../../utils/Validation';
import Toast from 'react-native-toast-message';
import * as wpActions from '../../redux/actions';
import {Store} from '../../redux';

const LottieView = require('lottie-react-native');

interface LoginScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
}
const LoginScreen: FC<LoginScreenProps> = ({navigation}: LoginScreenProps) => {
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [buttonLoading, setButtonLoading] = useState(false);

  //For Manual validation
  const [nameErrorText, setNameErrorText] = useState<string>('');
  const [passwordErrorText, setPasswordErrorText] = useState<string>('');

  //Here we implement the validation logic.
  //This will be triggered based on input fields focus and blur states
  const onFormValidation = (fieldName: string, isFocus: boolean) => {
    let errorFields = [];

    //Validation messgae for username will be set to the state when user removes focus from inpit
    if (fieldName === '' || fieldName === 'name') {
      if (!isFocus) {
        // Validating username and it should only be allowing characters
        if (!userName || userName == '' || !Validation.isValidName(userName)) {
          setNameErrorText('Enter Valid Name');
          errorFields.push('name');
        }
      } else {
        setNameErrorText('');
      }
    }
    //Validation messgae for password will be set to the state when user removes focus from inpit
    if (fieldName === '' || fieldName === 'password') {
      if (!isFocus) {
        // Validating password and it will allow characters and numbers not special symbols

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

  //Once the user clicks submit button, we verify if the fields are valid or not.
  //Only if they are valid we make api to login api
  const onPressLogin = () => {
    if (onFormValidation('', false)) {
      setButtonLoading(true);
      Webservices.callPostApi(
        getendPoint.default.LOGIN,
        {
          username: userName,
          password: password,
        },
        '',
      )
        .then(res => {
          //If the response from the API is success, we store the token and userinfo in redux
          //After that we navigate the user to homescreen
          if (res.data && res.status == 200) {
            Store.dispatch(wpActions.saveToken(res.data.token));
            Store.dispatch(wpActions.saveUser(res.data));
          }

          Toast.show({
            type: 'success',
            text1: 'Logged in successfully!',
          });

          setButtonLoading(false);
          navigation.replace('HomeScreen');
        })
        .catch(err => {
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
        {/* Used lottieview for high quality and small sized animations unlike traditional gifs */}
        <LottieView
          source={require('../../assets/animations/verify.json')}
          style={Style.animationStyle}
          autoPlay
          loop
        />
        <Text style={Style.titleStyle}>Welcome Back!</Text>

        <Text style={Style.subTitleStyle}>
          Please Login to enjoy your services.
        </Text>
        {/* Username input */}

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

        {/* Password input */}
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
          testID="login button"
          onPress={onPressLogin}
          loading={buttonLoading}
          text="Login"
          containerViewStyle={{marginVertical: RFValue(15)}}
        />

        {/* If the user doesnt have an account, we ask them to signup */}
        <Text style={Style.signupTextStyle}>Don't have an account yet?</Text>
        <Text
          onPress={() => navigation.navigate('SignupScreen')}
          style={Style.SignupClickTextStyle}>
          Signup
        </Text>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
