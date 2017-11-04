import React from 'react'
import { TextInput, View } from 'react-native'

const Input = ({
  secure,
  label,
  value,
  placeholder,
  onChangeText,
  keyboardType
}) => {
  const { inputStyle, containerStyle } = styles

  return (
    <View style={containerStyle}>
      <TextInput
        placeholder={placeholder}
        autoCorrect={false}
        value={value}
        onChangeText={onChangeText}
        style={inputStyle}
        secureTextEntry={secure}
        keyboardType={keyboardType}
      />
    </View>
  )
}

const styles = {
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 14,
    lineHeight: 23,
    flex: 3
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
}

export default Input
