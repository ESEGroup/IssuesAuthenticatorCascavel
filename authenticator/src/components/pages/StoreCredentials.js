import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import headerConfig from '../configs/header'

class StoreCredentials extends Component {
  static navigationOptions = headerConfig

  render() {
    return (
      <View>
        <Text>StoreCredentials</Text>
      </View>
    )
  }
}

export default StoreCredentials
