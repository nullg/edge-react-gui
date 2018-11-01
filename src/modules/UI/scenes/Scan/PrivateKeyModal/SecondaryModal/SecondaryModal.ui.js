// @flow

import React, { Component } from 'react'
import { ActivityIndicator, Text, View } from 'react-native'

import s from '../../../../../../locales/strings.js'
import styles from '../../../../../../styles/scenes/ScaneStyle.js'
import { Icon } from '../../../../components/Icon/Icon.ui'
import { NonInteractiveModal } from '../../../../components/Modals'

export type Props = {
  error: Error | null,
  isActive: boolean,
  isSweeping: boolean,
  onBackButtonPress: () => void,
  onBackdropPress: () => void,
  onModalHide: () => void
}
export class SecondaryModal extends Component<Props> {
  render () {
    const { error, isSweeping, isActive, onBackButtonPress, onBackdropPress, onModalHide } = this.props

    return (
      <NonInteractiveModal isActive={isActive} onBackButtonPress={onBackButtonPress} onBackdropPress={onBackdropPress} onModalHide={onModalHide}>
        <NonInteractiveModal.Icon>
          <Icon style={styles.privateKeyIcon} type={'ionIcons'} name={'ios-key'} size={30} />
        </NonInteractiveModal.Icon>

        <NonInteractiveModal.Footer>
          {error ? (
            <NonInteractiveModal.Message>
              <Text>{error.message}</Text>
            </NonInteractiveModal.Message>
          ) : null}

          {isSweeping ? (
            <View>
              <NonInteractiveModal.Message>
                <Text>{s.strings.private_key_modal_importing_private_key}</Text>
              </NonInteractiveModal.Message>
              <ActivityIndicator size={'large'} style={{ padding: 10 }} />
            </View>
          ) : null}

          {!isSweeping && !error ? (
            <NonInteractiveModal.Message>
              <Text>{s.strings.private_key_modal_success}</Text>
            </NonInteractiveModal.Message>
          ) : null}
        </NonInteractiveModal.Footer>
      </NonInteractiveModal>
    )
  }
}
