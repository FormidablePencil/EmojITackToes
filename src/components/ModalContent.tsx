import React from 'react'
import { View, Text, TextInput } from 'react-native'
import { Button, withTheme, Title, Subheading } from 'react-native-paper'
import styled from 'styled-components';
import { TickTackToeThemeTypes } from '../styles/theming'

const ModalContent = ({ gameOver, reset, handleOnPress, theme }) => {
  return (
    <AlignAllContainer>
      <ModalContainer theme={theme}>

        <View>
          <Title>Tick Tack Toe {/* Game Over */}</Title>
          {/* <Subheading>{0} wins in a row :(</Subheading> */}
        </View>

        <ScoreContainer>
          <PlayerContainer>
            <TextInput>Player 1</TextInput>
            <Button onPress={handleOnPress} compact>
              emoji
            </Button>
          </PlayerContainer>
          <PlayerContainer>
            <TextInput>Player 2</TextInput>
            <Button onPress={handleOnPress} compact>
              emoji
            </Button>
          </PlayerContainer>
        </ScoreContainer>

        <Button onPress={reset} mode='contained'>
          Start
        </Button>

      </ModalContainer>
    </AlignAllContainer>
  )
}

const PlayerContainer = styled.View`
  align-items: center;
  justify-content: center;
`;
const ScoreContainer = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  width: 80%;
`;
const AlignAllContainer = styled.View`
  align-items: center;
`;
const ModalContainer = styled.View`
  justify-content: space-evenly;
  align-items: center;
  background-color: ${props => props.theme.colors.background};
  height: 95%;
  width: 80%;
  border-radius: 3px;
`;

export default withTheme(ModalContent)
