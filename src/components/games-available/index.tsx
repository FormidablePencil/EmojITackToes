import React from 'react'
import { ScrollView, StyleSheet, View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import joinGame from '../../actions/multiplayer/joinGame';
import { rootT } from '../../store';
import { reusableStyles } from '../../styles/stylesglobal';

function GamesAvailable() {
  const dispatch = useDispatch()
  const username = useSelector((state: rootT) => state.multiplayer.username)
  const allAvailableLobbies = useSelector((state: rootT) => state.allAvailableLobbies)

  const onClickHandler = (lobbyId) =>
    dispatch(joinGame({ username, lobbyId }))

  return (
    <ScrollView style={styles.scrollView} scrollEnabled={true}>
      <View style={styles.container}>
        {allAvailableLobbies.map(lobbyData =>
          <TouchableOpacity
            key={lobbyData._id}
            style={reusableStyles.regBtn}
            onPress={() => onClickHandler(lobbyData.lobbyId)}
          >
            <Text style={styles.text}>{lobbyData.host.username}</Text>
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
