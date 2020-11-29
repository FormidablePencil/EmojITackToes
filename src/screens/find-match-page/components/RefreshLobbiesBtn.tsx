import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from "react-native"
import { useDispatch } from "react-redux"
import getAllLobbies from "../../../actions/multiplayer/getAllLobbies"
import { Feather } from '@expo/vector-icons'; 

const RefreshLobbiesBtn = () => {
  const dispatch = useDispatch()
  const onPressHandler = () => dispatch(getAllLobbies())

  return (
    <TouchableOpacity style={styles.refreshBtn} onPress={onPressHandler}>
      <Feather name="refresh-cw" size={32} color="white" />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  refreshBtn: {
    position: "absolute",
    alignItems: 'center',
    justifyContent: 'center',
    right: 10,
    height: 50,
    width: 50,
  }
})


export default RefreshLobbiesBtn