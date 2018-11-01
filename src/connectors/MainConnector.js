// @flow

import { connect } from 'react-redux'

import * as actions from '../actions/indexActions'
import { disableScan, enableScan } from '../actions/ScanActions'
import { updateCurrentSceneKey } from '../actions/ScenesActions.js'
import { showReEnableOtpModal } from '../actions/SettingsActions.js'
import { selectWallet } from '../actions/WalletActions.js'
import { addContext, addUsernames } from '../modules/Core/Context/action.js'
import makeContextCallbacks from '../modules/Core/Context/callbacks'
import Main from '../modules/Main.ui'
import { requestPermission } from '../modules/PermissionsManager.js'
import type { Dispatch } from '../modules/ReduxTypes'
import { setKeyboardHeight } from '../modules/UI/dimensions/action'
import { addCurrencyPlugin } from '../modules/UI/Settings/SettingsActions'

const mapStateToProps = () => ({})
const mapDispatchToProps = (dispatch: Dispatch) => ({
  requestPermission: permission => {
    return requestPermission(permission)
  },
  dispatchEnableScan: () => {
    return dispatch(enableScan())
  },
  dispatchDisableScan: () => {
    return dispatch(disableScan())
  },
  addCurrencyPlugin: plugin => {
    return dispatch(addCurrencyPlugin(plugin))
  },
  setKeyboardHeight: keyboardHeight => {
    return dispatch(setKeyboardHeight(keyboardHeight))
  },
  addContext: (context, folder) => {
    return dispatch(addContext(context, folder))
  },
  addUsernames: usernames => {
    return dispatch(addUsernames(usernames))
  },
  updateCurrentSceneKey: sceneKey => {
    return dispatch(updateCurrentSceneKey(sceneKey))
  },
  // commented out since it was blowing up flow && doesnt seem to be called.. TODO remove
  /* setLocaleInfo: (localeInfo) => {
    return dispatch(setLocaleInfo(localeInfo))
  }, */
  urlReceived: backupKey => {
    return dispatch(actions.deepLinkLogout(backupKey))
  },
  contextCallbacks: makeContextCallbacks(dispatch),
  onSelectWallet: (walletId, currencyCode) => dispatch(selectWallet(walletId, currencyCode)),
  showReEnableOtpModal: () => dispatch(showReEnableOtpModal())
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)
