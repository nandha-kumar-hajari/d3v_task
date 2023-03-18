import * as React from 'react';
import {StyleProp, TextStyle, View, Text} from 'react-native';
import {TextInput} from 'react-native-paper';
import {RFValue} from 'react-native-responsive-fontsize';
import COLORS from '../utils/Colors';
import Fonts from '../utils/Fonts';

interface TextInputPaperProps {
  label: string;
  value: string | undefined;
  onChangeText?: any;
  //   mode?: string;
  disabled?: boolean;
  left?: React.ReactNode;
  right?: React.ReactNode;
  placeholder?: string;
  error?: string;
  multiline?: boolean;
  dense?: boolean;
  numberOfLines?: number;
  containerStyle?: any;
  textInputStyle?: any;
  outlineStyle?: any;
  secureTextEntry?: any;
  handleBlur?: () => void;
  handleFocus?: () => void;
}

const TextInputPaper: React.FC<TextInputPaperProps> = ({
  label,
  value,
  disabled,
  left,
  right,
  placeholder,
  error,
  multiline,
  dense,
  numberOfLines,
  onChangeText,
  containerStyle,
  textInputStyle,
  outlineStyle,
  secureTextEntry,
  handleBlur,
  handleFocus,
}: TextInputPaperProps) => {
  return (
    <View style={{marginTop: RFValue(8), ...containerStyle}}>
      <TextInput
        mode={'outlined'}
        label={label}
        value={value}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onChangeText={onChangeText}
        disabled={disabled}
        left={left}
        right={right}
        placeholder={placeholder}
        error={error ? true : false}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
        dense={false}
        numberOfLines={numberOfLines}
        style={{
          fontFamily: Fonts.Regular,
          fontSize: RFValue(12),
          color: error ? COLORS.RED : COLORS.BaseColor,
          width: RFValue(320),
          height: !multiline && RFValue(38),
          padding: 0,
          ...textInputStyle,
        }}
        placeholderTextColor={COLORS.BaseColor}
        theme={{
          fonts: {
            regular: {
              fontFamily: Fonts.Regular,
            },
          },
          colors: {
            primary: error ? COLORS.RED : COLORS.BaseColor,
            background: '#fff',
            text: '#000',
            placeholder: '#000',
            surface: 'transparent',
          },
        }}
        outlineStyle={{
          borderColor: error ? COLORS.RED : COLORS.BaseColor,
          borderWidth: 0.5,
          ...outlineStyle,
        }}
      />
      {error ? (
        <Text
          style={{
            fontFamily: Fonts.Regular,
            fontSize: RFValue(11),
            color: COLORS.RED,
            marginLeft: RFValue(3),
          }}>
          {error}
        </Text>
      ) : null}
    </View>
  );
};
export default TextInputPaper;