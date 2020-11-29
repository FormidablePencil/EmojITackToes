import { useDispatch, useSelector } from "react-redux"
import { END_CLIENT_TURN, UPDATE_GAME_BOARD } from "../../actions/types"
import useCheckIfOnlineGame from "../../hooks/useCheckIfOnlineGame"
import { socket } from "../../socket.io/useSocketIo"
import { rootT } from "../../store"

const useGameControlCenter = (
   { gameOver, playerOneTurn, sqTypes, setPlayerOneTurn, squaresFilled, setSquaresFilled, setGameOver }) => {
   const socketIoData = useSelector((state: rootT) => state.multiplayer.socketIoData)
   const username = useSelector((state: rootT) => state.multiplayer.username)
   const clientIsHost = useSelector((state: rootT) => state.multiplayer.clientIsHost)
   const isClientTurn = useSelector((state: rootT) => state.multiplayer.isClientTurn)
   const gameboard = useSelector((state: rootT) => state.gameboard)
   const ifOnlineGame = useCheckIfOnlineGame()
   const dispatch = useDispatch()

   // const isVeryFirstMove = () => {
   //    const columnsInBoard = 3
   //    let firstMove = true
   //    for (let index = 0; index < columnsInBoard; index++) {
   //       if (gameboard[index]) return firstMove = false
   //    }
   //    return firstMove
   // }


   const changeGameboard = ({ boxPressed, col }) => {
      if (gameOver) return
      if (gameboard[col][boxPressed] === null) {
         dispatch({
            type: UPDATE_GAME_BOARD,
            payload: {
               col: col,
               boxPressed: boxPressed,
               player: !clientIsHost ? sqTypes.p1 : sqTypes.p2,
            },
            // payload: 
            // { ...gameboard, [col]: { ...gameboard[col], [boxPressed]: playerOneTurn ? sqTypes.p1 : sqTypes.p2 } }
         })
         if (!ifOnlineGame) setPlayerOneTurn(prev => !prev)
         if (squaresFilled >= 8) {
            setSquaresFilled(0)
            setGameOver(true)
            return
         }
         setSquaresFilled(prev => prev + 1)
      } else {
         alert('already pressed do nothing')
      }
   }

   const sendMoveMadeToOtherPlayer = ({ boxPressed, col }) => {
      socket.emit('multiplayer', {
         action: 'move',
         lobbyData: { lobbyId: socketIoData.lobbyId },
         move: { boxPressed, col },
      })
   }

   const makeMoveInGameBoard = ({ boxPressed, col }) => {
      if (ifOnlineGame) {
         if (ifOnlineGame && isClientTurn) {
            changeGameboard({ boxPressed, col })
            sendMoveMadeToOtherPlayer({ boxPressed, col })
            dispatch({ type: END_CLIENT_TURN })
         }
      } else {
         // changeGameboard({ boxPressed, col })
      }
   }



   const handleOnPressSq = (boxPressed, col) => {
      makeMoveInGameBoard({ boxPressed, col })
   }

   return { handleOnPressSq }
}

export default useGameControlCenter
