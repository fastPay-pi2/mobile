import React from 'react';
import {
  AsyncStorage,
  Button,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Linking,
  Vibration,
  Alert
} from 'react-native';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import api from '../config/api';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class BarCodeScannerScreen extends React.Component {
  state = {
    hasCameraPermission: null,
    scanned: false,
    products: [],
    cart: ''
  };

  // recebe um cart id da leitura de qrcode

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Validação de Compra',
      headerLeft: (
        <Button
          color="black"
          title="Revalidar"
          onPress={navigation.getParam('restartValidation')}
        />
      ),
      headerRight: (
        <Button
          color="black"
          title="Logout"
          onPress={navigation.getParam('signOutAsync')}
        />
      ),

      headerStyle: {
        backgroundColor: '#fff',
        borderRadius: 10,
        height: 66
      }
    };
  };

  async componentDidMount() {
    this.getPermissionsAsync();
    this.props.navigation.setParams({
      restartValidation: this.restartValidation.bind(this),
      signOutAsync: this._signOutAsync.bind(this)
    });
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  handleBarCodeScanned = async ({ data }) => {
    if (data.indexOf('-') > 0) {
      this.setState({ cart: data });
      alert(`Carrinho ${data} associado`);
    } else {
      this.state.products.push(data);
      alert(`Produto ${data} adicionado`);
    }
    Vibration.vibrate(500);
    this.setState({ scanned: true });
  };

  restartValidation() {
    this.setState({ cart: '', products: [] });
  }

  postPurchaseValidation() {
    if (this.state.products.length === 0 || this.state.cart === '') {
      Alert.alert(
        'Erro!',
        'Você deve ler o QR Code do carrinho e os códigos de barras para realizar a validação',
        [
          {
            text: 'OK',
            style: 'default'
          }
        ]
      );

      return;
    }
    const body = {
      cart: this.state.cart,
      items: this.state.products
    };

    api.purchase
      .post('/api/purchasevalidation/', body)
      .then(async res => {
        console.log(res);

        Alert.alert(
          'Produtos Confirmados',
          'Todos os produtos lidos estão presentes nesta compra!',
          [
            {
              text: 'OK',
              onPress: () => this.restartValidation(),
              style: 'default'
            }
          ],
          { cancelable: false }
        );
      })
      .catch(error => {
        console.log(error.response);
        if (error.response.data.error === 'There is a pending purchase') {
          alert('Este produto não existe ');
        } else if (error.response.status === 418) {
          missing_products = error.response.data.missing_products.map(
            products => {
              return products.name + `\nFaltantes: ` + products.missing + `\n`;
            }
          );

          Alert.alert(
            'Os seguintes produtos estão faltando:',
            missing_products.toString(),
            [
              {
                text: 'OK',
                style: 'default'
              }
            ],
            { cancelable: false }
          );
        }
        // alert(`Produto ${cartRfid} inválido`);
      });
  }

  // TODO - logout user if user clicks in 'cancelar'
  showNoPermissionAlert() {
    Alert.alert(
      'Sem acesso à câmera',
      'Não temos acesso à câmera. Para permitir o acesso, abra os Ajustes do seu celular',
      [
        {
          text: 'Vamos lá!',
          onPress: () => {
            this.props.navigation.navigate('Home');
            Linking.openURL('app-settings://');
          },
          style: 'default'
        },
        {
          text: 'Cancelar',
          // onPress: () => this.props.navigation.navigate('Home'),
          style: 'cancel'
        }
      ],
      { cancelable: false }
    );
  }

  render() {
    const { hasCameraPermission, scanned, cart } = this.state;
    if (hasCameraPermission === null) {
      return null;
    }
    if (hasCameraPermission === false) {
      this.showNoPermissionAlert();
    }
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
            barCodeTypes={[
              BarCodeScanner.Constants.BarCodeType.ean13,
              BarCodeScanner.Constants.BarCodeType.qr
            ]}
            style={{
              ...StyleSheet.absoluteFillObject,
              justifyContent: 'flex-start'
            }}
          />
        </View>
        <View style={styles.footer}>
          <View
            style={{
              flex: 1
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: 10,
                paddingBottom: 10
              }}
            >
              <MaterialCommunityIcons
                color={cart === '' ? 'red' : 'green'}
                name="cart"
                size={30}
              />
              <Text style={{ fontSize: 14 }}>
                {cart === '' ? `Carrinho\nnão lido` : `Carrinho\nlido`}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: 10
              }}
            >
              <FontAwesome name="shopping-basket" size={26} />
              <Text>
                {this.state.products.length} Produtos {`\n`} lidos
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flex: 1.5,
              alignItems: 'center',
              paddingRight: 10
            }}
          >
            <TouchableOpacity
              style={styles.minusButton}
              title="Scan"
              onPress={() => this.setState({ scanned: false })}
            >
              <Text>{scanned ? 'Escanear' : 'Escaneando'}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.plusButton}
              title="Send"
              onPress={() => this.postPurchaseValidation()}
            >
              <Text>Enviar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 0,
    marginLeft: 0,
    marginStart: 0,
    paddingHorizontal: 0,
    paddingLeft: 0,
    paddingStart: 0,
    height: '115%',
    padding: 0
  },
  footer: {
    height: (height * 15) / 100,
    borderTopColor: '#A9A9A9',
    borderTopWidth: 0.5,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    flexDirection: 'row'
  },
  plusButton: {
    borderBottomRightRadius: 12,
    borderTopRightRadius: 12,
    // backgroundColor: '#32CD32',
    borderWidth: 1,
    flex: 0.5,
    alignItems: 'center',
    padding: 20
  },
  minusButton: {
    borderBottomLeftRadius: 12,
    borderTopLeftRadius: 12,
    // backgroundColor: '#FF2400',
    borderWidth: 1,

    flex: 0.5,
    alignItems: 'center',
    padding: 20
  }
});
