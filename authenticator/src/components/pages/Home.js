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
      isSideMenuOpen: false,
      selectedLabId: props.labs[0].labId
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
    const { userId, labs } = this.props
    const { isSideMenuOpen, selectedLabId } = this.state
    const { containerView, textView, buttonView, slideMenu } = styles

    return (
      <View style={containerView}>
        <SlideMenu
          style={{
            position: 'absolute',
            height: 400,
            elevation: 10,
            backgroundColor: '#ddd',
            width: 300
          }}
          isMenuOpen={isSideMenuOpen}
        >
          <View style={slideMenu.header}>
            <Text style={slideMenu.user}>{userId}</Text>
            <Text style={slideMenu.lab}>
              {labs.filter(lab => lab.labId === selectedLabId)[0].name}
            </Text>
          </View>
        </SlideMenu>
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
  slideMenu: {
    header: {
      height: 100,
      backgroundColor: '#777',
      paddingLeft: 20,
      justifyContent: 'center'
    },
    user: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: 5
    },
    lab: {
      fontSize: 14,
      color: '#fff'
    }
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
  const { userId, isInsideLab, isLoadingAuth, labs } = state.user

  return {
    userId,
    isInsideLab,
    isLoadingAuth,
    labs
  }
}

export default connect(mapStateToProps, {
  registerUserEnter,
  registerUserLeave
})(Home)
