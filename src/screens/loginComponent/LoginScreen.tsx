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
import {useDispatch} from 'react-redux';
import * as wpActions from '../../redux/actions';

const LottieView = require('lottie-react-native');

interface LoginScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
}
const LoginScreen: FC<LoginScreenProps> = ({navigation}: LoginScreenProps) => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [buttonLoading, setButtonLoading] = useState(false);

  //For Manual validation
  const [nameErrorText, setNameErrorText] = useState<string>('');
  const [passwordErrorText, setPasswordErrorText] = useState<string>('');

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
          console.log('Login Api response', res);
          if (res.data && res.status == 200) {
            dispatch(wpActions.saveToken(res.data.token));
            dispatch(wpActions.saveUser(res.data))
          }

          Toast.show({
            type: 'success',
            text1: 'Logged in successfully!',
          });

          setButtonLoading(false);
          navigation.replace("HomeScreen")
        })
        .catch(err => {
          console.log('Login Api err', err.response);
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
        <TextInputPaper
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
          onPress={onPressLogin}
          loading={buttonLoading}
          text="Login"
          containerViewStyle={{marginVertical: RFValue(15)}}
        />

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
