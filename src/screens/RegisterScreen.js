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
  Dimensions
} from 'react-native';
import api from '../config/api';
import CpfField from '../components/CpfField';
import NameField from '../components/NameField';
import PhoneNumberField from '../components/PhoneNumberField';
import EmailField from '../components/EmailField';
import PasswordField from '../components/PasswordField';
import ButtonWithActivityIndicator from '../components/ButtonWithActivityIndicator';

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  principal: {
    flex: 1,
    backgroundColor: '#fad3b0'
  },
  content: {
    flex: 1,
    paddingHorizontal: 25,
    backgroundColor: '#fad3b0',
    justifyContent: 'space-around'
    // marginVertical: 10
  },
  buttonText: {
    color: 'white',
    fontSize: 18
  },
  buttonRegister: {
    width: (50 / 100) * width,
    paddingVertical: 15,
    borderRadius: 8,
    alignSelf: 'center',
    backgroundColor: '#FC1055',
    shadowColor: 'rgba(252, 16, 85, 0.5)',
    shadowOpacity: 0.8,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 13 }
  },
  loading: {
    marginTop: 20,
    paddingVertical: 15
  },
  messageErrorStyle: {
    alignSelf: 'center',
    color: '#FC1055'
  }
});

export default class RegisterScreen extends React.Component {
  state = {
    username: '',
    email: '',
    name: '',
    secondName: '',
    password: '',
    profile: {
      cpf: '',
      phone: ''
    },
    passwordCompared: '',
    messageError: '',
    isLoading: false
  };

  static navigationOptions = {
    title: 'Cadastro',
    headerTruncatedBackTitle: null,
    headerTintColor: 'black',
    headerStyle: {
      backgroundColor: '#fff',
      borderRadius: 10,
      height: 66
    }
  };

  render() {
    return (
      <View style={styles.principal}>
        <KeyboardAvoidingView style={styles.content} behavior="padding">
          <View>
            <Text>CPF</Text>
            <CpfField
              value={this.state.profile.cpf}
              callback={validCpf =>
                this.setState({
                  profile: { ...this.state.profile, cpf: validCpf }
                })
              }
            />

            <Text>Nome</Text>
            <NameField
              value={this.state.name}
              callback={validName => this.setState({ name: validName })}
              placeholder="Digite seu nome"
            />

            <Text>Sobrenome</Text>
            <NameField
              value={this.state.secondName}
              callback={validName => this.setState({ secondName: validName })}
              placeholder="Digite seu sobrenome"
            />

            <Text>Email</Text>
            <EmailField
              value={this.state.email}
              callback={validEmail => this.setState({ email: validEmail })}
              placeholder="Digite o seu email"
              size={26}
            />

            <Text>Telefone</Text>
            <PhoneNumberField
              value={this.state.profile.phone}
              callback={validNumber =>
                this.setState({
                  profile: { ...this.state.profile, phone: validNumber }
                })
              }
            />

            <Text>Senha</Text>
            <PasswordField
              callback={validPassword =>
                this.setState({ password: validPassword })
              }
              password={this.state.password}
              placeholder="Digite sua senha"
              isPassword
              size={26}
            />

            <Text>Confirmar Senha</Text>
            <PasswordField
              callback={validPassword =>
                this.setState({ passwordCompared: validPassword })
              }
              password={this.state.password}
              passwordCompared={this.state.passwordCompared}
              placeholder="Digite sua senha novamente"
              isPassword={false}
              size={26}
            />
            <Text style={styles.messageErrorStyle}>
              {this.state.messageError}
            </Text>
          </View>
          <ButtonWithActivityIndicator
            activityIndicatorStyle={styles.loading}
            onPress={() => this._registerAsync()}
            isLoading={this.state.isLoading}
            buttonKey="Cadastrar"
            buttonText="Cadastrar"
            buttonStyle={styles.buttonRegister}
          />
        </KeyboardAvoidingView>
      </View>
    );
  }

  _registerAsync = async () => {
    this.setState({ isLoading: true });
    const body = {
      name: this.state.name,
      secondName: this.state.secondName,
      email: this.state.email,
      phoneNumber: this.state.profile.phone,
      cpf: this.state.profile.cpf,
      password: this.state.password,
      birphday: '',
      idAdmin: false
    };

    api.auth
      .post('/users', body)
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          this.setState({ isLoading: false });
          this.props.navigation.navigate('SignIn');
        }
      })
      .catch(error => {
        console.log(error.response);

        if (error.response.data.error === 'User already exists') {
          this.setState({ messageError: 'Usuário já existe' });
          this.setState({ isLoading: false });
        }
      });
    // await AsyncStorage.setItem('userToken', '');
  };
}
