import { AsyncStorage } from 'react-native'

export const getCache = async key => {
  try {
    const value = await AsyncStorage.getItem(key)

    if (value) return JSON.parse(value)

    return null
  } catch (error) {
    return null
  }
}
