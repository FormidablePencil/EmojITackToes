import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import GamesAvailable from '../components/games-available';
import useSocketIo, { dispatchCommandT } from '../socket.io';
import { reusableStyles } from '../styles/stylesglobal';
import { commandsSocketIo } from '../socket.io/socketIoControls'

const FindMatchScreen = () => {
  const { dispatchCommand } = useSocketIo()

  return (
    <View style={styles.container}>
      <NavigateBack />
      <HostGame dispatchCommand={dispatchCommand} />
      <GamesAvailable dispatchCommand={dispatchCommand} />
    </View>
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

const HostGame = ({ dispatchCommand }:
  { dispatchCommand: (item: dispatchCommandT) => void }) =>
  <View style={styles.containerHostGame}>
    <TouchableOpacity
      style={{ ...reusableStyles.regBtn, ...styles.btnHost }}
      onPress={() => dispatchCommand({ command: commandsSocketIo.hostGame })}>
      <Text style={styles.text}>Host</Text>
    </TouchableOpacity>
  </View>


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