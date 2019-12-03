import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Button,
  TextInput,
  Alert,
  AsyncStorage
} from 'react-native';
import api from '../config/api';
import { HeaderBackButton } from 'react-navigation';
import { AntDesign } from '@expo/vector-icons';

export default class CreateNewShoppingListScreen extends React.Component {
  state = {
    list: {},
    productCatalog: {},
    listName: ''
  };

  async componentDidMount() {
    this.props.navigation.setParams({
      onChange: this.onChange.bind(this),
      save: this.save.bind(this),
      nameList: this.state.nameList
    });

    let productCatalog = {};

    productCatalog = await this.setUpCategory(productCatalog);
    productCatalog = await this.setUpSubCategory(productCatalog);
    productCatalog = await this.setUpProducts(productCatalog);

    this.setState({ productCatalog });
  }

  onChange = value => {
    this.setState({
      listName: value
    });
    this.props.navigation.setParams({
      listName: value
    });
  };

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;

    return {
      headerTitle: (
        <TextInput
          placeholder="Digite o nome da lista"
          placeholderTextColor="gray"
          onChangeText={navigation.getParam('onChange')}
          value={params.nameList}
          style={{
            height: 30,
            width: 200,
            borderBottomWidth: 0.3,
            borderBottomColor: 'gray'
          }}
        />
      ),
      headerLeft: (
        <HeaderBackButton onPress={() => navigation.navigate('App')} />
      ),
      headerRight: (
        <Button
          title="Salvar"
          style={{ paddingRight: 25 }}
          onPress={navigation.getParam('save')}
        />
      ),
      headerStyle: {
        backgroundColor: '#fff',
        borderRadius: 10,
        height: 66
      }
    };
  };

  save = () => {
    if (!this.props.navigation.getParam('listName')) {
      Alert.alert('Digite um nome para sua lista', '');
    } else {
      Alert.alert(
        'Deseja salvar a lista?',
        this.props.navigation.getParam('listName'),
        [
          {
            text: 'Sim',
            onPress: async () => {
              list = this.state.list;
              list['name'] = this.props.navigation.getParam('listName');

              var temp = await AsyncStorage.getItem('purchaseLists');
              purchaseLists = JSON.parse(temp);
              if (!purchaseLists) {
                purchaseLists = [];
              }
              purchaseLists.push(list);

              await AsyncStorage.setItem(
                'purchaseLists',
                JSON.stringify(purchaseLists)
              );
              this.props.navigation.navigate('App');
            },
            style: 'default'
          },
          {
            text: 'Não',
            style: 'cancel'
          }
        ],
        { cancelable: false }
      );
    }
  };

  setUpCategory = async productCatalog => {
    let categories = {};

    try {
      res = await api.products.get('/category');
      categories = res.data;
    } catch (error) {
      console.log(error);
    }

    categories.map(category => {
      productCatalog[category.id] = {
        name: category.name,
        subcategories: {}
      };
    });
    return productCatalog;
  };

  setUpSubCategory = async productCatalog => {
    let subcategories = {};

    try {
      res = await api.products.get('/subcategory');
      subcategories = res.data;
    } catch (error) {
      console.log(error);
    }

    subcategories.map(subcategory => {
      productCatalog[subcategory.idcategory].subcategories[subcategory.id] = {
        name: subcategory.name,
        products: []
      };
    });
    return productCatalog;
  };

  setUpProducts = async productCatalog => {
    let products = {};

    try {
      res = await api.products.get('/product');
      products = res.data;
    } catch (error) {
      console.log(error);
    }

    for (let category in productCatalog) {
      products.map(product => {
        if (productCatalog[category].subcategories[product.idsubcategory]) {
          productCatalog[category].subcategories[
            product.idsubcategory
          ].products.push(product);
        }
      });
    }
    return productCatalog;
  };

  addToList(item) {
    list = this.state.list;
    if (!list[item.id]) {
      list[item.id] = {
        name: item.name,
        qntd: 1
      };
    } else {
      list[item.id].qntd += 1;
    }

    this.setState({ list });
  }

  removeToList(item) {
    list = this.state.list;
    if (list[item.id]) {
      list[item.id].qntd -= 1;

      if (list[item.id].qntd === 0) {
        delete list[item.id];
      }
    }

    this.setState({ list });
  }

  _renderItem(item) {
    return (
      <View style={styles.productView} keyExtractor={item => item.id}>
        <Image style={{ flex: 1 }} source={{ uri: item.image }} />
        {this.state.list[item.id] ? (
          <Text style={{ alignSelf: 'center' }}>
            Quantidade: {this.state.list[item.id].qntd}
          </Text>
        ) : null}
        <View style={styles.buttonsView}>
          <TouchableOpacity
            style={styles.minusButton}
            title="Minus"
            onPress={() => this.removeToList(item)}
          >
            <AntDesign
              style={styles.iconStyle}
              name="minus"
              size={26}
              color="white"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.plusButton}
            title="Plus"
            onPress={() => this.addToList(item)}
          >
            <AntDesign
              style={styles.iconStyle}
              name="plus"
              size={26}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    const productCatalog = [];

    for (var category of Object.values(this.state.productCatalog)) {
      productCatalog.push(
        <Text key={category.name} style={styles.categoryName}>
          {category.name}
        </Text>
      );

      for (var subCategory of Object.values(category.subcategories)) {
        productCatalog.push(
          <View style={{ paddingLeft: 0 }}>
            <Text style={styles.subCategoryName}>{subCategory.name}</Text>
            <FlatList
              style={{ paddingHorizontal: 5, paddingVertical: 5 }}
              keyExtractor={item => item.id}
              horizontal
              ItemSeparatorComponent={() => <View style={{ width: 30 }} />}
              renderItem={({ item }) => this._renderItem(item)}
              data={subCategory.products}
            />
          </View>
        );
      }
    }

    return <ScrollView style={{ flex: 1 }}>{productCatalog}</ScrollView>;
  }
}

const styles = StyleSheet.create({
  productView: {
    width: 120,
    height: 180
  },
  text: {
    color: 'black'
  },
  categoryName: {
    flex: 1,
    fontSize: 24,
    backgroundColor: '#FC1055',
    paddingLeft: 5
  },
  subCategoryName: {
    flex: 1,
    fontSize: 18,
    paddingLeft: 10,
    borderTopColor: 'black',
    borderTopWidth: 1
  },
  buttonsView: {
    flexDirection: 'row',
    alignSelf: 'stretch'
  },
  plusButton: {
    borderBottomRightRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: '#32CD32',
    flex: 0.5,
    alignItems: 'center'
  },
  minusButton: {
    borderBottomLeftRadius: 12,
    borderTopLeftRadius: 12,
    backgroundColor: '#FF2400',
    flex: 0.5,
    alignItems: 'center'
  },
  iconStyle: {}
});
