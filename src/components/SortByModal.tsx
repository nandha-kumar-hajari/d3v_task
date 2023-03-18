import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC, useState} from 'react';
import Modal from 'react-native-modal';
import {RFValue} from 'react-native-responsive-fontsize';
import Fonts from '../utils/Fonts';
import Colors from '../utils/Colors';

interface SortByModalProps {
  isVisible: boolean;
  onBackdropPress?: () => void;
  onClickClose?: () => void;
  onPressItem?: () => void;
  selectedValue?: any;
}
const SortByModal: FC<SortByModalProps> = ({
  isVisible,
  onBackdropPress,
  onClickClose,
  onPressItem,
  selectedValue,
}: SortByModalProps) => {
  const [sortData, setSortData] = useState<any>([
    {id: 1, title: 'By Name', value: 'Name'},
    {id: 1, title: 'By Price', value: 'Price'},
  ]);

  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity
        onPress={() => onPressItem(item.value)}
        style={styles.itemViewStyle}>
        <Text
          style={{
            color: Colors.GRAY.DARK,
          }}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      animationIn={'slideInUp'}
      useNativeDriver={true}
      animationOut={'slideOutDown'}
      style={styles.modalStyle}
      onBackdropPress={onBackdropPress}
      isVisible={isVisible}>
      <View style={styles.viewStyle}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.titleStyle}>Sort By</Text>

          <TouchableOpacity
            onPress={onClickClose}
            style={styles.closeViewStyle}>
            <Text style={styles.closeTextStyle}>X</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={sortData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      </View>
    </Modal>
  );
};

export default SortByModal;

const styles = StyleSheet.create({
  modalStyle: {
    justifyContent: 'flex-end',
    margin: 0,
    borderTopLeftRadius: 10,
    backgroundColor: 'transparent',
    borderTopRightRadius: 10,
  },
  viewStyle: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: 'white',
    padding: RFValue(12),
  },
  titleStyle: {
    fontFamily: Fonts.Bold,
    fontSize: RFValue(18),
    marginBottom: RFValue(10),
  },
  closeViewStyle: {
    backgroundColor: Colors.BLACK,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    height: RFValue(24),
    width: RFValue(24),
  },
  closeTextStyle: {
    fontSize: RFValue(13),
    fontFamily: Fonts.Bold,
    color: Colors.WHITE,
  },
  itemViewStyle: {
    margin: RFValue(4),
    flexDirection: 'row',
  },
});
