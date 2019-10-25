import React from 'react';
import Timeline from 'react-native-timeline-listview'
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
      textAlign:'center',
      flex:1
    }
  };

  render() {
    this.data = [
      {time: '09:00', title: 'TERÇA-FEIRA, 12 DE AGOSTO', description: 'R$ 37,50  PAGO'},
      {time: '10:45', title: 'SEGUNDA-FEIRA, 11 DE AGOSTO', description: 'R$ 3,00  PAGO'}
    ]
    return (
      <SafeAreaView  style={styles.container}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Scan')}
            style={styles.button}>
            <Text style={styles.buttonText}>
              Iniciar Compra
            </Text>
          </TouchableOpacity>
          <View style={styles.containerPurchases}>
            <Text style={styles.title}>Compras</Text>
            <ScrollView>
              <Timeline
                lineColor='#EDEFF2'
                circleColor='#FC1055'
                style={styles.timeLine}
                data={this.data}
              />
            </ScrollView>
          </View>
      </SafeAreaView>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  button: {
    alignItems: 'center',
    paddingVertical: 18,
    marginHorizontal: 96,
    marginTop: 40,
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
  title: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 26
  },
  containerPurchases: {
    flex: 1,
    padding: 20
  },
  timeLine: {
    marginTop: 30
  }
});
