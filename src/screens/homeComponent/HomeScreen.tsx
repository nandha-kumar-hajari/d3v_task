import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
} from 'react-native';
import React, {FC, useEffect, useState, useRef} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Style from './HomeStyles';
import {ProductCard} from '../../components/ProductCard';
import {useSelector, useDispatch} from 'react-redux';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {ParamListBase} from '@react-navigation/native';
import * as Webservices from '../../network/Webservices';
import * as getendPoint from '../../network/endPoints';
import Colors from '../../utils/Colors';
import {RFValue} from 'react-native-responsive-fontsize';
import {ActivityIndicator} from 'react-native-paper';
import Fonts from '../../utils/Fonts';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TextInputPaper} from '../../components';
import SortByModal from '../../components/SortByModal';
var loadMore = true;
interface HomeScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
  route: NativeStackScreenProps<ParamListBase>;
}
const HomeScreen: FC<HomeScreenProps> = ({
  navigation,
  route,
}: HomeScreenProps) => {
  const data = useSelector((state: object) => state.appData.userData);
  const flatListRef = useRef();
  const [products, setProducts] = useState<any>([]);
  const [skip, setSkip] = useState(0);
  const limit = 10;
  const [screenLoading, setScreenLoading] = useState(false);
  const [footerLoading, setFooterLoading] = useState(true);
  const [searchText, setSearchText] = useState<string>('');
  const [sortByModalVisible, setSortByModalVisible] = useState<boolean>(false);
  const [searchApplied, setSearchApplied] = useState(false);
  const [refresh, setRefresh] = useState(0);

  console.log('Data from redux', data);
  const fetchProducts = () => {
    Webservices.callGetApi(
      getendPoint.default.PRODUCTS + `?limit=${limit}&skip=0`,
    )
      .then(res => {
        console.log('API response', res);
        if (res.status == 200 && res.data.products) {
          setProducts(res.data.products);
        }

        setScreenLoading(false);
      })
      .catch(err => {
        console.log('API error', err);
        setScreenLoading(false);
      });
  };

  const fetchMoreProducts = () => {
    setFooterLoading(true);
    Webservices.callGetApi(
      searchApplied
        ? getendPoint.default.SEARCH +
            `limit=10&q=${searchText}&skip=${products.length}`
        : getendPoint.default.PRODUCTS +
            `?limit=${limit}&skip=${products.length}`,
    )
      .then(res => {
        console.log('API response', res);
        if (res.status == 200) {
          if (res.data.products) {
            setProducts([...products, ...res.data.products]);
          }
          if (res.data.products == 0) {
            loadMore = false;
          }
        }
        setFooterLoading(false);
      })
      .catch(err => {
        console.log('API error', err);
        loadMore = false;
        setFooterLoading(false);
      });
  };
  const onEndReached = () => {
    if (loadMore) {
      fetchMoreProducts();
    }
  };

  useEffect(() => {
    setScreenLoading(true);
    fetchProducts();
  }, [refresh]);

  const renderFooterLoading = () => {
    return (
      <View style={{alignItems: 'center', marginVertical: RFValue(10)}}>
        {footerLoading ? (
          <ActivityIndicator animating={true} color={Colors.BASECOLOR} />
        ) : null}
      </View>
    );
  };

  const onPressSearch = () => {
    if (searchText) {
      setScreenLoading(true);
      loadMore = true;
      setSearchApplied(true);
      Webservices.callGetApi(getendPoint.default.SEARCH + `?limit=${limit}&q=${searchText}`)
        .then(res => {
          console.log('API response', res);
          if (res.status == 200 && res.data.products) {
            setProducts(res.data.products);
          }

          setScreenLoading(false);
        })
        .catch(err => {
          console.log('API error', err);
          setScreenLoading(false);
        });

      flatListRef &&
        flatListRef.current?.scrollToOffset({animated: true, offset: 0});
    }
  };

  const clearSearch = () => {
    setSearchText('');
    setSearchApplied(false);
    loadMore = true;
    setFooterLoading(true);
    setRefresh(refresh + 1);
  };

  const onPressSortBy = (item: string) => {
    if (item == 'Price') {
      setProducts(
        products.sort((a, b) => parseFloat(a.price) - parseFloat(b.price)),
      );
    }

    if (item == 'Name') {
      setProducts(products.sort((a, b) => a.title.localeCompare(b.title)));
    }
    setSortByModalVisible(false);
    flatListRef &&
      flatListRef.current?.scrollToOffset({animated: true, offset: 0});
  };

  const renderItem = ({item}: any) => {
    return <ProductCard itemData={item} />;
  };

  return (
    <SafeAreaView style={Style.mainViewStyle}>
      <View style={Style.headerViewStyle}>
        <View>
          <Text style={Style.mainTitleStyle}>
            Welcome {data.username ? data.username : ''}!
          </Text>
          <Text style={Style.subTitleStyle}>Browse Available Products</Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          paddingHorizontal: RFValue(10),
        }}>
        <TextInputPaper
          value={searchText}
          label="Search Products..."
          onChangeText={(val: string) => {
            setSearchText(val);
            if (searchText.length < 1) {
              setSearchApplied(false);
            }
          }}
          containerStyle={{marginTop: 0, width: RFValue(190)}}
          textInputStyle={{width: RFValue(190)}}
        />
        <TouchableOpacity
          onPress={onPressSearch}
          style={Style.searchButtonStyle}>
          <Icon name={'search'} size={24} color={Colors.BASECOLOR} />
        </TouchableOpacity>
        {searchApplied ? (
          <TouchableOpacity
            onPress={clearSearch}
            style={Style.searchButtonStyle}>
            <Icon name={'close'} size={24} color={Colors.BASECOLOR} />
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity
          onPress={() => setSortByModalVisible(true)}
          style={Style.searchButtonStyle}>
          <Icon name={'sort'} size={24} color={Colors.BASECOLOR} />
        </TouchableOpacity>
      </View>

      {screenLoading ? (
        <ActivityIndicator style={{flex: 1}} color={Colors.BLACK} />
      ) : (
        <FlatList
          ref={flatListRef}
          data={products}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          ItemSeparatorComponent={() => {
            return <View style={Style.dividerStyle} />;
          }}
          ListFooterComponent={
            products.length == 0 ? null : renderFooterLoading
          }
          onEndReached={onEndReached}
          showsVerticalScrollIndicator={false}
        />
      )}
      <SortByModal
        ref={flatListRef}
        isVisible={sortByModalVisible}
        onBackdropPress={() => setSortByModalVisible(false)}
        onClickClose={() => setSortByModalVisible(false)}
        onPressItem={(item: string) => onPressSortBy(item)}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
