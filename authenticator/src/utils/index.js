import { AsyncStorage } from 'react-native'
import { NavigationActions } from 'react-navigation'

export const getFromStorage = async key => {
  try {
    const value = await AsyncStorage.getItem(key)

    if (value) return JSON.parse(value)

    return null
  } catch (error) {
    return null
  }
}

export const resetNavigation = (targetRoute, ref) => {
  const resetAction = NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: targetRoute })]
  })
  ref.props.navigation.dispatch(resetAction)
}
