// @flow

import { connect } from 'react-redux'

import { CreateWalletReview as CreateWalletReviewConnector } from '../../../../components/scenes/CreateWalletReviewScene'
import type { CreateWalletReviewDispatchProps } from '../../../../components/scenes/CreateWalletReviewScene'
import type { Dispatch, State } from '../../../ReduxTypes'
import { getSupportedFiats } from '../../../utils.js'
import { getSupportedWalletTypes } from '../../Settings/selectors.js'
import { createCurrencyWallet } from './action'

const mapStateToProps = (state: State) => ({
  isCreatingWallet: state.ui.scenes.createWallet.isCreatingWallet,
  supportedWalletTypes: getSupportedWalletTypes(state),
  supportedFiats: getSupportedFiats()
})

const mapDispatchToProps = (dispatch: Dispatch): CreateWalletReviewDispatchProps => ({
  createCurrencyWallet: (walletName: string, walletType: string, fiatCurrencyCode: string) => {
    dispatch(createCurrencyWallet(walletName, walletType, fiatCurrencyCode))
  }
})

export const CreateWalletReview = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateWalletReviewConnector)
