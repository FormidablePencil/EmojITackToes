import { useDispatch, useSelector } from "react-redux"
import { CLIENT_TURN, END_CLIENT_TURN, TOGGLE_PLAYERS_TURNS, UPDATE_GAME_BOARD } from "../../actions/types"
import useCheckIfOnlineGame from "../../hooks/useCheckIfOnlineGame"
import socketIoCommands from "../../socket.io/socketIoCommandCenter"
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


   const changeGameboard = ({ boxPressed, col, playersTurn }) => {
      if (gameOver) return
      if (gameboard[col][boxPressed] === null) {
         dispatch({
            type: UPDATE_GAME_BOARD,
            payload: {
               col: col,
               boxPressed: boxPressed,
               player: !playersTurn ? sqTypes.p1 : sqTypes.p2,
            },
         })
         // if (!ifOnlineGame) setPlayerOneTurn(prev => !prev)
         if (squaresFilled >= 8) {
            setSquaresFilled(0)
            setGameOver(true)
            return
         }
         sendMoveMadeToOtherPlayer({ boxPressed, col })
         setSquaresFilled(prev => prev + 1)
         dispatch({ type: TOGGLE_PLAYERS_TURNS })
      } else {
         // alert('already pressed do nothing')
      }
   }

   const sendMoveMadeToOtherPlayer = ({ boxPressed, col }) =>
      socketIoCommands.makeMove({ lobbyId: socketIoData.lobbyId, boxPressed, col })

   const makeMoveInGameBoard = ({ boxPressed, col }) => {
      if (ifOnlineGame && isClientTurn) {
         changeGameboard({ boxPressed, col, playersTurn: clientIsHost })
         // dispatch({ type: END_CLIENT_TURN })
      }else if (!ifOnlineGame) {
         changeGameboard({ boxPressed, col, playersTurn: isClientTurn })

      }
      // } else if (ifOnlineGame) {
         // console.log("opponents turn")
      // } else {
         // changeGameboard({ boxPressed, col, playersTurn: isClientTurn })
         // dispatch({ type: TOGGLE_PLAYERS_TURNS })
      // }
   }



   const handleOnPressSq = (boxPressed, col) => {
      makeMoveInGameBoard({ boxPressed, col })
   }

   return { handleOnPressSq }
}

export default useGameControlCenter
