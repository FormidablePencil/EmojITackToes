import React, { useState, useEffect } from 'react'
import { Button, Modal, Provider, Portal } from 'react-native-paper'
import { Text, View } from 'react-native'
import Game from '../components/Game'
import { Container, BottomView, TopView, StandardText, Score, TextPlayer } from '../styles/stylesglobal'
import { useDispatch, useSelector } from 'react-redux'
import { RESET, CHANGE_SYMBOL } from '../actions/types'
import ModalContent from '../components/ModalContent'
import { gameLogic } from '../logic/gameLogic'


//! This should be named game instead or atleast maybe put the logic into hook comp
const TickTackToeScreen = () => {
   const dispatch = useDispatch()
   const [gameOver, setGameOver] = useState(false)
   const [modalOpen, setModalOpen] = useState(false)
   const [squaresFilled, setSquaresFilled] = useState(0)
   const [playerOneTurn, setPlayerOneTurn] = useState(null)
   const initialSqs = [
      { sq0: null, sq1: null, sq2: null, },
      { sq0: null, sq1: null, sq2: null, },
      { sq0: null, sq1: null, sq2: null, },
   ]
   const [sq, setSq] = useState(initialSqs)
   const initialScores = {
      p1: 0,
      p2: 0
   }
   const [score, setScore] = useState(initialScores)

   useEffect(() => {
      if (gameOver) setTimeout(() => { setModalOpen(true) }, 1000)

   }, [gameOver])

   const reset = () => {
      setModalOpen(false)
      setSq(initialSqs)
      setGameOver(false)
      setSquaresFilled(0)
   }

   // console.log(gameOver, 'gameOver')
   const handleOnPress = ({ whatSymbol, whatPlayer }) => {
      dispatch({ type: CHANGE_SYMBOL, payload: whatPlayer, whatSymbol })
   }
   
   // console.log(gameOver)
   useEffect(() => {
      const playerWon = gameLogic(sq)
      // console.log(playerWon, 'playerWon')
      if (playerWon) {
         //add one point to player who wins 
         setScore({ ...score, [playerWon]: score[playerWon] + 1 })
         setGameOver(true)
      }
   }, [sq])

   console.log(score)
   return (
      <Container>

         <TopView>
            <Score>
               <StandardText>{score.p1}</StandardText>
               <TextPlayer active={playerOneTurn === false}>player 1</TextPlayer>
            </Score>
            <Score>
               <StandardText>{score.p2}</StandardText>
               <TextPlayer active={playerOneTurn === true}>player 2</TextPlayer>
            </Score>
         </TopView>

         <Game
            sq={sq}
            setSq={setSq}
            playerOneTurn={playerOneTurn}
            setPlayerOneTurn={setPlayerOneTurn}
            gameOver={gameOver}
            setGameOver={setGameOver}
            squaresFilled={squaresFilled}
            setSquaresFilled={setSquaresFilled}
         />

         <Provider>
            <Portal>
               <Modal visible={modalOpen}>
                  <ModalContent
                     gameOver={gameOver}
                     handleOnPress={handleOnPress}
                     reset={reset}
                  />
               </Modal>
            </Portal>
         </Provider>


      </Container>
   )
}

export default TickTackToeScreen
