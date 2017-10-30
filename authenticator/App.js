/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { StackNavigator } from 'react-navigation'

import HomeScreen from './src/components/pages/Home'
import StoreCredentialsScreen from './src/components/pages/StoreCredentials'

const Router = StackNavigator(
  {
    Home: { screen: HomeScreen },
    StoreCredentials: { screen: StoreCredentialsScreen }
  },
  {
    initialRouteName: 'StoreCredentials'
  }
)

export default Router
