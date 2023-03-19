import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
  Keyboard,
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
import {Store} from '../../redux';
import {saveToken, saveUser} from '../../redux/actions';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

//We use this to restrict us from hitting pagination when we reach end of the list
var loadMore = true;
interface HomeScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>;
  route: NativeStackScreenProps<ParamListBase>;
}
const HomeScreen: FC<HomeScreenProps> = ({
  navigation,
  route,
}: HomeScreenProps) => {
  const data = Store.getState().appData.userData;

  const flatListRef = useRef();
  const [products, setProducts] = useState<any>([]);
  const limit = 10;
  const [screenLoading, setScreenLoading] = useState(false);
  const [footerLoading, setFooterLoading] = useState(true);
  const [searchText, setSearchText] = useState<string>('');
  const [sortByModalVisible, setSortByModalVisible] = useState<boolean>(false);
  const [searchApplied, setSearchApplied] = useState(false);
  const [refresh, setRefresh] = useState(0);

  //Fetching products with constant limit of 10 and no products are skipped as
  //This will be first api call
  const fetchProducts = () => {
    Webservices.callGetApi(
      getendPoint.default.PRODUCTS + `?limit=${limit}&skip=0`,
    )
      .then(res => {
        //If the api response is success,
        //We set the products in the state and stop the screen loading

        if (res.status == 200 && res.data.products) {
          setProducts(res.data.products);
        }

        setScreenLoading(false);
      })
      .catch(err => {
        //Even if the api error occurs, we stop the screen loading
        setScreenLoading(false);
      });
  };

  //Here we implement the pagination logic
  const fetchMoreProducts = () => {
    //We start showing the footer loading component intially
    setFooterLoading(true);
    //We use this same get method to see if the pagination will hit search API
    //If the search state is false, we hit the normal product listing api
    //We skip the number of products, that we already have in state and request for next 10 products
    Webservices.callGetApi(
      searchApplied
        ? getendPoint.default.SEARCH +
            `limit=10&q=${searchText}&skip=${products.length}`
        : getendPoint.default.PRODUCTS +
            `?limit=${limit}&skip=${products.length}`,
    )
      .then(res => {
        if (res.status == 200) {
          if (res.data.products) {
            setProducts([...products, ...res.data.products]);
          }
          if (res.data.products == 0) {
            //We hit the api with next skip value, once we know that
            //There no products in array of products from API is empty,we stop requesting the products
            loadMore = false;
          }
        }
        setFooterLoading(false);
      })
      .catch(err => {
        loadMore = false;
        setFooterLoading(false);
      });
  };
  const onEndReached = () => {
    //Making sure that fetch more products is not called when we reached end of the list
    if (loadMore) {
      fetchMoreProducts();
    }
  };

  useEffect(() => {
    setScreenLoading(true);
    fetchProducts();
  }, [refresh]);
  const onPressLogout = () => {
    Store.dispatch(saveToken(''));
    Store.dispatch(saveUser(''));
    Toast.show({
      type: 'success',
      text1: 'Logged out successfully!',
    });
    navigation.replace('LoginScreen');
  };
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
    //Search will only happen if the user enters something in search text field
    if (searchText) {
      setScreenLoading(true);
      //We re-enable the pagination,when the search query is sent
      loadMore = true;
      setSearchApplied(true);
      Webservices.callGetApi(
        getendPoint.default.SEARCH + `?limit=${limit}&q=${searchText}`,
      )
        .then(res => {
          if (res.status == 200 && res.data.products) {
            setProducts(res.data.products);
          }

          setScreenLoading(false);
        })
        .catch(err => {
          setScreenLoading(false);
        });
      //After the search query is sent, we scrollback to the top of the flatlist
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
    Keyboard.dismiss();
  };

  const onPressSortBy = (item: string) => {
    setScreenLoading(true);
    //This sort is like any other sort, but the only caveat is that
    //We fetch all the products at once here, becase sort was only happening from frontend
    //We cannot sort all the products unless we have all of them in our state
    Webservices.callGetApi(
      searchApplied
        ? getendPoint.default.SEARCH + `?limit=100&q=${searchText}&skip=0`
        : getendPoint.default.PRODUCTS + `?limit=${100}&skip=0`,
    )
      .then(res => {

        if (res.status == 200 && res.data.products) {
          //Based on the sort type selected by user, we sort the items and change the state
          if (item == 'Price') {
            setProducts(
              res.data.products.sort(
                (a, b) => parseFloat(a.price) - parseFloat(b.price),
              ),
            );
          }

          if (item == 'Name') {
            setProducts(
              res.data.products.sort((a, b) => a.title.localeCompare(b.title)),
            );
          }
        }

        setScreenLoading(false);
      })
      .catch(err => {
        setScreenLoading(false);
      });

    setSortByModalVisible(false);
    //Again we scrollback to top of the flatlist when user changes sort value
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
      <TouchableOpacity
        onPress={onPressLogout}
        style={{
          ...Style.searchButtonStyle,
          position: 'absolute',
          right: 0,
          top: 30,
          backgroundColor: 'transparent',
        }}>
        <Icon name={'logout'} size={22} color={Colors.BASECOLOR} />
      </TouchableOpacity>

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
          ListEmptyComponent={() => {
            return (
              <Text
                style={{
                  fontFamily: Fonts.Regular,
                  color: Colors.GRAY.DARK,
                  marginTop: RFValue(240),
                }}>
                There are no products to display
              </Text>
            );
          }}
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
