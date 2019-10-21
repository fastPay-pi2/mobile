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
      textAlign:"center", 
      flex:1 
    }
  };

  render() {
    this.data = [
      {time: '09:00', title: 'Event 1', description: 'Event 1 Description'},
      {time: '10:45', title: 'Event 2', description: 'Event 2 Description'},
      {time: '12:00', title: 'Event 3', description: 'Event 3 Description'},
      {time: '14:00', title: 'Event 4', description: 'Event 4 Description'},
      {time: '14:00', title: 'Event 4', description: 'Event 4 Description'},
      {time: '14:00', title: 'Event 4', description: 'Event 4 Description'},
      {time: '14:00', title: 'Event 4', description: 'Event 4 Description'},
      {time: '14:00', title: 'Event 4', description: 'Event 4 Description'},
      {time: '16:30', title: 'Event 5', description: 'Event 5 Description'}
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
    marginRight: 96,
    marginLeft: 96,
    marginTop: 40,
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
