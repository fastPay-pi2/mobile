import React from 'react';
import PropTypes from 'prop-types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  TouchableOpacity,
  Picker,
  Alert,
  Button,
  KeyboardAvoidingView,
  Keyboard,
  BackHandler,
  Dimensions,
} from 'react-native';
import api from '../config/api'
import CpfField from '../components/CpfField'
import NameField from '../components/NameField'
import UsernameField from '../components/UsernameField'
import EmailField from '../components/EmailField'
import PasswordField from '../components/PasswordField'
import ButtonWithActivityIndicator from '../components/ButtonWithActivityIndicator'


const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  principal: {
    flex: 1,
    backgroundColor: '#fad3b0',
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#fad3b0',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  buttonRegister: {
    width: (50/100)*width,
    paddingVertical: 15,
    marginTop: 20,
    borderRadius: 8,
    alignSelf: 'center',
    backgroundColor: '#FC1055',
    shadowColor: 'rgba(252, 16, 85, 0.5)',
    shadowOpacity: 0.8,
    shadowRadius: 15,
    shadowOffset : { width: 0, height: 13},
  },
  loading: {
    marginTop: 20,
    paddingVertical: 15,
  },
  messageErrorStyle: {
    alignSelf: 'center',
    color: '#FC1055',
  },
});

export default class RegisterScreen extends React.Component {
  state = {
    username: '',
    email: '',
    name: '',
    password: '',
    profile: {
      cpf: '',
      phone: '',
    },
    passwordCompared: '',
    messageError: '',
    isLoading: false,
  };

  static navigationOptions = {
    headerTruncatedBackTitle: null,
    headerTintColor: 'black',
    headerStyle: {borderBottomWidth: 0}
  };

  render() {
    return (
      <View style={styles.principal}>
          <KeyboardAvoidingView style={styles.content} behavior="padding">
            <View style={{ paddingHorizontal: 15 }}>
              <Text>CPF</Text>
              <CpfField
                value={this.state.profile.cpf}
                callback={validCpf =>
                  this.setState({ profile: { ...this.state.profile, cpf: validCpf } })}
              />

              <Text>Nome</Text>
              <NameField
                value={this.state.name}
                callback={validName => this.setState({ name: validName })}
              />

              <Text>Username</Text>
              <UsernameField
                callback={usernameInput => this.setState({ username: usernameInput })}
                placeholder="Escolha um nome de usuário"
                onSubmitEditing={() => this.setState({ focus: true })}
                value={this.state.username}
                blurOnSubmit={false}
              />

              <Text>Email</Text>
              <EmailField
                value={this.state.email}
                callback={validEmail => this.setState({ email: validEmail })}
                placeholder="Digite o seu email"
                size={26}
              />

              <Text>Senha</Text>
              <PasswordField
                callback={validPassword => this.setState({ password: validPassword })}
                password={this.state.password}
                placeholder="Digite sua senha"
                isPassword
                size={26}
              />

              <Text>Confirmar Senha</Text>
              <PasswordField
                callback={validPassword => this.setState({ passwordCompared: validPassword })}
                password={this.state.password}
                passwordCompared={this.state.passwordCompared}
                placeholder="Digite sua senha novamente"
                isPassword={false}
                size={26}
              />
              <Text style={styles.messageErrorStyle}>{this.state.messageError}</Text>

              <ButtonWithActivityIndicator
                activityIndicatorStyle={styles.loading}
                onPress={() => this._registerAsync()}
                isLoading={this.state.isLoading}
                buttonKey="Cadastrar"
                buttonText="Cadastrar"
                buttonStyle={styles.buttonRegister}
              />

            </View>
          </KeyboardAvoidingView>
      </View>
    )
  }

  _registerAsync = async () => {
    this.setState({isLoading: true});
    const body = {
      'name': this.state.name,
      'username': this.state.username,
      'email': this.state.email,
      'cpf': this.state.profile.cpf,
      'password': this.state.password,
      'birphday': '',
      'idAdmin': false,
    }

    api.auth.post('/users', body)
    .then( res => {
      console.log(res);
      if (res.status === 200) {
        this.setState({ isLoading: false });
        this.props.navigation.navigate('SignIn');
      }
    })
    .catch(error => {
      console.log(error.response);

      if (error.response.data.error === 'User already exists') {
        this.setState({messageError: 'Usuário já existe'});
        this.setState({ isLoading: false });
      }
    })
    // await AsyncStorage.setItem('userToken', '');
  };
}
