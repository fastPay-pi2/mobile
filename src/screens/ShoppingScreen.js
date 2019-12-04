import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Button,
  Image,
  Text,
  Linking,
  FlatList,
  Dimensions,
  AsyncStorage,
  Alert,
  RefreshControl
} from 'react-native';
import ShoppingList from '../components/ShoppingList';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { HeaderBackButton } from 'react-navigation';
import ButtonWithActivityIndicator from '../components/ButtonWithActivityIndicator';
import axios from 'axios';
import { Constants, Linking as LinkingExpo } from 'expo';
import { x_picpay_token, x_seller_token } from '../config/picPayToken';
import api from '../config/api';

export default class ShoppingScreen extends React.Component {
  state = {
    isLoading: false,
    shopping: true,
    refreshing: false,
    products: [],
    totalPrice: 0,
    painding: false,
    paid: false
  };

  componentDidMount() {
    this.props.navigation.setParams({
      cancelPurchaseConfirmation: this.cancelPurchaseConfirmation.bind(this)
    });
  }

  timerPurchase = setInterval(() => {
    console.log('purchase');
    this.updatePurchase();
  }, 2000);

  timerStatus = setInterval(() => {
    if (!this.state.shopping) {
      console.log('status');
      this.verifyStatus();
    }
  }, 2000);

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Carrinho',
      headerStyle: {
        backgroundColor: '#fff',
        borderRadius: 10,
        height: 66
      },
      headerTitleStyle: {
        textAlign: 'center',
        flex: 1
      },
      headerRight: (
        <MaterialCommunityIcons
          style={{ paddingRight: 25 }}
          name="cart-off"
          size={26}
          onPress={navigation.getParam('cancelPurchaseConfirmation')}
        />
      )
    };
  };

  showPaidConfirmation = () => {
    Alert.alert(
      'Compra Finalizada Com Sucesso',
      'Sua compra foi paga e finalizada',
      [
        {
          text: 'OK',
          onPress: async () => {},
          style: 'default'
        }
      ],
      { cancelable: false }
    );
  };

  verifyStatus = async () => {
    header = {
      headers: {
        'x-picpay-token': x_picpay_token
      }
    };

    const purchaseId = await AsyncStorage.getItem('purchaseId');

    axios
      .get(
        'https://appws.picpay.com/ecommerce/public/payments/' +
          purchaseId +
          '/status',
        header
      )
      .then(async res => {
        console.log(res.data.status);
        if (res.data.status === 'paid') {
          const res = await this.changePurchaseStatus('COMPLETED');
          if (res) {
            await AsyncStorage.removeItem('purchaseId');
            await AsyncStorage.removeItem('cartRfid');
            clearInterval(this.timerPurchase);
            clearInterval(this.timerStatus);
            this.props.navigation.navigate('Home');
            this.showPaidConfirmation();
          }
        }
      })
      .catch(error => {
        console.log(error.response.status);
      });
  };

  buy = async () => {
    header = {
      headers: {
        'x-picpay-token': x_picpay_token
      }
    };

    const purchaseId = await AsyncStorage.getItem('purchaseId');
    const name = await AsyncStorage.getItem('userName');
    const cpf = await AsyncStorage.getItem('userCPF');
    const email = await AsyncStorage.getItem('userEmail');
    console.log(LinkingExpo.makeUrl());
    body = {
      referenceId: purchaseId,
      callbackUrl: 'https://webhook.site/213b4e3a-b9c4-429e-8cdf-06db590bc3ac',
      returnUrl: LinkingExpo.makeUrl(),
      // 'value': this.state.totalPrice,
      value: 0.01,
      buyer: {
        firstName: 'Lucas',
        lastName: 'Penido',
        document: cpf,
        email: email,
        phone: '+55 61 993458-3238'
      }
    };
    console.log(body);

    axios
      .post('https://appws.picpay.com/ecommerce/public/payments', body, header)
      .then(res => {
        console.log(res);
        console.log(res.data.paymentUrl);
        clearInterval(this.timerPurchase);
        this.setState({ painding: true });
        Linking.openURL(res.data.paymentUrl);
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  async changePurchaseStatus(status) {
    const userToken = await AsyncStorage.getItem('userToken');
    header = {
      headers: {
        Authorization: 'Bearer ' + userToken
      }
    };

    const userId = await AsyncStorage.getItem('userId');
    body = {
      new_state: status
    };

    try {
      await api.purchase.put('/api/purchase/' + userId, body, header);
      return true;
    } catch (error) {
      console.log(error.response.data.error);
      return false;
    }
  }

  cancelPurchase = async () => {
    const res = await this.changePurchaseStatus('ABORTED');
    if (res) {
      await AsyncStorage.removeItem('purchaseId');
      await AsyncStorage.removeItem('cartRfid');
      await AsyncStorage.removeItem('currentPurchaseLists');
      alert('Compra cancelada');
      clearInterval(this.timerPurchase);
      clearInterval(this.timerStatus);
      this.props.navigation.navigate('Home');
    } else {
      alert('Erro ao cancelar compra!');
    }
  };

  cancelPurchaseConfirmation = () => {
    Alert.alert(
      'Cancelar Compra',
      'Tem certeza que deseja cancelar a sua compra?',
      [
        {
          text: 'Sim',
          onPress: async () => {
            await this.cancelPurchase();
          },
          style: 'default'
        },
        {
          text: 'Não',
          style: 'cancel'
        }
      ],
      { cancelable: false }
    );
  };

  updatePurchase = async () => {
    this.setState({ refreshing: true });
    const userId = await AsyncStorage.getItem('userId');
    const userToken = await AsyncStorage.getItem('userToken');
    header = {
      headers: {
        Authorization: 'Bearer ' + userToken
      }
    };

    api.purchase
      .get('/api/userpurchases/' + userId, header)
      .then(res => {
        const currentPurchase = res.data.find(element => {
          return element.state === 'ONGOING' || element.state === 'PAYING';
        });
        this.setState({ refreshing: false });

        if (currentPurchase.state === 'PAYING') {
          this.setState({ totalPrice: currentPurchase.value });
          this.setState({ products: currentPurchase.purchased_products });
          this.setState({ shopping: false });
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({ refreshing: false });
        alert('Erro ao atualizar compras');
      });
  };

  _renderProduct(product) {
    return (
      <View style={styles.productView}>
        <Image
          style={styles.productImage}
          source={{ uri: product.productimage }}
        />
        <View style={styles.productInformation}>
          <Text style={styles.productName}>{product.productname}</Text>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ fontSize: 20, paddingBottom: 5 }}>
              R$ {product.productprice}
            </Text>
            <Text style={{ fontSize: 14 }}>{product.quantity} un</Text>
          </View>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.shopping ? (
          <View style={styles.shopping}>
            <Image
              source={require('../assets/images/ShoppingCar.gif')}
              style={{ width: 150, height: 150 }}
            />
            <Text style={{ fontFamily: 'work-sans-semiBold' }}>
              Você está em processo de compra. {'\n'}Assim que você passar pelo
              portal de compras os seus produtos aparecerão aqui para que você
              possa verificá-los e assim prosseguir com o pagamento!
            </Text>
          </View>
        ) : (
          <FlatList
            style={styles.productsList}
            keyExtractor={item => item.productid.toString()}
            renderItem={({ item }) => this._renderProduct(item)}
            data={this.state.products}
          />
        )}

        <View style={styles.footer}>
          {this.state.shopping ? null : (
            <Text style={{ alignSelf: 'center', fontSize: 20 }}>
              R$ {this.state.totalPrice}
            </Text>
          )}
          <ButtonWithActivityIndicator
            disabled={this.state.shopping}
            activityIndicatorStyle={styles.loading}
            onPress={() => {
              this.buy();
            }}
            isLoading={this.state.isLoading}
            buttonKey="Pagar"
            buttonText="Pagar"
            buttonStyle={styles.buttonPay}
          />
        </View>
      </View>
    );
  }
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
    shadowOffset: { width: 0, height: 13 }
  },
  container: {
    flex: 1
  },
  shopping: {
    flex: 1,
    alignItems: 'center',
    margin: 50,
    padding: 10
  },
  productsList: {
    flex: 1
  },
  footer: {
    height: (height * 14) / 100,
    borderTopColor: '#A9A9A9',
    borderTopWidth: 0.5,
    backgroundColor: '#f2f2f2',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row'
  },
  loading: {
    marginTop: 50,
    paddingVertical: 13
  },
  productView: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    padding: 10,
    borderBottomColor: '#A9A9A9'
  },
  productImage: {
    flex: 1,
    height: 100
  },
  productInformation: {
    flex: 2.8,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5
  },
  productName: {
    fontSize: 20,
    flex: 2,
    fontFamily: 'Roboto-Regular',
    padding: 5
  }
});
