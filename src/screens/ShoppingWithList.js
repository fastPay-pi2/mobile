import React from 'react';
import { View, ScrollView, StyleSheet, Button, Image, Text, Linking, FlatList, Dimensions, AsyncStorage, Alert, RefreshControl } from 'react-native';
import ShoppingList from '../components/ShoppingList'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { HeaderBackButton } from 'react-navigation';
import ButtonWithActivityIndicator from '../components/ButtonWithActivityIndicator';
import axios from 'axios';
import { Constants, Linking as LinkingExpo } from 'expo';
import {x_picpay_token, x_seller_token} from '../config/picPayToken';
import api from '../config/api'

export default class ShoppingScreen extends React.Component {
  state = {
    isLoading: false,
    shopping: true,
    refreshing: false,
    products: [],
    totalPrice: 0,
    painding: false,
    paid: false,
  };

  async componentDidMount() {
    var temp = await AsyncStorage.getItem('currentPurchaseLists');
    var prod = JSON.parse(temp);
    var products = []
    for (var i in prod){
        if(prod[i].name){
            products.push({
                "name": prod[i].name,
                "qntd": prod[i].qntd
            })
        }
      }
    this.setState({ products })
    console.log(products)
  }

  static navigationOptions = ({navigation}) => {
    return {
      title: 'Carrinho',
      headerStyle: {
        backgroundColor: '#fff',
        borderRadius: 10,
        height: 66
      },
      headerTitleStyle: {
        textAlign:'center',
        flex:1
      },
    }
  };

  _renderProduct(product) {
    return(
      <View style={styles.productView}>
        {/* <Image style={styles.productImage} source={{uri: product.productimage}}/> */}
        <View style={styles.productInformation}>
          <Text style={styles.productName}>{product.name}</Text>
          <View style={{flex:1, alignItems:'center'}}>
            {/* <Text style={{fontSize: 20, paddingBottom: 5}}>R$ {product.productprice}</Text> */}
            <Text style={{fontSize: 14}}>{product.qntd} un</Text>
          </View>
        </View>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
            style={styles.productsList}
            keyExtractor={item => item.name.toString()}
            renderItem={({item}) => this._renderProduct(item)}
            data={this.state.products}
        />
      </View>
    );
  };
}

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  buttonPay: {
    paddingVertical: 20,
    paddingHorizontal: 60,
    borderRadius: 8,
    backgroundColor: '#FC1055',
    shadowColor: 'rgba(252, 16, 85, 0.5)',
    shadowOpacity: 0.8,
    shadowRadius: 15,
    shadowOffset : { width: 0, height: 13},
  },
  container: {
    flex: 1,
  },
  shopping: {
    flex: 1,
    alignItems: 'center',
    margin: 50,
    padding: 10,
  },
  productsList: {
    flex: 1,
  },
  footer: {
    height: height * 14/100,
    borderTopColor: '#A9A9A9',
    borderTopWidth: 0.5,
    backgroundColor: '#f2f2f2',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',

  },
  loading: {
    marginTop: 50,
    paddingVertical: 13,
  },
  productView: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    padding: 10,
    borderBottomColor: '#A9A9A9',
  },
  productImage: {
    flex: 1,
    height: 100,
  },
  productInformation: {
    flex: 2.8,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  productName: {
    fontSize: 20,
    flex: 2,
    fontFamily: 'Roboto-Regular',
    padding: 5
  }
});
