import React, { useEffect, useState } from 'react'
import { Row, Col, Item, GameContainer, HorizontalLine, VerticalLine, StandardText } from '../styles/stylesglobal'
import { Dimensions } from "react-native";
import { useSelector } from 'react-redux';
const screenWidth = Math.round(Dimensions.get('window').width);

const Game = ({ sq, setSq, gameOver, setGameOver, squaresFilled, setSquaresFilled, playerOneTurn, setPlayerOneTurn }) => {

   const handleOnPress = (boxPressed, col) => {
      if (gameOver) return
      if (sq[col][boxPressed] === null) {
         // console.log(squaresFilled, 'squaresFilled')
         setSq({ ...sq, [col]: { ...sq[col], [boxPressed]: playerOneTurn } })
         setPlayerOneTurn(prev => !prev)
         if (squaresFilled >= 8) {
            // console.log('squaresFilled')
            setSquaresFilled(0)
            setGameOver(true)
            return
         }
         setSquaresFilled(prev => prev + 1)
      } else {
         alert('already pressed do nothing')
      }
      console.log(squaresFilled)
   }

   return (
      <GameContainer style={{ height: screenWidth }}>
         <Row>
            <ColComp
               first={sq[0].sq0 !== null ? sq[0].sq0 : null}
               second={sq[0].sq1 !== null ? sq[0].sq1 : null}
               third={sq[0].sq2 !== null ? sq[0].sq2 : null}
               handleOnPress={handleOnPress} col={0} />
            <HorizontalLine />
            <ColComp
               first={sq[1].sq0 !== null ? sq[1].sq0 : null}
               second={sq[1].sq1 !== null ? sq[1].sq1 : null}
               third={sq[1].sq2 !== null ? sq[1].sq2 : null}
               handleOnPress={handleOnPress} col={1} />
            <HorizontalLine />
            <ColComp
               first={sq[2].sq0 !== null ? sq[2].sq0 : null}
               second={sq[2].sq1 !== null ? sq[2].sq1 : null}
               third={sq[2].sq2 !== null ? sq[2].sq2 : null}
               handleOnPress={handleOnPress} col={2} />
         </Row>
      </GameContainer>
   )
}

const ColComp = ({ first, second, third, handleOnPress, col }) => {
   const symbolChoices = useSelector((state: any) => state.symbolChoices)
   let firstBox
   let secondBox
   let thirdBox
   if (first === true) firstBox = symbolChoices[1]
   else if (first === false) {
      firstBox = symbolChoices[2]
   }
   if (second === true) secondBox = symbolChoices[1]
   else if (second === false) {
      secondBox = symbolChoices[2]
   }
   if (third === true) thirdBox = symbolChoices[1]
   else if (third === false) {
      thirdBox = symbolChoices[2]
   }

   return (
      <Col>
         <Item onPress={() => handleOnPress('sq0', col)}>
            <StandardText>
               {firstBox}
            </StandardText>
         </Item>
         <VerticalLine />
         <Item onPress={() => handleOnPress('sq1', col)}>
            <StandardText>
               {secondBox}
            </StandardText>
         </Item>
         <VerticalLine />
         <Item onPress={() => handleOnPress('sq2', col)}>
            <StandardText>
               {thirdBox}
            </StandardText>
         </Item>
      </Col>
   )
}

export default Game
