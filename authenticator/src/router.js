import React from 'react'
import { StackNavigator } from 'react-navigation'

import HomeScreen from './components/pages/Home'
import StoreCredentialsScreen from './components/pages/StoreCredentials'

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
