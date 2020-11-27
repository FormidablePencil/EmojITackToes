import React, { useState, useEffect } from 'react'
import { Modal, Text, useTheme } from 'react-native-paper'
import { View, Dimensions } from 'react-native'
import Board from '../components/Board'
import { TopView, Score } from '../styles/stylesglobal'
import { useSelector } from 'react-redux'
import ModalContent from '../components/ModalContent'
import { ScoresTypes, ModalContents, GameBoardInterface, WinnerSqsTypes } from '../TypesTypeScript/TypesAndInterface'
import styled from 'styled-components'
import { gameLogic } from '../logic/gameLogic'
import GameOverOverlay from '../components/GameOverOverlay'
import { LinearGradient } from 'expo-linear-gradient'
import AnimationOptions from '../components/AnimationOptions'
import useLobby from '../hooks/useLobby'
import multiplayerMove from '../hooks/useMultiplayerMove'

const SCREEN_HEIGHT = Dimensions.get('window').height
export const initialSqs: GameBoardInterface = {
   0: { sq0: null, sq1: null, sq2: null, },
   1: { sq0: null, sq1: null, sq2: null, },
   2: { sq0: null, sq1: null, sq2: null, },
}

const TickTackToeScreen = () => {
   useLobby()
   const { playerCharacter } = useSelector((state: any) => state.playerCharacterSettings)
   const theme = useTheme()
   const defaultWonInfo = { playerWon: null, cols: [null], sqs: [null], direction: null }
   const [wonInfo, setWonInfo] = useState<WinnerSqsTypes>(defaultWonInfo)
   const [gameOver, setGameOver] = useState(false)
   const [modalOpen, setModalOpen] = useState(false)
   const [squaresFilled, setSquaresFilled] = useState(0)
   const [playerOneTurn, setPlayerOneTurn] = useState(false)
   const [sq, setSq] = useState<GameBoardInterface>(initialSqs)
   const initialScores = { p1: 0, p2: 0 }
   const [showInModal, setShowInModal] = useState<ModalContents>(ModalContents.GameMenu)
   const [score, setScore] = useState<ScoresTypes>(initialScores)

   const restartScore = () => {
      setScore(initialScores)
   }

   multiplayerMove({ sq, setSq })


   useEffect(() => {
      setShowInModal(ModalContents.GameOver)
      if (gameOver) setTimeout(() => { setModalOpen(true) }, 1000)
   }, [gameOver])

   const startGame = async () => {
      console.log(333)
      setWonInfo(defaultWonInfo)
      setSq(initialSqs)
      setModalOpen(false)
      setShowInModal(ModalContents.none)
      setTimeout(() => {
         setGameOver(false)
         setSquaresFilled(0)
      }, 300)
   }

   useEffect(() => {
      const playerWon = gameLogic({ sq })
      if (playerWon) setWonInfo(playerWon)
      if (playerWon) {
         setScore({ ...score, [playerWon.playerWon]: score[playerWon.playerWon] + 1 })
         setGameOver(true)
      }
   }, [sq])

   const PlayerScore = ({ transparent, score, active, playerCharacter }) =>
      <Score>
         <StandardText transparent={transparent}>{score}</StandardText>
         <PlayerEmojiContainer transparent={transparent} theme={theme} active={active}>
            <TextPlayer>{playerCharacter}</TextPlayer>
         </PlayerEmojiContainer>
      </Score>

   return (
      <ContainerLinearGradient colors={['#492C9A', '#456DAB']} start={[.1, .5]} theme={theme} height={SCREEN_HEIGHT}>
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
         <Board
            wonInfo={wonInfo}
            sq={sq}
            setSq={setSq}
            playerOneTurn={playerOneTurn}
            setPlayerOneTurn={setPlayerOneTurn}
            gameOver={gameOver}
            setGameOver={setGameOver}
            squaresFilled={squaresFilled}
            setSquaresFilled={setSquaresFilled}
         />
         <View style={{ flex: .4 }}></View>
         <View style={{ position: 'absolute', height: '100%', width: '100%' }}>
            {gameOver && showInModal === ModalContents.GameOver ?
               <>
                  <GameOverOverlay
                     setShowInModal={setShowInModal}
                     startGame={startGame}
                  />
               </>
               : null
            }
         </View>
         <Modal
            dismissable={false} visible={modalOpen && showInModal === ModalContents.GameMenu || showInModal === ModalContents.animationSettings ? true : false}>
            {showInModal === ModalContents.GameMenu ?
               <ModalContent
                  setShowInModal={setShowInModal}
                  restartScore={restartScore}
                  score={score}
                  gameOver={gameOver}
                  startGame={startGame}
               />
               : (showInModal === ModalContents.animationSettings) &&
               <>
                  <AnimationOptions setShowInModal={setShowInModal} startGame={startGame} />
               </>
            }
         </Modal>
      </ContainerLinearGradient>
   )
}

const PlayerEmojiContainer = styled<any>(View)`
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
export const StandardText = styled<any>(Text)`
   color: ${props => props.transparent ? 'transparent' : 'white'};
   font-size: 40px;
   justify-content: center;
   align-items: center;
`;

const PlayerWinnerHeaderStyled = styled(Text)`
   textShadowColor: 'rgba(0, 0, 0, 0.75)';
   textShadowOffset: {
                  width: -1px;
      height: 1px;
   };
   textShadowRadius: 10px;
   elevation: 10;
   font-size: 30px;
   color: white;
   position: absolute;
   align-self: center;
   z-index: 30;
`;
const PlayerWinnerHeaderContainer = styled(View)`
   /* background-color: #3BC0A5; */
   background-color: ${props => props.theme.colors.accent};
   height: 100px;
   width: 100%;
   margin: 20px 0px;
   align-items: center;
   justify-content: center;
`;
export const TextPlayer = styled<any>(Text)`
   color: ${props => props.transparent ? 'transparent' : 'white'};
   font-size: 30px;
`;
export const ContainerLinearGradient = styled<any>(LinearGradient)`
                  justify-content: space-around;
   /* background-color: ${props => props.theme.colors.background}; */
   height: ${props => props.height}px;
`;

export default TickTackToeScreen
