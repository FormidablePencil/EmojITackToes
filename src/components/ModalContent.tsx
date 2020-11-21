import React, { useState, useEffect } from 'react'
import { View, TextInput, ImageBackground, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, BackHandler, LayoutAnimation, ScrollView } from 'react-native'
import { Button, withTheme, Title, Text, Subheading, TouchableRipple, useTheme, IconButton } from 'react-native-paper'
import styled from 'styled-components';
import EmojiSelector, { Categories } from "react-native-emoji-selector";
import { useSelector, useDispatch } from 'react-redux';
import { playerCharacterSettingsTypes } from '../reducers/playerCharacterSettingsReducer';
import { ScoresTypes, ScoresCompTypes, Players, ModalContents } from '../TypesTypeScript/TypesAndInterface';
import { WHOLE_NEW_PLAYER_CHARACTERS, REST_AUTH_DATA } from '../actions/types';
import { LinearGradient } from 'expo-linear-gradient';
import ScoresAndEmojiSecection from './modalComp/ScoresAndEmojiSecection';
import { useNavigation } from '@react-navigation/native'


const ModalContent = ({ gameOver, startGame, score, restartScore, setShowInModal }) => {
  const playerCharacterSettings = useSelector((state: any) => state.playerCharacterSettings)
  const [controlledInputs, setControlledInputs] = useState<playerCharacterSettingsTypes>(playerCharacterSettings)
  const [selectedPlayerToChooseCharacter, setSelectedPlayerToChooseCharacter] = useState<Players>(null)
  const [showEmojiSelector, setShowEmojiSelector] = useState(false)
  const [changingEmoji, setChangingEmoji] = useState(true)
  const [keyboardPresent, setKeyboardPresent] = useState(false)
  const dispatch = useDispatch()
  const theme = useTheme()
  const navigation = useNavigation()

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
    setControlledInputs({ ...controlledInputs, playerCharacter: { ...controlledInputs.playerCharacter, [selectedPlayerToChooseCharacter + 1]: emoji } })
  }

  const onPressHandler = (action) => {
    switch (action) {
      case onPress.navFindMatch:
        navigation.navigate('findMatch')
        // console.log('kkkk');
        break

      case onPress.dismissKeyboard:
        Keyboard.dismiss()
        break

      case onPress.startGame:
        dispatch({ type: WHOLE_NEW_PLAYER_CHARACTERS, payload: controlledInputs })
        startGame()
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

  const NavigateToFindMatch = () =>
    <TouchableRipple
      style={{ height: 30, width: 100, backgroundColor: 'white', position: "absolute", alignSelf: 'center', bottom: 20 }}
      onPress={() => onPressHandler(onPress.navFindMatch)}>
      <Text>Find match</Text>
    </TouchableRipple>

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
          source={require('../assets/images/smiley-1041796_1920.jpg')}
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
              <NavigateToFindMatch />


              {selectedPlayerToChooseCharacter === Players.p1 || selectedPlayerToChooseCharacter === Players.p2 ?
                <FlexContainer style={{ marginHorizontal: 40, marginVertical: 20, flex: 5 }}>
                  <View style={{ width: '100%', height: '100%' }}>
                    <EmojiSelector
                      tabBottomBoarderColor={'lightgrey'}
                      emojiSelectorContainerOverride={{ backgroundColor: theme.colors.accent, borderRadius: 10, paddingTop: 5 }}
                      theme={theme.colors.primary}
                      showSearchBar={false}
                      searchBarBgColor={'#C8FFF8'}
                      showSectionTitles={false}
                      showTabs={true}
                      category={Categories.emotion}
                      onEmojiSelected={emoji => onEmojiSelectHandler(emoji)}
                    />
                  </View>
                </FlexContainer>
                :
                <FlexContainer style={{ margin: 50, flex: 1 }}>
                  <Text style={{
                    fontSize: 25, color: "white",
                    textShadowColor: 'rgba(0, 0, 0, 0.75)',
                    textShadowOffset: {
                      width: -1,
                      height: 1,
                    },
                    textShadowRadius: 10,
                  }}>Emoji Tack Toe</Text>
                </FlexContainer>
              }


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

              <FlexContainer style={{ flex: 2, justifyContent: 'flex-start' }}>
                {!keyboardPresent &&
                  <>
                    <View style={{ flexDirection: 'row' }}>
                      <Button
                        style={{ top: -30, flex: 1, marginHorizontal: 10 }}
                        mode="contained"
                      >{selectedPlayerToChooseCharacter !== null && score.p1}</Button>
                      <Button
                        color={theme.colors.primary}
                        onPress={(() => onPressHandler(onPress.startGame))}
                        style={{ width: 150, top: -30 }}
                        labelStyle={{ color: 'white' }} mode='contained'>Start</Button>
                      <Button
                        style={{ top: -30, flex: 1, marginHorizontal: 10 }}
                        mode="contained"
                      >{selectedPlayerToChooseCharacter !== null && score.p2}</Button>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <Button
                        color={theme.colors.primary}
                        onPress={(() => onPressHandler(onPress.restartScore))}
                        style={{ top: -30, marginTop: 10, marginRight: 10 }}
                        labelStyle={{ color: 'white' }} mode='contained'>Restart</Button>
                      <Button
                        color={theme.colors.primary}
                        onPress={(() => onPressHandler(onPress.animationSettings))}
                        style={{ top: -30, marginTop: 10 }}
                        labelStyle={{ color: 'white' }} mode='contained'>animation</Button>
                    </View>
                  </>
                }

              </FlexContainer>
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
