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
  Text
} from 'react-native';
import UsernameField from '../components/UsernameField'
import PasswordField from '../components/PasswordField'
import ButtonWithActivityIndicator from '../components/ButtonWithActivityIndicator'

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 30,
    backgroundColor: '#FAD3B0',
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
  footer: {
    flex: 0.075,
    borderTopColor: '#a9a9a9',
    borderTopWidth: 1,
    backgroundColor: '#FAD3B0',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOpacity: 0.8,
    shadowRadius: 15,
    shadowOffset : { width: 0, height: 10},
  },
});

export default class SignInScreen extends React.Component {
  state = {
      username: '',
      password: '',
      focus: false,
      isLoading: false
  };

  static navigationOptions = {
    header: null
  };

  render() {
    console.log(this.state.focus)
    return (
      <View style={{flex:1}}>
        <KeyboardAvoidingView style={styles.content} behavior="padding">
          <UsernameField
            callback={usernameInput => this.setState({ username: usernameInput })}
            placeholder="username"
            onSubmitEditing={() => this.setState({ focus: true })}
            value={this.state.username}
            blurOnSubmit={false}
          />
          <PasswordField
            refs={(input) =>  this.secondTextInput = input}
            callback={passwordInput => this.setState({ password: passwordInput })}
            password={this.state.password}
            placeholder="password"
            isPassword
            focus={this.state.focus}
          />

          <ButtonWithActivityIndicator
            activityIndicatorStyle={styles.loading}
            onPress={() => {
              this.setState({isLoading: true});
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
          >
            <Text>Ainda não se cadastrou?
              <Text style={{ color: '#0000FF' }}> Cadastrar-se</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>

    );
  }
}
