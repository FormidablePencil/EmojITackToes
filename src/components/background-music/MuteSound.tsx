import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import { TOGGLE_MUTE } from '../../actions/types'
import { rootT } from '../../store'
import { Feather } from '@expo/vector-icons'
import useMusicBackground from '../../hooks/useMusicBackground'
import { StyleSheet, View } from 'react-native'

const MuteSound = () => {
  const mute = useSelector((state: rootT) => state.mute)
  const dispatch = useDispatch()
  const onClickMute = () => dispatch({ type: TOGGLE_MUTE })


  return (
    <View style={styles.iconPosition}>
      <TouchableOpacity onPress={onClickMute}>
        {mute
          ? <Feather name='volume-x' size={32} color="white" />
          : <Feather name='volume-2' size={32} color="white" />
        }
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  iconPosition: {
    position: "absolute",
    left: 15,
    top: 15,
    zIndex: 1,
  },
})


export default MuteSound
