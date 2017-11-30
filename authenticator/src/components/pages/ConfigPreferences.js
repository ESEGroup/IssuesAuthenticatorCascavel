import React, { Component } from 'react'
import { Text, StyleSheet, Slider } from 'react-native'
import { connect } from 'react-redux'
import { HeaderBackButton } from 'react-navigation'

import headerConfig from '../configs/header'
import Card from '../common/Card'
import CardSection from '../common/CardSection'
import Button from '../common/Button'
import Spinner from '../common/Spinner'

import { resetNavigation } from '../../utils'

import {
  preferencesInitialState,
  preferencesTempChanged,
  preferencesUmidChanged,
  registerUserPreferences,
  registerPreferencesSuccess
} from '../../actions/preferences'

import {
  validateUser
} from '../../actions/credentials'

class ConfigPreferences extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      ...headerConfig,
      headerLeft: <HeaderBackButton onPress={() => navigation.goBack(null)} tintColor={'#FFF'} />
    }
  }

  componentDidMount () {
    const { temp, umid } = this.props
    this.props.preferencesInitialState({ temp, umid })
  }

  onButtonPress () {
    const { userId, email, sliderTemp, sliderUmid, registerUserPreferences, validateUser, registerPreferencesSuccess } = this.props
    const that = this
    const tempMin = sliderTemp.min
    const tempMax = sliderTemp.max
    const umidMin = sliderUmid.min
    const umidMax = sliderUmid.max

    registerUserPreferences({ userId, email, tempMin, tempMax, umidMin, umidMax })
      .then(() => {
        validateUser({ userId, email })
          .then(() => {
            registerPreferencesSuccess()
            resetNavigation.call(that, 'Home')
          })
      })
  }

  renderButton () {
    const { text, background, spinner } = buttonStyles

    if (this.props.loading) {
      return <Spinner backgroundStyles={background} color={spinner.color} />
    }

    return (
      <Button
        backgroundStyle={background}
        textStyle={text}
        onPress={this.onButtonPress.bind(this)}
      >
        SALVAR PREFERÊNCIAS
      </Button>
    )
  }

  render () {
    const { title, errorText, cardSection, label, slider, sliderValue } = styles
    const { sliderTemp, sliderUmid, preferencesTempChanged, preferencesUmidChanged } = this.props

    if (sliderTemp === null || sliderUmid === null) return null

    return (
      <Card>
        <Text style={title}>Configurar preferências ambientais</Text>

        <Text style={label}>Temperatura mínima (°C)</Text>
        <CardSection>
          <Slider
            minimumValue={10}
            maximumValue={sliderTemp.max - 1}
            value={sliderTemp.min}
            step={1}
            style={slider}
            onValueChange={(value) => preferencesTempChanged({ min: value, max: sliderTemp.max })}
            thumbTintColor={'#FF9F00'}
            maximumTrackTintColor={'#FF9F00'}
          />
          <Text style={sliderValue}>{sliderTemp.min}</Text>
        </CardSection>

        <Text style={label}>Temperatura máxima (°C)</Text>
        <CardSection>
          <Slider
            minimumValue={sliderTemp.min + 1}
            maximumValue={50}
            value={sliderTemp.max}
            step={1}
            style={slider}
            onValueChange={(value) => preferencesTempChanged({ min: sliderTemp.min, max: value })}
            thumbTintColor={'#FF9F00'}
            maximumTrackTintColor={'#FF9F00'}
          />
          <Text style={sliderValue}>{sliderTemp.max}</Text>
        </CardSection>

        <Text style={label}>Umidade mínima (%)</Text>

        <CardSection>
          <Slider
            minimumValue={0}
            maximumValue={sliderUmid.max - 1}
            value={sliderUmid.min}
            step={1}
            style={slider}
            onValueChange={(value) => preferencesUmidChanged({ min: value, max: sliderUmid.max })}
            thumbTintColor={'#FF9F00'}
            maximumTrackTintColor={'#FF9F00'}
          />
          <Text style={sliderValue}>{sliderUmid.min}</Text>
        </CardSection>

        <Text style={label}>Umidade máxima (%)</Text>
        <CardSection>
          <Slider
            minimumValue={sliderUmid.min + 1}
            maximumValue={100}
            value={sliderUmid.max}
            step={1}
            style={slider}
            onValueChange={(value) => preferencesUmidChanged({ min: sliderUmid.min, max: value })}
            thumbTintColor={'#FF9F00'}
            maximumTrackTintColor={'#FF9F00'}
          />
          <Text style={sliderValue}>{sliderUmid.max}</Text>
        </CardSection>

        <CardSection style={cardSection}>{this.renderButton()}</CardSection>

        <Text style={errorText}>
          {this.props.error ? `${this.props.error}\nTente novamente.` : ''}
        </Text>
      </Card>
    )
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    textAlign: 'center',
    color: '#444',
    marginTop: 20,
    marginBottom: 15,
    fontWeight: 'bold'
  },
  label: {
    fontSize: 16,
    textAlign: 'left',
    color: '#444',
    marginBottom: 5,
    marginLeft: 10
  },
  slider: {
    width: 250,
    height: 25
  },
  sliderValue: {
    fontSize: 12,
    marginLeft: 5,
    fontWeight: 'bold'
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    color: 'red',
    marginTop: 15
  },
  cardSection: {
    marginTop: 15
  }
})

const buttonStyles = {
  text: {
    alignSelf: 'center',
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  background: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#2381E7',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#2381E7',
    marginLeft: 5,
    marginRight: 5
  },
  spinner: {
    color: '#FFF'
  }
}

const mapStateToProps = state => {
  const { userId, email, temp, umid } = state.credentials.user
  const { sliderTemp, sliderUmid, loading } = state.preferences

  return {
    userId,
    email,
    temp,
    umid,
    sliderTemp,
    sliderUmid,
    loading
  }
}

export default connect(mapStateToProps, {
  preferencesInitialState,
  preferencesTempChanged,
  preferencesUmidChanged,
  registerUserPreferences,
  validateUser,
  registerPreferencesSuccess
})(ConfigPreferences)
