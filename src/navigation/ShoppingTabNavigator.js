import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import ShoppingScreen from '../screens/ShoppingScreen';
import ShoppingWithList from '../screens/ShoppingWithList';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const ShoppingStack = createStackNavigator(
  {
    Shopping: ShoppingScreen,
  },
  config
);

ShoppingStack.navigationOptions = {
  tabBarOptions: {
    showLabel: false
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={ Platform.OS === 'ios' ? 'ios-home' : 'md-home' }/>
  ),
};

ShoppingStack.path = '';

const ShoppingWithListStack = createStackNavigator(
  {
    ShoppingWithList: ShoppingWithList,
  },
  config
);

ShoppingWithListStack.navigationOptions = {
  tabBarOptions: {
    showLabel: false
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-list' : 'md-list'} />
  ),
};

ShoppingWithListStack.path = '';

const tabNavigator = createBottomTabNavigator({
  ShoppingStack,
  ShoppingWithListStack,
});

tabNavigator.path = '';

export default tabNavigator;
