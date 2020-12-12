import React, { useRef } from 'react'
import { StyleSheet, TouchableOpacity } from "react-native"
import { useDispatch } from "react-redux"
import getAllLobbies from "../../../actions/multiplayer/getAllLobbies"
import { Feather } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

const RefreshLobbiesBtn = () => {
  const dispatch = useDispatch()
  const refreshRef = useRef(null)

  const onPressHandler = () => {
    dispatch(getAllLobbies())
    refreshRef.current.rotate()
  }

  return (
    <TouchableOpacity style={styles.refreshBtn} onPress={onPressHandler}>
      <Animatable.View
        ref={refreshRef}
        useNativeDriver={true}
      >
        <Feather name="refresh-cw" size={32} color="white" />
      </Animatable.View>
    </TouchableOpacity>
  )
}

Animatable.createAnimatableComponent

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