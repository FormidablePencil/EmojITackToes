import React, { useState, useEffect } from 'react'
import { Modal, Provider, Portal, Text, Title, Button, TouchableRipple } from 'react-native-paper'
import { View, Dimensions, LayoutAnimation, Image } from 'react-native'
import Board from '../components/Board'
import { Container, TopView, StandardText, Score, TextPlayer } from '../styles/stylesglobal'
import { useDispatch } from 'react-redux'
import ModalContent from '../components/ModalContent'
import { gameLogic } from '../logic/gameLogic'
import { ScoresTypes, ModalContents } from '../components/modalComp/TypesAndInterface'
import styled from 'styled-components'
import ImageOverlay from "react-native-image-overlay";
import { AnimatedEmoji } from 'react-native-animated-emoji';
import EmojiBlizard from '../components/EmojiBlizard'

const SCREEN_HEIGHT = Dimensions.get('window').height

const TickTackToeScreen = () => {
   const dispatch = useDispatch()
   const [gameOver, setGameOver] = useState(false)
   const [modalOpen, setModalOpen] = useState(false)
   const [squaresFilled, setSquaresFilled] = useState(0)
   const [playerOneTurn, setPlayerOneTurn] = useState(false)
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
   const [showInModal, setShowInModal] = useState<ModalContents>(ModalContents.GameMenu)
   const [score, setScore] = useState<ScoresTypes>(initialScores)

   useEffect(() => {
      setShowInModal(ModalContents.GameOver)
      //@ run animation here
      if (gameOver) setTimeout(() => { setModalOpen(true) }, 1000)
   }, [gameOver])

   const startGame = async () => {
      setModalOpen(false)
      setSq(initialSqs)
      setTimeout(() => {
         setGameOver(false)
         setSquaresFilled(0)
      }, 300)
   }

   // console.log(gameOver, 'gameOver')
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

   return (
      <Container style={{ height: SCREEN_HEIGHT }}>

         <TopView>
            {/* <Image  style={{tintColor: 'rgba(50,108,46,.30)', flex: 1}} source={require('../assets/images/gear-option.png')} /> */}
            <Score>
               <StandardText>{score.p1}</StandardText>
               <TextPlayer active={playerOneTurn === false}>player 1</TextPlayer>
            </Score>
            <Score>
               <StandardText>{score.p2}</StandardText>
               <TextPlayer active={playerOneTurn === true}>player 2</TextPlayer>
            </Score>
         </TopView>

         <Board
            sq={sq}
            setSq={setSq}
            playerOneTurn={playerOneTurn}
            setPlayerOneTurn={setPlayerOneTurn}
            gameOver={gameOver}
            setGameOver={setGameOver}
            squaresFilled={squaresFilled}
            setSquaresFilled={setSquaresFilled}
         />

         {/* 
         <AnimatedEmoji
            index={'emoji.key'} // index to identity emoji component
            style={{ bottom: 200 }} // start bottom position
            name={'sweat_smile'} // emoji name
            size={30} // font size
            duration={4000} // ms
         //  onAnimationCompleted={this.onAnimationCompleted} // completion handler
         /> */}

         <View style={{ position: 'absolute', height: '100%' }}>
            {/* <EmojiBlizard /> */}
         </View>

         <Provider>
            <Portal>
               <Modal visible={modalOpen}>
                  {showInModal === ModalContents.GameOver ?
                     <GameOverOverlay setShowInModal={setShowInModal} startGame={startGame} />
                     :
                     <ModalContent
                        score={score}
                        gameOver={gameOver}
                        startGame={startGame}
                     />
                  }
               </Modal>
            </Portal>
         </Provider>


      </Container>
   )
}

// import React from 'react'
// import { View, Text } from 'react-native'

const GameOverOverlay = ({ setShowInModal, startGame }) => {
   //@ animation emoji blizard here
   //@ test to see if theme works and what's up with title not using the right font

   enum Action {
      changeCharacter,
      playAgain
   }
   const onPressHandler = (action) => {
      if (action === Action.changeCharacter) {
         setShowInModal(ModalContents.GameMenu)
      } else if (action === Action.playAgain) {
         startGame()
      }
   }

   return (
      <ContainerAligning>
         <Text style={{ fontSize: 50, color: 'white', backgroundColor: 'red', position: 'absolute', top: '30%' }}>Player 1 Won</Text>

         <JustifyCol>
            {/* //@ color theme */}
            <TouchableRipple
               /* theme={theme} */
               onPress={() => onPressHandler(Action.changeCharacter)}
            >
               <View style={{ flexDirection: 'column' }}>
                  <Text>Select</Text>
                  <Text>character</Text>
               </View>
            </TouchableRipple>
            <Button
               onPress={() => onPressHandler(Action.playAgain)}
            >
               Play again
            </Button>
         </JustifyCol>
      </ContainerAligning>
   )
}

const ContainerAligning = styled.View`
   height: 100%;
   align-items: center;
   justify-content: space-around;
`;
const JustifyCol = styled.View`
   align-items: center;
   flex-direction: row;
   flex: 1;
   justify-content: space-around;
   width: 100%;
`


// export default GameOverOverlay


export default TickTackToeScreen
