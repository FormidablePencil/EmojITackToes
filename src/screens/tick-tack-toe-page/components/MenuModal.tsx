import React from 'react'
import { View } from 'react-native'
import { Modal, Text, useTheme } from 'react-native-paper'
import ModalContent from '../../../components/modalComp/modal-content'
import AnimationOptions from '../../../components/AnimationOptions'

const MenuModal = ({
  modalOpen,
  showInModal,
  ModalContents,
  setShowInModal,
  restartScore,
  score,
  gameOver,
  startGame
}) => {
  return (
    <Modal
      dismissable={false}
      visible={modalOpen && showInModal === ModalContents.GameMenu
        || showInModal === ModalContents.animationSettings ? true : false}>
      {showInModal === ModalContents.GameMenu ?
        <ModalContent
          setShowInModal={setShowInModal}
          restartScore={restartScore}
          score={score}
          gameOver={gameOver}
          startGame={startGame}
        />
        : (showInModal === ModalContents.animationSettings) &&
        <>
          <AnimationOptions setShowInModal={setShowInModal} startGame={startGame} />
        </>
      }
    </Modal>
  )
}

export default MenuModal
