import React from 'react';
import { View, ScrollView, StyleSheet, Button, Image, Text, Linking, FlatList, Dimensions, AsyncStorage, Alert } from 'react-native';
import ShoppingList from '../components/ShoppingList'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { HeaderBackButton } from 'react-navigation';
import ButtonWithActivityIndicator from '../components/ButtonWithActivityIndicator';
import axios from 'axios';
import { Constants, WebBrowser } from 'expo';
import {x_picpay_token, x_seller_token} from '../config/picPayToken';

const products = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'tio joão',
    image: 'https://static.carrefour.com.br/medias/sys_master/images/images/hb1/he1/h00/h00/9452863029278.jpg',
    price: 10.40,
    qntd: 4,
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    name: 'camil feijão',
    image: 'https://static.carrefour.com.br/medias/sys_master/images/images/h71/hd4/h00/h00/9455430107166.jpg',
    price: 12.30,
    qntd: 2,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    name: 'camil arroz',
    image: 'https://static.carrefour.com.br/medias/sys_master/images/images/hfb/h28/h00/h00/9476860543006.jpg',
    price: 14.15,
    qntd: 5,
  },
  {
    id: '58694a0f-3da1-571f-bd96-145571e29d72',
    name: 'broto legal',
    image: 'https://static.carrefour.com.br/medias/sys_master/images/images/hef/h6b/h00/h00/9446694060062.jpg',
    price: 16.50,
    qntd: 6,
  },
];

export default class ShoppingScreen extends React.Component {
  state = {
    isLoading: false,
    shopping: true,
    totalPrice: 0,
  };

  componentDidMount() {
    this.props.navigation.setParams({ cancelPurchase: this.cancelPurchaseConfirmation.bind(this) });
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
      headerRight: (
        <MaterialCommunityIcons
          style={{paddingRight: 25}}
          name='cart-off'
          size={26}
          onPress={navigation.getParam('cancelPurchase')}
          />
      )
    }
  };

  verifyStatus = () => {
    header = {
      headers: {
        'x-picpay-token': x_picpay_token,
      }
    }

    referenceId = 5;

    axios.get('https://appws.picpay.com/ecommerce/public/payments/'+ referenceId + '/status', header)
    .then(res => {
      console.log(res);
    })
    .catch(error => {
      console.log(error.response);
    })
  }

  buy = async () => {
    header = {
      headers: {
        'x-picpay-token': x_picpay_token,
      }
    }

    const purchaseId = await AsyncStorage.getItem('purchaseId');
    const name = await AsyncStorage.getItem('userName');
    const cpf =  await AsyncStorage.getItem('userCPF');
    const email = await AsyncStorage.getItem('userEmail');

    body = {
      'referenceId': purchaseId,
      'callbackUrl': 'https://webhook.site/213b4e3a-b9c4-429e-8cdf-06db590bc3ac',
      'value': this.state.totalPrice,
      'buyer': {
        'firstName': 'Lucas',
        'lastName': 'Penido',
        'document': cpf,
        'email': email,
        'phone': '+55 61 993458-3238'
      }
    }

    axios.post('https://appws.picpay.com/ecommerce/public/payments', body, header)
    .then(res => {
      console.log(res);
      console.log(res.data.paymentUrl);
      Linking.openURL(res.data.paymentUrl);
    })
    .catch(error => {
      console.log(error.response);

    })

  }

  _renderProduct(product) {
    return(
      <View style={{flexDirection: 'row'}}>
        <Image style={styles.productImage} source={{uri: product.image}}/>
        <View style={{flexDirection: 'column', justifyContent: 'center'}}>
          <Text>{product.name}</Text>
          <Text>R$ {product.price} x {product.qntd}</Text>
        </View>
      </View>
    )
  }

  calculateTotal() {
    console.log('entrou');
    let totalPrice = 0;
    products.map(product => {
      totalPrice += (product.price * product.qntd)
    })
    this.setState({totalPrice})

    return totalPrice;
  }


  cancelPurchaseConfirmation = () => {
    Alert.alert(
    'Cancelar Compra',
    'Tem certeza que deseja cancelar a sua compra?',
    [
      {
        text: 'Sim',
        onPress: async () => {
          await AsyncStorage.removeItem('purchaseId');
          await AsyncStorage.removeItem('cartRfid');
          // TODO Request to cancel purchase at API
          alert('Compra cancelada');
          this.props.navigation.navigate('Home');
        },
        style: 'default'
      },
      {
        text: 'Não',
        style: 'cancel'
      }
    ],
    {cancelable: false},
    );
  }

  render() {
    return (
      <View style={styles.container}>
          {
            this.state.shopping ?
            (
              <View style={styles.shopping}>
                <Image source={require('../assets/images/ShoppingCar.gif')}
                style={{width: 150, height: 150, }}/>
                <Text style={{fontFamily: 'work-sans-semiBold',}}>Você está em processo de compra. {'\n'}Assim que você passar pelo portal de compras os seus produtos aparecerão aqui para que você possa verificá-los e assim prosseguir com o pagamento.</Text>
                <Button title='mostrar lista' onPress={() => {
                    this.calculateTotal();
                    this.setState({shopping : false});
                  }}
                />
              </View>
            ) : (
              <FlatList
                style={styles.productsList}
              keyExtractor={item => item.id}
              renderItem={({item}) => this._renderProduct(item)}
              data={products}
              />
            )
          }

        <View style={styles.footer}>
          {
            this.state.shopping ? (
              null
            ) : (
              <Text style={{alignSelf: 'center'}}>R$ {this.state.totalPrice}</Text>
            )
          }
          <ButtonWithActivityIndicator
            disabled={this.state.shopping}
            activityIndicatorStyle={styles.loading}
            onPress={() => {
              this.buy();
            }}
            isLoading={this.state.isLoading}
            buttonKey='Pagar'
            buttonText='Pagar'
            buttonStyle={styles.buttonPay}
          />

        </View>
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
    padding: 10,
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
  productImage: {
    width: 90,
    height: 150,
    padding: 50
  },
});
