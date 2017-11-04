import {
  FETCH_USER_SUCCESS,
  CREDENTIALS_FETCH_INITIAL_STATE_SUCCESS,
  USER_AUTH_PENDING,
  USER_AUTH_ENTER_SUCCESS,
  USER_AUTH_ENTER_FAIL,
  USER_AUTH_LEAVE_SUCCESS,
  USER_AUTH_LEAVE_FAIL,
  USER_STATE,
  USER_AUTH_CHANGE_SELECTED_LAB,
  USER_AUTH_STATE_DELETE
} from '../actions/types'

import { setInStorage } from '../utils'

const INITIAL_STATE = {
  error: '',
  isLoadingAuth: false,
  labs: []
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

    case USER_AUTH_PENDING:
      return { ...state, isLoadingAuth: true }

    case USER_AUTH_ENTER_SUCCESS:
      return {
        ...state,
        isLoadingAuth: false,
        isInsideLab: true,
        labs: state.labs.map(lab => {
          lab.present = lab.labId === state.selectedLabId

          return lab
        })
      }

    case USER_AUTH_LEAVE_SUCCESS:
      return {
        ...state,
        isLoadingAuth: false,
        isInsideLab: false,
        labs: state.labs.map(lab => {
          lab.present = false

          return lab
        })
      }

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
      return {
        ...state,
        selectedLabId: action.payload,
        isInsideLab: state.labs.find(lab => lab.labId === action.payload)
          .present
      }

    case USER_AUTH_STATE_DELETE:
      return { ...INITIAL_STATE }

    default:
      return state
  }
}
