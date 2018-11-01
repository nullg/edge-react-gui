/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react'
import { Switch, TouchableHighlight, View } from 'react-native'
import slowlog from 'react-native-slowlog'

import styles, { styles as styleRaw } from '../../../../../styles/scenes/SettingsStyle'
import { border as b } from '../../../../utils'
import T from '../../../components/FormattedText'

export default class RowSwitch extends Component {
  constructor (props) {
    super(props)
    slowlog(this, /.*/, global.slowlogOptions)
  }

  UNSAFE_componentWillMount () {
    this.setState({
      value: this.props.value
    })
  }
  _onPressToggleSetting = () => {
    const newValue = !this.state.value
    this.setState({
      value: newValue
    })
    this.props.onToggle(newValue)
  }

  render () {
    return (
      <TouchableHighlight
        style={[styles.settingsRowContainer]}
        underlayColor={styleRaw.underlay.color}
        disabled={false}
        onPress={() => this._onPressToggleSetting(this.props.property)}
      >
        <View style={[styles.settingsRowTextRow, b('red')]}>
          <View style={[styles.settingsRowLeftContainer, b('blue')]}>
            <T style={[styles.settingsRowLeftText, b('green')]}>{this.props.leftText}</T>
          </View>
          <Switch onValueChange={() => this._onPressToggleSetting(this.props.property)} value={this.props.value} />
        </View>
      </TouchableHighlight>
    )
  }
}

RowSwitch.defaultProps = {
  value: false
}
