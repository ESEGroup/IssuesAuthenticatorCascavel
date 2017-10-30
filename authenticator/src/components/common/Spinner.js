import React from 'react'
import { View, ActivityIndicator } from 'react-native'

const Spinner = ({ size, backgroundStyles, color }) => {
  return (
    <View style={backgroundStyles}>
      <ActivityIndicator size={size || 'large'} color={color} />
    </View>
  )
}

export default Spinner
