import { useDispatch, useSelector } from "react-redux"
import { END_CLIENT_TURN, TOGGLE_PLAYERS_TURNS, UPDATE_GAME_BOARD } from "../../actions/types"
import useCheckIfOnlineGame from "../../hooks/useCheckIfOnlineGame"
import socketIoCommands from "../../socket.io/socketIoCommandCenter"
import { rootT } from "../../store"

const useGameControlCenter = ({ gameOver, sqTypes }) => {
   const socketIoData = useSelector((state: rootT) => state.multiplayer.socketIoData)
   const clientIsHost = useSelector((state: rootT) => state.multiplayer.clientIsHost)
   const isClientTurn = useSelector((state: rootT) => state.multiplayer.isClientTurn)
   const gameboard = useSelector((state: rootT) => state.gameboard)
   const ifOnlineGame = useCheckIfOnlineGame()
   const dispatch = useDispatch()

   const changeGameboard = ({ boxPressed, col, playersTurn, mode }) => {
      if (gameOver) return
      if (gameboard[col][boxPressed] === null) {
         dispatch({
            type: UPDATE_GAME_BOARD,
            payload: {
               col: col,
               boxPressed: boxPressed,
               player: playersTurn ? sqTypes.p2 : sqTypes.p1,
            },
         })
         dispatch({ type: mode === 'multiplayer' ? END_CLIENT_TURN : TOGGLE_PLAYERS_TURNS })
         if (ifOnlineGame) sendMoveMadeToOtherPlayer({ boxPressed, col })
      }
   }

   const sendMoveMadeToOtherPlayer = ({ boxPressed, col }) =>
      socketIoCommands.makeMove({ lobbyId: socketIoData.lobbyId, boxPressed, col })

   const makeMoveInGameBoard = ({ boxPressed, col }) => {
      if (ifOnlineGame && isClientTurn) {
         changeGameboard({ boxPressed, col, playersTurn: !clientIsHost, mode: 'multiplayer' })
      } else if (!ifOnlineGame) {
         changeGameboard({ boxPressed, col, playersTurn: isClientTurn, mode: 'single' })
      }
   }

   const handleOnPressSq = (boxPressed, col) => {
      makeMoveInGameBoard({ boxPressed, col })
   }

   return { handleOnPressSq }
}

export default useGameControlCenter
