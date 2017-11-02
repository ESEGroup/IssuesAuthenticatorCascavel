import {
  CREDENTIALS_USER_ID_CHANGED,
  CREDENTIALS_EMAIL_CHANGED,
  FETCH_USER_PENDING,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAIL,
  CREDENTIALS_INVALID_EMAIL,
  CREDENTIALS_INVALID_USER_ID,
  CREDENTIALS_FETCHED_INITIAL_STATE,
  CREDENTIALS_FETCH_INITIAL_STATE,
  USER_STATE,
  USER_AUTH_STATE_DELETE
} from '../actions/types'

import { getFromStorage, setInStorage } from '../utils'

const INITIAL_STATE = {
  userId: '',
  email: '',
  error: '',
  loading: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREDENTIALS_USER_ID_CHANGED:
      return { ...state, userId: action.payload }

    case CREDENTIALS_EMAIL_CHANGED:
      return { ...state, email: action.payload }

    case FETCH_USER_SUCCESS:
      const newUser = {
        ...action.payload,
        selectedLabId: action.payload.labs[0].labId,
        isInsideLab: action.payload.labs[0].present
      }
      setInStorage(USER_STATE, newUser)

      return { ...state, ...INITIAL_STATE, user: newUser }

    case FETCH_USER_FAIL:
      return { ...state, error: action.payload, password: '', loading: false }

    case FETCH_USER_PENDING:
      return { ...state, loading: true, error: '' }

    case CREDENTIALS_INVALID_EMAIL:
      return { ...state, error: action.payload }

    case CREDENTIALS_INVALID_USER_ID:
      return { ...state, error: action.payload }

    case CREDENTIALS_FETCHED_INITIAL_STATE:
      return { ...state, fetchingInitialState: false, user: action.payload }

    case CREDENTIALS_FETCH_INITIAL_STATE:
      return { ...state, fetchingInitialState: true }

    case USER_AUTH_STATE_DELETE:
      return { ...INITIAL_STATE }

    default:
      return state
  }
}