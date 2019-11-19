import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import api from '../config/api';
import { AntDesign } from '@expo/vector-icons';
import { HeaderBackButton } from 'react-navigation';

// const categories = [
//   {
//     "id": 1,
//     "name": "Alimentos Básicos"
//   },
//   {
//     "id": 2,
//     "name": "Mercearia"
//   },
// ]

// const subCategories = [
//   {
//     "id": 1,
//     "idcategory": 1,
//     "name": "Arroz"
//   },
//   {
//     "id": 2,
//     "idcategory": 1,
//     "name": "Granel"
//   },
//   {
//     "id": 3,
//     "idcategory": 2,
//     "name": "Farinhas e Farofas"
//   },
//   {
//     "id": 4,
//     "idcategory": 2,
//     "name": "Massas Instantâneas e Tradicionais"
//   },
// ]

// const products = [
//   {
//     "id": 1,
//     "name": "Aveia MEU BIJU 8 Grãos 500g ",
//     "brand": "Meu Biju",
//     "image": "https://s3-sa-east-1.amazonaws.com/ib.item.image.big/b-fbe3db93869a47ef9a3ba56079503133.png",
//     "price": 6.19,
//     "idsubcategory": 1
//   },
//   {
//     "id": 2,
//     "name": "Ervilha SEARA 300g",
//     "brand": "Seara",
//     "image": "https://s3-sa-east-1.amazonaws.com/ib.item.image.big/b-d5f73f6622004764aa4e4f1cb4187062.jpeg",
//     "price": 4.99,
//     "idsubcategory": 2
//   },
//   {
//     "id": 3,
//     "name": "Milho de Pipoca NIPPON 500g",
//     "brand": "Nippon",
//     "image": "https://s3-sa-east-1.amazonaws.com/ib.item.image.big/b-4edc419ff9a349fe85d3241c1dfe03ac.jpeg",
//     "price": 2.49,
//     "idsubcategory": 2
//   },
//   {
//     "id": 4,
//     "name": "Farinha de Trigo LUNAR Premium 1Kg",
//     "brand": "Lunar",
//     "image": "https://s3-sa-east-1.amazonaws.com/ib.item.image.big/b-8a39151ab91e4e7c94edbef2523d1b32.jpeg",
//     "price": 3.79,
//     "idsubcategory": 3
//   },
//   {
//     "id": 5,
//     "name": "Farinha de Trigo FINNA 1Kg",
//     "brand": "Finna",
//     "image": "https://s3-sa-east-1.amazonaws.com/ib.item.image.big/b-3f8d0abff53d41e3bacc5f88d7a432cd.jpeg",
//     "price": 3.49,
//     "idsubcategory": 3
//   },
//   {
//     "id": 6,
//     "name": "Macarrão Instantâneo TALHARIM 99g Frango ",
//     "brand": "Nissin Miojo",
//     "image": "https://s3-sa-east-1.amazonaws.com/ib.item.image.big/b-90c7bf3b68f748a8a52b8f36eedcc463.png",
//     "price": 2.29,
//     "idsubcategory": 4
//   },
// ];

export default class CreateNewShoppingListScreen extends React.Component {
  state = {
    list: {},
    productCatalog: {},
  }

  static navigationOptions = ({navigation}) => {
    return {
      title: 'Monte sua lista de compras',
      headerLeft: <HeaderBackButton onPress={() => navigation.navigate('App')} />,
      headerStyle: {
        backgroundColor: '#fff',
        borderRadius: 10,
        height: 66
      }
    };
  };

  async componentDidMount() {
    

    let productCatalog = {}     

    productCatalog = await this.setUpCategory(productCatalog);    
    productCatalog = await this.setUpSubCategory(productCatalog);
    productCatalog = await this.setUpProducts(productCatalog);

    this.setState({ productCatalog })
  }

  setUpCategory = async productCatalog => {
    let categories = {};

    try {
      res = await api.products.get('/category');
      categories = res.data;
      
    } catch (error) {
      console.log(error);
    }

    categories.map((category) => {
      productCatalog[category.id] = {
        name: category.name,
        subcategories: {}
      }
    });
    return productCatalog;
  }

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
      }
    });
    return productCatalog;
  }

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
        if(productCatalog[category].subcategories[product.idsubcategory]) {
          productCatalog[category].subcategories[product.idsubcategory].products.push(product)
        }
      });
    }
    return productCatalog;
  }

  addToList(item) {
    list = this.state.list;
    if (!list[item.id]) {
      list[item.id] = {
        name: item.name,
        qntd: 1,
      };
    } else {
      list[item.id].qntd +=1;
    }

    this.setState({list});
  }

  removeToList(item) {
    list = this.state.list;
    if (list[item.id]) {
      list[item.id].qntd -=1;

      if (list[item.id].qntd === 0) {
        delete list[item.id];
      }
    }

    this.setState({list})
  }

  _renderItem(item){
    const {navigate} = this.props.navigation
    return (
      <View
        style={styles.productView}
        keyExtractor={item => item.id}
      >
        <Image style={{flex:1}} source={{uri: item.image}}/>
        {
          this.state.list[item.id] ?
          <Text style={{alignSelf: 'center'}}>Quantidade: {this.state.list[item.id].qntd}</Text>
          :
          null
        }
        <View style={styles.buttonsView}>

          <TouchableOpacity style={styles.minusButton} title='Minus' onPress={() => this.removeToList(item)}>
            <AntDesign
              style={styles.iconStyle}
              name='minus'
              size={26}
              color='white'
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.plusButton} title='Plus' onPress={() => this.addToList(item)}>
            <AntDesign
              style={styles.iconStyle}
              name='plus'
              size={26}
              color='white'
            />
          </TouchableOpacity>

        </View>
      </View>
    )
  }

  render(){
    const productCatalog = []
    
    
    for (var category of Object.values(this.state.productCatalog)) {
      productCatalog.push(<Text style={styles.categoryName}>{category.name}</Text>)
      
      for (var subCategory of Object.values(category.subcategories)) {
        productCatalog.push(
          <View style={{paddingLeft: 0}}>
            <Text style={styles.subCategoryName}>{subCategory.name}</Text>
            <FlatList
            style={{paddingHorizontal: 5, paddingVertical: 5}}
            keyExtractor={item => item.id}
            horizontal
            ItemSeparatorComponent={() => <View style={{width: 30}} />}
            renderItem={({item}) => this._renderItem(item)}
            data={subCategory.products}
            />
          </View>
        );
      }
    }

    return (
      <ScrollView style={{flex: 1}}>
        {
          productCatalog
        }
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  productView: {
    width: 120,
    height: 180,
  },
  text: {
    color: 'black',
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
    borderTopWidth: 1,
  },
  buttonsView: {
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  plusButton: {
    borderBottomRightRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: '#32CD32',
    flex:0.5,
    alignItems: 'center',
  },
  minusButton: {
    borderBottomLeftRadius: 12,
    borderTopLeftRadius: 12,
    backgroundColor: '#FF2400',
    flex:0.5,
    alignItems: 'center',
  },
  iconStyle: {
  }
})
