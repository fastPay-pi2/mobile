import React from 'react';
import {
  AsyncStorage,
  Platform,
  ScrollView,
  Button,
  StyleSheet,
  View,
  Text,
} from 'react-native';

export default class HomeScreen extends React.Component {
  state = {
  };

  static navigationOptions = {
    title: 'Home',
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          <Button title="Iniciar Compra" onPress={() => this.props.navigation.navigate('Scan')} />
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
    paddingTop: 30,
  },
});
