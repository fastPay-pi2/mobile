import React from 'react';
import { View, ScrollView, StyleSheet, Button, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import ShoppingList from '../components/ShoppingList'
import { AntDesign } from '@expo/vector-icons';
import { HeaderBackButton } from 'react-navigation';

export default class ShoppingListScreen extends React.Component {
  state = {
    lists: ['COMPRAS DO MÊS', 'COMPRAS DO MÊS 2', 'FINAL DE SEMANA', 'COMPRAS DO MÊS', 'COMPRAS DO MÊS 2', 'FINAL DE SEMANA', 'COMPRAS DO MÊS', 'COMPRAS DO MÊS 2', 'FINAL DE SEMANA', 'COMPRAS DO MÊS', 'COMPRAS DO MÊS 2', 'FINAL DE SEMANA'],
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
        textAlign:"center", 
        flex:1 
      }
    }
  };

  printLists = list => {
    return(
      <View>
        <TouchableOpacity
            onPress={() => {/*visualizar lista*/}}
            style={styles.button}>
            <Text style={styles.buttonText}>
              {list.toUpperCase()}
            </Text>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          {this.state.lists.map(this.printLists)}
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
    borderRadius: 8,
    backgroundColor: '#FC1055',
    shadowColor: 'rgba(252, 16, 85, 0.5)',
    shadowOpacity: 0.8,
    shadowRadius: 15,
    height: 46,
    alignSelf: "stretch",
    justifyContent: "center",
    marginRight: 66,
    marginLeft: 66,
    marginTop: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16
  },
  buttonAdd: {
    paddingVertical: 18,
    borderRadius: 8,
    backgroundColor: '#FFF',
    shadowColor: 'rgba(252, 16, 85, 0.5)',
    shadowOpacity: 0.8,
    shadowRadius: 15,
    height: 46,
    alignSelf: "stretch",
    justifyContent: "center",
    marginRight: 66,
    marginLeft: 66,
    marginTop: 20,
    marginBottom: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: '#EDEFF2'
  },
  buttonAddText: {
    color: "#FC1055",
    fontWeight: "bold",
    fontSize: 16
  },
});
