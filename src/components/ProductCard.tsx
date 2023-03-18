import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import FastImage from 'react-native-fast-image';
import {RFValue} from 'react-native-responsive-fontsize';
import Colors from '../utils/Colors';
import Fonts from '../utils/Fonts';
import {ActivityIndicator} from 'react-native-paper';
interface ProductCardProps {
  forUser?: boolean;
  onPress?: () => void;
  itemData: any;
}
export const ProductCard: React.FC<ProductCardProps> = ({
  onPress,
  itemData,
}: ProductCardProps) => {
  const [imageLoading, setImageLoading] = useState(false);
  return (
    <TouchableOpacity disabled onPress={onPress} style={styles.cardViewStyle}>
      <View style={{flexDirection: 'row'}}>
        <FastImage
          source={{
            uri: itemData.thumbnail,
            priority: FastImage.priority.high,
          }}
          onLoadStart={() => setImageLoading(true)}
          onLoadEnd={() => setImageLoading(false)}
          style={styles.imgStyle}
          resizeMode="contain">
          {imageLoading ? (
            <View style={{flex: 1, backgroundColor: '#f2f2f2'}}>
              <ActivityIndicator
                size={'small'}
                color={Colors.BASECOLOR}
                style={styles.imageIndicator}
              />
            </View>
          ) : null}
        </FastImage>

        <View style={{marginLeft: RFValue(8), width: RFValue(195)}}>
          <Text style={styles.title}>
            {itemData.title ? itemData.title : ''}
          </Text>

          <Text style={styles.brand}>
            {itemData.brand ? itemData.brand : ''}
          </Text>
          <Text numberOfLines={2} style={styles.description}>
            {itemData.description ? itemData.description : ''}
          </Text>

          {/* Price View */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: RFValue(4),
            }}>
            {itemData.discountPercentage ? (
              <Text style={styles.originalPrice}>
                {(
                  itemData.price /
                  (1 - itemData.discountPercentage / 100)
                ).toFixed(2)}
              </Text>
            ) : null}

            <Text style={styles.price}>
              ${itemData.price ? itemData.price : ''}/-
            </Text>

            {itemData.discountPercentage ? (
              <Text style={styles.discount}>
                ({itemData.discountPercentage}% off)
              </Text>
            ) : null}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  cardViewStyle: {
    height: RFValue(125),
    width: RFValue(340),
    marginTop: RFValue(4),
    justifyContent: 'center',
    padding: RFValue(8),
  },
  imgStyle: {height: RFValue(100), width: RFValue(110)},
  imageIndicator: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  title: {
    fontFamily: Fonts.SemiBold,
    color: Colors.BLACK,
    fontSize: RFValue(13),
  },
  brand: {
    fontFamily: Fonts.Regular,
    color: '#397DC4',
    fontSize: RFValue(11),
  },
  description: {
    fontFamily: Fonts.Light,
    color: Colors.BLACK,
    fontSize: RFValue(12),
    marginTop: RFValue(4),
  },
  originalPrice: {
    fontFamily: Fonts.Light,
    textDecorationLine: 'line-through',
    color: '#747574',
    fontSize: RFValue(11),
    marginRight: RFValue(6),
  },
  price: {
    fontFamily: Fonts.SemiBold,
    color: Colors.BLACK,
    fontSize: RFValue(13),
    marginRight: RFValue(4),
  },
  discount: {
    fontFamily: Fonts.SemiBold,
    color: '#67AD5B',
    fontSize: RFValue(11),
  },
});
