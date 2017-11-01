import {
  FETCH_USER_SUCCESS,
  CREDENTIALS_FETCHED_INITIAL_STATE,
  USER_AUTH_PENDING,
  USER_AUTH_ENTER_SUCCESS,
  USER_AUTH_ENTER_FAIL,
  USER_AUTH_LEAVE_SUCCESS,
  USER_AUTH_LEAVE_FAIL,
  USER_STATE,
  USER_AUTH_CHANGE_SELECTED_LAB
} from '../actions/types'

import { setInStorage } from '../utils'

const INITIAL_STATE = {
  error: '',
  isLoadingAuth: false
}

export default (state = INITIAL_STATE, action) => {
  let newState

  switch (action.type) {
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isInsideLab: action.payload ? action.payload.labs[0].present : false,
        selectedLabId: action.payload ? action.payload.labs[0].labId : 0
      }

    case CREDENTIALS_FETCHED_INITIAL_STATE:
      return {
        ...state,
        ...action.payload,
        isInsideLab: action.payload ? action.payload.isInsideLab : false,
        selectedLabId: action.payload ? action.payload.selectedLabId : 0
      }

    case USER_AUTH_PENDING:
      return { ...state, isLoadingAuth: true }

    case USER_AUTH_ENTER_SUCCESS:
      newState = { ...state, isLoadingAuth: false, isInsideLab: true }
      setInStorage(USER_STATE, newState)

      return newState

    case USER_AUTH_LEAVE_SUCCESS:
      newState = { ...state, isLoadingAuth: false, isInsideLab: false }
      setInStorage(USER_STATE, newState)

      return newState

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

    case USER_AUTH_CHANGE_SELECTED_LAB:
      newState = {
        ...state,
        selectedLabId: action.payload,
        isInsideLab: state.labs.find(lab => lab.labId === action.payload)
          .present
      }
      setInStorage(USER_STATE, newState)

      return newState

    default:
      return state
  }
}
