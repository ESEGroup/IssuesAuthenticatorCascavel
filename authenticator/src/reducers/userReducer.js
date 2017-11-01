import {
  FETCH_USER_SUCCESS,
  CREDENTIALS_FETCHED_INITIAL_STATE
} from '../actions/types'

const INITIAL_STATE = {
  isInsideLab: false
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_SUCCESS:
    case CREDENTIALS_FETCHED_INITIAL_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
