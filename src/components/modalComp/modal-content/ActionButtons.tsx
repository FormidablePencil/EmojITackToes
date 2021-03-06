import React from 'react'
import { Text, View } from 'react-native'
import { Button, useTheme } from 'react-native-paper';
import styled from 'styled-components';
import useCheckIfOnlineGame from '../../../hooks/useCheckIfOnlineGame';
import { ReadyUpTxt, QuitOrRestartText } from '../../../reusables/ReadyUpTxt';
import { reusableStyles } from '../../../styles/stylesglobal';

function ActionButtons({ selectedPlayerToChooseCharacter, keyboardPresent, onPressHandler, onPress, score }) {
  const theme = useTheme()
  const isOnlineGame = useCheckIfOnlineGame()

  const restartQuitHandler = () =>
    onPressHandler(isOnlineGame ? onPress.navFindMatch : onPress.restartScore)

  return (
    <FlexContainer style={{ flex: 2, justifyContent: 'flex-start' }}>
      {!keyboardPresent &&
        <>
          <View style={{ flexDirection: 'row'}}>
            <Button
              style={{ top: -30, flex: 1, marginHorizontal: 10, maxWidth: 100 }}
              mode="contained"
            >
              {selectedPlayerToChooseCharacter !== null && score.p1}
            </Button>
            <Button
              color={theme.colors.primary}
              onPress={(() => onPressHandler(onPress.startGame))}
              style={{ width: 150, top: -30, ...reusableStyles.regBtnWidth }}
              labelStyle={{ color: 'white' }} mode='contained'>
              <ReadyUpTxt />
            </Button>
            <Button
              style={{ top: -30, flex: 1, marginHorizontal: 10, maxWidth: 100 }}
              mode="contained"
            >{selectedPlayerToChooseCharacter !== null && score.p2}</Button>
          </View>
          <View style={{ flexDirection: 'row'}}>
            <Button
              disabled={!isOnlineGame && (score.p1 === 0 && score.p2 === 0) ? true : false}
              color={theme.colors.primary}
              onPress={restartQuitHandler}
              style={{ top: -30, marginTop: 10, marginRight: 10, backgroundColor: theme.colors.primary, ...reusableStyles.regBtnWidth }}
              labelStyle={{ color: 'white' }} mode='contained'>
              <QuitOrRestartText score={score} />
            </Button>
            <Button
              color={theme.colors.primary}
              onPress={(() => onPressHandler(onPress.animationSettings))}
              style={{ top: -30, marginTop: 10, ...reusableStyles.regBtnWidth }}
              labelStyle={{ color: 'white' }} mode='contained'>
              <Text style={reusableStyles.smText}>
                animation
              </Text>
            </Button>
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
