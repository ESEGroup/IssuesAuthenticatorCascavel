import React, { Component } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { connect } from 'react-redux'

import headerConfig from '../configs/header'
import { resetNavigation } from '../../utils'
import { getInitialState } from '../../actions/credentialsActions'

class Splash extends Component {
  static navigationOptions = {
    ...headerConfig,
    header: null
  }

  componentWillMount() {
    this.props.getInitialState()
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.user) {
      setTimeout(() => {
        resetNavigation.call(this, 'Home')
      }, 2000)
    } else {
      setTimeout(() => {
        resetNavigation.call(this, 'StoreCredentials')
      }, 2000)
    }
  }

  resetNavigation(targetRoute) {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: targetRoute })]
    })
    this.props.navigation.dispatch(resetAction)
  }

  render() {
    const { container, image, text } = styles

    return (
      <View style={container}>
        <Image
          source={require('../../../android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png')}
          style={image}
        />
        <Text style={text}>Issues Authenticator</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 100,
    height: 100
  },
  text: {
    fontSize: 18,
    color: '#444',
    marginTop: 20,
    fontWeight: 'bold'
  }
})

const mapStateToProps = state => {
  const { user } = state.credentials

  return { user }
}

export default connect(mapStateToProps, { getInitialState })(Splash)