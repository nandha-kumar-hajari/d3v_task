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

const LottieView = require('lottie-react-native');

interface LoginScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
}
const LoginScreen: FC<LoginScreenProps> = ({navigation}: LoginScreenProps) => {
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [buttonLoading, setButtonLoading] = useState(false);

  const onPressLogin = () => {
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
        setButtonLoading(false);

        console.log('Login Api response', res);
      })
      .catch(err => {
        console.log('Login Api err', err);
        setButtonLoading(false);

      });
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
        />

        <TextInputPaper
          value={password}
          label="Password"
          secureTextEntry={true}
          onChangeText={(val: string) => setPassword(val)}
          containerStyle={{marginVertical: RFValue(5)}}
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
