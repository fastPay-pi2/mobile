import React from 'react';
import { View, ScrollView, StyleSheet, Button, Image, Text } from 'react-native';
import ShoppingList from '../components/ShoppingList'
import { AntDesign } from '@expo/vector-icons';
import { HeaderBackButton } from 'react-navigation';
import ButtonWithActivityIndicator from '../components/ButtonWithActivityIndicator'


export default class ShoppingScreen extends React.Component {
  state = {
    isLoading: false,
  };

  static navigationOptions = ({navigation}) => {
    return {
      title: 'Carrinho',
      headerStyle: {
        backgroundColor: '#fff',
        borderRadius: 10,
        height: 66
      },
      headerTitleStyle: { 
        textAlign:"center", 
        flex:1 
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.shopping}>
          <Image source={require('../assets/images/ShoppingCar.gif')}
          style={{width: 150, height: 150, }}/>
          <Text style={{fontFamily: 'work-sans-semiBold',}}>Você está em processo de compra. {'\n'}Assim que você passar pelo portal de compras os seus produtos aparecerão aqui para que você possa verificá-los e assim prosseguir com o pagamento.
          </Text>
        </View>

        <View style={styles.footer}>

          <Text style={{alignSelf: 'center'}}>R$100,00</Text>

          <ButtonWithActivityIndicator
            activityIndicatorStyle={styles.loading}
            onPress={() => {}}
            isLoading={this.state.isLoading}
            buttonKey="Pagar"
            buttonText="Pagar"
            buttonStyle={styles.buttonLogin}
          />

        </View>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  buttonLogin: {
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
  contentContainer: {
    paddingTop: 0,
  },
  shopping: {
    flex: 1,
    alignItems:'center',
    margin: 50,
    padding: 10,
  },
  footer: {
    flex: 0.2,
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
});
