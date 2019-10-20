import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { AntDesign, Entypo, FontAwesome, Foundation } from '@expo/vector-icons';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'tio joão',
    image: 'https://static.carrefour.com.br/medias/sys_master/images/images/hb1/he1/h00/h00/9452863029278.jpg',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    name: 'camil feijão',
    image: 'https://static.carrefour.com.br/medias/sys_master/images/images/h71/hd4/h00/h00/9455430107166.jpg',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    name: 'camil arroz',
    image: 'https://static.carrefour.com.br/medias/sys_master/images/images/hfb/h28/h00/h00/9476860543006.jpg',
  },
  {
    id: '58694a0f-3da1-571f-bd96-145571e29d72',
    name: 'broto legal',
    image: 'https://static.carrefour.com.br/medias/sys_master/images/images/hef/h6b/h00/h00/9446694060062.jpg',
  },
];

export default class CreateNewShoppingListScreen extends React.Component {
  state = {
    list: {}
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
    return (
      <View style={{flex: 1}}>
      <View>
      <Text style={styles.text}>Categoria</Text>
      <FlatList
      keyExtractor={item => item.id}

      horizontal
      ItemSeparatorComponent={() => <View style={{width: 30}} />}
      renderItem={({item}) => this._renderItem(item)}
      data={DATA}
      />
      </View>
      </View>
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
