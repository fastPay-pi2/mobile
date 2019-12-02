import React from 'react';
import {
  AsyncStorage,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default class ConfigScreen extends React.Component {
  state = {
    userName: '',
  }

  static navigationOptions = {
    title: 'Perfil',
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

  async componentDidMount() {
    var temp = await AsyncStorage.getItem('userName');
    temp = temp.split(' ');
    userName = temp[0]
    if (temp[1]) {
      userName += ' ' + temp[1];
    }
    this.setState({userName});
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  render() {
    return (
      <View >
        <View style={styles.container}>
          <Text style={styles.userNameStyle}>{this.state.userName}</Text>
          <TouchableOpacity style={styles.logoutButton} title='Logout' onPress={this._signOutAsync}>
            <Text style={styles.logoutText}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity 
         onPress={() => {this.props.navigation.navigate('Profile')}}
         activeOpacity={0.5}
         style={styles.contentContainer}>
          <MaterialCommunityIcons
            style={styles.iconStyle}
            name='account-settings'
            size={26}
            color='#FC1055'
          />
          <Text style={styles.configStyle}>Configurações de Conta</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {this.props.navigation.navigate('About')}}
          activeOpacity={0.5}
          style={styles.contentContainer}>
          <MaterialCommunityIcons
            style={styles.iconStyle}
            name='information'
            size={26}
            color='#FC1055'
          />
          <Text style={styles.configStyle}>Sobre</Text>
        </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 30,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginVertical: 20,
    marginLeft: 30
  },
  userNameStyle: {
    color: '#FC1055',
    fontSize: 30,
    fontFamily: 'nunito'
  },
  logoutButton: {
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#EDEFF2'
  },
  logoutText: {
    color: "#FC1055",
    fontWeight: "bold",
    fontSize: 16
  },
  iconStyle: {
    marginRight: 20,
  },
  configStyle: {
    fontSize: 15,
    fontFamily: 'work-sans-semiBold',
  }
});
