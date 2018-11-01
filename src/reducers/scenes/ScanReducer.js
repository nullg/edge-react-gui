// @flow

import type { EdgeParsedUri } from 'edge-core-js'
import { type Reducer, combineReducers } from 'redux'

import { type Action } from '../../modules/ReduxTypes.js'
import { addressModalVisible } from '../../modules/UI/scenes/Scan/reducers/addressModalVisible.js'
import { parsedUri } from '../../modules/UI/scenes/Scan/reducers/parsedUri.js'
import { scanEnabled } from '../../modules/UI/scenes/Scan/reducers/scanEnabled.js'
import { torchEnabled } from '../../modules/UI/scenes/Scan/reducers/torchEnabled.js'
import { legacyAddressModal } from '../LegacyAddressModalReducer.js'
import { type PrivateKeyModalState, privateKeyModal } from '../PrivateKeyModalReducer.js'

export type ScanState = {
  +parsedUri: EdgeParsedUri | null,
  +torchEnabled: boolean,
  +addressModalVisible: boolean,
  +scanEnabled: boolean,
  +legacyAddressModal: {
    isActive: boolean
  },
  +privateKeyModal: PrivateKeyModalState
}

export const scan: Reducer<ScanState, Action> = combineReducers({
  addressModalVisible,
  legacyAddressModal,
  parsedUri,
  privateKeyModal,
  scanEnabled,
  torchEnabled
})
