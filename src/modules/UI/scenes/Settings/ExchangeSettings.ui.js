// @flow

import { type EdgeSwapConfig } from 'edge-core-js'
import React, { Component } from 'react'
import { View } from 'react-native'

import s from '../../../../locales/strings.js'
import T from '../../components/FormattedText'
import Gradient from '../../components/Gradient/Gradient.ui'
import SafeAreaView from '../../components/SafeAreaView'
import SwitchRow from './components/RowSwitch.ui.js'
import styles from './style'

type ExchangeSettingsProps = {
  exchanges: {
    [string]: EdgeSwapConfig
  }
}

type ExchangeSettingsState = {}

export class ExchangeSettingsComponent extends Component<ExchangeSettingsProps, ExchangeSettingsState> {
  constructor (props: ExchangeSettingsProps) {
    super(props)
    this.state = {}
  }

  subHeader (title: string) {
    return (
      <Gradient style={[styles.headerRow]}>
        <View style={[styles.headerTextWrap]}>
          <View style={styles.leftArea}>
            <T style={styles.headerText}>{title}</T>
          </View>
        </View>
      </Gradient>
    )
  }

  _onToggleEnableExchange = (exchangeName: string) => {
    const { exchanges } = this.props
    exchanges[exchangeName].changeEnabled(!exchanges[exchangeName].enabled)
  }

  render () {
    const { exchanges } = this.props
    const exchangeList = []
    for (const exchange in exchanges) {
      const exchangeData = { ...exchanges[exchange], name: exchange }
      exchangeList.push(exchangeData)
    }
    return (
      <SafeAreaView>
        <View style={[styles.ethereumSettings]}>
          <Gradient style={styles.gradient} />
          <View style={styles.container}>
            {this.subHeader(s.strings.settings_exchange_enable)}
            {exchangeList.map(exchange => {
              const exchangeName = exchange.name.charAt(0).toUpperCase() + exchange.name.substr(1)
              return <SwitchRow key={exchangeName} leftText={exchangeName} onToggle={this._onToggleEnableExchange(exchangeName)} value={true} />
            })}
          </View>
        </View>
      </SafeAreaView>
    )
  }
}
