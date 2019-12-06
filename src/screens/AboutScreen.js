import React from 'react';
import {
  AsyncStorage,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { HeaderBackButton } from 'react-navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CpfField from '../components/CpfField'
import NameField from '../components/NameField'
import UsernameField from '../components/UsernameField'
import EmailField from '../components/EmailField'
import PasswordField from '../components/PasswordField'

export default class AboutScreen extends React.Component {
  state = {
    userId: '',
    userName: '',
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
        title: 'Sobre',
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
    var temp = await AsyncStorage.getItem('userName');
    var email = await AsyncStorage.getItem('userEmail');
    var cpf = await AsyncStorage.getItem('userCPF');

    temp = temp.split(' ');
    console.log('split');
    console.log(temp)

    userName = temp[0]
    usernameInput = temp[1]
    if (temp[1]) {
      userName += ' ' + temp[1];
    }
    this.setState({userName});
    this.setState({email});
    this.setState({cpf});
    this.setState({usernameInput});
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  render() {
    return (
      <View >
        <View style={styles.container}>
          <Text style={styles.userNameStyle}>FastPay é um sistema automatizado para pagamento em
                                             supermercados desenvolvido por alunos da
                                             Universidade de Brasília para a disciplina de
                                             Projeto Integrador 2 do segundo semestre de 2019</Text>
        </View>
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
