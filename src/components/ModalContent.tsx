import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, BackHandler, LayoutAnimation } from 'react-native'
import { Button, withTheme, Title, Subheading, TouchableRipple } from 'react-native-paper'
import styled from 'styled-components';
import { TickTackToeThemeTypes } from '../styles/theming'
import EmojiSelector, { Categories } from "react-native-emoji-selector";
import { useSelector, useDispatch } from 'react-redux';
import { SymbolChoicesTypes } from '../reducers/symbolChoicesReducer';
import { ScoresTypes, ScoresCompTypes, Players } from './modalComp/TypesAndInterface';
import { WHOLE_NEW_PLAYER_CHARACTERS } from '../actions/types';
import { LinearGradient } from 'expo-linear-gradient';
import ScoresAndEmojiSecection from './modalComp/ScoresAndEmojiSecection';

const ModalContent = ({ gameOver, startGame, theme, score }) => {
  const symbolChoices = useSelector((state: any) => state.symbolChoices)
  const [controlledInputs, setControlledInputs] = useState<SymbolChoicesTypes>(symbolChoices)
  const [selectedPlayerToChooseCharacter, setSelectedPlayerToChooseCharacter] = useState<Players>(null)
  const [showEmojiSelector, setShowEmojiSelector] = useState(false)
  const [changingEmoji, setChangingEmoji] = useState(true)
  const [keyboardPresent, setKeyboardPresent] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => setKeyboardPresent(true))
    Keyboard.addListener('keyboardDidHide', () => setKeyboardPresent(false))
    return () => {
      Keyboard.removeListener("keyboardDidShow", () => { });
      Keyboard.removeListener("keyboardDidHide", () => { });
    }
  }, [Keyboard])

  const onPressHandler = () => {
    Keyboard.dismiss()
  }
  
  const onEmojiSelectHandler = (emoji) => {
    console.log(typeof emoji)
    setControlledInputs({ ...controlledInputs, [selectedPlayerToChooseCharacter + 1]: emoji })
  }
  
  const onPressHandlerStart = () => {
    dispatch({ type: WHOLE_NEW_PLAYER_CHARACTERS, payload: controlledInputs })
    startGame()
  }


  //make player 1 & 2 controlled and hook uo emojiSelector to the controlled input to save as that
  //right now fix keyboard
  return (
    <TouchableWithoutFeedback onPress={onPressHandler}>
      <AlignAllContainer>
        <ModalContainerLinearGradient theme={theme} colors={['#037BB2', '#DE59AB']}>
          <KeyboardAvoidingView style={{ height: '100%' }} keyboardVerticalOffset={-100} behavior='padding'>

            {selectedPlayerToChooseCharacter === Players.p1 || selectedPlayerToChooseCharacter === Players.p2 ?
              <FlexContainer style={{ margin: 20, flex: 2 }}>
                <View style={{ backgroundColor: 'white', width: '90%', height: '90%' }}>
                  <EmojiSelector
                    showSectionTitles={false}
                    showTabs={true}
                    category={Categories.emotion}
                    onEmojiSelected={emoji => onEmojiSelectHandler(emoji)}
                  // showSectionTitles={false}
                  />
                </View>
              </FlexContainer>
              :
              <FlexContainer style={{ margin: 20, flex: 1 }}>
                <Title>Tick Tack Toe</Title>
              </FlexContainer>
            }

            <FlexContainer style={{ flex: 1, justifyContent: 'flex-start' }}>
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

            <FlexContainer style={{ flex: 1 }}>
              {!keyboardPresent &&
                <Button onPress={(() => onPressHandlerStart())} mode='contained'>Start</Button>
              }

            </FlexContainer>
          </KeyboardAvoidingView>
        </ModalContainerLinearGradient>
      </AlignAllContainer>
    </TouchableWithoutFeedback>
  )
}


const FlexContainer = styled.View`
  align-items: center;   justify-content: space-evenly;
`;

const AlignAllContainer = styled.View`
  align-items: center;
`;
const ModalContainerLinearGradient = styled(LinearGradient)`
  align-items: center; background-color: ${props => props.theme.colors.background};
  border-radius: 3px; height: 95%; justify-content: space-evenly; width: 80%;
`;

export default withTheme(ModalContent)
