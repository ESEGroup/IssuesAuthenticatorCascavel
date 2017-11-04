import {
  SPLASH_GET_INITIAL_STATE,
  SPLASH_GET_INITIAL_STATE_SUCCESS,
  SPLASH_GET_INITIAL_STATE_FAIL
} from '../actions/types'

const INITIAL_STATE = {
  loadingUser: true
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SPLASH_GET_INITIAL_STATE:
      return { ...state, loadingUser: true }

    case SPLASH_GET_INITIAL_STATE_SUCCESS:
      return { ...state, loadingUser: false, user: action.payload }

    case SPLASH_GET_INITIAL_STATE_FAIL:
      return { ...state, loadingUser: false, user: null }

    default:
      return state
  }
}
