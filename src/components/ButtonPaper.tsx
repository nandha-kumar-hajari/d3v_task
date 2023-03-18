import {View, Text, TextStyle, ViewStyle} from 'react-native';
import React from 'react';
import {Button} from 'react-native-paper';
import {RFValue} from 'react-native-responsive-fontsize';
import {IconSource} from 'react-native-paper/lib/typescript/components/Icon';
import Fonts from '../utils/Fonts';
import Colors from '../utils/Colors';

interface ButtonPaperProps {
  containerViewStyle?: ViewStyle;
  icon?: IconSource;
  text: string;
  buttonTextStyle?: TextStyle;
  loading?: boolean;
  onPress?: () => void;
  buttonStyle?: ViewStyle;
  disabled?: boolean;
  testID?: string;
}

const ButtonPaper: React.FC<ButtonPaperProps> = ({
  icon,
  text,
  buttonTextStyle,
  loading,
  containerViewStyle,
  buttonStyle,
  onPress,
  disabled,
  testID,
}: ButtonPaperProps) => {
  return (
    <View style={{margin: RFValue(5), ...containerViewStyle}}>
      <Button
        testID={testID}
        icon={icon}
        loading={loading}
        disabled={disabled}
        mode="contained"
        style={{
          borderRadius: 4,
          backgroundColor: Colors.BASECOLOR,
          ...buttonStyle,
        }}
        onPress={onPress}>
        <Text
          style={{
            fontFamily: Fonts.Regular,
            color: Colors.WHITE,
            fontSize: RFValue(16),
            ...buttonTextStyle,
          }}>
          {text}
        </Text>
      </Button>
    </View>
  );
};

export default ButtonPaper;
