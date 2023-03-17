import {RFValue} from 'react-native-responsive-fontsize';
import {StyleSheet, ViewStyle, TextStyle} from 'react-native';
import Fonts from '../../utils/Fonts';
import Colors from '../../utils/Colors';

interface Style {
  container: ViewStyle;
  scrollContainer:ViewStyle;
  animationStyle: ViewStyle;
  titleStyle: TextStyle;
  subTitleStyle: TextStyle;
  signupTextStyle: TextStyle;
  SignupClickTextStyle: TextStyle;
}

export default StyleSheet.create<Style>({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  scrollContainer:{
    alignItems: 'center',
    flex: 1,
  },
  animationStyle: {
    height: 200,
    width: 200,
    marginBottom: RFValue(40),
    marginTop: 20,
  },
  titleStyle: {
    alignSelf: 'flex-start',
    marginTop: RFValue(15),
    marginLeft: RFValue(15),
    marginBottom: RFValue(5),
    fontFamily: Fonts.Bold,
    color: Colors.BASECOLOR,
    fontSize: RFValue(25),
  },
  subTitleStyle: {
    alignSelf: 'flex-start',
    marginLeft: RFValue(15),
    marginBottom: RFValue(5),
    fontFamily: Fonts.Regular,
    color: Colors.BASECOLOR,
    fontSize: RFValue(12),
  },
  signupTextStyle: {
    marginTop: RFValue(10),
    fontFamily: Fonts.Regular,
    color: Colors.BASECOLOR,
    fontSize: RFValue(12),
  },
  SignupClickTextStyle: {
    fontFamily: Fonts.SemiBold,
    color: '#3A86CA',
    fontSize: RFValue(13),
  },
});
