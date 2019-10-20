import React from 'react';
import {
  AsyncStorage,
  Platform,
  ScrollView,
  Button,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';

export default class HomeScreen extends React.Component {
  state = {
  };

  static navigationOptions = {
    title: 'Home',
    headerStyle: {
      backgroundColor: '#fff',
      borderRadius: 10,
      height: 66
    },
    headerTitleStyle: { 
      textAlign:"center", 
      flex:1 
    }
  };

  render() {
    return (
      <SafeAreaView  style={styles.container}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Scan')}
            style={styles.button}>
            <Text style={styles.buttonText}>
              Iniciar Compra
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.containerPurchases}>
            <View>
              <Text style={styles.title}>Compras</Text>
            </View>
          <ScrollView>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // justifyContent: "center",
    // alignItems: "center",
    padding: 30,
    // justifyContent: "space-between"
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
    padding: 10
  },
  contentContainer: {
    paddingTop: 30,
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
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16
  },
  title: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16
  },
  containerPurchases: {
    flex: 1,
    // justifyContent: "left",
    // alignItems: "center",
    padding: 30
  }
});
