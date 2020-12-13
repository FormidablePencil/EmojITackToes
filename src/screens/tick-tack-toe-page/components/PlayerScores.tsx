import React from 'react'
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import styled, { useTheme } from 'styled-components';
import { StandardText, TextPlayer } from '..';
import { rootT } from '../../../store';
import { TopView, Score } from '../../../styles/stylesglobal'

function PlayerScores({
  ModalContents,
  showInModal,
  score,
  playerOneTurn,
  playerCharacter,
}) {
  const isClientTurn = useSelector((state: rootT) => state.multiplayer.isClientTurn)
  const clientIsHost = useSelector((state: rootT) => state.multiplayer.clientIsHost)

  return (
    <TopView>
      <PlayerScore
        transparent={showInModal === ModalContents.GameMenu}
        active={clientIsHost && isClientTurn || !clientIsHost && !isClientTurn}
        score={score.p1}
        playerCharacter={showInModal !== ModalContents.GameMenu && playerCharacter[1]}
        />
      <PlayerScore
        transparent={showInModal === ModalContents.GameMenu}
        score={score.p2}
        active={!clientIsHost && isClientTurn || clientIsHost && !isClientTurn}
        playerCharacter={showInModal !== ModalContents.GameMenu && playerCharacter[2]}
      />
    </TopView>
  )
}

const PlayerScore = ({ transparent, score, active, playerCharacter }) => {
  const theme = useTheme()
  return (
    <Score>
      <StandardText transparent={transparent}>{score}</StandardText>
      <PlayerEmojiContainer transparent={transparent} theme={theme} active={active}>
        <TextPlayer>{playerCharacter}</TextPlayer>
      </PlayerEmojiContainer>
    </Score>
  )
}

const PlayerEmojiContainer = styled(View)`
         height: 60px;
         width:  60px;
         border-radius: 10px;
         border-color: white;
         justify-content: center;
         align-items: center;
         border-width: .8px;
${({ theme, active, transparent }) => {
    if (theme && active && !transparent) {
      if (theme.colors) {
        let color = theme.colors.primary
        color = color.replace("1.0)", ".4)");
        // return color
        return [
          `background-color: ${color};`,
        ]
      }
    } else {
      return [
        `border-color: transparent`
      ]
    }
  }}
      `;

export default PlayerScores
