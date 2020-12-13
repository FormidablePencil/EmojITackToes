import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { useSelector } from 'react-redux'
import useCheckIfOnlineGame from '../hooks/useCheckIfOnlineGame'
import { rootT } from '../store'
import { reusableStyles } from '../styles/stylesglobal'

export const ReadyUpTxt = () => {
  const readyUp = useSelector((state: rootT) => state.multiplayer.readyUp)
  const isOnlineGame = useCheckIfOnlineGame()
  return (
    <Text style={reusableStyles.smText}>
      {isOnlineGame ? (!readyUp ? 'Ready Up' : 'Waiting...') : 'Start round'}
    </Text>
  )
}

export const QuitOrRestartText = ({ score }) => {
  const isOnlineGame = useCheckIfOnlineGame()
  return (
    <Text style={score.p1 === 0 && score.p2 === 0
      ? { color: "#FF97E5", ...reusableStyles.smText }
      : { color: 'white', ...reusableStyles.smText }
    }>
      { isOnlineGame ? 'Quit' : 'Restart'}
    </Text >
  )
}
