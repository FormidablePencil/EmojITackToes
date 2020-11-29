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
   sq,
   setSq,
   gameOver,
   setGameOver,
   squaresFilled,
   setSquaresFilled,
   playerOneTurn,
   setPlayerOneTurn }: BoardTypes) => {
   const theme = useTheme()

   const { handleOnPressSq } = useGameControlCenter(
      { gameOver, setSq, sq, playerOneTurn, sqTypes, setPlayerOneTurn, squaresFilled, setSquaresFilled, setGameOver }
   )

   return (
      <GameContainer style={{ height: screenWidth }}>
         <Row>
            <ColComp
               gameOver={gameOver}
               wonInfo={wonInfo}
               winningSqare={wonInfo.cols.filter(col => col === 0)[0] === 0 ? wonInfo.sqs : []}
               first={sq[0].sq0 !== null ? sq[0].sq0 : null}
               second={sq[0].sq1 !== null ? sq[0].sq1 : null}
               third={sq[0].sq2 !== null ? sq[0].sq2 : null}
               handleOnPressSq={handleOnPressSq} col={0} />
            <HorizontalLine theme={theme} />
            <ColComp
               gameOver={gameOver}
               wonInfo={wonInfo}
               winningSqare={wonInfo.cols.filter(col => col === 1)[0] === 1 ? wonInfo.sqs : []}
               first={sq[1].sq0 !== null ? sq[1].sq0 : null}
               second={sq[1].sq1 !== null ? sq[1].sq1 : null}
               third={sq[1].sq2 !== null ? sq[1].sq2 : null}
               handleOnPressSq={handleOnPressSq} col={1} />
            <HorizontalLine theme={theme} />
            <ColComp
               gameOver={gameOver}
               wonInfo={wonInfo}
               winningSqare={wonInfo.cols.filter(col => col === 2)[0] === 2 ? wonInfo.sqs : []}
               first={sq[2].sq0 !== null ? sq[2].sq0 : null}
               second={sq[2].sq1 !== null ? sq[2].sq1 : null}
               third={sq[2].sq2 !== null ? sq[2].sq2 : null}
               handleOnPressSq={handleOnPressSq} col={2} />
         </Row>
      </GameContainer>
   )
}

export default Board
