import React from 'react';
import { View, ScrollView, StyleSheet, Button, FlatList, RowItem, Text } from 'react-native';
import { SearchBar } from 'react-native-elements';

export default class ShoppingListScreen extends React.Component {
  state = {
    search: '',
    categoryList: ['teste1', 'teste2', 'teste3'],
  };

  static navigationOptions = {
    title: 'Criar Listas de Compras',
  };

  Item({title}) {
    return (
      <View>
      <Text>{title}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <SearchBar
          lightTheme
          round
          placeholder='Nome do produto...'
          onChangeText={(search) => this.setState({ search })}
          value={this.state.search}
        />
        <ScrollView
        horizontal
        >
          <FlatList
            horizontal
            data={this.state.categoryList}
            renderItem={({item}) => <this.Item title={item}/>}
            keyExtractor={item => item}
          />
        </ScrollView>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>

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
