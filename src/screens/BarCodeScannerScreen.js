import React from 'react';
import {
  AsyncStorage,
  Platform,
  ScrollView,
  Button,
  StyleSheet,
  View,
  Text,
  Linking,
  Alert
} from 'react-native';
import { HeaderBackButton } from 'react-navigation';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import api from '../config/api'
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class BarCodeScannerScreen extends React.Component {
  state = {
    hasCameraPermission: null,
    scanned: false,
    products: [],
    cart: ''
  };

  // recebe um cart id da leitura de qrcode 

  static navigationOptions = ({navigation}) => {
    return {
      title: 'Escaneie o código de barras',
      headerLeft: <HeaderBackButton onPress={() => navigation.navigate('App')} />,
      headerStyle: {
        backgroundColor: '#fff',
        borderRadius: 10,
        height: 66
      }
    };
  };

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  };

  render() {
    const { hasCameraPermission, scanned } = this.state;
    if (hasCameraPermission === null) {
      return null;
    }
    if (hasCameraPermission === false) {
      this.showNoPermissionAlert();
    }
    return (
      <View
        style={styles.container}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          barCodeTypes={[BarCodeScanner.Constants.BarCodeType.ean13]}
          style={StyleSheet.absoluteFillObject}
        />

        {scanned && (
          <Button title={'Tap to Scan Again'} onPress={() => this.setState({ scanned: false })} />
        )}
      </View>
    );
  }

  handleBarCodeScanned = async ({ type, data }) => {
    const cartRfid = data;
    if (data.indexOf('-')){
      this.setState({ cart: data });
      alert(`Carrinho ${data} associado`)
    } else {
      this.state.products.push(data)
      alert(`Produto ${data} adicionado`)
    }
    this.setState({ scanned: true });
  };

  postPurchaseValidation() {
    const body = {
        'cart': this.state.cart,
        'items': this.state.products,
      }

    api.purchase.post('/api/purchasevalidation/', body)
    .then( async res => {
      // await AsyncStorage.setItem('purchaseId', res.data.id);
      // await AsyncStorage.setItem('cartRfid', cartRfid);
      alert(res.data);
    })
    .catch(error => {
      console.log(error.response);
      if (error.response.data.error === 'There is a pending purchase') {
        alert('Este produto não existe ')
      }
      alert(`Produto ${cartRfid} inválido`);
    })
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
    {cancelable: false},
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 0, marginLeft: 0, marginStart: 0,
    paddingHorizontal: 0, paddingLeft: 0, paddingStart: 0,
    height: '115%',
    padding: 0
  },
});
