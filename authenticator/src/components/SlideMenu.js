import React from 'react'
import { Animated, Text, View } from 'react-native'

class SlideMenu extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      toggleMenu: new Animated.Value(-this.props.style.width)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isMenuOpen) {
      Animated.timing(this.state.toggleMenu, {
        toValue: 0,
        duration: 300
      }).start()
    } else {
      Animated.timing(this.state.toggleMenu, {
        toValue: -nextProps.style.width,
        duration: 300
      }).start()
    }
  }

  render() {
    let { toggleMenu } = this.state

    return (
      <Animated.View
        style={{
          ...this.props.style,
          marginLeft: toggleMenu
        }}
      >
        {this.props.children}
      </Animated.View>
    )
  }
}

export default SlideMenu
