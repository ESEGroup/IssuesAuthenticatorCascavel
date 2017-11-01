import React, { Component } from 'react'
import {
  Animated,
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons'

import headerConfig from '../configs/header'
import Card from '../common/Card'
import CardSection from '../common/CardSection'
import Button from '../common/Button'
import Spinner from '../common/Spinner'
import SlideMenu from '../SlideMenu'

import { registerUserEnter, registerUserLeave } from '../../actions/userActions'

class Home extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state

    return {
      ...headerConfig,
      headerLeft: (
        <TouchableOpacity onPress={() => params.handleOpenSideMenu()}>
          <Icon
            name="menu"
            size={30}
            color="#fff"
            style={{ marginLeft: 10, marginRight: 0 }}
          />
        </TouchableOpacity>
      )
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      isSideMenuOpen: false
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({
      handleOpenSideMenu: this.openSideMenu.bind(this)
    })
  }

  openSideMenu() {
    const isSideMenuOpen = this.state.isSideMenuOpen

    this.setState({
      isSideMenuOpen: !isSideMenuOpen
    })
  }

  onEnterButtonPress() {
    const { userId } = this.props

    this.props.registerUserEnter(userId, 1)
  }
  onLeaveButtonPress() {
    const { userId } = this.props

    this.props.registerUserLeave(userId, 1)
  }

  renderButton() {
    const { enter, leave } = styles.buttonStyles

    if (!this.props.isInsideLab) {
      if (this.props.isLoadingAuth) {
        return (
          <Spinner
            backgroundStyles={enter.background}
            color={enter.spinner.color}
          />
        )
      }

      return (
        <Button
          onPress={this.onEnterButtonPress.bind(this)}
          backgroundStyle={enter.background}
          textStyle={enter.text}
        >
          REGISTRAR ENTRADA
        </Button>
      )
    }

    if (this.props.isLoadingAuth) {
      return (
        <Spinner
          backgroundStyles={leave.background}
          color={leave.spinner.color}
        />
      )
    }

    return (
      <Button
        onPress={this.onLeaveButtonPress.bind(this)}
        backgroundStyle={leave.background}
        textStyle={leave.text}
      >
        REGISTRAR SAÍDA
      </Button>
    )
  }

  render() {
    const { userId } = this.props
    const { isSideMenuOpen } = this.state
    const { containerView, textView, buttonView } = styles

    return (
      <View style={containerView}>
        <SlideMenu
          style={{
            position: 'absolute',
            height: 200,
            elevation: 10,
            backgroundColor: 'pink',
            width: 200
          }}
          isMenuOpen={isSideMenuOpen}
        />
        <View style={textView}>
          <Text style={{ fontSize: 18 }}>Olá, {userId}</Text>
        </View>

        <View style={buttonView}>{this.renderButton()}</View>
      </View>
    )
  }
}

const styles = {
  containerView: {
    flex: 1,
    justifyContent: 'space-between',
    position: 'relative'
  },
  textView: {
    marginTop: 15,
    marginLeft: 20
  },
  buttonView: {
    marginBottom: 60
  },
  buttonStyles: {
    enter: {
      background: {
        alignSelf: 'stretch',
        backgroundColor: '#2381E7',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#2381E7',
        marginLeft: 5,
        marginRight: 5
      },
      spinner: {
        color: '#fff'
      },
      text: {
        alignSelf: 'center',
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
      }
    },
    leave: {
      background: {
        alignSelf: 'stretch',
        backgroundColor: '#E01B1B',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#E01B1B',
        marginLeft: 5,
        marginRight: 5
      },
      spinner: {
        color: '#fff'
      },
      text: {
        alignSelf: 'center',
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
      }
    }
  }
}

const mapStateToProps = state => {
  const { userId, isInsideLab, isLoadingAuth } = state.user

  return {
    userId,
    isInsideLab,
    isLoadingAuth
  }
}

export default connect(mapStateToProps, {
  registerUserEnter,
  registerUserLeave
})(Home)
