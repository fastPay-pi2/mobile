import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  StatusBar,
  StyleSheet,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Text,
  Image
} from 'react-native';
import api from '../config/api';
import EmailField from '../components/EmailField'
import PasswordField from '../components/PasswordField'
import ButtonWithActivityIndicator from '../components/ButtonWithActivityIndicator'


export default class SignInScreen extends React.Component {
  state = {
      email: '',
      password: '',
      focus: false,
      isLoading: false,
      error: false,
      messageError: '',
    };

    static navigationOptions = {
      header: null,
    headerBackTitle: null
  };

  render() {
    return (
      <View style={{flex:1}}>
        <KeyboardAvoidingView style={styles.content} behavior="padding">
          <View style={styles.logoView}>
            <Image source={require('../assets/images/carshier_Logo_transparente.png')} style={styles.imageLogo}/>
            <Text style={styles.textLogo} >fastPay</Text>
          </View>
          <EmailField
            callback={usernameInput => this.setState({ email: usernameInput })}
            placeholder="email"
            onSubmitEditing={() => this.setState({ focus: true })}
            value={this.state.email}
            blurOnSubmit={false}
            size={26}
            />
          <PasswordField
            refs={(input) =>  this.secondTextInput = input}
            callback={passwordInput => this.setState({ password: passwordInput })}
            password={this.state.password}
            placeholder="password"
            isPassword
            focus={this.state.focus}
          />
        <Text style={styles.messageErrorStyle}>{this.state.messageError}</Text>

          <ButtonWithActivityIndicator
            activityIndicatorStyle={styles.loading}
            onPress={() => {
              this._signInAsync();
            }}
            isLoading={this.state.isLoading}
            buttonKey="Login"
            buttonText="Login"
            buttonStyle={styles.buttonLogin}
          />
        </KeyboardAvoidingView>

        <View style={styles.footer}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => this.props.navigation.navigate('Register')}
          >
            <Text>Ainda não se cadastrou?
              <Text style={{ color: '#0000FF' }}> Cadastrar-se</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>

    );
  }

  _signInAsync = async () => {
    this.setState({ isLoading: true })
    const body = {
      'email': this.state.email,
      'password': this.state.password,
    }

    api.auth.post('/sessions', body)
    .then( async res => {
      if (res.data.token) {
        await AsyncStorage.setItem('userToken', res.data.token);
        await AsyncStorage.setItem('userName', res.data.user.name);
        await AsyncStorage.setItem('userId', res.data.user._id);
        await AsyncStorage.setItem('userCPF', res.data.user.cpf);
        await AsyncStorage.setItem('userEmail', res.data.user.email);
        this.props.navigation.navigate('App');
      }
    })
    .catch(error => {
      console.log(error.response);
      if (error.response.data.error === 'User not found') {
        this.setState({messageError: 'Usuário ou senha inválida'});
      } else if (error.response.data.error === 'Invalid password') {
        this.setState({messageError: 'Senha inválida'});
      }
      this.setState({ isLoading: false })
    })
  };
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 30,
    backgroundColor: '#fad3b0',
    justifyContent: 'center',
  },
  loading: {
    marginTop: 50,
    paddingVertical: 13,
  },
  buttonLogin: {
    paddingVertical: 18,
    marginTop: 50,
    borderRadius: 8,
    alignItems: 'center',
    backgroundColor: '#FC1055',
    shadowColor: 'rgba(252, 16, 85, 0.5)',
    shadowOpacity: 0.8,
    shadowRadius: 15,
    shadowOffset : { width: 0, height: 13},
  },
  logoView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  imageLogo: {
    width: 120,
    height: 120
  },
  textLogo: {
    fontSize: 36,
    fontFamily: 'work-sans-semiBold',
  },
  footer: {
    flex: 0.075,
    borderTopColor: '#a9a9a9',
    borderTopWidth: 0.2,
    backgroundColor: '#F5D4B1',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOpacity: 0.8,
    shadowRadius: 15,
    shadowOffset : { width: 0, height: 10},
  },
  messageErrorStyle: {
    alignSelf: 'center',
    color: '#FC1055',
  },
});
