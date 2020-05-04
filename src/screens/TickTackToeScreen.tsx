import React, { useState, useEffect } from 'react'
import { Modal, Provider, Portal, Text, Title, Button, TouchableRipple, useTheme } from 'react-native-paper'
import { View, Dimensions, LayoutAnimation, Image } from 'react-native'
import Board from '../components/Board'
import { TopView, Score } from '../styles/stylesglobal'
import { useDispatch, useSelector } from 'react-redux'
import ModalContent from '../components/ModalContent'
import { ScoresTypes, ModalContents, GameBoardInterface, WinnerSqsTypes } from '../TypesTypeScript/TypesAndInterface'
import styled from 'styled-components'
import ImageOverlay from "react-native-image-overlay";
import { AnimatedEmoji } from 'react-native-animated-emoji';
import EmojiBlizard from '../components/EmojiBlizard'
import { gameLogic } from '../logic/gameLogic'
import defaultIcon from 'react-native-paper/lib/typescript/src/components/MaterialCommunityIcon'
import GameOverOverlay from '../components/GameOverOverlay'
import { LinearGradient } from 'expo-linear-gradient'

const SCREEN_HEIGHT = Dimensions.get('window').height

const TickTackToeScreen = () => {
   const { playerCharacter } = useSelector((state: any) => state.playerCharacterSettings)
   const theme = useTheme()
   const defaultWonInfo = { playerWon: null, cols: [null], sqs: [null], direction: null }
   const [wonInfo, setWonInfo] = useState<WinnerSqsTypes>(defaultWonInfo)
   const [gameOver, setGameOver] = useState(false)
   const [modalOpen, setModalOpen] = useState(false)
   const [squaresFilled, setSquaresFilled] = useState(0)
   const [playerOneTurn, setPlayerOneTurn] = useState(false)
   const initialSqs = [
      { sq0: null, sq1: null, sq2: null, },
      { sq0: null, sq1: null, sq2: null, },
      { sq0: null, sq1: null, sq2: null, },
   ]
   const [sq, setSq] = useState<GameBoardInterface>(initialSqs)
   const initialScores = { p1: 0, p2: 0 }
   const [showInModal, setShowInModal] = useState<ModalContents>(ModalContents.GameMenu)
   const [score, setScore] = useState<ScoresTypes>(initialScores)


   useEffect(() => {
      setShowInModal(ModalContents.GameOver)
      //@ run animation here
      if (gameOver) setTimeout(() => { setModalOpen(true) }, 1000)
   }, [gameOver])

   const startGame = async () => {
      setWonInfo(defaultWonInfo)
      setSq(initialSqs)
      setModalOpen(false)
      setShowInModal(ModalContents.none)
      setTimeout(() => {
         setGameOver(false)
         setSquaresFilled(0)
      }, 300)
   }

   console.log(score);

   useEffect(() => {
      const playerWon = gameLogic({ sq })
      if (playerWon) setWonInfo(playerWon)
      if (playerWon) {
         console.log(playerWon);
         setScore({ ...score, [playerWon.playerWon]: score[playerWon.playerWon] + 1 }) //@ useGameLogic
         setGameOver(true)  //@ useGameLogic
      }
   }, [sq])

   return (
      <ContainerLinearGradient colors={['#561B79', '#492C9A', '#456DAB']} start={[.9, 1]} theme={theme} height={SCREEN_HEIGHT}>

         {showInModal !== ModalContents.GameMenu &&
            <TopView>
               <Score>
                  <StandardText>{score.p1}</StandardText>
                  <PlayerEmojiContainer theme={theme} active={playerOneTurn === false}>
                     <TextPlayer>{playerCharacter[1]}</TextPlayer>
                  </PlayerEmojiContainer>
               </Score>
               <Score>
                  <StandardText>{score.p2}</StandardText>
                  <PlayerEmojiContainer theme={theme} active={playerOneTurn}>
                     <TextPlayer>{playerCharacter[2]}</TextPlayer>
                  </PlayerEmojiContainer>
               </Score>
            </TopView>
         }

         {/* <PlayerWinnerHeaderContainer theme={theme}>
            <PlayerWinnerHeaderStyled style={{zIndex: 50, position: 'absolute'}}>Player 1 Won</PlayerWinnerHeaderStyled>
         </PlayerWinnerHeaderContainer> */}

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
                  <EmojiBlizard />
               </>
               : null
            }
         </View>

         {/* <Provider>
            <Portal> */}
         <Modal
            dismissable={false} visible={modalOpen && showInModal === ModalContents.GameMenu ? true : false}>
            {showInModal === ModalContents.GameMenu &&
               <ModalContent
                  score={score}
                  gameOver={gameOver}
                  startGame={startGame}
               />
            }
         </Modal>
         {/* </Portal>
         </Provider> */}


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
${({ theme, active }) => {
      console.log(active);
      if (theme && active) {
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
export const StandardText = styled(Text)`
   color: white;
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
   background-color: ${ props => props.theme.colors.accent};
   height: 100px;
   width: 100%;
   margin: 20px 0px;
   align-items: center;
   justify-content: center;
`;
export const TextPlayer = styled(Text)`
   /* color: ${props => props.active ? 'black' : 'white'}; */
   font-size: 30px;
`;
export const ContainerLinearGradient = styled(LinearGradient)`
   justify-content: space-around;
   /* background-color: ${props => props.theme.colors.background}; */
   height: ${props => props.height}px;
`;

export default TickTackToeScreen
