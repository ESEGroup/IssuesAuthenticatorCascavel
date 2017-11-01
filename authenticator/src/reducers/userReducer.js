import {
  FETCH_USER_SUCCESS,
  CREDENTIALS_FETCHED_INITIAL_STATE,
  USER_AUTH_PENDING,
  USER_AUTH_ENTER_SUCCESS,
  USER_AUTH_ENTER_FAIL,
  USER_AUTH_LEAVE_SUCCESS,
  USER_AUTH_LEAVE_FAIL
} from '../actions/types'

const INITIAL_STATE = {
  isInsideLab: false,
  error: '',
  isLoadingAuth: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_SUCCESS:
    case CREDENTIALS_FETCHED_INITIAL_STATE:
      return { ...state, ...action.payload }
    case USER_AUTH_PENDING:
      return { ...state, isLoadingAuth: true }
    case USER_AUTH_ENTER_SUCCESS:
      return { ...state, isLoadingAuth: false, isInsideLab: true }
    case USER_AUTH_LEAVE_SUCCESS:
      return { ...state, isLoadingAuth: false, isInsideLab: false }
    case USER_AUTH_ENTER_FAIL:
      return {
        ...state,
        isLoadingAuth: false,
        error: 'Ocorreu um erro no registro da entrada.'
      }
    case USER_AUTH_LEAVE_FAIL:
      return {
        ...state,
        isLoadingAuth: false,
        error: 'Ocorreu um erro no registro da saída.'
      }
    default:
      return state
  }
}
