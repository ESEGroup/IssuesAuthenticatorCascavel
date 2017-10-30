import React from 'react'
import {
  StackNavigator,
  addNavigationHelpers,
  NavigationActions
} from 'react-navigation'
import { BackHandler } from 'react-native'
import { combineReducers, createStore } from 'redux'
import { connect, Provider } from 'react-redux'

import HomeScreen from './src/components/pages/Home'
import StoreCredentialsScreen from './src/components/pages/StoreCredentials'

const AppNavigator = StackNavigator(
  {
    Home: { screen: HomeScreen },
    StoreCredentials: { screen: StoreCredentialsScreen }
  },
  {
    initialRouteName: 'StoreCredentials'
  }
)

const initialState = AppNavigator.router.getStateForAction(
  AppNavigator.router.getActionForPathAndParams('StoreCredentials')
)

const navReducer = (state = initialState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state)

  return nextState || state
}

const appReducer = combineReducers({
  nav: navReducer
})

class ReduxNavigation extends React.Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress)
  }
  componentWillUnmount() {
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

  render() {
    const { dispatch, nav } = this.props
    const navigation = addNavigationHelpers({ dispatch, state: nav })

    return <AppNavigator navigation={navigation} />
  }
}

const mapStateToProps = state => ({
  nav: state.nav
})

const AppWithNavigationState = connect(mapStateToProps)(ReduxNavigation)

const store = createStore(appReducer)

export default class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigationState />
      </Provider>
    )
  }
}
