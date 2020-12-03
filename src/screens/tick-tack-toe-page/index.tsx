import React, { useState, useEffect, useRef } from 'react'
import { Text, useTheme } from 'react-native-paper'
import { View, Dimensions } from 'react-native'
import Board from '../../components/board'
import { TopView, Score } from '../../styles/stylesglobal'
import { useDispatch, useSelector } from 'react-redux'
import ModalContent from '../../components/modalComp/modal-content'
import { ScoresTypes, ModalContents, GameBoardInterface, WinnerSqsTypes } from '../../TypesTypeScript/TypesAndInterface'
import styled from 'styled-components'
import { gameLogic } from '../../components/board/gameLogic'
import GameOverOverlay from '../../components/GameOverOverlay'
import { LinearGradient } from 'expo-linear-gradient'
import useLobby from '../../hooks/useLobby'
import PageWrapper from '../../layouts/PageWrapper'
import { useNavigation } from '@react-navigation/native'
import { STATE_NEW_GAME } from '../../actions/types'
import { rootT } from '../../store'
import MenuModal from './components/MenuModal'
import PlayerScores from './components/PlayerScores'
import useCheckIfOnlineGame from '../../hooks/useCheckIfOnlineGame'
import useReadyUp from '../../hooks/useReadyUp'

const SCREEN_HEIGHT = Dimensions.get('window').height
export const initialSqs: GameBoardInterface = {
   0: { sq0: null, sq1: null, sq2: null, },
   1: { sq0: null, sq1: null, sq2: null, },
   2: { sq0: null, sq1: null, sq2: null, },
}

const TickTackToeScreen = () => {
   useLobby()
   const { playerCharacter } = useSelector((state: any) => state.playerCharacterSettings)
   const navigation = useNavigation()
   const defaultWonInfo = { playerWon: null, cols: [null], sqs: [null], direction: null }
   const [wonInfo, setWonInfo] = useState<WinnerSqsTypes>(defaultWonInfo)
   const [gameOver, setGameOver] = useState(false)
   const [modalOpen, setModalOpen] = useState(true)
   const [squaresFilled, setSquaresFilled] = useState(0)
   const [playerOneTurn, setPlayerOneTurn] = useState(false)
   const [showInModal, setShowInModal] = useState<ModalContents>(ModalContents.GameMenu)
   const initialScores = { p1: 0, p2: 0 }
   const [score, setScore] = useState<ScoresTypes>(initialScores)
   const initialRender = useRef(true)
   const gameboard = useSelector((state: rootT) => state.gameboard)
   const dispatch = useDispatch()


   const restartScore = () => {
      setScore(initialScores)
   }

   useEffect(() => {
      if (!initialRender.current) {
         setShowInModal(ModalContents.GameOver)
         if (gameOver) setTimeout(() => { setModalOpen(true) }, 1000)
      } else initialRender.current = false
   }, [gameOver])

   const startGame = async () => {
      setWonInfo(defaultWonInfo)
      dispatch({ type: STATE_NEW_GAME })
      setModalOpen(false)
      setShowInModal(ModalContents.none)
      setTimeout(() => {
         setGameOver(false)
         setSquaresFilled(0)
      }, 300)
   }

   useReadyUp({ startGame })


   useEffect(() => {
      const playerWon = gameLogic({ gameboard })
      if (playerWon) setWonInfo(playerWon)
      if (playerWon) {
         setScore({ ...score, [playerWon.playerWon]: score[playerWon.playerWon] + 1 })
         setGameOver(true)
      }
   }, [gameboard])

   const onPressTopRightIcon = () => navigation.navigate('menu')


   return (
      <PageWrapper icon='menu' onPressTopRightIcon={onPressTopRightIcon}>

         <PlayerScores
            ModalContents={ModalContents}
            showInModal={showInModal}
            score={score}
            playerOneTurn={playerOneTurn}
            playerCharacter={playerCharacter}
         />

         <Board
            wonInfo={wonInfo}
            playerOneTurn={playerOneTurn}
            setPlayerOneTurn={setPlayerOneTurn}
            gameOver={gameOver}
            setGameOver={setGameOver}
            squaresFilled={squaresFilled}
            setSquaresFilled={setSquaresFilled}
         />

         <View style={{ flex: .4 }}></View>

         <View style={{ position: 'absolute', height: '100%', width: '100%' }}>
            {gameOver && showInModal === ModalContents.GameOver &&
               <GameOverOverlay setShowInModal={setShowInModal} startGame={startGame} />
            }
         </View>

         <MenuModal
            modalOpen={modalOpen}
            showInModal={showInModal}
            ModalContents={ModalContents}
            setShowInModal={setShowInModal}
            restartScore={restartScore}
            score={score}
            gameOver={gameOver}
            startGame={startGame}
         />
      </PageWrapper>
   )
}


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

export const BgLinearGradient = ({ children }: any, ...props) =>
   <LinearGradient
      {...props}
      colors={['#492C9A', '#456DAB']}
      start={[.1, .5]}
      style={{
         justifyContent: 'space-around',
         /* background-color: ${props => props.theme.colors.background}; */
         flex: 1,
      }}
   >
      {children}</LinearGradient>

// export const BgLinearGradient = styled<any>(LinearGradient)`
// `;

export default TickTackToeScreen
