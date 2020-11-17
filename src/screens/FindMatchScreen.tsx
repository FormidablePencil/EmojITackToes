import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import GamesAvailable from '../components/games-available';
import { reusableStyles } from '../styles/stylesglobal';
import socketIoControls, { commandsSocketIo } from '../socket.io/socketIoControls'
import { useDispatch, useSelector } from 'react-redux';
import { rootT } from '../store';
import useCheckIfMatchFound from '../useHooks/useCheckIfMatchFound';
import { TextInput } from 'react-native-paper';
import { UPDATE_USERNAME } from '../actions/types';

const FindMatchScreen = () => {
  useCheckIfMatchFound()
  return (
    <View style={styles.container}>
      <NavigateBack />
      <RefreshLobbies />
      <InputUsername />
      <HostGame />
      <GamesAvailable />
    </View>
  )
}

const RefreshLobbies = () => {
  
  <TouchableOpacity onPress={}>
    <Text>Refresh</Text>
  </TouchableOpacity>
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
  const dispatch: any = useDispatch()

  const onClickHandler = async () =>
    await dispatch(socketIoControls(commandsSocketIo.hostGame, username))

  return (
    <View style={styles.containerHostGame}>
      <TouchableOpacity
        style={{ ...reusableStyles.regBtn, ...styles.btnHost }}
        onPress={() => onClickHandler()}>
        <Text style={styles.text}>Host</Text>
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
  }
})

export default FindMatchScreen