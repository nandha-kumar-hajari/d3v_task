import Colors from '../../utils/Colors';
import {RFValue} from 'react-native-responsive-fontsize';

import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import Fonts from '../../utils/Fonts';
interface Style {
  mainViewStyle: ViewStyle;
  headerViewStyle: ViewStyle;
  mainTitleStyle: TextStyle;
  subTitleStyle: TextStyle;
  buttonStyle: ViewStyle;
  dividerStyle:ViewStyle;
  searchButtonStyle:ViewStyle
}

export default StyleSheet.create<Style>({
  mainViewStyle: {flex: 1, alignItems: 'center', backgroundColor: '#f2f2f2'},
  mainTitleStyle: {
    fontFamily: Fonts.Bold,
    color: Colors.GRAY.DARK,
    fontSize: RFValue(25),
    alignSelf: 'flex-start',
    marginTop: RFValue(10),
  },
  subTitleStyle: {
    fontFamily: Fonts.Regular,
    color: Colors.GRAY.DARK,
    fontSize: RFValue(14),
    alignSelf: 'flex-start',
    marginTop: RFValue(5),
  },
  headerViewStyle: {
    marginLeft:RFValue(10),
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf:"flex-start",
    marginVertical: RFValue(10),
    justifyContent: 'space-between',
  },
  buttonStyle: {
    backgroundColor: '#FE8953',
    borderRadius: 22,
    height: RFValue(50),
    width: RFValue(50),
    alignItems: 'center',
    justifyContent: 'center',
  },
  dividerStyle:{
    width: '100%',
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#757575',
  },
  searchButtonStyle:{
    marginTop: 8,
    backgroundColor: 'white',
    height: RFValue(38),
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginLeft: RFValue(4),
    paddingHorizontal: RFValue(12),
    borderRadius: RFValue(5),
  }
});
