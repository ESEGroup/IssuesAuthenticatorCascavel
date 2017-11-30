import React from 'react'
import {
  StackNavigator,
  addNavigationHelpers,
  NavigationActions
} from 'react-navigation'
import { BackHandler, NativeModules } from 'react-native'
import { combineReducers, createStore, applyMiddleware } from 'redux'
import { connect, Provider } from 'react-redux'
import thunk from 'redux-thunk'
import BackgroundTask from 'react-native-background-task'

import SplashScreen from './src/components/pages/Splash'
import HomeScreen from './src/components/pages/Home'
import StoreCredentialsScreen from './src/components/pages/StoreCredentials'
import ConfigPreferencesScreen from './src/components/pages/ConfigPreferences'

import credentialsReducer from './src/reducers/credentials'
import userReducer from './src/reducers/user'
import splashReducer from './src/reducers/splash'
import preferencesReducer from './src/reducers/preferences'

import Monitor from './src/modules/Monitor'
import API from './src/api'
import { USER_STATE, FETCH_USER_SUCCESS } from './src/actions/types'
import { getFromStorage } from './src/utils'

const { UIManager } = NativeModules

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true)

const AppNavigator = StackNavigator(
  {
    Splash: { screen: SplashScreen },
    Home: { screen: HomeScreen },
    StoreCredentials: { screen: StoreCredentialsScreen },
    ConfigPreferences: { screen: ConfigPreferencesScreen }
  },
  {
    initialRouteName: 'Splash'
  }
)

const initialState = AppNavigator.router.getStateForAction(
  AppNavigator.router.getActionForPathAndParams('Splash')
)

const navReducer = (state = initialState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state)

  return nextState || state
}

const appReducer = combineReducers({
  nav: navReducer,
  credentials: credentialsReducer,
  user: userReducer,
  splash: splashReducer,
  preferences: preferencesReducer
})

const store = createStore(appReducer, applyMiddleware(thunk))

BackgroundTask.define(async () => {
  try {
    const userString = await getFromStorage(USER_STATE)

    if (!userString) {
      return BackgroundTask.finish()
    }
    const { userId, email } = JSON.parse(userString)
    const response = await API.fetchUser({ userId, email })
    const fetchedUser = await response.json()

    const responses = await Monitor(fetchedUser)
    const noChange = responses.reduce((prev, cur) => prev && (cur === null), true)

    if (noChange) {
      return BackgroundTask.finish()
    }

    const refetch = await API.fetchUser({ userId, email })
    const refetchedUser = await refetch.json()

    store.dispatch({ type: FETCH_USER_SUCCESS, payload: refetchedUser })
    BackgroundTask.finish()
  } catch (e) {
    BackgroundTask.finish()
  }
})

class ReduxNavigation extends React.Component {
  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress)
  }
  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress)
  }
  onBackPress = () => {
    const { dispatch, nav } = this.props
    if (nav.index === 0) {
      return false
    }
    dispatch(NavigationActions.back())
    return true
  }

  render () {
    const { dispatch, nav } = this.props
    const navigation = addNavigationHelpers({ dispatch, state: nav })

    return <AppNavigator navigation={navigation} />
  }
}

const mapStateToProps = state => ({
  nav: state.nav
})

const AppWithNavigationState = connect(mapStateToProps)(ReduxNavigation)

export default class Root extends React.Component {
  componentDidMount () {
    BackgroundTask.schedule()
  }

  render () {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    )
  }
}
