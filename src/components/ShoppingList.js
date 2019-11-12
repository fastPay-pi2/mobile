import React from 'react';
import PropTypes from 'prop-types';
import { Text, View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ShoppingList = props => (
  <View>
    <TouchableOpacity
      onPress={() => props.onPress()}
      style={{...styles.list, ...props.listStyle}}
      activeOpacity={0.6}
    >
      <Text style={{...styles.listText, ...props.textStyle}}>{props.listText}</Text>
      <Ionicons
        name='ios-arrow-forward'
        size={22}
        style={styles.arrowStyle}
        color='rgba(252, 16, 85, 0.5)'
      />
    </TouchableOpacity>
  </View>
);

const { height } = Dimensions.get('window');
const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  listText: {
    textAlign: 'center',
    alignSelf: 'center',
    color: 'rgba(252, 16, 85, 0.5)',
  },
  list: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 12,
    backgroundColor: '#FFF',
    borderBottomWidth: 0.5,
    borderColor: 'rgba(252, 16, 85, 0.5)',
    shadowColor: 'rgba(252, 16, 85, 0.5)',
    shadowOpacity: 0.2,
    shadowRadius: 15,
    shadowOffset : { width: 0, height: 5},
  },
});

ShoppingList.propTypes = {
  onPress: PropTypes.func.isRequired,
  listText: PropTypes.string.isRequired,
  textStyle: PropTypes.object,
  listStyle: PropTypes.object,
};

export default ShoppingList;
