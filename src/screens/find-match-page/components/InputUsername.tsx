import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { UPDATE_USERNAME } from '../../../actions/types'
import { rootT } from '../../../store'
import { reusableStyles } from '../../../styles/stylesglobal'

const InputUsername = () => {
  const username = useSelector((state: rootT) => state.multiplayer.username)
  const dispatch = useDispatch()
  const onChangeTextHandler = (payload) => dispatch({ type: UPDATE_USERNAME, payload })
  return (
    <TextInput
      style={{ ...styles.textInput, width: reusableStyles.regBtn.width }}
      mode='outlined'
      value={username}
      onChangeText={value => onChangeTextHandler(value)}
    />
  )
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: 'purple',
    paddingTop: 10,
    paddingBottom: 10,
    alignSelf: 'center',
    width: "50%"
  }
})


export default InputUsername
