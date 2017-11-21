import { AsyncStorage } from 'react-native'
import { NavigationActions } from 'react-navigation'

export const getFromStorage = key => {
  return AsyncStorage.getItem(key)
}

export function resetNavigation (targetRoute) {
  const resetAction = NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: targetRoute })]
  })
  this.props.navigation.dispatch(resetAction)
}

export const setInStorage = (key, data) => {
  AsyncStorage.setItem(key, JSON.stringify(data))
}

export const removeFromStorage = key => {
  return AsyncStorage.removeItem(key)
}
