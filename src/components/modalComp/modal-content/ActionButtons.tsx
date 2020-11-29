import React from 'react'
import { Text, View } from 'react-native'
import { Button, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import useCheckIfOnlineGame from '../../../hooks/useCheckIfOnlineGame';
import { ReadyUpTxt, QuitOrRestartText } from '../../../reusables/ReadyUpTxt';
import { rootT } from '../../../store';

function ActionButtons({ selectedPlayerToChooseCharacter, keyboardPresent, onPressHandler, onPress, score }) {
  const theme = useTheme()
  return (
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
              labelStyle={{ color: 'white' }} mode='contained'>
              <ReadyUpTxt />
            </Button>
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
              labelStyle={{ color: 'white' }} mode='contained'>
              <QuitOrRestartText />
            </Button>
            <Button
              color={theme.colors.primary}
              onPress={(() => onPressHandler(onPress.animationSettings))}
              style={{ top: -30, marginTop: 10 }}
              labelStyle={{ color: 'white' }} mode='contained'>animation</Button>
          </View>
        </>
      }
    </FlexContainer>
  )
}

const FlexContainer = styled.View`
  align-items: center;   justify-content: space-evenly;
`;


export default ActionButtons
