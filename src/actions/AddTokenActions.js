// @flow

import { Actions } from 'react-native-router-flux'

import * as SETTINGS_API from '../modules/Core/Account/settings'
import * as CORE_SELECTORS from '../modules/Core/selectors.js'
import * as WALLET_API from '../modules/Core/Wallets/api.js'
import type { Dispatch, GetState, State } from '../modules/ReduxTypes.js'
import { displayErrorAlert } from '../modules/UI/components/ErrorAlert/actions'
import * as UI_WALLET_SELECTORS from '../modules/UI/selectors.js'
import * as UTILS from '../modules/utils.js'
import type { CustomTokenInfo } from '../types.js'
import * as WALLET_ACTIONS from './WalletActions.js'

export const addTokenStart = () => ({
  type: 'ADD_TOKEN_START'
})

export const addTokenSuccess = () => ({
  type: 'ADD_TOKEN_SUCCESS'
})

export const addNewTokenSuccess = (walletId: string, tokenObj: CustomTokenInfo, settings: Object, enabledTokens: Array<string>) => ({
  type: 'ADD_NEW_CUSTOM_TOKEN_SUCCESS',
  data: { walletId, tokenObj, settings, enabledTokens, newCurrencyCode: tokenObj.currencyCode }
})

export const addNewTokenFailure = (errorMessage: string) => ({
  type: 'ADD_NEW_CUSTOM_TOKEN_FAILURE',
  data: { errorMessage }
})

export const setTokenSettings = (tokenObj: CustomTokenInfo) => ({
  type: 'SET_TOKEN_SETTINGS',
  data: tokenObj
})

export const addNewToken = (walletId: string, currencyName: string, currencyCode: string, contractAddress: string, denomination: string) => {
  return (dispatch: Dispatch, getState: GetState) => {
    dispatch(addTokenStart())
    const state = getState()
    addTokenAsync(walletId, currencyName, currencyCode, contractAddress, denomination, state)
      .then(addedWalletInfo => {
        const { walletId, newTokenObj, setSettings, enabledTokensOnWallet } = addedWalletInfo
        dispatch(addNewTokenSuccess(walletId, newTokenObj, setSettings, enabledTokensOnWallet))
        dispatch(WALLET_ACTIONS.refreshWallet(walletId))
        Actions.pop()
      })
      .catch(error => {
        dispatch(addNewTokenFailure(error.message))
        console.log(error)
        dispatch(displayErrorAlert(error.message))
      })
  }
}

export const addTokenAsync = async (
  walletId: string,
  currencyName: string,
  currencyCode: string,
  contractAddress: string,
  denomination: string,
  state: State
) => {
  // create modified object structure to match metaTokens
  const newTokenObj: CustomTokenInfo = WALLET_ACTIONS.assembleCustomToken(currencyName, currencyCode, contractAddress, denomination)
  const account = CORE_SELECTORS.getAccount(state)
  const uiWallet = UI_WALLET_SELECTORS.getWallet(state, walletId)
  const coreWallet = CORE_SELECTORS.getWallet(state, walletId)
  await coreWallet.addCustomToken(newTokenObj)
  coreWallet.enableTokens([currencyCode])
  const settingsOnFile = await SETTINGS_API.getSyncedSettingsAsync(account)

  const setSettings = settingsOnFile
  const customTokens = settingsOnFile.customTokens
  let newCustomTokens = []
  if (!customTokens || customTokens.length === 0) {
    // if customTokens array is empty
    newCustomTokens = [newTokenObj]
  } else {
    newCustomTokens = UTILS.mergeTokens([newTokenObj], customTokens) // otherwise merge metaTokens and customTokens
  }
  settingsOnFile.customTokens = newCustomTokens
  settingsOnFile[currencyCode] = newTokenObj
  await SETTINGS_API.setSyncedSettingsAsync(account, settingsOnFile)
  const newEnabledTokens = uiWallet.enabledTokens
  if (uiWallet.enabledTokens.indexOf(newTokenObj.currencyCode) === -1) {
    newEnabledTokens.push(newTokenObj.currencyCode)
  }
  await WALLET_API.setEnabledTokens(coreWallet, newEnabledTokens)
  return { walletId, newTokenObj, setSettings, enabledTokensOnWallet: newEnabledTokens }
}
