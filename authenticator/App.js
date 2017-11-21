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

import SplashScreen from './src/components/pages/Splash'
import HomeScreen from './src/components/pages/Home'
import StoreCredentialsScreen from './src/components/pages/StoreCredentials'
import ConfigPreferencesScreen from './src/components/pages/ConfigPreferences'

import credentialsReducer from './src/reducers/credentials'
import userReducer from './src/reducers/user'
import splashReducer from './src/reducers/splash'
import preferencesReducer from './src/reducers/preferences'

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

const store = createStore(appReducer, applyMiddleware(thunk))

export default class Root extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    )
  }
}
