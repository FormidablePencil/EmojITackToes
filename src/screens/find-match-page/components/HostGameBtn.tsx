import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import hostGame from '../../../actions/multiplayer/hostGame'
import leaveLobby from '../../../actions/multiplayer/leaveLobby'
import { rootT } from '../../../store'
import { reusableStyles } from '../../../styles/stylesglobal'

const HostGameBtn = () => {
  const username = useSelector((state: rootT) => state.multiplayer.username)
  const host = useSelector((state: rootT) => state.multiplayer.socketIoData.host)
  const lobbyId = useSelector((state: rootT) => state.multiplayer.socketIoData.lobbyId)

  const dispatch: any = useDispatch()

  const onClickHandler = async () => {
    host.id
      ? cancelHosting()
      : await dispatch(hostGame(username))
  }

  const cancelHosting = () => dispatch(leaveLobby(lobbyId))

  return (
    <TouchableOpacity
      style={{ ...reusableStyles.regBtn, ...styles.btnHost }}
      onPress={() => onClickHandler()}>
      <Text style={reusableStyles.regText}>{host.id ? 'LEAVE LOBBY' : 'HOST LOBBY'}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  btnHost: {
    margin: 0,
  },
})


export default HostGameBtn
