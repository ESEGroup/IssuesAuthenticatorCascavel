import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import isEmail from 'validator/lib/isEmail'

import headerConfig from '../configs/header'
import Card from '../common/Card'
import CardSection from '../common/CardSection'
import Input from '../common/Input'
import Button from '../common/Button'
import Spinner from '../common/Spinner'

import {
  userIdChanged,
  emailChanged,
  validateUser,
  invalidEmail,
  invalidUserId
} from '../../actions/credentials'
import { resetNavigation } from '../../utils'

class StoreCredentials extends Component {
  static navigationOptions = {
    ...headerConfig,
    headerLeft: null
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      resetNavigation.call(this, 'Home')
    }
  }

  onUserIdChange(text) {
    this.props.userIdChanged(text)
  }

  onEmailChange(text) {
    this.props.emailChanged(text)
  }

  onButtonPress() {
    const { userId, email } = this.props
    if (!userId) return this.props.invalidUserId()
    if (!isEmail(email)) return this.props.invalidEmail()

    this.props.validateUser({ userId, email })
  }

  renderButton() {
    const { text, background, spinner } = buttonStyles

    if (this.props.loading) {
      return <Spinner backgroundStyles={background} color={spinner.color} />
    }

    return (
      <Button
        onPress={this.onButtonPress.bind(this)}
        backgroundStyle={background}
        textStyle={text}
      >
        Associar Dados
      </Button>
    )
  }

  render() {
    const { title, errorText, cardSection } = styles

    return (
      <Card>
        <Text style={title}>Associar dados de autenticação</Text>

        <CardSection>
          <Input
            placeholder="Entre com seu identificador MyDenox"
            onChangeText={this.onUserIdChange.bind(this)}
            value={this.props.userId}
            keyboardType={'default'}
          />
        </CardSection>

        <CardSection>
          <Input
            placeholder="usuario@email.com.br"
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
            keyboardType={'email-address'}
          />
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
    color: '#fff',
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
    color: '#fff'
  }
}

const mapStateToProps = state => {
  const { userId, email, error, loading, user } = state.credentials

  return {
    userId,
    email,
    error,
    loading,
    user
  }
}

export default connect(mapStateToProps, {
  userIdChanged,
  emailChanged,
  validateUser,
  invalidEmail,
  invalidUserId
})(StoreCredentials)
