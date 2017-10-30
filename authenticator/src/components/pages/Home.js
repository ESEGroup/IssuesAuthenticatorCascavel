import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import headerConfig from '../configs/header'

class Home extends Component {
  static navigationOptions = headerConfig

  render() {
    return (
      <View>
        <Text>Home</Text>
      </View>
    )
  }
}

export default Home
