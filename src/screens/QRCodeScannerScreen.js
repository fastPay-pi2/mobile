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

export default class QRCodeScannerScreen extends React.Component {
  state = {
    hasCameraPermission: null,
    scanned: false,
  };

  static navigationOptions = ({navigation}) => {
    return {
      title: 'Escaneie o código QR',
      headerLeft: <HeaderBackButton onPress={async () => {
        await AsyncStorage.removeItem('currentPurchaseLists');
        navigation.navigate('App')
      }} />,
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
          onBarCodeScanned={scanned ? undefined : this.handleQRCodeScanned}
          barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
          style={StyleSheet.absoluteFillObject}
        />

        {scanned && (
          <Button title={'Tap to Scan Again'} onPress={() => this.setState({ scanned: false })} />
        )}
      </View>
    );
  }

  handleQRCodeScanned = async ({ type, data }) => {
    const cartRfid = data;
    this.setState({ scanned: true });

    const userToken = await AsyncStorage.getItem('userToken');
    header = {
      headers: {
        'Authorization': 'Bearer ' + userToken,
      }
    }

    const userId = await AsyncStorage.getItem('userId');
    const body = {
      'user_id': userId,
      'cart_id': cartRfid,
    }

    api.purchase.post('/api/purchase/', body, header)
    .then( async res => {
      await AsyncStorage.setItem('purchaseId', res.data.id);
      await AsyncStorage.setItem('cartRfid', cartRfid);
      var currentPurchaseLists = await AsyncStorage.getItem('currentPurchaseLists');
      alert(`Compra cadastrada`);
      if(currentPurchaseLists){
        this.props.navigation.navigate('Shopping');
      }
      this.props.navigation.navigate('Shopping');
    })
    .catch(error => {
      console.log(error.response);
      if (error.response.data.error === 'There is a pending purchase') {
        alert('Este carrinho já está associado à uma compra ')
      }
      alert(`Carrinho ${cartRfid} inválido`);
    })
  };

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
        onPress: () => this.props.navigation.navigate('Home'),
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
