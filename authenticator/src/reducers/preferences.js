import {
  PREFERENCES_SEND_SUCCESS,
  PREFERENCES_SEND_FAIL,
  PREFERENCES_SEND_PENDING,
  PREFERENCES_TEMP_CHANGE,
  PREFERENCES_UMID_CHANGE,
  PREFERENCES_INITIAL_STATE
} from '../actions/types'

const INITIAL_STATE = {
  sliderTemp: null,
  sliderUmid: null,
  loading: false,
  erro: ''
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PREFERENCES_INITIAL_STATE:
      return { ...state, sliderTemp: { ...action.payload.temp }, sliderUmid: { ...action.payload.umid } }

    case PREFERENCES_SEND_PENDING:
      return { ...state, loading: true }

    case PREFERENCES_SEND_SUCCESS:
      return { ...state, ...INITIAL_STATE }

    case PREFERENCES_SEND_FAIL:
      return { ...state, loading: false, erro: action.payload }

    case PREFERENCES_TEMP_CHANGE:
      return { ...state, sliderTemp: { ...action.payload } }

    case PREFERENCES_UMID_CHANGE:
      return { ...state, sliderUmid: { ...action.payload } }

    default:
      return state
  }
}
