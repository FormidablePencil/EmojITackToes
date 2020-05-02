import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, BackHandler, LayoutAnimation } from 'react-native'
import { ScoresCompTypes, Players } from "./TypesAndInterface";
import styled from "styled-components";
import { TouchableRipple, Button } from "react-native-paper";

const ScoresAndEmojiSecection = ({
  controlledInputs,
  setControlledInputs,
  score,
  changingEmoji,
  setShowEmojiSelector,
  setChangingEmoji,
  selectedPlayerToChooseCharacter,
  setSelectedPlayerToChooseCharacter
}: ScoresCompTypes) => {

  const onChangeHandler = (text: string, whatPlayer: number) => {
    setControlledInputs({ ...controlledInputs, [whatPlayer]: text })
  }
  const showEmojiSelectorBtnOnPress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear); //transition effect not working here
    if (selectedPlayerToChooseCharacter === Players.p1 || selectedPlayerToChooseCharacter === Players.p2) {
      setSelectedPlayerToChooseCharacter(null)
    } else { console.log('sd'); setSelectedPlayerToChooseCharacter(Players.p1) }
  }

  return (
    <ScoreContainer>
      <PlayerContainer>
        {selectedPlayerToChooseCharacter === null ?
          <TextInput
            style={{ textAlign: 'center' }}
            onChangeText={(text) => onChangeHandler(text, 1)}
            value={controlledInputs[1]}
          />
          :
          <TouchableRippleStyled
            style={{ borderWidth: selectedPlayerToChooseCharacter === Players.p1 ? 2 : 0 }}
            onPress={() => setSelectedPlayerToChooseCharacter(Players.p1)}
          >
            <Text>
              {controlledInputs[1]}
            </Text>
          </TouchableRippleStyled>
        }
        <Text>{score.p1}</Text>

      </PlayerContainer>

      <EmojiSelectorView>
        {changingEmoji &&
          <Button
            compact
            mode='outlined'
            style={{ backgroundColor: 'lightGrey', width: 50 }}
            onPress={() => showEmojiSelectorBtnOnPress()}>
            <Text>😃</Text>
          </Button>
        }
      </EmojiSelectorView>

      <PlayerContainer>
        {selectedPlayerToChooseCharacter === null ?

          <TextInput
            style={{ textAlign: 'center', }}
            onChangeText={(text) => onChangeHandler(text, 2)}
            value={controlledInputs[2]}
          />
          :
          <TouchableRippleStyled
            style={{ borderWidth: selectedPlayerToChooseCharacter === Players.p2 ? 2 : 0 }}
            onPress={() => setSelectedPlayerToChooseCharacter(Players.p2)}
          >
            <Text>
              {controlledInputs[2]}
            </Text>
          </TouchableRippleStyled>
        }
        <Text>{score.p2}</Text>

      </PlayerContainer>
    </ScoreContainer>
  )
}

const EmojiSelectorView = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  justify-content: center;
`;
const PlayerContainer = styled.View`
  align-items: center; justify-content: center;
`;
const ScoreContainer = styled.View`
  align-items: flex-end; flex-direction: row; justify-content: space-evenly; width: 100%;
`;

const TouchableRippleStyled = styled(TouchableRipple)`
  padding-horizontal: 5;
  height: 30;
  width: 30;
  border-color: #31496D;
  align-items: center;
  justify-content: center;
  background-color: red;
`;

export default ScoresAndEmojiSecection