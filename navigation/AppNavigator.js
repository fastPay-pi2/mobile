import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import MainTabNavigator from './MainTabNavigator';
import SignInScreen from '../screens/SignInScreen';
import RegisterScreen from '../screens/RegisterScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import QRCodeScannerScreen from '../screens/QRCodeScannerScreen';

const AuthStack = createStackNavigator({ SignIn: SignInScreen, Register: RegisterScreen });
const ShoppingStack = createStackNavigator({ Scan: QRCodeScannerScreen });

export default createAppContainer(
  createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    App: MainTabNavigator,
    Auth: AuthStack,
    Shopping: ShoppingStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));
