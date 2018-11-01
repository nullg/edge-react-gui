// @flow

import { errorNames } from 'edge-core-js'
import { connect } from 'react-redux'

import { SendConfirmation } from '../../../../components/scenes/SendConfirmationScene'
import type { SendConfirmationDispatchProps, SendConfirmationStateProps } from '../../../../components/scenes/SendConfirmationScene'
import type { Dispatch, State } from '../../../ReduxTypes'
import { convertNativeToExchange } from '../../../utils'
import { getExchangeDenomination, getExchangeRate, getSelectedCurrencyCode, getSelectedWallet } from '../../selectors.js'
import { getDisplayDenomination, getExchangeDenomination as settingsGetExchangeDenomination } from '../../Settings/selectors.js'
import { newPin, reset, signBroadcastAndSave, uniqueIdentifierUpdated, updateAmount, updateSpendPending } from './action.js'
import { activated as uniqueIdentifierModalActivated } from './components/UniqueIdentifierModal/UniqueIdentifierModalActions.js'
import { getError, getForceUpdateGuiCounter, getKeyboardIsVisible, getPending, getPublicAddress, getTransaction } from './selectors'

const mapStateToProps = (state: State): SendConfirmationStateProps => {
  const sceneState = state.ui.scenes.sendConfirmation
  let fiatPerCrypto = 0
  let secondaryExchangeCurrencyCode = ''
  const guiWallet = getSelectedWallet(state)
  const currencyCode = getSelectedCurrencyCode(state)
  const balanceInCrypto = guiWallet.nativeBalances[currencyCode]

  const isoFiatCurrencyCode = guiWallet.isoFiatCurrencyCode
  const exchangeDenomination = settingsGetExchangeDenomination(state, currencyCode)
  const balanceInCryptoDisplay = convertNativeToExchange(exchangeDenomination.multiplier)(balanceInCrypto)
  fiatPerCrypto = getExchangeRate(state, currencyCode, isoFiatCurrencyCode)
  const balanceInFiat = fiatPerCrypto * parseFloat(balanceInCryptoDisplay)

  if (guiWallet) {
    const isoFiatCurrencyCode = guiWallet.isoFiatCurrencyCode
    secondaryExchangeCurrencyCode = isoFiatCurrencyCode
  }

  const transaction = getTransaction(state)
  const pending = getPending(state)
  const nativeAmount = sceneState.nativeAmount
  // const nativeAmount = getNativeAmount(state)
  let error = getError(state)

  let errorMsg = null
  let resetSlider = false
  if (error && error.message === 'broadcastError') {
    error = null
    resetSlider = true
  }
  errorMsg = error ? error.message : ''
  if (error && error.name === errorNames.NoAmountSpecifiedError) errorMsg = ''
  const networkFee = transaction ? transaction.networkFee : null
  const parentNetworkFee = transaction && transaction.parentNetworkFee ? transaction.parentNetworkFee : null

  const uniqueIdentifier = sceneState.parsedUri.uniqueIdentifier
  const transactionMetadata = sceneState.transactionMetadata
  const exchangeRates = state.exchangeRates
  const out = {
    balanceInCrypto,
    balanceInFiat,
    currencyCode,
    transactionMetadata,
    errorMsg,
    exchangeRates,
    fiatCurrencyCode: guiWallet.fiatCurrencyCode,
    fiatPerCrypto,
    forceUpdateGuiCounter: getForceUpdateGuiCounter(state),
    isEditable: sceneState.isEditable,
    keyboardIsVisible: getKeyboardIsVisible(state),
    nativeAmount,
    networkFee,
    parentDisplayDenomination: getDisplayDenomination(state, guiWallet.currencyCode),
    parentExchangeDenomination: getExchangeDenomination(state, guiWallet.currencyCode),
    parentNetworkFee,
    pending,
    primaryDisplayDenomination: getDisplayDenomination(state, currencyCode),
    primaryExchangeDenomination: getExchangeDenomination(state, currencyCode),
    publicAddress: getPublicAddress(state),
    resetSlider,
    secondaryExchangeCurrencyCode,
    sliderDisabled: !transaction || !!error || !!pending,
    uniqueIdentifier,
    authRequired: state.ui.scenes.sendConfirmation.authRequired,
    address: state.ui.scenes.sendConfirmation.address
  }
  return out
}

const mapDispatchToProps = (dispatch: Dispatch): SendConfirmationDispatchProps => ({
  updateAmount: (nativeAmount: string, exchangeAmount: string, fiatPerCrypto: string) => {
    return dispatch(updateAmount(nativeAmount, exchangeAmount, fiatPerCrypto))
  },
  uniqueIdentifierUpdated: uniqueIdentifier => dispatch(uniqueIdentifierUpdated({ uniqueIdentifier })),
  reset: () => dispatch(reset()),
  updateSpendPending: (pending: boolean): any => dispatch(updateSpendPending(pending)),
  signBroadcastAndSave: (): any => dispatch(signBroadcastAndSave()),
  onChangePin: (pin: string) => dispatch(newPin(pin)),
  uniqueIdentifierButtonPressed: () => {
    dispatch(uniqueIdentifierModalActivated())
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SendConfirmation)
