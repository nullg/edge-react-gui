// @flow

import { connect } from 'react-redux'

import { setEnabledTokens } from '../../actions/WalletActions.js'
import ManageTokens from '../../components/scenes/ManageTokensScene.js'
import type { ManageTokensDispatchProps, ManageTokensOwnProps, ManageTokensStateProps } from '../../components/scenes/ManageTokensScene.js'
import type { State } from '../../modules/ReduxTypes'

const mapStateToProps = (state: State, ownProps: ManageTokensOwnProps): ManageTokensStateProps => ({
  manageTokensPending: state.ui.wallets.manageTokensPending,
  guiWallet: ownProps.guiWallet,
  settingsCustomTokens: state.ui.settings.customTokens
})
const mapDispatchToProps = (dispatch: Dispatch): ManageTokensDispatchProps => ({
  setEnabledTokensList: (walletId: string, enabledTokens: Array<string>, oldEnabledTokensList: Array<string>) =>
    dispatch(setEnabledTokens(walletId, enabledTokens, oldEnabledTokensList))
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageTokens)
