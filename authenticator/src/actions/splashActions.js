import {
  SPLASH_GET_INITIAL_STATE,
  SPLASH_GET_INITIAL_STATE_SUCCESS,
  SPLASH_GET_INITIAL_STATE_FAIL,
  FETCH_USER_SUCCESS,
  USER_STATE
} from './types'

import { fetchUser, getFromStorage } from '../utils'

export const getInitialState = () => {
  return dispatch => {
    dispatch({
      type: SPLASH_GET_INITIAL_STATE
    })

    getFromStorage(USER_STATE)
      .then(userString => {
        if (userString) return JSON.parse(userString)

        return Promise.reject()
      })
      .then(userStorage => fetchUser(userStorage))
      .then(response => response.json())
      .then(updatedUser => {
        dispatch({
          type: FETCH_USER_SUCCESS,
          payload: updatedUser
        })

        dispatch({
          type: SPLASH_GET_INITIAL_STATE_SUCCESS,
          payload: updatedUser
        })
      })
      .catch(() => {
        dispatch({
          type: SPLASH_GET_INITIAL_STATE_FAIL
        })
      })
  }
}
