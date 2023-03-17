import {ParamListBase} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {FC, useState} from 'react';
import { Text, SafeAreaView} from 'react-native';
import Style from './SignupStyles';
import {TextInputPaper, ButtonPaper} from '../../components';
import {RFValue} from 'react-native-responsive-fontsize';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const LottieView = require('lottie-react-native');

interface SignupScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
}
const SignupScreen: FC<SignupScreenProps> = ({navigation}: SignupScreenProps) => {
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <SafeAreaView style={Style.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={Style.scrollContainer}
        showsVerticalScrollIndicator={false}>
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
          value={userName}
          label="Username"
          containerStyle={{marginVertical: RFValue(5)}}
        />

        <TextInputPaper
          value={password}
          label="Password"
          secureTextEntry={true}
          containerStyle={{marginVertical: RFValue(5)}}
        />
        <ButtonPaper
          onPress={() => console.log('Button Pressed')}
          // loading={buttonLoading}
          text="Signup"
          containerViewStyle={{marginVertical: RFValue(15)}}
        />

        <Text style={Style.signupTextStyle}>Already have an account?</Text>
        <Text style={Style.SignupClickTextStyle}>{"<"} Back to Login  </Text>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SignupScreen;
