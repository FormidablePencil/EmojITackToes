import React from 'react'
import { View } from 'react-native';
import styled, { useTheme } from 'styled-components';
import { StandardText, TextPlayer } from '..';
import { TopView, Score } from '../../../styles/stylesglobal'

function PlayerScores({
  ModalContents,
  showInModal,
  score,
  playerOneTurn,
  playerCharacter,
}) {
  return (
    <TopView>
      <PlayerScore
        transparent={showInModal === ModalContents.GameMenu}
        score={score.p1}
        active={playerOneTurn === true}
        playerCharacter={showInModal !== ModalContents.GameMenu && playerCharacter[1]}
      />
      <PlayerScore
        transparent={showInModal === ModalContents.GameMenu}
        score={score.p2}
        active={playerOneTurn === false}
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
