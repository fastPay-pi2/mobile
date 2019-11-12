import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ShoppingListScreen from '../screens/ShoppingListScreen';
import ConfigScreen from '../screens/ConfigScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarOptions: {
    showLabel: false
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={ Platform.OS === 'ios' ? 'ios-home' : 'md-home' }/>
  ),
};

HomeStack.path = '';

const ShoppingListStack = createStackNavigator(
  {
    ShoppingList: ShoppingListScreen,
  },
  config
);

ShoppingListStack.navigationOptions = {
  tabBarOptions: {
    showLabel: false
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-list' : 'md-list'} />
  ),
};

ShoppingListStack.path = '';

const SettingsStack = createStackNavigator(
  {
    Config: ConfigScreen,
  },
  config
);

SettingsStack.navigationOptions = {
  tabBarOptions: {
    showLabel: false
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'md-person' : 'md-person'} />
  ),
};

SettingsStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  ShoppingListStack,
  SettingsStack,
});

tabNavigator.path = '';

export default tabNavigator;
