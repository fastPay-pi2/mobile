import React from 'react';
import {
  AsyncStorage,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CpfField from '../components/CpfField'
import NameField from '../components/NameField'
import UsernameField from '../components/UsernameField'
import EmailField from '../components/EmailField'
import PasswordField from '../components/PasswordField'
import { HeaderBackButton } from 'react-navigation';


export default class ProfileScreen extends React.Component {
  state = {
    userId: '',
    username: '',
    email: '',
    name: '',
    password: '',
    profile: {
      cpf: '',
      phone: '',
    },
    isLoading: false,
  }

  static navigationOptions = ({navigation}) => {
    return {
        title: 'Perfil',
        headerLeft: <HeaderBackButton onPress={() => navigation.navigate('Config')} />,
        headerStyle: {
        backgroundColor: '#fff',
        borderRadius: 10,
        height: 66
        },
        headerTitleStyle: { 
        textAlign:"center", 
        flex:0.8 
        }
    };
  };

  async componentDidMount() {
    var username = await AsyncStorage.getItem('userName');
    var email = await AsyncStorage.getItem('userEmail');
    var cpf = await AsyncStorage.getItem('userCPF');

    this.setState({username});
    this.setState({email});
    this.setState({cpf});
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
        </View>
        <View style={{ paddingHorizontal: 15 }}>
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
             
             
              <Text>CPF</Text>
              <CpfField
                value={this.state.cpf}
                callback={validCpf =>
                  this.setState({ profile: { ...this.state.profile, cpf: validCpf } })}
              />             
             
              <Text>Senha</Text>
              <PasswordField
                callback={validPassword => this.setState({ password: validPassword })}
                password={this.state.password}
                placeholder="Digite sua senha"
                // value=
                isPassword
                size={26}
              />
              
              <TouchableOpacity
                onPress={() => this._editAsync()}
                style={styles.buttonEdit}>
                <Text style={styles.buttonEditText}>
                  Editar dados
                </Text>
            </TouchableOpacity>
        </View>
      </View>
    );
  }

  _editAsync = async () => {
    this.setState({isLoading: true});
    const body = {
      'username': this.state.userName,
      'email': this.state.email,
      'cpf': this.state.cpf
    }
    if(this.state.password != '') {
      const body = {
        'username': this.state.userName,
        'email': this.state.email,
        'cpf': this.state.cpf,
        'password': this.state.password
      }
    }
    const userId = await AsyncStorage.getItem('userId');
    const userToken = await AsyncStorage.getItem('userToken');

    header = {
      headers: {
        'Authorization': 'Bearer ' + userToken,
      }
    }

    // api.auth.put(`/users/${userId}`, body, header)
    // .then( res => {
    //   console.log(res);
    //   if (res.status === 200) {
    //     this.setState({ isLoading: false });
    //     await AsyncStorage.setItem('userToken', res.data.token);
    //     await AsyncStorage.setItem('userName', res.data.user.name);
    //     await AsyncStorage.setItem('userId', res.data.user._id);
    //     await AsyncStorage.setItem('userCPF', res.data.user.cpf);
    //     await AsyncStorage.setItem('userEmail', res.data.user.email);
    //     // this.props.navigation.navigate('SignIn');
    //     Alert('Atualizado com sucesso')
    //   }
    // })
    // .catch(error => {
    //   console.log(error.response);
    //   Alert('Algo de errado não está certo')
    //   if (error.response.data.error === 'User already exists') {
    //     this.setState({messageError: 'Usuário já existe'});
    //     this.setState({ isLoading: false });
    //   }
    // })
    // // await AsyncStorage.setItem('userToken', '');

    try {
      const resAuth = await api.auth.put(`/users/${userId}`, body, header);
      if (resAuth.data.name) {
        this.setState({ isLoading: false });
        await AsyncStorage.setItem('userToken', resAuth.data.token);
        await AsyncStorage.setItem('userName', resAuth.data.user.name);
        await AsyncStorage.setItem('userId', resAuth.data.user._id);
        await AsyncStorage.setItem('userCPF', resAuth.data.user.cpf);
        await AsyncStorage.setItem('userEmail', resAuth.data.user.email);
        Alert('Atualizado com sucesso')
      }
    } catch (error) {
      if (error.response.data.error === 'User not found') {
        Alert('Usuário ou senha inválida');
      } else if (error.response.data.error === 'Invalid password') {
        Alert('Senha inválida');
      }
      this.setState({ isLoading: false });
    }
  };
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
  },
  buttonEdit: {
    
    paddingVertical: 18,
    marginHorizontal: 66,
    marginVertical: 20,
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EDEFF2'
  },
  buttonEditText: {
    color: '#FC1055',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16
  }
});
