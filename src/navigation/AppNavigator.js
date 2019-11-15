import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import MainTabNavigator from './MainTabNavigator';
import SignInScreen from '../screens/SignInScreen';
import RegisterScreen from '../screens/RegisterScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import QRCodeScannerScreen from '../screens/QRCodeScannerScreen';
import BarCodeScannerScreen from '../screens/BarCodeScannerScreen';
import QRCodeAdminScreen from '../screens/BarCodeScannerScreen';

import CreateNewShoppingListScreen from '../screens/CreateNewShoppingListScreen';
import ShoppingScreen from '../screens/ShoppingScreen';


const AuthStack = createStackNavigator({ SignIn: SignInScreen, Register: RegisterScreen });
const QrCodeStack = createStackNavigator({ Scan: QRCodeScannerScreen });
const QrCodeAdmintack = createStackNavigator({ Scan: QRCodeAdminScreen });

const BarCodeStack = createStackNavigator({ Scan: BarCodeScannerScreen });
const ShoppingStack = createStackNavigator({ Shopping: ShoppingScreen });
const ShoppingListStack = createStackNavigator({ CreateShoppingList: CreateNewShoppingListScreen });

export default createAppContainer(
  createSwitchNavigator({
    AuthLoading: AuthLoadingScreen,
    App: MainTabNavigator,
    Auth: AuthStack,
    Scan: QrCodeStack,
    AdminScan: QrCodeAdmintack,
    Shopping: ShoppingStack,
    ShoppingList: ShoppingListStack,
    BarCodeScan: BarCodeStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));
