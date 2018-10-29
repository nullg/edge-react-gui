// @flow

import { connect } from 'react-redux'

import { getAccount } from '../../../Core/selectors.js'
import type { Dispatch, State } from '../../../ReduxTypes.js'
import { ExchangeSettingsComponent } from './ExchangeSettings.ui.js'

const mapStateToProps = (state: State, ownProps) => {
  const account = getAccount(state)
  console.log('account is: ', account)
  return {
    exchanges: account.swapConfig
  }
}
const mapDispatchToProps = (dispatch: Dispatch, ownProps) => {
  return {}
}
export const ExchangeSettingsConnector = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExchangeSettingsComponent)
