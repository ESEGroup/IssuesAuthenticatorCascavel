import { AsyncStorage } from 'react-native'
import { NavigationActions } from 'react-navigation'

import { SERVER_URL } from '../config'

export const getFromStorage = key => {
  return AsyncStorage.getItem(key)
}

export function resetNavigation(targetRoute) {
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

export const fetchUser = ({ userId, email }) =>
  fetch(`${SERVER_URL}/validar_usuario_authenticator`, {
    method: 'POST',
    body: JSON.stringify({
      userId,
      email
    }),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin'
  })
