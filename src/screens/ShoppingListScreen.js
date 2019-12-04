import React from 'react';
import { View, ScrollView, StyleSheet, Button, SafeAreaView, TouchableOpacity, Text, AsyncStorage } from 'react-native';
import ShoppingList from '../components/ShoppingList'
import { AntDesign } from '@expo/vector-icons';
import { HeaderBackButton } from 'react-navigation';

export default class ShoppingListScreen extends React.Component {
  state = {
    lists: ['COMPRAS DO MÊS', 'COMPRAS DO MÊS 2', 'FINAL DE SEMANA', 'COMPRAS DO MÊS', 'COMPRAS DO MÊS 2', 'FINAL DE SEMANA', 'COMPRAS DO MÊS', 'COMPRAS DO MÊS 2', 'FINAL DE SEMANA', 'COMPRAS DO MÊS', 'COMPRAS DO MÊS 2', 'FINAL DE SEMANA'],
    purchaseLists: [],
  };

  static navigationOptions = ({navigation}) => {
    return {
      title: 'Listas de Compras',
      // headerRight: <AntDesign style={{paddingRight: 10}} onPress={() => {navigation.navigate('CreateShoppingList')}} name='plus' size={20} color='black' />,
      headerStyle: {
        backgroundColor: '#fff',
        borderRadius: 10,
        height: 66
      },
      headerTitleStyle: {
        textAlign:'center',
        flex:1
      }
    }
  };

  printLists = (list, i) => {
    return(
      <View
        key={i}
      >
        <TouchableOpacity
          onPress={() => {/*visualizar lista*/}}
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            {list.name.toUpperCase()}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  async componentDidMount() {
    var temp = await AsyncStorage.getItem('purchaseLists');
    purchaseLists = JSON.parse(temp);
    this.setState({ purchaseLists })
    // console.log(purchaseLists[0].name)
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          {this.state.purchaseLists.map(this.printLists)}
          <TouchableOpacity
            onPress={() => {this.props.navigation.navigate('CreateShoppingList')}}
            style={styles.buttonAdd}>
            <Text style={styles.buttonAddText}>
              Criar nova lista
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 0,
  },
  button: {
    paddingVertical: 18,
    marginHorizontal: 66,
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: '#FC1055',
    borderRadius: 8,
    shadowColor: 'rgba(252, 16, 85, 0.5)',
    shadowOpacity: 0.8,
    shadowRadius: 15,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16
  },
  buttonAdd: {
    paddingVertical: 18,
    marginHorizontal: 66,
    marginVertical: 20,
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EDEFF2'
  },
  buttonAddText: {
    color: '#FC1055',
    fontWeight: 'bold',
    fontSize: 16
  },
});
