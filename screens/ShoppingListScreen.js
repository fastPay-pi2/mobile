import React from 'react';
import { View, ScrollView, StyleSheet, Button } from 'react-native';
import ShoppingList from '../components/ShoppingList'
import { AntDesign } from '@expo/vector-icons';
import { HeaderBackButton } from 'react-navigation';

export default class ShoppingListScreen extends React.Component {
  state = {
    lists: ['teste1', 'teste2', 'teste3'],
  };

  static navigationOptions = {
    title: 'Listas de Compras',
    headerRight: <AntDesign style={{paddingRight: 10}} onPress={() => {/*adicionar lista*/}} name='plus' size={20} color='black' />,
  };

  printLists = list => {
    return(
      <ShoppingList
        listText={list.toUpperCase()}
        key={list}
        onPress={() => {/*visualizar lista*/}}
      />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
        {this.state.lists.map(this.printLists)}
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
});
