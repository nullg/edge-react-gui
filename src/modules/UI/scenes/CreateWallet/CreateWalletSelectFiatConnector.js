// @flow

import { connect } from 'react-redux'

import { CreateWalletSelectFiat as CreateWalletSelectFiatComponent } from '../../../../components/scenes/CreateWalletSelectFiatScene'
import type { CreateWalletSelectFiatStateProps } from '../../../../components/scenes/CreateWalletSelectFiatScene'
import type { State } from '../../../ReduxTypes'
import { getSupportedFiats } from '../../../utils'

const mapStateToProps = (state: State): CreateWalletSelectFiatStateProps => ({
  supportedFiats: getSupportedFiats(),
  dimensions: state.ui.scenes.dimensions
})
const mapDispatchToProps = () => ({})
export const CreateWalletSelectFiat = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateWalletSelectFiatComponent)
