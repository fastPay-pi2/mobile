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
    nomeUsuario: '',
  }

  static navigationOptions = {
    title: 'Perfil',
  };

  async componentDidMount() {
    var value = await AsyncStorage.getItem('nomeUsuario');
    value = value.split(' ');
    value = value[0] + ' ' + value[1]
    this.setState({nomeUsuario: value});
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  render() {
    return (
      <View >
        <View style={styles.container}>
          <Text style={styles.userNameStyle}>{this.state.nomeUsuario}</Text>
          <TouchableOpacity style={styles.logoutButton} title='Logout' onPress={this._signOutAsync}>
            <Text style={{color: 'white'}}>Logout</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity activeOpacity={0.5} style={styles.contentContainer}>
          <MaterialCommunityIcons
            style={styles.iconStyle}
            name='account-settings'
            size={26}
            color='#FC1055'
          />
          <Text style={styles.configStyle}>Configurações de Conta</Text>
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.5} style={styles.contentContainer}>
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
    backgroundColor: '#FC1055',
    shadowColor: 'rgba(252, 16, 85, 0.5)',
    shadowOpacity: 0.8,
    shadowRadius: 15,
    shadowOffset : { width: 0, height: 13},
  },
  iconStyle: {
    marginRight: 20,
  },
  configStyle: {
    fontSize: 15,
    fontFamily: 'work-sans-semiBold',
  }
});
