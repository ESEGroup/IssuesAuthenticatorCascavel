import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  DeviceEventEmitter
} from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { NavigationActions } from 'react-navigation'
import RNSettings from 'react-native-settings'

import headerConfig from '../configs/header'
import Button from '../common/Button'
import Spinner from '../common/Spinner'
import SlideMenu from '../SlideMenu'

import { USER_STATE } from '../../actions/types'
import { resetNavigation, removeFromStorage } from '../../utils'
import GPSModule from '../../modules/GPS'

import {
  registerUserEnter,
  registerUserLeave,
  changeSelectedLab,
  deleteUserInfo
} from '../../actions/user'

const GPS = new GPSModule()

class Home extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state

    return {
      ...headerConfig,
      headerLeft: (
        <TouchableOpacity onPress={() => params.handleOpenSideMenu()}>
          <Icon
            name='menu'
            size={30}
            color='#fff'
            style={{ marginLeft: 10, marginRight: 0 }}
          />
        </TouchableOpacity>
      )
    }
  }

  constructor (props) {
    super(props)

    this.state = {
      isSideMenuOpen: false,
      isGPSEnabled: true
    }

    DeviceEventEmitter.addListener(RNSettings.GPS_PROVIDER_EVENT, this.handleGPSProviderEvent.bind(this))
  }

  async componentDidMount () {
    this.props.navigation.setParams({
      handleOpenSideMenu: this.openSideMenu.bind(this)
    })

    const isGPSEnabled = await GPS.isEnabled()
    this.setState({ isGPSEnabled })
  }

  handleGPSProviderEvent (e) {
    if (e[RNSettings.LOCATION_SETTING] === RNSettings.DISABLED) {
      this.setState({ isGPSEnabled: false })
    } else {
      this.setState({ isGPSEnabled: true })
    }
  }

  openSideMenu () {
    const isSideMenuOpen = this.state.isSideMenuOpen

    this.setState({
      isSideMenuOpen: !isSideMenuOpen
    })
  }

  onEnterButtonPress () {
    const {
      userId,
      selectedLabId,
      labs,
      registerUserLeave,
      registerUserEnter
    } = this.props

    const leaving = []
    labs.filter(lab => lab.labId !== selectedLabId && lab.present).forEach(lab => {
      leaving.push(registerUserLeave(userId, lab.labId))
    })

    Promise.all(leaving)
      .then(() => {
        registerUserEnter(userId, selectedLabId)
      })
  }

  onLeaveButtonPress () {
    const { userId, selectedLabId, registerUserLeave } = this.props

    registerUserLeave(userId, selectedLabId)
  }

  renderButton () {
    const { enter, leave } = styles.buttonStyles
    const { selectedLabId, loadingEnter, loadingLeave, labs } = this.props

    if (!labs.find(lab => lab.labId === selectedLabId).present) {
      if (loadingEnter) {
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

    if (loadingLeave) {
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

  render () {
    const {
      userId,
      labs,
      selectedLabId,
      changeSelectedLab,
      deleteUserInfo
    } = this.props
    const { isSideMenuOpen, isGPSEnabled } = this.state
    const { containerView, textView, buttonView, slideMenu } = styles

    if (!labs || !userId) return null

    return (
      <View style={containerView}>
        <SlideMenu
          style={{
            position: 'absolute',
            top: 0,
            height: 400,
            elevation: 10,
            backgroundColor: '#ddd',
            zIndex: 10,
            width: 300
          }}
          isMenuOpen={isSideMenuOpen}
        >
          <View style={slideMenu.header}>
            <Text style={slideMenu.user}>{userId}</Text>
            <Text style={slideMenu.lab}>
              {labs.find(lab => lab.labId === selectedLabId).name}
            </Text>
          </View>

          <View style={{ flex: 1, position: 'relative' }}>
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: 0,
                paddingTop: 15,
                paddingBottom: 15,
                paddingLeft: 20,
                paddingRight: 20
              }}
              onPress={() => this.props.navigation.dispatch(goToConfigPreferencesScreen)}
            >
              <Text style={{ color: '#444' }}>Configurar preferências ambientais</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                position: 'absolute',
                bottom: 0,
                paddingTop: 15,
                paddingBottom: 15,
                paddingLeft: 20,
                paddingRight: 20
              }}
              onPress={() => {
                removeFromStorage(USER_STATE).then(() => {
                  deleteUserInfo()
                  resetNavigation.call(this, 'StoreCredentials')
                })
              }}
            >
              <Text style={{ color: '#444' }}>Desassociar usuário</Text>
            </TouchableOpacity>
          </View>
        </SlideMenu>

        <View style={textView}>
          <Text style={{ fontSize: 18 }}>Olá, {userId}</Text>
          {
            isGPSEnabled
              ? null
              : <Text style={{ fontSize: 16, color: 'red' }}>Ative sua localização para habilitar a autenticação automática.</Text>
          }
          <Text style={{ fontSize: 16, marginTop: 10, marginBottom: 10 }}>
            Selecione o laboratório:
          </Text>

          {labs.map(lab => {
            return (
              <TouchableOpacity
                onPress={() => changeSelectedLab(lab.labId)}
                key={lab.labId}
                style={{
                  padding: 10,
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
              >
                <Icon
                  name={
                    lab.labId === selectedLabId
                      ? 'radio-button-checked'
                      : 'radio-button-unchecked'
                  }
                  size={20}
                  color='#FF9F00'
                />
                <Text
                  style={{
                    fontSize: 20,
                    color: '#444',
                    fontWeight: lab.labId === selectedLabId ? 'bold' : 'normal',
                    marginLeft: 5
                  }}
                >
                  {lab.name}
                </Text>
              </TouchableOpacity>
            )
          })}
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
  const { userId, loadingEnter, loadingLeave, labs, selectedLabId } = state.user

  return {
    userId,
    loadingEnter,
    loadingLeave,
    labs,
    selectedLabId,
    user: state.user
  }
}

const goToConfigPreferencesScreen = NavigationActions.navigate({ routeName: 'ConfigPreferences' })

export default connect(mapStateToProps, {
  registerUserEnter,
  registerUserLeave,
  changeSelectedLab,
  deleteUserInfo
})(Home)
