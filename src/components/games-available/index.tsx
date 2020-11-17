import React from 'react'
import { ScrollView, StyleSheet, View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import socketIoControls, { commandsSocketIo } from '../../socket.io/socketIoControls';
import { reusableStyles } from '../../styles/stylesglobal';

const staticGamesAvaiable = [
  { host: 'Daniel', id: 2323 },
  { host: 'Peter', id: 2312 },
  { host: 'Peter', id: 5312 },
  { host: 'Peter', id: 73122 },
  { host: 'Peter', id: 63122 },
  { host: 'Peter', id: 201223 },
  { host: 'Peter', id: 9312 },
  { host: 'Peter', id: 20112 },
  { host: 'Peter', id: 93112 },
  { host: 'Peter', id: 1122212 },
  { host: 'Peter', id: 9311212 },
]

function GamesAvailable() {
  const dispatch = useDispatch()

  const onClickHandler = (item) =>
    dispatch(socketIoControls(commandsSocketIo.joinGame, item.id))


  return (
    <ScrollView style={styles.scrollView} scrollEnabled={true}>
      <View style={styles.container}>
        {staticGamesAvaiable.map(item =>
          <TouchableOpacity
            key={item.id}
            style={reusableStyles.regBtn}
            onPress={() => onClickHandler(item)}
          >
            <Text style={styles.text}>item.host</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView >
  )
}


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#3925C8',
    padding: 30,
  },
  scrollView: {
    flex: 1
  },
  text: {
    color: 'white',
  }
})


export default GamesAvailable
