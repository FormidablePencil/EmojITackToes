import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { useSelector } from 'react-redux'
import useCheckIfOnlineGame from '../hooks/useCheckIfOnlineGame'
import { rootT } from '../store'

export const ReadyUpTxt = () => {
  const readyUp = useSelector((state: rootT) => state.multiplayer.readyUp)
  const isOnlineGame = useCheckIfOnlineGame()
  return (
    <Text>
      {isOnlineGame ? (!readyUp ? 'Ready Up' : 'Waiting...') : 'Start'}
    </Text>
  )
}

export const QuitOrRestartText = () => {
  const isOnlineGame = useCheckIfOnlineGame()
  return (
    <Text>
      {isOnlineGame ? 'quit' : 'Start'}
    </Text>
  )
}
