import React, { useState, useEffect } from 'react'
import { View, TextInput, ImageBackground, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, BackHandler, LayoutAnimation, ScrollView } from 'react-native'
import { Button, withTheme, Title, Text, Subheading, TouchableRipple, useTheme, IconButton } from 'react-native-paper'
import styled from 'styled-components';
import EmojiSelector, { Categories } from "react-native-emoji-selector";
import { useSelector, useDispatch } from 'react-redux';
import { playerCharacterSettingsTypes } from '../../../reducers/playerCharacterSettingsReducer';
import { ScoresTypes, ScoresCompTypes, Players, ModalContents } from '../../../TypesTypeScript/TypesAndInterface';
import { WHOLE_NEW_PLAYER_CHARACTERS, REST_AUTH_DATA, READY_UP, LEAVE_LOBBY } from '../../../actions/types';
import { LinearGradient } from 'expo-linear-gradient';
import ScoresAndEmojiSecection from '../ScoresAndEmojiSecection';
import { useNavigation } from '@react-navigation/native'
import ActionButtons from './ActionButtons';
import EmojiSelection from './EmojiSelection'
import useCheckIfOnlineGame from '../../../hooks/useCheckIfOnlineGame';
import socketIoCommands from '../../../socket.io/socketIoCommandCenter';
import { rootT } from '../../../store';


const ModalContent = ({ gameOver, startGame, score, restartScore, setShowInModal }) => {
  const playerCharacterSettings = useSelector((state: rootT) => state.playerCharacterSettings)
  const clientIsHost = useSelector((state: rootT) => state.multiplayer.clientIsHost)
  const lobbyId = useSelector((state: rootT) => state.multiplayer.socketIoData.lobbyId)
  const [controlledInputs, setControlledInputs] = useState<playerCharacterSettingsTypes>(playerCharacterSettings)
  const [selectedPlayerToChooseCharacter, setSelectedPlayerToChooseCharacter] = useState<Players>(null)
  const [showEmojiSelector, setShowEmojiSelector] = useState(false)
  const [changingEmoji, setChangingEmoji] = useState(true)
  const [keyboardPresent, setKeyboardPresent] = useState(false)
  const dispatch = useDispatch()
  const theme = useTheme()
  const navigation = useNavigation()
  const isOnlineGame = useCheckIfOnlineGame()

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => setKeyboardPresent(true))
    Keyboard.addListener('keyboardDidHide', () => setKeyboardPresent(false))
    return () => {
      Keyboard.removeListener("keyboardDidShow", () => { });
      Keyboard.removeListener("keyboardDidHide", () => { });
    }
  }, [Keyboard])

  enum onPress {
    startGame,
    dismissKeyboard,
    goToAuth,
    restartScore,
    animationSettings,
    navFindMatch,
  }


  const onEmojiSelectHandler = (emoji) => {
    if (isOnlineGame)
      if (!clientIsHost && selectedPlayerToChooseCharacter === Players.p1
        || clientIsHost && selectedPlayerToChooseCharacter === Players.p2) {
        socketIoCommands.characterSelected(emoji, clientIsHost ? 1 : 2, lobbyId)
      }
    setControlledInputs({
      ...controlledInputs,
      playerCharacter: {
        ...controlledInputs.playerCharacter,
        [selectedPlayerToChooseCharacter + 1]: emoji
      }
    })
  }

  const onPressHandler = (action) => {
    switch (action) {
      case onPress.navFindMatch:
        navigation.navigate('findMatch')
        if (isOnlineGame)
          setTimeout(() => {
            dispatch({ type: LEAVE_LOBBY })
          }, 1000)
        break

      case onPress.dismissKeyboard:
        Keyboard.dismiss()
        break

      case onPress.startGame:
        if (isOnlineGame) {
          socketIoCommands.readyUp(lobbyId)
          dispatch({ type: WHOLE_NEW_PLAYER_CHARACTERS, payload: controlledInputs })
          dispatch({ type: READY_UP })
        } else {
          dispatch({ type: WHOLE_NEW_PLAYER_CHARACTERS, payload: controlledInputs })
          startGame()
        }
        break
      case onPress.restartScore:
        restartScore()
        break
      case onPress.goToAuth:
        dispatch({ type: REST_AUTH_DATA })
        navigation.navigate('Authentication')
        break
      case onPress.animationSettings:
        setShowInModal(ModalContents.animationSettings)

      default:
        break
    }
  }
  //make player 1 & 2 controlled and hook uo emojiSelector to the controlled input to save as that
  //right now fix keyboard

  return (
    <TouchableWithoutFeedback onPress={onPressHandler}>
      <AlignAllContainer style={{ width: '90%', alignSelf: 'center' }}>
        <ImageBackground
          style={{
            borderRadius: 40,
            height: '90%',
            width: '100%',
            overflow: 'hidden',
            // elevation: 20,
          }}
          source={require('../../../assets/images/smiley-1041796_1920.jpg')}
        >
          <ModalContainerLinearGradient theme={theme} colors={['rgba(203,29,131,.8)', 'rgba(47,6,122,1)']}>
            <KeyboardAvoidingView style={{ height: '100%' }} keyboardVerticalOffset={120} behavior='padding'>

              {/* {selectedPlayerToChooseCharacter === null &&
                <Button
                  compact
                  onPress={() => onPressHandler(onPress.goToAuth)}
                  color={theme.colors.accent} mode='contained'
                  style={{ position: 'absolute', right: 0, margin: 20 }}
                >
                  <Text style={{ color: 'white' }}>
                    logout
                  </Text>
                </Button>
              } */}

              <EmojiSelection
                selectedPlayerToChooseCharacter={selectedPlayerToChooseCharacter}
                Players={Players}
                onEmojiSelectHandler={onEmojiSelectHandler}
                Categories={Categories}
              />


              <FlexContainer style={{ flex: 2, justifyContent: 'flex-start', marginBottom: 50 }}>
                <ScoresAndEmojiSecection
                  selectedPlayerToChooseCharacter={selectedPlayerToChooseCharacter}
                  setSelectedPlayerToChooseCharacter={setSelectedPlayerToChooseCharacter}
                  controlledInputs={controlledInputs}
                  setControlledInputs={setControlledInputs}
                  setChangingEmoji={setChangingEmoji}
                  score={score}
                  changingEmoji={changingEmoji}
                  setShowEmojiSelector={setShowEmojiSelector} />
              </FlexContainer>

              {/* <View style={{ zIndex: 33, height: 100, alignItems: 'center', justifyContent: "center" }}>
              </View> */}

              <ActionButtons
                selectedPlayerToChooseCharacter={selectedPlayerToChooseCharacter}
                keyboardPresent={keyboardPresent}
                onPressHandler={onPressHandler}
                onPress={onPress}
                score={score}
              />

            </KeyboardAvoidingView>
          </ModalContainerLinearGradient>
        </ImageBackground>
      </AlignAllContainer>
    </TouchableWithoutFeedback>
  )
}


const ScrollViewContainer = styled.View`
  height: 40px;
  width: 50px;
`;

const FlexContainer = styled.View`
  align-items: center;   justify-content: space-evenly;
`;

export const AlignAllContainer = styled.View`
  align-items: center;
`;
export const ModalContainerLinearGradient = styled(LinearGradient)`
  border-width: .8px;
  overflow: hidden;
  border-color: ${props => props.theme.colors.accent};
  border-radius: 20px;
`;

export default ModalContent
