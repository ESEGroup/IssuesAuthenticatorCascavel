import {
  CREDENTIALS_USER_ID_CHANGED,
  CREDENTIALS_EMAIL_CHANGED,
  CREDENTIALS_PENDING,
  CREDENTIALS_SUCCESS,
  CREDENTIALS_FAIL,
  CREDENTIALS_INVALID_EMAIL,
  CREDENTIALS_INVALID_USER_ID,
  CREDENTIALS_FETCHED_INITIAL_STATE,
  CREDENTIALS_FETCH_INITIAL_STATE
} from '../actions/types'

import { getCache } from '../utils'
import { AsyncStorage } from 'react-native'

const INITIAL_STATE = {
  userId: '',
  email: '',
  error: '',
  loading: false,
  user: null
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREDENTIALS_USER_ID_CHANGED:
      return { ...state, userId: action.payload }
    case CREDENTIALS_EMAIL_CHANGED:
      return { ...state, email: action.payload }
    case CREDENTIALS_SUCCESS:
      AsyncStorage.setItem('userCredentials', JSON.stringify(action.payload))
      return { ...state, ...INITIAL_STATE, user: action.payload }
    case CREDENTIALS_FAIL:
      return { ...state, error: action.payload, password: '', loading: false }
    case CREDENTIALS_PENDING:
      return { ...state, loading: true, error: '' }
    case CREDENTIALS_INVALID_EMAIL:
      return { ...state, error: action.payload }
    case CREDENTIALS_INVALID_USER_ID:
      return { ...state, error: action.payload }
    case CREDENTIALS_FETCHED_INITIAL_STATE:
      return { ...state, fetchingInitialState: false, user: action.payload }
    case CREDENTIALS_FETCH_INITIAL_STATE:
      return { ...state, fetchingInitialState: true }
    default:
      return state
  }
}
