import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import GamesAvailable from '../components/games-available';
import { reusableStyles } from '../styles/stylesglobal';
import { useDispatch, useSelector } from 'react-redux';
import { rootT } from '../store';
import { TextInput } from 'react-native-paper';
import { LEAVE_LOBBY, UPDATE_USERNAME } from '../actions/types';
import getAllLobbies from '../actions/multiplayer/getAllLobbies';
import hostGame from '../actions/multiplayer/hostGame';
import useLobby from '../hooks/useLobby';

const FindMatchScreen = () => {
  useLobby()
  
  return (
    <View style={styles.container}>
      <NavigateBack />
      <InputUsername />
      <RefreshLobbies />
      <HostGame />
      <GamesAvailable />
    </View>
  )
}

const RefreshLobbies = () => {
  const dispatch = useDispatch()
  const onPressHandler = () => dispatch(getAllLobbies())

  return (
    <TouchableOpacity style={styles.refreshBtn} onPress={onPressHandler}>
      <Text>Refresh</Text>
    </TouchableOpacity>
  )
}

const NavigateBack = () => {
  const navigation = useNavigation()
  const onPrssHandler = () => navigation.navigate('game')
  return (
    <View style={styles.goBackContainer}>
      <TouchableOpacity
        onPress={onPrssHandler}
        style={styles.goBackBtn}>
        <Text>Go back</Text>
      </TouchableOpacity>
    </View>
  )
}

const InputUsername = () => {
  const username = useSelector((state: rootT) => state.multiplayer.username)
  const dispatch = useDispatch()
  const onChangeTextHandler = (payload) => dispatch({ type: UPDATE_USERNAME, payload })
  return (
    <TextInput
      accessibilityStates=''
      label="Email"
      value={username}
      onChangeText={value => onChangeTextHandler(value)}
    />

  )
}

const HostGame = () => {
  const username = useSelector((state: rootT) => state.multiplayer.username)
  const host = useSelector((state: rootT) => state.multiplayer.socketIoData.host)

  const dispatch: any = useDispatch()

  const onClickHandler = async () => {
    host.id
      ? cancelHosting()
      : await dispatch(hostGame(username))
  }

  const cancelHosting = () => dispatch({ type: LEAVE_LOBBY })

  return (
    <View style={styles.containerHostGame}>
      <TouchableOpacity
        style={{ ...reusableStyles.regBtn, ...styles.btnHost }}
        onPress={() => onClickHandler()}>
        <Text style={styles.text}>{host.id ? 'LEAVE LOBBY' : 'HOST LOBBY'}</Text>
      </TouchableOpacity>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#311191',
    flex: 1,
    position: "relative",
  },
  containerHostGame: {
    flex: .4,
    justifyContent: "flex-end",
    alignItems: 'center',
  },
  btnHost: {
    marginBottom: 40,
    width: 200,
  },
  goBackContainer: {
    position: "absolute",
    zIndex: 1,
    top: 0,
    right: 0,
  },
  goBackBtn: {
    width: 50,
    height: 50,
    backgroundColor: '#6991c1'
  },
  text: {
    color: 'white'
  },
  refreshBtn: {
    backgroundColor: 'grey',
    height: 50,
    width: 50,
  }
})

export default FindMatchScreen