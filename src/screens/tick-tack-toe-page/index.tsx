import React, { useState, useEffect, useRef } from 'react'
import { Portal, Modal, Text, Button } from 'react-native-paper'
import { View, Dimensions, LayoutAnimation } from 'react-native'
import Board from '../../components/board'
import { reusableStyles } from '../../styles/stylesglobal'
import { useDispatch, useSelector } from 'react-redux'
import { ScoresTypes, ModalContents, GameBoardInterface, WinnerSqsTypes } from '../../TypesTypeScript/TypesAndInterface'
import styled from 'styled-components'
import { gameLogic } from '../../components/board/gameLogic'
import GameOverOverlay from '../../components/GameOverOverlay'
import { LinearGradient } from 'expo-linear-gradient'
import useLobby from '../../hooks/useLobby'
import PageWrapper from '../../layouts/PageWrapper'
import { useNavigation } from '@react-navigation/native'
import { LEAVE_LOBBY, STATE_NEW_GAME } from '../../actions/types'
import { rootT } from '../../store'
import MenuModal from './components/MenuModal'
import PlayerScores from './components/PlayerScores'
import useCheckIfOnlineGame from '../../hooks/useCheckIfOnlineGame'
import useReadyUp from '../../hooks/useReadyUp'
import socketIoCommands from '../../socket.io/socketIoCommandCenter'

const SCREEN_HEIGHT = Dimensions.get('window').height
export const initialSqs: GameBoardInterface = {
   0: { sq0: null, sq1: null, sq2: null, },
   1: { sq0: null, sq1: null, sq2: null, },
   2: { sq0: null, sq1: null, sq2: null, },
}

const TickTackToeScreen = () => {
   useLobby()
   const { playerCharacter } = useSelector((state: rootT) => state.playerCharacterSettings)
   const lobbyId = useSelector((state: rootT) => state.multiplayer.socketIoData.lobbyId)
   const playerLeft = useSelector((state: rootT) => state.multiplayer.playerLeft)
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
   const ifOnlineGame = useCheckIfOnlineGame()

   useEffect(() => {
      // clear everything and notify opponent that player left.
      return async () => {
         if (ifOnlineGame) {
            await socketIoCommands.quitGame(lobbyId)

            dispatch({ type: LEAVE_LOBBY })
         }
      }
   }, [])

   useEffect(() => {
      setSquaresFilled(prev => prev + 1)
      const playerWon = gameLogic({ gameboard })
      if (playerWon) setWonInfo(playerWon)
      if (playerWon) {
         setScore({ ...score, [playerWon.playerWon]: score[playerWon.playerWon] + 1 })
         setTimeout(() => {
            setGameOver(true)
         }, 1000);
         setGameOver(true)
      }
      if (squaresFilled === 8) {
         setTimeout(() => {
            setGameOver(true)
         }, 1000);
         setSquaresFilled(0)
         return
      }
   }, [gameboard])

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

   const onQuitHandler = () => {
      navigation.navigate('findMatch')
      if (ifOnlineGame)
         setTimeout(() => {
            dispatch({ type: LEAVE_LOBBY })
         }, 1000);
   }

   const restartScore = () => {
      setScore(initialScores)
   }

   const onPressTopRightIcon = () => {
      if (!ifOnlineGame) navigation.navigate('menu')
      else navigation.navigate('findMatch')
   }


   return (
      <PageWrapper icon={!ifOnlineGame ? 'menu' : 'x-circle'} onPressTopRightIcon={onPressTopRightIcon}>
         <PlayerLeftModal onQuitHandler={onQuitHandler} />

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
            <GameOverOverlay
               showInModal={showInModal}
               gameOver={gameOver}
               setShowInModal={setShowInModal}
               startGame={startGame}
            />
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

const PlayerLeftModal = ({ onQuitHandler }) => {
   const guestUsername = useSelector((state: rootT) => state.multiplayer.socketIoData.guest.username)
   const hostUsername = useSelector((state: rootT) => state.multiplayer.socketIoData.host.username)
   const clientIsHost = useSelector((state: rootT) => state.multiplayer.clientIsHost)
   const playerLeft = useSelector((state: rootT) => state.multiplayer.playerLeft)
   const ifOnlineGame = useCheckIfOnlineGame()

   return (
      <Portal>
         <Modal
            visible={ifOnlineGame ? playerLeft : false}
            contentContainerStyle={{ backgroundColor: 'rgba(48, 57, 101, 0.201)', alignItems: 'center' }}>
            <Text style={{ ...reusableStyles.lgText }}>
               {clientIsHost ? guestUsername : hostUsername} left the game
         </Text>
            <Button onPress={onQuitHandler}>Quit</Button>
         </Modal>
      </Portal>
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
