import React from 'react'
import { Row, GameContainer, HorizontalLine } from '../../styles/stylesglobal'
import { Dimensions } from "react-native";
import { sqTypes, BoardTypes } from '../../TypesTypeScript/TypesAndInterface';
import ColComp from '../ColComp';
import { useTheme } from 'react-native-paper';
import { rootT } from '../../store';
import { useSelector } from 'react-redux';
import useCheckIfOnlineGame from '../../hooks/useCheckIfOnlineGame';
import useGameControlCenter from './useGameControlCenter';

const screenWidth = Math.round(Dimensions.get('window').width);

const Board = ({
   wonInfo,
   gameOver,
   setGameOver,
   squaresFilled,
   setSquaresFilled,
   playerOneTurn,
   setPlayerOneTurn }: BoardTypes) => {
   const theme = useTheme()
   const gameboard = useSelector((state: rootT) => state.gameboard)
   
   const { handleOnPressSq } = useGameControlCenter(
      { gameOver, playerOneTurn, sqTypes, setPlayerOneTurn, squaresFilled, setSquaresFilled, setGameOver }
   )

   return (
      <GameContainer style={{ height: screenWidth }}>
         <Row>
            <ColComp
               gameOver={gameOver}
               wonInfo={wonInfo}
               winningSqare={wonInfo.cols.filter(col => col === 0)[0] === 0 ? wonInfo.sqs : []}
               first={gameboard[0].sq0 !== null ? gameboard[0].sq0 : null}
               second={gameboard[0].sq1 !== null ? gameboard[0].sq1 : null}
               third={gameboard[0].sq2 !== null ? gameboard[0].sq2 : null}
               handleOnPressSq={handleOnPressSq} col={0} />
            <HorizontalLine theme={theme} />
            <ColComp
               gameOver={gameOver}
               wonInfo={wonInfo}
               winningSqare={wonInfo.cols.filter(col => col === 1)[0] === 1 ? wonInfo.sqs : []}
               first={gameboard[1].sq0 !== null ? gameboard[1].sq0 : null}
               second={gameboard[1].sq1 !== null ? gameboard[1].sq1 : null}
               third={gameboard[1].sq2 !== null ? gameboard[1].sq2 : null}
               handleOnPressSq={handleOnPressSq} col={1} />
            <HorizontalLine theme={theme} />
            <ColComp
               gameOver={gameOver}
               wonInfo={wonInfo}
               winningSqare={wonInfo.cols.filter(col => col === 2)[0] === 2 ? wonInfo.sqs : []}
               first={gameboard[2].sq0 !== null ? gameboard[2].sq0 : null}
               second={gameboard[2].sq1 !== null ? gameboard[2].sq1 : null}
               third={gameboard[2].sq2 !== null ? gameboard[2].sq2 : null}
               handleOnPressSq={handleOnPressSq} col={2} />
         </Row>
      </GameContainer>
   )
}

export default Board
