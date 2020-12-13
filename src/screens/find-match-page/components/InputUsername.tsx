import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Colors, TextInput } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { TOGGLE_USERNAME_POPUP_TOOLTIP, UPDATE_USERNAME } from '../../../actions/types'
import { rootT } from '../../../store'
import { reusableStyles } from '../../../styles/stylesglobal'
import Popover from 'react-native-popover-view';

const InputUsername = () => {
  const username = useSelector((state: rootT) => state.multiplayer.username)
  const usernamePopupToolTip = useSelector((state: rootT) => state.misc.usernamePopupToolTip)
  const dispatch = useDispatch()
  const onChangeTextHandler = (payload) => dispatch({ type: UPDATE_USERNAME, payload })
  const onRequestCloseHandler = () => dispatch({ type: TOGGLE_USERNAME_POPUP_TOOLTIP })
  return (
    <>
      <View>
        <TextInput
          style={{ ...styles.textInput, width: reusableStyles.regBtn.width }}
          theme={{ colors: { primary: Colors.purple900 } }}
          mode='outlined'
          value={username}
          onChangeText={value => onChangeTextHandler(value)}
        />
        <Popover
          animationConfig={{ useNativeDriver: true }}
          isVisible={usernamePopupToolTip}
          from={(<Text style={{ height: 0 }}></Text>)}
          onRequestClose={onRequestCloseHandler}
        >
          <Text style={{ ...reusableStyles.regDarkText, ...styles.horizontalMargins }}>Username must not be empty</Text>
        </Popover>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: '#6D89FF',
    paddingTop: 10,
    paddingBottom: 10,
    alignSelf: 'center',
    width: "50%"
  },
  horizontalMargins: {
    marginLeft: 5,
    marginRight: 5,
  }
})


export default InputUsername
