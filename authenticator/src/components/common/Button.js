import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

const Button = ({ onPress, children, backgroundStyle, textStyle }) => {
  return (
    <TouchableOpacity onPress={onPress} style={backgroundStyle}>
      <Text style={textStyle}>{children}</Text>
    </TouchableOpacity>
  )
}

export default Button
