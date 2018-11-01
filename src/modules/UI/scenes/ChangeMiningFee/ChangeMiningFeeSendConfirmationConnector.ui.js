// @flow

import { connect } from 'react-redux'

import ChangeMiningFee from '../../../../components/scenes/ChangeMiningFeeScene.js'
import type { ChangeMiningFeeDispatchProps, ChangeMiningFeeStateProps } from '../../../../components/scenes/ChangeMiningFeeScene.js'
import type { Dispatch, State } from '../../../ReduxTypes'
import { updateMiningFees } from '../SendConfirmation/action'
import { getNetworkFeeOption } from '../SendConfirmation/selectors'

export const mapStateToProps = (state: State): ChangeMiningFeeStateProps => ({
  // fee: state.ui.scenes.sendConfirmation.fee,
  feeSetting: getNetworkFeeOption(state)
})

export const mapDispatchToProps = (dispatch: Dispatch): ChangeMiningFeeDispatchProps => ({
  onSubmit: (networkFeeOption: string) => dispatch(updateMiningFees({ networkFeeOption }))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChangeMiningFee)
